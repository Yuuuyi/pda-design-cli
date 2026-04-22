# Navigation Bar 带标签栏变体

> **v1.1.0** | 最后更新：2026-04-22
> 新增：Purpose、Use When/Avoid When、Interaction Flow、AI Notes

---

## Purpose

Navbar-Tabs 是顶部导航栏的标签页变体，适用于需要在导航栏中部展示页面内标签切换的场景，布局结构为左侧返回区 + 中间标签栏 + 右侧操作区。标签栏提供页面内视图切换能力，是 PDA 多状态页面（待处理/已处理、全部/本班次等）的标准导航模式。

## Use When / Avoid When

| ✅ Use When | 说明 |
|------------|------|
| 页面内需要切换不同视图 | 例：全部/待处理/已完成 |
| 需要在导航层级内快速切换 | 不跳转到新页面 |
| 2-5 个标签选项 | PDA 屏幕宽度限制 |

| ❌ Avoid When | 替代方案 |
|--------------|---------|
| 超过 5 个标签 | Tabs 组件（页面内独立使用） |
| 标签内容复杂需展开详情 | NavBar 默认 + 详情页跳转 |
| 页面数量少（2-3 个）| 直接使用独立页面 |

## Interaction Flow

```
┌────────────────────────────────────────┐
│ Navbar-Tabs (Default)                   │ ← 页面挂载
└────────┬───────────────────────────────┘
         │
    ┌────┴─────────────────┐
    │ 点击任意 Tab 标签      │
    ▼
┌────────────────────────────────────────┐
│ TabActiveIndex 更新                     │ ← 触发 onChange(index)
│ 底部指示器动画滑动到新位置              │ ← 300ms ease-out
└────────────────────────────────────────┘
```

**动画参数：** 标签切换使用 300ms ease-out；底部指示器滑动使用 `transition: left 300ms cubic-bezier(0.4, 0, 0.2, 1)`。

## Design Tokens

| Token | 值 | 用途 |
|-------|---|------|
| `--color-navbar-tabs-bg` | `#F3F4F6` | 导航栏背景（业务定制，接近 Grey NO.2） |
| `--color-navbar-tabs-active` | `#333333` | 选中态文字（Black NO.6） |
| `--color-navbar-tabs-default` | `#666666` | 默认态文字（Black NO.4） |
| `--color-navbar-tabs-indicator` | `#6445D1` | 底部指示器（Primary NO.6） |
| `--navbar-tabs-height` | `56px` | 导航栏高度 |
| `--navbar-tabs-tab-gap` | `24px` | 标签间距 |

## AI Notes

**为什么标签数量限制 2-5 个？**
PDA 屏幕宽度有限（通常 480px），5 个以上标签会导致文字过小或需横向滚动，严重影响体验。

**为什么使用绝对定位指示器而非 CSS border-bottom？**
滑动动画需要独立控制 left 位置，绝对定位的 40px×4px 指示器可通过 JS/Canvas 动画实现平滑滑动效果。

**为什么选中态用 #333333 默认态用 #666666？**
#333333 (Black NO.6) 与 #666666 (Black NO.4) 的对比度约 4.5:1，均满足 WCAG AA，但选中态使用更深色强调当前状态。

---

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

## 6. 图标调用规则

> **重要：导航栏内图标需调用 icon 包**

导航栏内所有图标必须从 `pda-design-cli/spec/icons/` 目录调用。

| 位置 | 推荐图标 | 填充态 | 描边态 | 说明 |
|------|---------|--------|--------|------|
| 左侧返回 | `arrow_left` | `icon_arrow_left.svg` | `icon_arrow_left_outline.svg` | 返回上一页 |
| 右侧操作 | `more` | `icon_more.svg` | `icon_more_outline.svg` | 更多选项 |

**引用方式：**
```typescript
import { IconArrowLeft, IconMore } from 'pda-design-cli/spec/icons';
```

完整图标列表见 `spec/icons/index.json`。

## 7. 交互与状态

| v1.1.0 | 2026-04-22 | 新增 Purpose、Use When/Avoid When、Interaction Flow、AI Notes、Design Tokens 结构化 |
