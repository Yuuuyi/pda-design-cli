# 列表项组件 (ListItem)

> **v1.1.0** | 最后更新：2026-04-22
> 新增：Purpose、Use When/Avoid When、Interaction Flow、AI Notes、Code Mapping

---

## Purpose

列表项组件是信息展示的基础容器，用于列表页、详情页的信息条目渲染与操作入口。通过统一的布局规范（左侧图标+双行文本+右侧插槽），解决列表信息密度高、内容类型多样时的视觉一致性问题，降低用户认知负担。

## Use When / Avoid When

| ✅ 使用场景 | ❌ 避免场景 |
|------------|------------|
| 列表页的信息条目展示 | 卡片式内容展示，应使用 Card 组件 |
| 详情页的字段列表 | 需要复杂交互的表单输入项 |
| 设置页的功能入口 | 纯展示性图文内容 |
| 需要右侧操作（Tag/Switch/Button）的场景 | 多列数据对比表格 |
| 可点击跳转的列表项 | 层级过深的多级列表（应使用 Tree） |

## Interaction Flow

```
[列表加载] ──→ [列表项渲染（默认态）]
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
    [点击列表项]  [点击右侧插槽]  [长按列表项]
          │          │          │
          ▼          ▼          ▼
    [背景色变化]  [触发插槽操作]  [可选：上下文菜单]
          │          │
          ▼          ▼
    [触发 onClick]  [操作完成]
          │
          ▼
    [恢复默认态]
```

触发条件：
- **点击态**：用户点击列表项时背景色变为 `#F5F5F5`（Black NO.2），松开时恢复默认态
- **可点击指示**：`showArrow=true` 时显示右侧箭头图标，提示用户可点击
- **右侧插槽**：支持任意组件（Tag/Switch/Button），点击时触发对应组件的交互

## Design Tokens

### 容器 Token

| 属性 | 值 | Token |
|------|-----|-------|
| 宽度 | 480px | 固定宽度 |
| 高度 | 68px | 固定高度 |
| 内边距 | 16px | 四边统一 |
| 背景色 | `#FFFFFF` | Black NO.1 |
| 点击态背景 | `#F5F5F5` | Black NO.2 |

### 文本 Token

| 元素 | 属性 | 值 | Token |
|------|------|-----|-------|
| 主标题 | 字号 | 20px | — |
| 主标题 | 字重 | 600 (Bold) | — |
| 主标题 | 行高 | 28px | — |
| 主标题 | 颜色 | `#333333` | Black NO.7 |
| 副标题/编号 | 字号 | 20px | — |
| 副标题/编号 | 字重 | 400 (Regular) | — |
| 副标题/编号 | 行高 | 28px | — |
| 副标题/编号 | 颜色 | `#9E9E9E` | Grey NO.5 |
| 右侧插槽文本 | 字号 | 20px | — |
| 右侧插槽文本 | 字重 | 400 (Regular) | — |
| 右侧插槽文本 | 颜色 | `#333333` | Black NO.7 |

### 图标 Token

| 元素 | 属性 | 值 | Token |
|------|------|-----|-------|
| 左侧图标 | 尺寸 | 16×16px | — |
| 左侧图标 | 缩放 | 禁止 | `flex-shrink: 0` |
| 右侧箭头 | 尺寸 | 16×16px | — |
| 右侧箭头 | 颜色 | `#9E9E9E` | Grey NO.5 |

### 分割线 Token

| 属性 | 值 | Token |
|------|-----|-------|
| 高度 | 1px | — |
| 宽度 | 480px | 100% |
| 颜色 | `#F5F5F5` | Black NO.2 |
| 位置 | 组件底部 | — |

### 布局 Token

| 属性 | 值 |
|------|-----|
| Flex 主轴 | `space-between` |
| Flex 交叉轴 | `center` |
| 图标与文本间距 | 8px |
| 标题与编号间距 | 4px |
| 右侧插槽最小高度 | 36px |

## Props Contract

