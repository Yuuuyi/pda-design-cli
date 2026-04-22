# 气泡卡片 (Popover)

> **v1.1.0** | 最后更新：2026-04-22
> 新增：Purpose、Interaction Flow（结构化）、AI Notes、Code Mapping、Variants Overview；规范化 Design Tokens 和 Props Contract

---

## Purpose

PDA Popover 是**轻量级弹层组件**，用于展示补充说明、备注信息或操作选项。**用户主动触发**，内容简短紧凑，出现在触发元素附近。

核心特征：
- 轻量：比 Modal 小，只占用触发元素附近区域
- 主动触发：用户有意查看，而非系统强制推送
- 临时展示：点击外部即关闭

---

## Use When / Avoid When

### ✅ Use When — 选这个组件的场景

| 场景 | 说明 |
|------|------|
| 表格列头 "?" 说明 | 补充字段含义，用户 hover/tap 查看 |
| 操作按钮帮助提示 | "长按可快速复制" 等操作指引 |
| 列表项 "更多" 选项 | 3-5 个操作项，不需要 ActionSheet |
| 文本溢出展开 | 单行文本过长，点击展开完整内容 |
| 备注/补充说明 | 订单备注、用户备注等次要信息 |

### ❌ Avoid When — 不要用这个组件的场景

| 场景 | 替代方案 |
|------|---------|
| 需要强制用户确认才能继续 | Modal |
| 只是展示通知/公告 | NoticeBar |
| 需要多选项列表（超过 5 项） | ActionSheet / Dropdown |
| 需要在页面顶部展示系统消息 | NoticeBar |
| 需要承载表单或复杂内容 | Modal |
| 在页面底部展示操作选项 | ActionSheet |

**Popover vs Modal vs NoticeBar 决策：**

```
是否需要用户主动触发查看信息？
├─ 是，补充说明/备注 → Popover（轻量，用户自主控制）
├─ 是，底部操作选项（≤5项）→ Popover
│
├─ 否，需要强制展示阻断用户 → Modal
├─ 否，顶部系统通知 → NoticeBar
└─ 否，需要多选项列表 → ActionSheet
```

---

## Interaction Flow

> Popover 是**触发控制型**组件：触发元素决定显示/隐藏，Popover 本身只管理自身动画。

```
触发器（按钮/文字）
    │
    ├──[触发器 disabled]──→ Popover 不显示（直接返回）
    │
    └──[触发器点击]──┬──[当前隐藏]──→ Visible（淡入+缩放 0.95→1）
                     └──[当前显示]──→ Hidden（淡出+缩放 1→0.95）
                                        │
                                        └─[点击外部]──→ Hidden（关闭）
```

**状态矩阵：**

| 状态 | opacity | transform | 触发条件 |
|------|---------|-----------|---------|
| **Hidden** | 0 | scale(0.95) | 默认 / 点击外部 |
| **Visible** | 1 | scale(1) | 触发器点击（toggle） |

**动画参数：**
- 显示：`opacity 0→1` + `scale(0.95→1)`，`500ms ease-out`
- 隐藏：`opacity 1→0` + `scale(1→0.95)`，`500ms ease-out`
- Disabled：Popover 不渲染，不存在 disabled 态

---

## Design Tokens

### 核心参数

| Token | 值 |
|-------|-----|
| 内边距 | 12px（垂直）16px（水平） |
| 圆角 | 8px |
| 最大宽度 | 280px |
| 最小宽度 | 120px |
| 箭头宽度 | 16px |
| 箭头高度 | 8px |
| z-index | 1100 |

### 颜色 Token 矩阵

| 元素 | 值 | Token |
|------|------|-------|
| 气泡背景 | `#000000` | Black NO.7 |
| 气泡文字 | `#FFFFFF` | Black NO.1 |
| 箭头颜色 | `#000000` | Black NO.7（与背景同色） |

> **为什么 Popover 用纯黑背景而非白色？** Popover 用于在任意位置叠加显示，纯黑背景确保在任何底色（白色卡片、灰色区域）上都有清晰的轮廓边界，且与系统 Tooltip 风格一致。

### 排版 Token

| 属性 | 值 | Token |
|------|-----|-------|
| 字体 | PingFang SC | - |
| 字号 | 16px | Popover 专用字号（非 Button 22px） |
| 字重 | 400 (Regular) | - |
| 行高 | 24px | - |
| 图标间距 | 8px | Gap: 8px |

---

## Props Contract

| Prop | 类型 | 必填 | 说明 |
|------|------|------|------|
| `content` | `ReactNode` | 是 | 气泡内容 |
| `placement` | `'top' \| 'bottom'` | 否（默认 bottom） | 箭头方向 |
| `trigger` | `'click'` | 否（默认 click） | 触发方式（移动端仅 click） |
| `maxWidth` | `number` | 否（默认 280） | 最大宽度 px |
| `minWidth` | `number` | 否（默认 120） | 最小宽度 px |
| `icon` | `ReactNode` | 否 | 左侧图标 |
| `disabled` | `boolean` | 否 | 禁用（不显示 Popover） |
| `className` | `string` | 否 | 自定义类名 |

---

## Code Mapping

| 平台 | 路径 | 状态 |
|------|------|------|
| React | `src/components/Popover/index.tsx` | 待补充 |
| Vue | - | 待实现 |
| iOS (SwiftUI) | - | 待实现 |
| Android (XML) | - | 待实现 |
| Storybook | - | 待补充 |

