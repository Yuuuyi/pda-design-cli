# Navigation Bar 带标签栏变体

## 1. 组件概述

该组件为顶部导航栏的一种变体，适用于需要在导航栏中部展示页面内标签切换（Tabs）的场景。布局结构为：左侧返回区域、中间标签栏、右侧操作区。

## 2. 布局与尺寸

- **整体高度：** `56px`
- **容器宽度：** 默认撑满父容器（`width: 100%`），示例中固定宽度为 `480px`。
- **内部边距：** 上下 `7px`，左右 `12px`（用于左右操作区的留白）。
- **标签栏容器：** 宽度自适应内容，最大宽度需考虑左右操作区的占位，避免重叠。

## 3. 详细样式规范

### 3.1 整体容器 (Container)

| 属性 | 值 | 备注 |
|------|-----|------|
| Height | 56px | 固定高度 |
| Display | flex | |
| Align Items | center | 垂直居中 |
| Justify Content | space-between | 两端对齐 |
| Padding | 7px 12px | 上下 7px，左右 12px |

### 3.2 左侧区域 (Left Area)

| 属性 | 值 | 备注 |
|------|-----|------|
| Width/Height | 40px | 图标容器尺寸 |
| Icon Size | 40px | SVG 图标应适配此尺寸 |

### 3.3 中间区域 - 标签栏 (Tabs)

布局：水平 Flex 布局，标签项之间使用 Gap 间距。
选中态指示器：底部横条。

| 属性 | 选中态 (Active) | 默认态 (Default) | 备注 |
|------|-----------------|------------------|------|
| Text Color | #333333 | #666666 | Color-Functional-Black NO.5/NO.6 |
| Font Size | 22px | 22px | |
| Font Weight | 600 (Bold) | 400 (Regular) | |
| Line Height | 30px | 30px | |
| Indicator | 40px × 4px，背景色 #6445D1 (Primary NO.6) | 无 | |
| Gap | 24px | 24px | 标签项之间的间距 |

### 3.4 右侧区域 (Right Area)

- 结构与左侧区域保持一致，支持放置多个操作图标。
- 示例中展示了三个图标，通过绝对定位布局，实际开发中建议使用 Flexbox 自动排列。

## 4. 排版 (Typography)

- 字体族：`PingFang SC`
- 字号/行高：`22px` / `30px`
- 字重映射：
  - Bold (选中态): `font-weight: 600`
  - Regular (默认态): `font-weight: 400`

## 5. 颜色令牌 (Design Tokens)

| 用途 | 颜色值 | 设计变量参考 |
|------|--------|-------------|
| 选中文字 | #333333 | color-functional-black-no-5 |
| 默认文字 | #666666 | color-functional-black-no-4 |
| 主色强调 | #6445D1 | primary-no-6 |
| 背景色 | #F3F4F6 | Grey NO.2 或自定义 |

## 6. 交互与状态

- **标签数量：** 最小 2 个，最大 5 个。超过 5 个时需考虑滚动或换行策略。
- **点击反馈：** 建议在移动端为标签项添加点击态（Ripple 或背景色变化），背景色可使用 Grey NO.2 (`#EEEEEE`)。
