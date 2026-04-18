# Navigation Bar - 带成员统计变体

该组件主要用于需要展示当前操作责任人或协作成员的场景，具备明确的层级结构和交互区域。

## 1. 组件概述

该组件为顶部导航栏的另一种形态，侧重于上下文信息展示（标题）与关联成员快速预览。布局结构为：左侧返回/标题区、右侧成员统计与操作区。

## 2. 布局与尺寸

- **整体高度：** `56px`
- **容器宽度：** 默认撑满父容器（`width: 100%`），示例中固定宽度为 `480px`。
- **内部边距：** 上下 `6px`，左右 `12px`（相比标准导航栏微调了上下间距）。
- **背景色：** `#F3F4F6`（对应设计系统中的 Grey NO.2 或自定义背景色）。

## 3. 详细样式规范

### 3.1 整体容器 (Container)

| 属性 | 值 | 备注 |
|------|-----|------|
| Height | 56px | 固定高度 |
| Display | flex | |
| Align Items | center | 垂直居中 |
| Justify Content | space-between | 两端对齐 |
| Padding | 6px 12px | 上下 6px，左右 12px |

### 3.2 左侧区域 (Left Area)

布局：Flex 布局，图标与标题间距 `12px`。

| 元素 | 属性 | 值 | 备注 |
|------|------|-----|------|
| 返回图标 | Width/Height | 40px | SVG 图标 |
| 标题文本 | Font Size | 24px | |
| | Font Weight | 600 (Bold) | |
| | Line Height | 36px | |
| | Color | #333333 | Black NO.6 |

### 3.3 右侧区域 - 成员统计 (Member Stats)

容器样式：胶囊状背景（Pill Shape）。
头像堆叠：采用重叠布局，通过负 left 值实现层叠效果。

| 属性 | 值 | 备注 |
|------|-----|------|
| Background | #FFFFFF | 白色背景 |
| Border | 1px solid #E0E4F0 | 边框色 |
| Border Radius | 99px | 全圆角 |
| Padding | 2px 16px 2px 2px | 上下内边距极小 |
| Avatar Size | 40px × 40px | 头像尺寸 |
| Avatar Overlap | 20px | 相邻头像重叠距离 |
| Max Avatars | 3 | 最大显示头像数 |
| Min Avatars | 2 | 最小显示头像数 |

### 3.4 成员数量文本

| 属性 | 值 | 备注 |
|------|-----|------|
| Text | {count} | 动态数字 |
| Font Size | 24px | |
| Font Weight | 600 (Bold) | |
| Line Height | 36px | |
| Color | #333333 | Black NO.6 |
| Margin Left | 8px | 与头像组的间距 |

### 3.5 更多菜单

| 属性 | 值 | 备注 |
|------|-----|------|
| Width/Height | 40px | 图标容器尺寸 |
| Gap | 16px | 与成员统计组件的间距 |

## 4. 排版 (Typography)

- 字体族：`PingFang SC`
- 字重：`600` (Bold)

## 5. 颜色令牌 (Design Tokens)

| 用途 | 颜色值 | 设计变量参考 |
|------|--------|-------------|
| 标题/数字文本 | #333333 | color-functional-black-no-6 |
| 背景色 | #F3F4F6 | color-functional-grey-no-2 (或自定义) |
| 成员容器背景 | #FFFFFF | color-functional-black-no-1 |
| 成员容器边框 | #E0E4F0 | 自定义边框色 (接近 Grey NO.3) |

## 6. 交互与状态

- **点击热区：** 整个成员统计胶囊区域应为可点击区域，悬停时可调整背景色（如使用 Grey NO.2 `#EEEEEE`）。
- **溢出处理：** 当人数超过 3 人时，显示 2 个头像叠加，数字显示剩余总数（如 "+8"）。
- **响应式：** 在小屏设备上，成员统计组件的左右内边距可适当减小。
