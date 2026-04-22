# 标签页 (Tabs)

> **v1.1.0** | 最后更新：2026-04-22
> 新增：Purpose、Use When/Avoid When、Interaction Flow、AI Notes、Code Mapping

---

## Purpose

标签页（Tabs）是一种独立的分段控制器式组件，用于在有限屏幕空间内切换不同视图内容。相比导航栏内嵌的 `navbar-tabs`，本组件以独立的 pill（胶囊）形态呈现，激活态以白色浮起的方式突出显示。

**解决的问题：**

- 在单一页面内组织多组相关内容，减少页面跳转
- 允许用户快速在不同分类/状态之间切换，如"全部/待处理/已完成"
- 支持在标签内嵌入动态数字（统计量），让用户在不进入列表的情况下感知数据量

**为什么需要这个组件：**

- PDA 设备屏幕空间有限，不适合用导航菜单或页面跳转展示多分类内容
- 标签内数字高亮能力让"待处理 X 票"这样的关键信息一目了然
- 与 `navbar-tabs` 的底部横条样式形成明确区分，适用独立容器场景

## Use When / Avoid When

| 场景 | 推荐使用 Tabs | 推荐替代方案 |
|------|:---:|---|
| 同一页面内多视图快速切换 | ✅ | |
| 标签需要展示动态统计数字（如"待取件 5 票"） | ✅ | |
| 分类数量在 2～10 个之间 | ✅ | |
| 替代底部导航栏做页面内内容分组 | ✅ | |
| 数量少（≤1）或极多（>10）且层级深的导航 | ❌ | 使用 Navbar + 独立页面 |
| 需要展示复杂表单或多步骤流程 | ❌ | 使用 Stepper 或 Card 分组 |
| 需要在同一视图内同时展示多组数据 | ❌ | 使用 Accordion 或折叠面板 |
| 仅为装饰或引导用户点击 | ❌ | 使用 Button 或 Banner |

## Interaction Flow

```
[页面加载 / 组件挂载]
        │
        ▼
  ┌─────────────┐
  │   DEFAULT   │ ← 初始状态：第一个标签为激活态，其余默认态
  └──────┬──────┘
         │
    [用户点击标签]
         │
         ▼
  ┌─────────────┐
  │ ACTIVE ──→  │ ← 白色背景浮现（200ms ease-out）
  │ box-shadow  │   字重 400→600，颜色 #666→#333
  └──────┬──────┘
         │
    [旧标签失焦]
         │
         ▼
  ┌─────────────┐
  │   DEFAULT   │ ← 背景透明，颜色 #333→#666，字重 600→400
  └──────┬──────┘
         │
    [内容区切换]
         │
         ▼
    ◄─── 返回 DEFAULT 状态，等待下一次点击 ───►

--- 横向滑动（标签 >5 个时）---

[可滚动容器]
    │
    ▼
  ┌──────────────────┐
  │ [标签A] [标签B] >│ ← 边缘渐隐遮罩暗示可滑动
  └────────┬─────────┘
           │
      [用户左右滑动]
           │
           ▼
  ┌──────────────────┐
  │  吸附至最近标签   │ ← scroll-snap-align: center
  └──────────────────┘
           │
      [再次滑动]
           │
           ▼
      ◄── 重复吸附 ──►

--- 禁用态（标签被标记 disabled）---

  ┌─────────────┐
  │  DISABLED   │ ← 文字颜色 #BBBBBB，cursor: not-allowed
  └──────┬──────┘    点击事件不触发
         │
    [点击禁用标签]
         │
         ▼
       无响应（无状态切换）
```

## Design Tokens

### 容器（Container）

| Token | 值 | 说明 |
|-------|-----|------|
| `--tabs-bg` | `Grey-NO.2` `#EEEEEE` | 容器背景色 |
| `--tabs-radius` | `Radius-Large` `12px` | 容器外圆角 |
| `--tabs-inner-padding` | `2px` | 内边距形成 pill 形态 |

### Tab Item — 激活态（Active）

| Token | 值 | 说明 |
|-------|-----|------|
| `--tab-active-bg` | `White` `#FFFFFF` | 白色浮起背景 |
| `--tab-active-color` | `Black-NO.6` `#333333` | 激活态文字 |
| `--tab-active-font-weight` | `600` | Bold |
| `--tab-active-shadow` | `0 1px 3px rgba(0,0,0,0.08)` | 微弱阴影增强层次 |