---

## AI Notes

**为什么箭头用 CSS border 绘制而不是图标？**
CSS border 箭头是纯 CSS 实现，零图标依赖，保持轻量化。箭头只需要上下两个方向，用 `border-left/right: 8px solid transparent` + `border-bottom/top` 控制方向即可，无需加载 SVG 文件。

**为什么 z-index 是 1100 而非 1000？**
Modal 标准 z-index 是 1000，Popover 需要比 Modal 层级更高（因为 Popover 可能在 Modal 内部触发）。1100 留出 100 的缓冲空间，避免与 Modal 层级冲突。

**为什么动画用 scale 而不只是 opacity？**
Popover 的 scale 变化（0.95→1）制造"弹出"的物理感，比单纯 opacity 更明显。如果只用 opacity，用户可能感受不到内容的切换。scale(0.95) 也让出现时有一个轻微"收紧"再"弹出"的效果。

**为什么 content 接受 ReactNode 而不只是 string？**
Popover 内容可能包含图标、链接、格式化文本，不能限制为纯文本。传入 ReactNode 是最灵活的设计，但规范中应注明：内容应保持简短（≤ 3 行），避免放置复杂交互元件。

**为什么 popover 的字号是 16px 而不是 Button 的 22px？**
Popover 是辅助提示文字，不是操作按钮。16px 在紧凑空间内可显示更多内容，同时与正文文字（16px）保持一致。22px 字号用于操作按钮，在 Popover 提示场景显得过大。

---

## Variants Overview

| 变体 | 箭头 | 图标 | 典型内容 | 典型场景 |
|------|------|------|---------|---------|
| 基础气泡 | - | - | 纯文本提示 | 说明文字 |
| 带箭头气泡 | ✓ | - | 指向性提示 | 表单提示 |
| 带图标气泡 | ✓ | ✓ | 状态性提示（警告/成功） | 操作指引 |
| 无箭头卡片 | - | ✓ | 悬浮信息卡 | 备注信息 |

---

## 核心参数

| 属性 | 值 | Token |
|------|-----|-------|
| 内边距 | 12px 16px | Gap: 12px V / 16px H |
| 圆角 | 8px | Radius: 8px |
| 最大宽度 | 280px | - |
| 最小宽度 | 120px | - |
| 字号 | 16px | Typography: Regular |
| 行高 | 24px | - |
| z-index | 1100 | - |

---

## 详细规格

### 一、箭头设计

**方向规则：**
- `placement="bottom"`：箭头向下（指向触发元素），气泡在触发元素上方
- `placement="top"`：箭头向上，气泡在触发元素下方

**CSS border 绘制：**

```css
/* 箭头向下（在气泡顶部） */
.popover-arrow-down::before {
  content: '';
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid #000000;
}

/* 箭头向上（在气泡底部） */
.popover-arrow-up::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid #000000;
}
```

### 二、变体对照

| 变体 | 箭头 | 图标 | 用途 |
|------|------|------|------|
| 基础气泡 | - | - | 纯文本提示 |
| 带箭头气泡 | ✓ | - | 指向性提示 |
| 带图标气泡 | ✓ | ✓ | 状态性提示（警告/成功） |
| 无箭头气泡 | - | ✓ | 悬浮卡片 |

---

## 无障碍规范

1. 触发元素添加 `aria-describedby` 关联 Popover
2. Popover 使用 `role="tooltip"` 语义
3. 装饰性图标添加 `aria-hidden="true"`
4. 黑底白字对比度 > 4.5:1 ✅
5. 支持键盘关闭（Escape 键）
6. 尊重 `prefers-reduced-motion` 偏好

---

## 代码示例

```css
/* Popover 容器 */
.popover {
  position: absolute;
  display: inline-flex;
  flex-direction: column;
  max-width: 280px;
  min-width: 120px;
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 500ms ease-out, transform 500ms ease-out;
  z-index: 1100;
}

.popover.visible {
  opacity: 1;
  transform: scale(1);
}

/* 内容区 */
.popover-content {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px 16px;
  background: #000000; /* Black NO.7 */
  border-radius: 8px;
}

/* 文本 */
.popover-text {
  font-family: 'PingFang SC', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #FFFFFF; /* Black NO.1 */
  word-wrap: break-word;
}

/* 无障碍动效偏好 */
@media (prefers-reduced-motion: reduce) {
  .popover { transition: none; }
}
```

```html
<button aria-describedby="popover-1">提示</button>
<div id="popover-1" class="popover" role="tooltip" aria-hidden="true">
  <div class="popover-content">
    <span class="popover-icon" aria-hidden="true">
      <!-- SVG icon -->
    </span>
    <span class="popover-text">这是一条提示信息</span>
  </div>
</div>
```

---

## 关联组件

| 组件 | 关系 |
|------|------|
| Tooltip | Popover 的简化版（无图标） |
| ActionSheet | Popover 的"多选项"版本（内容更复杂） |
| Modal | Popover 的"强制阻断"版本 |
| NoticeBar | Popover 的"系统主动推送"版本 |

---

## Changelog

| 版本 | 日期 | 变更 |
|------|------|------|
| v1.1.0 | 2026-04-22 | 新增 Purpose、Interaction Flow（结构化）、AI Notes、Code Mapping、Variants Overview；规范化 Design Tokens 和 Props Contract |
| v1.0.0 | 2026-04-16 | 初始版本 |
