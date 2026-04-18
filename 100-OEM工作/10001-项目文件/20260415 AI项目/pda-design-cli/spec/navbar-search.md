# Navbar - 带搜索框

## 1. 组件概述

该组件为顶部导航栏的搜索形态，适用于需要在导航栏直接进行搜索输入的场景。布局结构为：左侧返回区域、中间搜索输入框、右侧搜索触发按钮。

## 2. 布局与尺寸

- **整体高度：** `56px`（状态栏）+ `56px`（导航栏）= `112px`
- **导航栏高度：** `56px`
- **内部边距：** 上下 `8px`，左右 `12px`
- **背景色：** `#F3F4F6`（对应设计系统中的 Color-Functional-Grey NO.2）

## 3. 详细样式规范

### 3.1 整体容器 (Container)

| 属性 | 值 | 备注 |
|------|-----|------|
| Height | 56px | 导航栏固定高度 |
| Display | flex | |
| Align Items | flex-start | 顶部对齐 |
| Padding | 8px 12px | 上下 8px，左右 12px |
| Gap | 12px | 子元素间距 |

### 3.2 左侧区域 (Left Area)

| 属性 | 值 | 备注 |
|------|-----|------|
| Icon Size | 40px × 40px | SVG 图标尺寸 |
| Flex | none | 不伸缩 |

### 3.3 中间区域 - 搜索输入框 (Search Input)

布局：Flex 容器，占据剩余空间
背景：白色卡片，带圆角

| 属性 | 值 | 备注 |
|------|-----|------|
| Flex | 1 | 占据剩余空间 |
| Background | #FFFFFF | White |
| Border Radius | 8px | 圆角 |
| Padding | 6px 8px | 内部留白 |
| Placeholder Color | #BBBBBB | 浅灰色 |
| Font Size | 20px | |
| Line Height | 28px | |
| Font Family | PingFang SC | |

### 3.4 右侧区域 - 搜索按钮 (Search Button)

| 属性 | 值 | 备注 |
|------|-----|------|
| Background | transparent | 透明背景 |
| Border Radius | 640px | 胶囊形 |
| Padding | 4px 8px | 内部留白 |
| Text Color | #6445D1 | Primary NO.6 |
| Font Size | 22px | |
| Line Height | 30px | |
| Font Weight | 400 (Regular) | |

## 4. 排版 (Typography)

| 元素 | 字号 | 行高 | 字重 | 字体 |
|------|------|------|------|------|
| 搜索框占位符 | 20px | 28px | Regular | PingFang SC |
| 搜索按钮文本 | 22px | 30px | Regular | PingFang SC |

## 5. 颜色令牌 (Design Tokens)

| 用途 | 颜色值 | 设计变量参考 |
|------|--------|-------------|
| 背景色 | #F3F4F6 | color-functional-grey-no-2 |
| 输入框背景 | #FFFFFF | color-functional-black-no-1 |
| 占位符文本 | #BBBBBB | 自定义浅灰（介于 Grey NO.4-5 之间） |
| 搜索按钮文本 | #6445D1 | primary-no-6 |

## 6. 图标调用规则

> **重要：导航栏内图标需调用 icon 包**

导航栏内所有图标必须从 `pda-design-cli/spec/icons/` 目录调用。

| 位置 | 推荐图标 | 填充态 | 描边态 | 说明 |
|------|---------|--------|--------|------|
| 左侧返回 | `arrow_left` | `icon_arrow_left.svg` | `icon_arrow_left_outline.svg` | 返回上一页 |

**引用方式：**
```typescript
import { IconArrowLeft } from 'pda-design-cli/spec/icons';
```

完整图标列表见 `spec/icons/index.json`。

## 7. 交互与状态

- **输入框焦点态：** 获取焦点时可添加 `1px solid #6445D1` 边框或 `0 0 0 2px rgba(100, 69, 209, 0.2)` 的 Focus Ring。
- **搜索按钮：** Hover 时可添加轻微背景色（如 Grey NO.2 `#EEEEEE`）。
- **点击热区：** 搜索按钮最小点击区域不小于 40px × 40px。