### Tab Item — 默认态（Default）

| Token | 值 | 说明 |
|-------|-----|------|
| `--tab-default-bg` | `transparent` | 透明（继承容器 Grey-NO.2） |
| `--tab-default-color` | `Black-NO.5` `#666666` | 未激活文字 |
| `--tab-default-font-weight` | `400` | Regular |

### Tab Item — 禁用态（Disabled）

| Token | 值 | 说明 |
|-------|-----|------|
| `--tab-disabled-color` | `Grey-NO.4` `#BBBBBB` | 禁用态文字 |
| `--tab-disabled-cursor` | `not-allowed` | 禁止点击 |

### 共享样式

| Token | 值 | 说明 |
|-------|-----|------|
| `--tab-min-width` | `68px` | 最小宽度 |
| `--tab-height` | `49px` | 高度（内容撑开） |
| `--tab-item-radius` | `Radius-Medium` `10px` | Item 圆角 |
| `--tab-item-padding` | `12px 16px` | 内边距 |
| `--tab-text-size` | `Text-Bold-18` `18px / 25px` | 字号/行高 |
| `--tab-highlight-color` | `Red-NO.5` `#FF3333` | 高亮数字颜色 |
| `--tab-transition-duration` | `200ms` | 过渡时长 |
| `--tab-transition-easing` | `ease-out` | 缓动函数 |

### 复合内容（Compound Content）

| Token | 值 | 说明 |
|-------|-----|------|
| `--tab-compound-gap` | `4px` | 数字/单位间距 |
| `--tab-compound-align` | `baseline` | 基线对齐 |

## Props Contract

```typescript
/** Tabs 标签项配置 */
interface TabItem {
  /** 标签显示文本 */
  label: string;
  /** 唯一标识（用于状态切换和回调） */
  key: string;
  /** 是否禁用该标签 */
  disabled?: boolean;
  /** 标签内嵌内容（可选，支持复合结构如数字+单位） */
  badge?: {
    /** 普通数字 */
    count?: number | string;
    /** 高亮数字（红色，如警示数量） */
    highlight?: number | string;
    /** 单位文本，如 '票' */
    unit?: string;
  };
}

/** Tabs 组件完整 Props */
interface TabsProps {
  /** 标签数据列表 */
  items: TabItem[];
  /** 当前激活的标签 key */
  activeKey?: string;
  /** 默认激活的标签 key（非受控模式） */
  defaultActiveKey?: string;
  /** 标签切换回调 */
  onChange?: (key: string, item: TabItem) => void;
  /** 是否启用滑动切换（默认 true，items.length > 5 时强制启用） */
  scrollable?: boolean;
}
```

## Code Mapping

| 平台 | 源码路径 |
|------|---------|
| **React** | `packages/react/src/components/Tabs/index.tsx` |
| **React Native** | `packages/react-native/src/components/Tabs/index.tsx` |
| **Vue 3** | `packages/vue3/src/components/Tabs/src/Tabs.vue` |
| **Flutter** | `packages/flutter/lib/src/components/tabs.dart` |
| **小程序 / WXML** | `packages/mini-program/src/components/tabs/index.wxml` |
| **Web HTML/CSS** | `packages/web/src/components/Tabs/styles.css` |
| **Tokens 定义** | `packages/tokens/src/tabs.ts` |

## AI Notes

- **为什么用 pill（胶囊）形态而不是底部横条？** 因为 Tabs 是独立组件，与页面内其他内容区域平级，需要更明显的视觉边界。白色浮起 + 圆角 + 微阴影传达"激活卡片"的概念，与底部导航的横条指示器形成风格区分。

- **为什么标签数量上限是 5 个等分？** 超过 5 个时标签文字会被过度压缩，导致可读性下降。改为滑动模式后，每个标签按内容撑开宽度，用户可以完整看到文字，交互成本更低。

- **为什么禁用态用 #BBBBBB 而不是更浅的灰？** `#BBBBBB` 处于 Grey NO.4 范围，与 Grey NO.2（背景）和 Grey NO.5（默认态）之间有足够对比度，既表示"不可用"又不会完全"消失"，保持界面信息完整性。

- **为什么切换动画选 200ms 而非更快？** 200ms 是人眼感知"即时响应"与"动画平滑"的临界值。太快（<100ms）会让人感觉界面"跳变"；太慢（>300ms）会让用户觉得操作迟钝。