```typescript
interface ListItemProps {
  /** 左侧图标 (可选) */
  icon?: string;
  /** 主标题 */
  title: string;
  /** 副标题/编号 (可选) */
  subtitle?: string;
  /** 右侧插槽内容 */
  rightSlot?: React.ReactNode;
  /** 是否显示底部分割线 */
  showDivider?: boolean;
  /** 是否显示右侧箭头 */
  showArrow?: boolean;
  /** 点击事件 */
  onClick?: () => void;
  /** 自定义样式 */
  className?: string;
}
```

## Code Mapping

| 平台 | 路径 |
|------|------|
| React | `src/components/ListItem/index.tsx` |
| CSS | `src/components/ListItem/style.css` |
| 设计稿 | `spec/list-item.md` |

## AI Notes

- **为什么固定 68px 高度？** 因为该高度经过测试可平衡信息密度与触控友好性，同时与常见图标尺寸（16px）、字号（20px）形成和谐比例，避免行高过大导致列表松散。
- **为什么主标题用 Black NO.7（`#333333`）而非纯黑？** 因为纯黑（`#000000`）在白色背景上对比度过强，长时间阅读易产生视觉疲劳；`#333333` 足够清晰且柔和。
- **为什么副标题用 Grey NO.5（`#9E9E9E`）？** 因为该灰度值在白色背景上对比度约 3:1，符合 WCAG AA 标准，既能区分层级又不至于过淡难以辨认。
- **为什么图标尺寸限制 16px？** 因为列表项高度有限（68px），过大图标会挤压文本空间；16px 在 1x 屏幕上清晰可辨，且与 20px 字号形成 0.8 黄金比例。
- **为什么右侧插槽设计为通用 slot？** 因为列表项的业务场景多样（状态标签、开关、按钮、纯文本），slot 模式提供最大灵活性，避免为每种场景单独开发组件变体。

## Variants Overview

| 变体 | 图标 | 副标题 | 右侧插槽 | 箭头 | 说明 |
|------|------|--------|----------|------|------|
| 标准模式 | ✅ | ✅ | 可选 | 可选 | 左侧图标 + 双行文本 + 右侧插槽 |
| 无图标模式 | ❌ | ✅ | 可选 | 可选 | 隐藏左侧图标，文本左对齐 |
| 单行模式 | 可选 | ❌ | 可选 | 可选 | 仅主标题，无副标题 |
| 可点击模式 | 可选 | 可选 | 可选 | ✅ | 显示右侧箭头，支持 onClick |
| 静态展示模式 | 可选 | 可选 | 可选 | ❌ | 无箭头，纯展示 |

---

用于列表页、详情页信息展示、操作入口的基础容器组件。左侧固定展示图标与双行文本（标题+副标题/编号），右侧预留插槽用于放置按钮、标签、开关或其他自定义组件。

---

## 一、组件结构

```
+------------------------------------------------------------------+
|  [图标]  [副标题/编号] [主标题]              [右侧插槽内容] [箭头]  |
|  16×16   20px Regular #9E9E9E   20px Bold    自定义组件    16×16  |
|  ↓ 8px   ←────────────────────→              ↓ 4px              |
|          间距 4px (标题与编号)                                   |
|                                                                  |
|  容器: 480×68px, padding 16px, gap 16px                         |
+------------------------------------------------------------------+
|  分割线: 480×1px, #F5F5F5 (Black NO.2)                          |
+------------------------------------------------------------------+
```

---

## 二、布局参数

### 2.1 容器

| 属性 | 值 | Token |
|------|-----|-------|
| 宽度 | 480px | 固定宽度 |
| 高度 | 68px | 固定高度 |
| 内边距 | 16px | 四边统一 |
| 背景色 | `#FFFFFF` | Black NO.1 |
| Flex 主轴 | `space-between` | 两端对齐 |
| Flex 交叉轴 | `center` | 垂直居中 |
| 盒模型 | `border-box` | 标准盒模型 |

### 2.2 左侧内容区

