# Navigation Bar - 带成员统计变体

> **v1.1.0** | 最后更新：2026-04-22
> 新增：Purpose、Use When/Avoid When、Interaction Flow、AI Notes

---

## Purpose

Navbar-成员 是顶部导航栏的成员统计变体，适用于需要展示当前操作责任人或协作成员的场景，布局结构为左侧返回/标题区 + 右侧成员统计胶囊 + 更多菜单。是 PDA 团队协作场景（任务分配、交接班、协检等）的标准导航模式。

## Use When / Avoid When

| ✅ Use When | 说明 |
|------------|------|
| 任务/运单需要明确责任人 | 团队协作场景 |
| 需要快速查看当前处理人员 | 交接班场景 |
| 成员数量需直观展示 | 3 人以内头像堆叠，超过显示数字 |

| ❌ Avoid When | 替代方案 |
|--------------|---------|
| 无成员关联的普通页面 | NavBar 默认 |
| 成员管理为次要功能 | NavBar 默认 + 页面内嵌入口 |
| 需要显示成员列表详情 | 进入成员管理页面 |

## Interaction Flow

```
┌────────────────────────────────────────────┐
│ Navbar-成员 (Default)                        │ ← 页面挂载
└────────┬───────────────────────────────────┘
         │
    ┌────┴───────────────────┐
    │ 点击左侧返回图标         │
    ▼
┌────────────────────────────────────────────┐
│ 触发 onBack() → 返回上一页                   │
└────────────────────────────────────────────┘
         │
    ┌────┴───────────────────┐
    │ 点击成员统计胶囊区域     │
    ▼
┌────────────────────────────────────────────┐
│ 进入成员详情/成员管理页面                    │
└────────────────────────────────────────────┘
```

## Design Tokens

| Token | 值 | 用途 |
|-------|---|------|
| `--color-navbar-members-bg` | `#F3F4F6` | 导航栏背景（业务定制，接近 Grey NO.2） |
| `--color-navbar-members-title` | `#333333` | 标题/数字文字（Black NO.6） |
| `--color-navbar-members-pill-bg` | `#FFFFFF` | 成员胶囊背景（Black NO.1） |
| `--color-navbar-members-pill-border` | `#E0E4F0` | 成员胶囊边框（接近 Grey NO.3） |
| `--navbar-members-height` | `56px` | 导航栏高度 |
| `--navbar-members-avatar-size` | `40px` | 头像尺寸 |
| `--navbar-members-avatar-overlap` | `20px` | 头像重叠距离 |

## AI Notes

**为什么使用头像堆叠而非列表？**
节省水平空间，3 个以内成员用堆叠视觉更紧凑；数字标注超出数量，直观高效。

**为什么头像胶囊使用 #E0E4F0 作为边框色？**
#E0E4F0 不在标准色阶中，建议迁移到标准边框色 Grey NO.3 (#D6D6D6)，保持设计系统一致性。

**为什么最多显示 3 个头像？**
PDA 屏幕宽度限制，3 个头像 + 重叠 20px = 实际宽度 80px，加上数字文本仍可容纳在导航栏内。

---

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

## 6. 图标调用规则

> **重要：导航栏内图标需调用 icon 包**

导航栏内所有图标必须从 `pda-design-cli/spec/icons/` 目录调用。

| 位置 | 推荐图标 | 填充态 | 描边态 | 说明 |
|------|---------|--------|--------|------|
| 左侧返回 | `arrow_left` | `icon_arrow_left.svg` | `icon_arrow_left_outline.svg` | 返回上一页 |
| 右侧更多 | `more` | `icon_more.svg` | `icon_more_outline.svg` | 更多选项/成员管理 |

**引用方式：**
```typescript
import { IconArrowLeft, IconMore } from 'pda-design-cli/spec/icons';
```

完整图标列表见 `spec/icons/index.json`。

## 7. 交互与状态

| v1.1.0 | 2026-04-22 | 新增 Purpose、Use When/Avoid When、Interaction Flow、AI Notes、Design Tokens 结构化 |