- **为什么高亮数字用 #FF3333（Red-NO.5）而不是 Primary？** 高亮数字通常代表警示或紧急状态（待处理、异常），需要比 Primary（#6445D1）更强的视觉冲击力。红色在 PDA 业务场景中已经是约定俗成的警示色。

## Variants Overview

| 变体 | 说明 | 适用场景 |
|------|------|---------|
| **基础双标签** | 2 个标签，等分 50% | 简单二分法（全部/我的） |
| **三分标签** | 3 个标签，等分 33.3% | 三分类（待处理/进行中/已完成） |
| **多标签（等分）** | 4～5 个标签，等分 | 中等分类数量 |
| **滑动多标签** | >5 个标签，横向滚动 + 吸附 | 分类多（>5 种状态/类型） |
| **带统计数字** | 标签内含数字+单位，可高亮 | 需要展示每类数据量的场景 |
| **禁用态** | 单个或多个标签禁止交互 | 部分分类暂不可用 |

---

## 1. 组件概述

- **最少标签数**：2
- **最多静态展示**：5 个标签（等分容器宽度）
- **超过 5 个**：启用横向滑动，标签宽度由内容撑开
- **交互方式**：点击切换，支持滑动切换（标签过多时）

---

## 2. 设计 Token 映射

| 属性 | 色值 | 映射 Token | 说明 |
|------|------|-----------|------|
| **主背景色** | `#EEEEEE` | `Grey-NO.2` | 容器背景 |
| **卡片背景色** | `#FFFFFF` | `White` | 激活态浮起白色 |
| **激活态文字** | `#333333` | `Black-NO.6` | 主标题/正文 |
| **未激活态文字** | `#666666` | `Black-NO.5` | 次级文字 |
| **高亮文字** | `#FF3333` | `Red-NO.5` | 功能色（警示/强调） |
| **主圆角** | `12px` | `Radius-Large` | 容器圆角 |
| **次圆角** | `10px` | `Radius-Medium` | Item 圆角 |
| **水平间距** | `16px` | `Gap-Default` | 默认间距 |
| **垂直内边距** | `12px` | `Padding-Vertical` | 上下留白 |
| **字号/行高** | `18px / 25px` | `Text-Bold-18` | Bold 字重 |

---

## 3. 组件结构

### 3.1 容器 (Container)

作为所有 Tab Items 的包裹层。

- **布局**：`Flexbox`（横向排列）
- **背景**：`Grey-NO.2`（`#EEEEEE`）
- **圆角**：`12px`
- **内边距**：`2px`（形成 pill 形态）
- **溢出处理**：标签 ≤5 时等分宽度；>5 时 `overflow-x: auto`，隐藏滚动条

```html
<!-- Tabs Container -->
<div class="tabs-container">
  <!-- Tab Item 1 -->
  <!-- Tab Item 2 -->
</div>
```

### 3.2 标签项 (Tab Item)

单个标签的结构，分为激活态和默认态。

**基础样式（所有 Tab Item）：**

| 属性 | 值 | 说明 |
|------|-----|------|
| 最小宽度 | `68px` | - |
| 高度 | `49px`（内容撑开） | - |
| 布局 | `Flex`（居中） | - |
| 圆角 | `10px` | `Radius-Medium` |
| 内边距 | `12px 16px` | - |

#### 状态 A：激活态 (Active)

| 属性 | 值 | Token |
|------|-----|-------|
| 背景 | `#FFFFFF` | `White` |
| 文字颜色 | `#333333` | `Black-NO.6` |
| 字重 | `600` (Bold) | - |

#### 状态 B：默认态 (Default)

| 属性 | 值 | Token |
|------|-----|-------|
| 背景 | 透明（与容器同色 `Grey-NO.2`） | - |
| 文字颜色 | `#666666` | `Black-NO.5` |
| 字重 | `400` (Regular) | - |

#### 状态 C：禁用态 (Disabled)

| 属性 | 值 | Token |
|------|-----|-------|
| 文字颜色 | `#BBBBBB` | `Grey-NO.4` |
| 交互 | 禁止点击 | - |

```html
<!-- Active Tab -->
<div class="tab-item active">
  <span>TAB</span>
</div>

<!-- Default Tab -->
<div class="tab-item">
  <span>TAB</span>
</div>
```

### 3.3 复合内容 (Compound Content)

当标签需要显示统计信息时，内部结构如下：

- **布局**：`Flex`（横向不换行）
- **间距**：`4px`
- **对齐**：`Baseline`（使数字和单位对齐更自然）