| 属性 | 值 |
|------|-----|
| 布局 | Flex Row |
| 元素间距 | 8px (图标与文本) |
| 对齐 | 垂直居中 |

### 2.3 文本容器

| 属性 | 值 |
|------|-----|
| 布局 | Flex Row |
| 元素间距 | 4px (标题与编号) |
| 对齐 | 垂直居中 |

### 2.4 右侧插槽

| 属性 | 值 |
|------|-----|
| 最小高度 | 36px |
| 对齐 | 居中对齐，靠右排列 |
| 内容 | 支持任意组件（Tag/Switch/Button/文本/图标） |

### 2.5 分割线

| 属性 | 值 | Token |
|------|-----|-------|
| 高度 | 1px | - |
| 宽度 | 480px | 100% |
| 颜色 | `#F5F5F5` | Black NO.2 |
| 位置 | 组件底部 | - |

---

## 三、排版规范

### 3.1 主标题

| 属性 | 值 | Token |
|------|-----|-------|
| 字号 | 20px | 非标准字阶，继承业务需求 |
| 字重 | 600 (Bold) | 加粗突出 |
| 行高 | 28px | 1.4 倍行高 |
| 颜色 | `#333333` | Black NO.7 |
| 字体 | PingFang SC | 系统字体 |

### 3.2 副标题/编号

| 属性 | 值 | Token |
|------|-----|-------|
| 字号 | 20px | 非标准字阶，继承业务需求 |
| 字重 | 400 (Regular) | 常规字重 |
| 行高 | 28px | 1.4 倍行高 |
| 颜色 | `#9E9E9E` | Grey NO.5 |
| 字体 | PingFang SC | 系统字体 |

### 3.3 右侧插槽文本

| 属性 | 值 | Token |
|------|-----|-------|
| 字号 | 20px | 非标准字阶，继承业务需求 |
| 字重 | 400 (Regular) | 常规字重 |
| 行高 | 28px | 1.4 倍行高 |
| 颜色 | `#333333` | Black NO.7 |

---

## 四、颜色规范

| 元素 | 色值 | Token |
|------|------|-------|
| 容器背景 | `#FFFFFF` | Black NO.1 |
| 主标题文字 | `#333333` | Black NO.7 |
| 副标题文字 | `#9E9E9E` | Grey NO.5 |
| 分割线 | `#F5F5F5` | Black NO.2 |

---

## 五、图标规范

### 5.1 左侧图标

| 属性 | 值 |
|------|-----|
| 尺寸 | 16×16px |
| 颜色 | 根据业务场景 |
| 缩放 | 禁止 (`flex-shrink: 0`) |

### 5.2 右侧箭头图标

| 属性 | 值 |
|------|-----|
| 尺寸 | 16×16px |
| 颜色 | `#9E9E9E` (Grey NO.5) |
| 推荐图标 | `icon_arrow_right_outline.svg` |

---

## 六、组件 API

```typescript
interface ListItemProps {
  /** 左侧图标 (可选) */
  icon?: string;
  /** 主标题 */
  title: string;
  /** 副标题/编号 (可选) */
  subtitle?: string;
  /** 右侧插槽内容 */
  rightSlot?: React.ReactNode;
  /** 是否显示底部分割线 */
  showDivider?: boolean;
  /** 是否显示右侧箭头 */
  showArrow?: boolean;
  /** 点击事件 */
  onClick?: () => void;
  /** 自定义样式 */
  className?: string;
}
```

---

## 七、代码示例

### 7.1 HTML 结构

```html
<!-- ListItem 组件 -->
<div class="list-item" role="listitem">
  <!-- 左侧内容区 -->
  <div class="list-item__left">
    <img class="list-item__icon" src="./asset/icons/icon_placeholder.svg" alt="" />
    <div class="list-item__titles">
      <span class="list-item__subtitle">KY4000327</span>
      <span class="list-item__title">225662</span>
    </div>
  </div>

  <!-- 右侧插槽 -->
  <div class="list-item__right">
    <span class="list-item__slot-text">列表展示内容</span>
    <img class="list-item__arrow" src="./asset/icons/icon_arrow_right_outline.svg" alt="" />
  </div>
</div>
<!-- 分割线 -->
<div class="list-item__divider"></div>
```

