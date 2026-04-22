# SelectButton (多选按钮)

> **v1.1.0** | 最后更新：2026-04-22
> 新增：Purpose、Use When/Avoid When、Interaction Flow、AI Notes、Code Mapping

---

## Purpose

SelectButton 是 PDA 设计系统中的多选交互组件，用于在表单或筛选区域中展示可多选的选项。支持自适应内容宽度，兼顾弹性布局与固定宽度场景。通过 Default / Selected / Disabled / Selected-Disabled 四种状态覆盖完整的多选交互生命周期，满足仓储、物流等 PDA 业务中批量标签筛选和多选表单的需求。

## Use When / Avoid When

| 使用场景 | 推荐使用 SelectButton | 避免使用 |
|---------|:-:|:-:|
| 多选筛选标签 | ✅ | |
| 表单多选选项 | ✅ | |
| 单选场景 | | ❌ → 使用 Radio / 单选按钮 |
| 仅展示只读标签 | | ❌ → 使用 Tag |

## Interaction Flow

```
         ┌──────────┐
         │  Default  │ ← 组件挂载，未选中
         └────┬─────┘
              │ 用户点击
              ▼
         ┌──────────┐
         │ Selected  │ ──用户再次点击──→ Default (取消选中)
         └────┬─────┘
              │
    ┌─────────┴─────────┐
    │ disabled=true      │ disabled=true
    ▼                    ▼
┌──────────┐     ┌──────────────────┐
│ Disabled  │     │ Selected-Disabled │
└──────────┘     └──────────────────┘
    │                    │
    │ disabled=false     │ disabled=false
    ▼                    ▼
┌──────────┐     ┌──────────┐
│ Default  │     │ Selected  │
└──────────┘     └──────────┘
```

- **Default → Selected**：用户点击未选中的按钮，进入选中态
- **Selected → Default**：用户再次点击已选中的按钮，取消选中
- **Default + disabled → Disabled**：未选中时禁用，外观弱化
- **Selected + disabled → Selected-Disabled**：选中时禁用，保留选中视觉但阻断交互
- **Disabled / Selected-Disabled + 取消禁用**：恢复至 Default / Selected 状态

## Design Tokens

### 颜色

| 状态 | UI 元素 | Token | 色值 |
|------|---------|-------|------|
| Default | 背景 | Color-Functional-Black NO.1 | #FFFFFF |
| Default | 边框 | — | 1px solid #E0E4F0 |
| Default | 文本 | Color-Functional-Black NO.6 | #333333 |
| Disabled | 背景 | Color-Functional-Black NO.1 | #FFFFFF |
| Disabled | 边框 | — | 1px solid #E0E4F0 |
| Disabled | 文本 | — | #BBBBBB |
| Selected | 背景 | Color-Primary NO.1 | #F1E7FF |
| Selected | 边框 | Color-Primary NO.6 | 2px solid #6445D1 |
| Selected | 文本 | Color-Primary NO.6 | #6445D1 |
| Selected-Disabled | 背景 | Color-Primary NO.1 | #F1E7FF |
| Selected-Disabled | 边框 | — | 2px solid #B9A0ED |
| Selected-Disabled | 文本 | — | #B9A0ED |

### 排版

| 元素 | 字重 | 字号 | 行高 |
|------|------|------|------|
| 文本 (Default / Disabled) | 常规 | 20px | 28px |
| 文本 (Selected / Selected-Disabled) | 600 | 20px | 28px |

### 布局

| 属性 | 数值 |
|------|------|
| 最小宽度 | 92px |
| 高度 | 52px |
| 内边距 | 上下 12px / 左右 16px |
| 圆角 | 4px |

## Props Contract

```typescript
interface SelectButtonProps {
  /** 按钮文本 */
  label: string;
  /** 是否选中 */
  selected?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 右上角选中图标（选中态显示） */
  icon?: React.ReactNode;
  /** 固定宽度（可选，默认自适应） */
  width?: number | string;
  /** 点击回调 */
  onClick?: () => void;
}
```

## Code Mapping

| 平台 | 路径 |
|------|------|
| Spec | `pda-design-cli/spec/select-button.md` |
| Icons | `pda-design-cli/spec/icons/icon_check_outline.svg` |

> ⚠️ 组件实现代码路径待补充。

## AI Notes

- **为什么支持自适应宽度？** 多选按钮常用于筛选标签场景，文本长度不一（如"加急"、"冷链运输"、"当日达"），固定宽度会导致短文本留白过多、长文本被截断。自适应宽度确保每个按钮视觉大小与其内容匹配。
- **为什么选中态使用 Primary 色系？** 选中是用户主动操作的结果，使用品牌主色（Primary NO.1 / NO.6）能在视觉上形成明确的"已选中"信号，与未选中的白色形成强对比。
- **为什么选中态边框从 1px 加粗到 2px？** 边框加粗配合主色变化，双重视觉强化选中状态，确保在快速浏览时也能一眼识别选中项。
- **为什么需要 Selected-Disabled 态？** 业务中存在"已选中但不可更改"的场景（如已完成订单的标签），此状态保留选中视觉但阻断交互，避免用户产生"可以取消选中"的误解。

