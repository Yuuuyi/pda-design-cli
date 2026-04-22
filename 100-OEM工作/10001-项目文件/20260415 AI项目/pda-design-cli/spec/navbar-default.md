# Navbar - 默认

> **v1.1.0** | 最后更新：2026-04-22
> 新增：Purpose、Use When/Avoid When、Interaction Flow、AI Notes

---

## Purpose

Navbar-默认 是 PDA 导航栏的基础形态，用于页面顶部的层级返回与标题展示，提供清晰的页面导航入口。

## Use When / Avoid When

| ✅ Use When | 说明 |
|------------|------|
| 通用页面标题 + 右侧操作按钮 | 最基础的导航场景 |
| 需要返回上一页操作 | 配合 onBack 回调 |
| 多页面栈中的中间页面 | 标准 App 导航模式 |

| ❌ Avoid When | 替代方案 |
|--------------|---------|
| 底部导航 | BottomTabBar |
| 弹窗内导航 | Dialog 内置标题区 |
| 搜索场景 | navbar-search |

## Interaction Flow

```
┌─────────────────────┐
│ Navbar-默认 (Default) │ ← 页面挂载
└────────┬────────────┘
         │
    ┌────┴──────────┐
    │ 点击左侧返回图标 │
    ▼
┌─────────────────────┐
│ 触发 onBack()      │ → 路由返回 / 关闭页面
└─────────────────────┘
         │
    ┌────┴──────────┐
    │ 点击右侧操作图标 │
    ▼
┌─────────────────────┐
│ 触发对应回调/路由   │
└─────────────────────┘
```

**动画参数：** 点击态反馈使用 200ms ease-in-out，背景色变为 `#EEEEEE` (Grey NO.2)。

## Design Tokens

| Token | 值 | 用途 |
|-------|---|------|
| `--color-navbar-default-bg` | `#F3F4F6` | 背景色（业务定制，接近 Grey NO.2） |
| `--color-navbar-default-title` | `#333333` | 标题文字（Black NO.6） |
| `--color-navbar-default-icon` | `#666666` | 图标色（Black NO.4） |
| `--color-navbar-tap-bg` | `#EEEEEE` | 点击态背景（Grey NO.2） |
| `--navbar-default-height` | `56px` | 导航栏高度 |
| `--navbar-icon-hit-area` | `40px` | 图标点击热区 |

## AI Notes

**为什么背景色用 `#F3F4F6` 而非标准 Grey NO.2 `#EEEEEE`？**
原规范使用 #F3F4F6，与设计系统 Grey NO.2 (#EEEEEE) 存在偏差。建议后续统一迁移到标准 token，以保持系统一致性。

**为什么标题居中使用绝对定位而非 Flexbox？**
原规范使用绝对定位实现视觉居中（考虑左右操作区宽度不对称时的精确居中），此实现方式可保留。

**为什么左侧返回图标使用 12px 而右侧操作区使用 16px 边距？**
左侧边距较小以容纳返回箭头，右侧需要更大空间防止操作按钮过于贴近屏幕边缘，符合 Touch Target 规范。

---

该组件为基础导航形态，主要用于页面顶部的层级返回与标题展示。

## 1. 组件概述

该组件为顶部导航栏的基础形态，布局结构为：左侧返回区域、中间标题、右侧操作区。整体背景采用设计系统的默认背景色。

## 2. 布局与尺寸

- **整体高度：** `56px`
- **容器宽度：** 默认撑满父容器（`width: 100%`），示例中固定宽度为 `480px`。
- **对齐方式：** 标题在除去左右操作区后的剩余空间内居中对齐（通过绝对定位计算实现）。
- **背景色：** `#F3F4F6`（对应设计系统中的 Grey NO.2）。

## 3. 详细样式规范

### 3.1 整体容器 (Container)

| 属性 | 值 | 备注 |
|------|-----|------|
| Height | 56px | 固定高度 |
| Position | relative | 作为内部绝对定位元素的参照物 |
| Align Self | stretch | 在 Flex 父容器中横向拉伸 |

### 3.2 左侧区域 (Left Area)

| 属性 | 值 | 备注 |
|------|-----|------|
| Position | absolute | 固定在左上角 |
| Left | 12px | 距离左侧边距 |
| Top | 8px | 距离顶部边距（垂直居中修正） |
| Icon Size | 默认 SVG 尺寸 | 无需额外定义宽高 |

### 3.3 中间区域 - 标题 (Title)

| 属性 | 值 | 备注 |
|------|-----|------|
| Font Size | 24px | |
| Font Weight | 600 (Bold) | |
| Line Height | 36px | |
| Color | #333333 | Black NO.6 |
| Font Family | PingFang SC | |
| Position | absolute | 绝对定位实现视觉居中 |

### 3.4 右侧区域 (Right Area)

| 属性 | 值 | 备注 |
|------|-----|------|
| Position | absolute | 固定在右上角 |
| Right | 16px | 距离右侧边距 |
| Top | 7.64px | 距离顶部边距（垂直居中修正） |
| Icon Size | 默认 SVG 尺寸 | 无需额外定义宽高 |

## 4. 排版 (Typography)

- 字体族：`PingFang SC`
- 字重映射：Title: `font-weight: 600`

## 5. 颜色令牌 (Design Tokens)

| 用途 | 颜色值 | 设计变量参考 |
|------|--------|-------------|
| 标题文本 | #333333 | color-functional-black-no-6 |
| 背景色 | #F3F4F6 | color-functional-grey-no-2 |

## 6. 图标调用规则

> **重要：导航栏内图标需调用 icon 包**

导航栏内所有图标必须从 `pda-design-cli/spec/icons/` 目录调用，支持填充态和描边态两种风格。

| 位置 | 推荐图标 | 填充态 | 描边态 | 说明 |
|------|---------|--------|--------|------|
| 左侧返回 | `arrow_left` | `icon_arrow_left.svg` | `icon_arrow_left_outline.svg` | 返回上一页 |
| 右侧操作 | `more` | `icon_more.svg` | `icon_more_outline.svg` | 更多选项 |
| 右侧操作 | `search` | `icon_search.svg` | `icon_search_outline.svg` | 搜索入口 |
| 右侧操作 | `close` | `icon_close.svg` | `icon_close_outline.svg` | 关闭页面 |

**引用方式：**
```typescript
import { IconArrowLeft, IconSearch } from 'pda-design-cli/spec/icons';

// 导航栏使用示例
<Navbar
  leftIcon={<IconArrowLeft />}
  rightIcon={<IconSearch />}
/>
```

完整图标列表见 `spec/icons/index.json`。

## 7. 交互与状态

| v1.1.0 | 2026-04-22 | 新增 Purpose、Use When/Avoid When、Interaction Flow、AI Notes、Design Tokens 结构化 |
