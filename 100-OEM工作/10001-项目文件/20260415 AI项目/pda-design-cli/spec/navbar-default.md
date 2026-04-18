# Navbar - 默认

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

- **点击热区：** 左右两侧的图标区域应具备至少 40px × 40px 的点击热区。
- **状态反馈：** 点击左侧返回箭头应有即时反馈（如透明度变化或背景色变化，建议使用 Grey NO.2 `#EEEEEE`）。