## Variants Overview

| 变体 | 背景色 | 边框 | 文本色 | 字重 | 图标 | 交互 |
|------|--------|------|--------|------|------|------|
| Default | #FFFFFF | 1px #E0E4F0 | #333333 | 常规 | 无 | 可点击 |
| Disabled | #FFFFFF | 1px #E0E4F0 | #BBBBBB | 常规 | 无 | 不可交互 |
| Selected | #F1E7FF | 2px #6445D1 | #6445D1 | 600 | ✅ | 可取消 |
| Selected-Disabled | #F1E7FF | 2px #B9A0ED | #B9A0ED | 600 | ✅ | 不可交互 |

---

## 组件描述

多选按钮用于在表单或筛选区域中展示可多选的选项，支持不同交互状态。

组件支持**自适应内容宽度**，默认具备最小宽度，可在自适应布局与固定宽度之间切换。

## 组件结构

```
┌──────────────────────────────┐
│ 文本                         │
└──────────────────────────────┘
```

- **容器：** 圆角矩形
- **内容：** 单行文本（居中）
- **可选：** 右上角状态图标（选中态）

## 基础属性

| 属性 | 说明 |
|------|------|
| 最小宽度 | `92px`（默认） |
| 高度 | `52px` |
| 内边距 | 上下 `12px` / 左右 `16px` |
| 圆角 | `4px` |
| 字体 | `PingFang SC` |
| 字号 | `20px` |
| 行高 | `28px` |

✅ 当内容长度超过最小宽度时，组件宽度自动撑开
✅ 在自适应布局中可随父容器伸缩
✅ 在固定场景中可指定 width

## 状态说明

### 默认状态（Default）

使用场景：未选中、可交互

| 属性 | 值 |
|------|-----|
| 背景色 | #FFFFFF |
| 边框 | 1px solid #E0E4F0 |
| 文本颜色 | #333333 |
| 字体粗细 | 常规 |
| 图标 | 无 |

```html
<div class="ms-btn ms-btn--default">请输入</div>
```

### 禁用状态（Disabled）

使用场景：不可交互

| 属性 | 值 |
|------|-----|
| 背景色 | #FFFFFF |
| 边框 | 1px solid #E0E4F0 |
| 文本颜色 | #BBBBBB |
| 字体粗细 | 常规 |
| 图标 | 无 |
| 交互 | pointer-events: none |

```html
<div class="ms-btn ms-btn--disabled">请输入</div>
```

### 选中状态（Selected）

使用场景：已选中、可取消

| 属性 | 值 |
|------|-----|
| 背景色 | #F1E7FF |
| 边框 | 2px solid #6445D1 |
| 文本颜色 | #6445D1 |
| 字体粗细 | 600 |
| 图标 | ✅ 右上角状态图标 |
| 图标位置 | right: 0 / top: 0 |

```html
<div class="ms-btn ms-btn--selected">
  请输入
  <img class="icon" src="icon_check_outline.svg" />
</div>
```

### 选中禁用状态（Selected Disabled）

使用场景：已选中但不可更改

| 属性 | 值 |
|------|-----|
| 背景色 | #F1E7FF |
| 边框 | 2px solid #B9A0ED |
| 文本颜色 | #B9A0ED |
| 字体粗细 | 600 |
| 图标 | ✅ 右上角状态图标 |
| 交互 | pointer-events: none |

```html
<div class="ms-btn ms-btn--selected-disabled">
  请输入
  <img class="icon" src="icon_check_outline.svg" />
</div>
```

## 图标调用规则

> **重要：多选按钮内图标需调用 icon 包**

选中态的右上角状态图标必须从 `pda-design-cli/spec/icons/` 目录调用。

| 用途 | 推荐图标 | 文件名 | 说明 |
|------|---------|--------|------|
| 选中态勾选 | `check` | `icon_check_outline.svg` | 右上角状态标记 |

~~`<img class="icon" src="./asset/icons/svg_00462162.svg" />`~~ → 请改用 icon 包引用

**引用方式：**
```typescript
import { IconCheckOutline } from 'pda-design-cli/spec/icons';

<SelectButton selected icon={<IconCheckOutline />} />
```

完整图标列表见 `spec/icons/index.json`。

## 布局方式

### ✅ 自适应布局（推荐）

```css
.ms-btn {
  min-width: 92px;
  width: auto;
}
```

- 根据文本内容自动撑开
- 适合筛选栏、动态标签

### ✅ 固定宽度布局

```css
.ms-btn {
  width: 92px;
}
```

- 适合表格操作列、统一对齐场景

---

## Changelog

### 2026-04-22

- 升级至 v1.1.0 规范格式
- 新增：Purpose、Use When/Avoid When、Interaction Flow、Design Tokens 概览、Props Contract、Code Mapping、AI Notes、Variants Overview
- 原有全部内容完整保留