### 7.2 CSS 样式

```css
/* 基础容器 */
.list-item {
  width: 480px;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: #FFFFFF; /* Black NO.1 */
  box-sizing: border-box;
  cursor: pointer;
}

/* 左侧区域 */
.list-item__left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.list-item__icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.list-item__titles {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* 主标题 */
.list-item__title {
  color: #333333; /* Black NO.7 */
  font-size: 20px;
  font-family: 'PingFang SC', sans-serif;
  font-weight: 600;
  line-height: 28px;
}

/* 副标题/编号 */
.list-item__subtitle {
  color: #9E9E9E; /* Grey NO.5 */
  font-size: 20px;
  font-family: 'PingFang SC', sans-serif;
  font-weight: 400;
  line-height: 28px;
}

/* 右侧插槽 */
.list-item__right {
  display: flex;
  align-items: center;
  gap: 4px;
  min-height: 36px;
}

.list-item__slot-text {
  color: #333333; /* Black NO.7 */
  font-size: 20px;
  line-height: 28px;
}

/* 右侧箭头 */
.list-item__arrow {
  width: 16px;
  height: 16px;
  color: #9E9E9E; /* Grey NO.5 */
}

/* 分割线 */
.list-item__divider {
  width: 480px;
  height: 1px;
  background-color: #F5F5F5; /* Black NO.2 */
}
```

---

## 八、使用示例

### 8.1 基础用法

```jsx
import { ListItem } from 'pda-design';

<ListItem
  title="225662"
  subtitle="KY4000327"
  showDivider
/>
```

### 8.2 带图标

```jsx
<ListItem
  icon="icon_box.svg"
  title="包裹编号"
  subtitle="BX2024001"
  showDivider
/>
```

### 8.3 带右侧插槽（Tag）

```jsx
<ListItem
  title="运输中"
  subtitle="SF123456789"
  rightSlot={<Tag variant="success">已完成</Tag>}
  showArrow
  showDivider
/>
```

### 8.4 带右侧插槽（Switch）

```jsx
<ListItem
  title="开启通知"
  rightSlot={<Switch checked={enabled} onChange={setEnabled} />}
  showDivider
/>
```

### 8.5 可点击

```jsx
<ListItem
  title="设置"
  icon="icon_setting_outline.svg"
  showArrow
  onClick={() => navigate('/settings')}
/>
```

---

## 九、变体

| 变体 | 说明 |
|------|------|
| 标准模式 | 左侧图标 + 双行文本 + 右侧插槽 |
| 无图标模式 | 隐藏左侧图标，文本左对齐 |
| 单行模式 | 仅主标题，无副标题 |
| 可点击模式 | 显示右侧箭头，支持 onClick |
| 静态展示模式 | 无箭头，纯展示 |

---

## 十、交互说明

### 10.1 点击反馈

- 可点击项应显示右侧箭头
- 点击时有视觉反馈（背景色变化或按压效果）
- 推荐背景色变化：`#F5F5F5` (Black NO.2)

### 10.2 无障碍

- 父容器添加 `role="listitem"`
- 交互元素添加适当的 ARIA 标签
- 图标使用 `alt=""` 避免屏幕朗读

---

## 十一、关联组件

| 组件 | 关联说明 |
|------|---------|
| Tag | 右侧插槽常用组件 |
| Switch | 右侧插槽常用组件 |
| Button | 右侧插槽操作按钮 |
| Divider | 底部分割线继承 Divider 规范 |

## Changelog

| 日期 | 版本 | 变更内容 |
|------|------|---------|
| 2026-04-22 | v1.1.0 | 新增 Purpose、Use When/Avoid When、Interaction Flow、Design Tokens、Props Contract、Code Mapping、AI Notes、Variants Overview 章节；保留原有全部规格数据 |
