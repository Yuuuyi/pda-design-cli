# 多选按钮 (SelectButton)

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
  <img class="icon" src="./asset/icons/svg_00462162.svg" />
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
  <img class="icon" src="./asset/icons/svg_00462162.svg" />
</div>
```

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