```html
<!-- Structure for "TAB 1 1 票" -->
<span class="tab-text">TAB</span>
<span class="tab-number highlight">1</span> <!-- 高亮数字 -->
<span class="tab-number">1</span> <!-- 普通数字 -->
<span class="tab-unit">票</span>
```

---

## 4. 宽度策略

| 标签数量 | 宽度策略 | 说明 |
|----------|---------|------|
| 2 个 | 等分容器 | 各占 50% |
| 3 个 | 等分容器 | 各占 33.3% |
| 4 个 | 等分容器 | 各占 25% |
| 5 个 | 等分容器 | 各占 20% |
| >5 个 | 内容撑开 + 滑动 | 容器启用横向滚动，隐藏滚动条 |

**滑动规范：**
- 滚动方向：横向
- 滚动条：隐藏（`scrollbar-width: none` / `-webkit-scrollbar: none`）
- 边缘渐隐：容器左右各 `20px` 渐变遮罩（从透明到容器背景色），暗示可滑动
- 惯性滚动：启用（`-webkit-overflow-scrolling: touch`）

---

## 5. 交互与动画

### 5.1 切换动画

| 属性 | 值 | 说明 |
|------|-----|------|
| 过渡属性 | `background-color`, `color`, `font-weight`, `transform` | - |
| 过渡时长 | `200ms` | - |
| 缓动函数 | `ease-out` | - |
| 白色浮起动画 | `scale(1)` → 激活时添加微弱 `box-shadow: 0 1px 3px rgba(0,0,0,0.08)` | 增强层次感 |

**动画时序：**

1. 点击新标签 → 新标签背景渐变为白色（200ms ease-out）
2. 旧标签背景渐变为透明（200ms ease-out），同时文字颜色和字重过渡
3. 内容区切换建议配合 `fade` 动画（150ms）

### 5.2 滑动切换（标签 >5 时）

| 属性 | 值 | 说明 |
|------|-----|------|
| 手势 | 左右滑动 | 容器内横向滑动 |
| 吸附 | 吸附到最近的标签中心 | `scroll-snap-type: x mandatory` |
| 吸附对齐 | `scroll-snap-align: center` | 每个标签居中对齐 |

### 5.3 点击反馈

| 状态 | 效果 | 时长 |
|------|------|------|
| 按下 (active) | `opacity: 0.7` | 即时 |
| 释放 | 恢复 + 切换动画 | 200ms |

---

## 6. 组件化示例

### 示例 1：基础双标签

```html
<div class="tabs-container">
  <div class="tab-item active">
    <span>TAB</span>
  </div>
  <div class="tab-item">
    <span>TAB</span>
  </div>
</div>
```

### 示例 2：带数量统计与高亮

```html
<div class="tabs-container">
  <div class="tab-item active">
    <span class="tab-text">TAB</span>
    <span class="tab-number highlight">1</span>
    <span class="tab-number">1</span>
    <span class="tab-unit">票</span>
  </div>
  <div class="tab-item">
    <span class="tab-text">TAB</span>
    <span class="tab-number">0</span>
    <span class="tab-unit">票</span>
  </div>
</div>
```

### 示例 3：多标签滑动

```html
<div class="tabs-container scrollable">
  <div class="tab-item active"><span>全部</span></div>
  <div class="tab-item"><span>待处理</span></div>
  <div class="tab-item"><span>进行中</span></div>
  <div class="tab-item"><span>已完成</span></div>
  <div class="tab-item"><span>已取消</span></div>
  <div class="tab-item"><span>已归档</span></div>
</div>
```

---

## 7. 无障碍 (Accessibility)

| 属性 | 值 | 说明 |
|------|-----|------|
| `role` | `tablist` | 容器 |
| 子项 `role` | `tab` | 每个标签 |
| `aria-selected` | `true` / `false` | 激活态 |
| `aria-disabled` | `true` | 禁用态 |
| 键盘导航 | `←` `→` 切换标签，`Enter` 确认 | - |

---

## Changelog

| 日期 | 版本 | 修改内容 | 作者 |
|------|------|---------|------|
| 2026-04-22 | v1.1.0 | 新增 Purpose、Use When/Avoid When、Interaction Flow、Design Tokens（结构化 Token 矩阵）、Props Contract（TypeScript 接口）、Code Mapping、AI Notes、Variants Overview | AI Refactor |
