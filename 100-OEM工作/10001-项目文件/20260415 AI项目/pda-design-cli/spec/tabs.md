# 标签页 (Tabs)

独立标签页组件，用于在有限空间内通过标签切换不同视图。支持在标签文本中嵌入动态数字及单位，并可对特定字段（如数字）进行高亮处理。

> **与 navbar-tabs 的区别**：`navbar-tabs` 是导航栏内嵌的标签切换（底部横条指示器），本组件为独立使用的分段控制器式标签页（pill 样式，白色浮起指示激活态）。

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
