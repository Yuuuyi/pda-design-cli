# Navbar - 带搜索框

> **v1.1.0** | 最后更新：2026-04-22
> 新增：Purpose、Use When/Avoid When、Interaction Flow、AI Notes

---

## Purpose

Navbar-搜索 是顶部导航栏的搜索形态，适用于需要在导航栏内直接进行搜索输入的场景，布局结构为左侧返回区 + 中间搜索输入框 + 右侧搜索按钮。

## Use When / Avoid When

| ✅ Use When | 说明 |
|------------|------|
| 搜索框作为页面核心操作入口 | 搜索操作优先级高于其他功能 |
| 需要快速搜索运单号/任务 | PDA 高频使用场景 |
| 与键盘联动输入 | 移动端搜索交互标准模式 |

| ❌ Avoid When | 替代方案 |
|--------------|---------|
| 搜索只是次要功能 | 页面内嵌 SearchBar 组件 |
| 需要搜索历史/建议词 | SearchBar 组件带建议列表 |
| 多条件筛选 | 配合 Filter/Dropdown 使用 |

## Interaction Flow

```
┌────────────────────────────────────┐
│ Navbar-搜索 (Default)               │ ← 页面挂载
└────────┬───────────────────────────┘
         │
    ┌────┴──────────────┐
    │ 点击搜索框获取焦点  │
    ▼
┌────────────────────────────────────┐
│ InputField Focus                   │ ← 显示 Focus Ring (#6445D1)
└────────┬───────────────────────────┘
         │
    ┌────┴──────────────┐
    │ 输入搜索内容        │
    ▼
┌────────────────────────────────────┐
│ Search Submit                      │ ← 点击"搜索"按钮或按回车
└────────────────────────────────────┘
         │
    ┌────┴──────────────┐
    │ 触发 onSearch()   │ → 执行搜索逻辑
    └───────────────────┘
```

**动画参数：** Focus Ring 使用 `box-shadow: 0 0 0 2px rgba(100,69,209,0.2)`，过渡 200ms ease。

## Design Tokens

| Token | 值 | 用途 |
|-------|---|------|
| `--color-navbar-search-bg` | `#F3F4F6` | 导航栏背景（业务定制，接近 Grey NO.2） |
| `--color-navbar-search-input-bg` | `#FFFFFF` | 搜索框背景（Black NO.1） |
| `--color-navbar-search-placeholder` | `#BBBBBB` | 占位符色（Grey NO.4 #BDBDBD） |
| `--color-navbar-search-btn` | `#6445D1` | 搜索按钮文字（Primary NO.6） |
| `--color-navbar-search-focus-ring` | `rgba(100,69,209,0.2)` | 焦点环颜色 |
| `--navbar-search-height` | `56px` | 导航栏高度 |

## AI Notes

**为什么搜索按钮在右侧而非左侧？**
搜索按钮在右侧符合 F 型阅读习惯和右手持机操作习惯，且与"搜索框在前、按钮在后"的操作流程一致。

**为什么使用胶囊形搜索按钮（border-radius: 640px）？**
640px 超大圆角创造视觉区分，将操作按钮与输入框在视觉上分离，同时保持品牌语言一致性。

**为什么占位符用 #BBBBBB 而非标准 token？**
#BBBBBB 不在标准色阶中，建议迁移到 Grey NO.4 (#BDBDBD)，避免自定义色值增加维护成本。

---

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

| v1.1.0 | 2026-04-22 | 新增 Purpose、Use When/Avoid When、Interaction Flow、AI Notes、Design Tokens 结构化 |
