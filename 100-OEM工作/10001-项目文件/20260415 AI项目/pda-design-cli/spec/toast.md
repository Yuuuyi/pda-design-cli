# 轻提示 (Toast)

> 页面顶部短暂反馈组件

- **组件名称**: Toast
- **类型**: 反馈组件 (Feedback)
- **版本**: 1.0.0
- **最后更新**: 2026-04-22
- **状态**: ✅ 已发布

---

## 1. 组件概述

### Purpose

Toast 是一种轻量级反馈组件，用于在页面顶部或中央短暂显示操作结果（成功、失败、警告）或状态（加载中）。它不打断用户流程，通常在数秒后自动消失。

### Use When

- 操作完成后的轻量反馈（保存成功、网络异常等）
- 需要提示用户但不需要用户确认
- 加载状态提示（加载中）

### Avoid When

- 需要用户必须处理的信息 → 使用 Dialog / Modal
- 长时间停留的重要提示 → 使用 NoticeBar
- 包含可点击操作按钮 → 使用 Popover

### Variants Overview

| 变体 | 尺寸 | 布局 | 用途 |
|------|------|------|------|
| 有图标 (Icon) | 176×176px（正方形） | 纵向居中（图标 + 文字） | 成功/失败/加载/提示 |
| 纯文本 (Text Only) | 高度 60px，宽度自适应 | 横向居中（文字） | 简短文案反馈 |

---

## 2. 组件结构

```
Toast (容器)
├── IconContainer (仅 Icon 模式)
│   └── Icon (SVG：success / error / loading / info)
└── Message (文案)
```

---

## 3. Props 合约

```typescript
interface ToastProps {
  type: 'success' | 'error' | 'loading' | 'info' | 'text';
  message: string;
  duration?: number; // 默认停留时长（ms）
  onClose?: () => void; // 消失时回调
}
```

| Prop | Type | Default | 说明 |
|------|------|---------|------|
| `type` | `'success' \| 'error' \| 'loading' \| 'info' \| 'text'` | 必填 | Toast 类型，决定图标和布局 |
| `message` | `string` | 必填 | 显示文案 |
| `duration` | `number` | `2000` (text) / `3000` (icon) | 自动消失时长（ms），`-1` 表示不自动消失 |
| `onClose` | `() => void` | `undefined` | 关闭时的回调函数 |

---

## 4. Visual Design

### 4.1 容器样式（通用）

| 属性 | 值 | Token 映射 |
|------|------|-----------|
| 背景色 | `#000000` | `color.black.7` (Black NO.7) |
| 透明度 | `0.75` | - |
| 圆角 | `12px` | `radius.md` |
| 定位 | `absolute` | 由父容器控制位置 |
| 字号 | `24px` | `fontSize.xl` |
| 字重 | `400` | `fontWeight.regular` |
| 行高 | `36px` | `lineHeight.xl` |
| 文字颜色 | `#FFFFFF` | `color.white` |

### 4.2 有图标模式 (Icon Mode)

| 属性 | 值 | Token 映射 |
|------|------|-----------|
| 宽度 | `176px` | - |
| 高度 | `176px` | - |
| 内边距 | `16px` | `spacing.md` |
| 图标容器 | `48×48px` | - |
| 图标与文字间距 | `16px` | `spacing.md` |
| 布局 | `flex-direction: column` | 纵向居中 |

#### 图标类型映射

| type | 图标名称 | 用途 |
|------|---------|------|
| `success` | `icon_success_outline.svg` | 操作成功 |
| `error` | `icon_close_remind_outline.svg` | 操作失败 |
| `loading` | `icon_loading.svg`（需旋转动画） | 加载中 |
| `info` | `icon_tips_outline.svg` | 提示/警告 |

### 4.3 纯文本模式 (Text Only Mode)

| 属性 | 值 | Token 映射 |
|------|------|-----------|
| 高度 | `60px` | - |
| 最小宽度 | `80px` | - |
| 最大宽度 | `400px` | - |
| 内边距 | `16px` | `spacing.md` |
| 布局 | `flex-direction: row` | 横向居中 |

---

## 5. 动画规范

### 5.1 动画时长

| 阶段 | 时长 | 缓动函数 |
|------|------|---------|
| 进入动画 | `200ms` | `ease-out` |
| 停留时长（Icon 模式） | `3000ms` | - |
| 停留时长（Text 模式） | `2000ms` | - |
| 退出动画 | `200ms` | `ease-in` |

### 5.2 动画细节

**进入动画（fade + scale）**：
```css
/* 从 scale(0.9) + opacity(0) → scale(1) + opacity(0.75) */
@keyframes toast-enter {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 0.75;
    transform: scale(1);
  }
}
```

**退出动画（fade out）**：
```css
/* 从 opacity(0.75) → opacity(0) */
@keyframes toast-exit {
  from {
    opacity: 0.75;
  }
  to {
    opacity: 0;
  }
}
```

**Loading 图标旋转**：
```css
/* 持续旋转，直到 Toast 关闭 */
@keyframes toast-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.toast__icon--loading {
  animation: toast-spin 1000ms linear infinite;
}
```

---

## 6. 交互流程

### 6.1 状态机

```
[隐藏] ──show()调用──>[进入动画 200ms]
                              │
                              ▼
                        [显示中]
                        │
                        ├──停留 2000/3000ms
                        │        │
                        │        ▼
                        │    [退出动画 200ms]
                        │        │
                        │        ▼
                        └──[隐藏] ←── onClose()
                        │
                        ├──用户点击遮罩（可选）
                        │
                        └──duration=-1（不自动消失）
                                └──需手动 hide() 关闭
```

### 6.2 交互约束

- Toast 出现后，不应拦截背景页面的滚动（`pointer-events: none` 下的遮罩）
- 同一页面同时最多显示 1 个 Toast；新 Toast 应取代旧 Toast
- 纯文本 Toast 建议最多不超过 20 个字符（超出建议用 Modal）

---

## 7. Design Tokens 引用表

### 颜色 Tokens

| Token | 用途 | 当前值 |
|-------|------|--------|
| `color.black.7` | Toast 背景 | `#000000` |
| `color.white` | 文字颜色 | `#FFFFFF` |

### 间距 Tokens

| Token | 用途 | 当前值 |
|-------|------|--------|
| `spacing.md` | 内边距、图文间距 | `16px` |

### 圆角 Tokens

| Token | 用途 | 当前值 |
|-------|------|--------|
| `radius.md` | 容器圆角 | `12px` |

### 动画 Tokens

| Token | 用途 | 当前值 |
|-------|------|--------|
| `motion.enter.duration` | 进入动画时长 | `200ms` |
| `motion.exit.duration` | 退出动画时长 | `200ms` |
| `motion.easing.enter` | 进入缓动 | `ease-out` |
| `motion.easing.exit` | 退出缓动 | `ease-in` |
| `motion.loading.duration` | Loading 旋转周期 | `1000ms` |

---

## 8. AI Notes

### 设计原理

1. **正方形有图标模式**：176×176px 的正方形设计，目的是让图标在视觉中心呈现，给用户明确的情感反馈（成功✅/失败❌/加载中🔄）。方形本身也与圆形图标形成几何对比，增强识别度。
2. **透明度 0.75**：使用透明黑色而非实色，既保证可读性，又不会在页面上显得"堵"，视觉上更轻盈。
3. **字号偏大（24px）**：Toast 通常在页面顶部出现，停留时间短，需要快速传递信息，较大的字号有助于在视线扫过的一瞬间被捕捉。

### 与其他组件的关系

- **与 NoticeBar 的对比**：NoticeBar 是嵌入式长提示（可包含多行文字和操作按钮）；Toast 是临时弹出，不打断用户，适合简短反馈。
- **与 Dialog 的对比**：Dialog 需要用户确认；Toast 自动消失，用户无需响应。
- **与 Popover 的对比**：Popover 可包含操作入口；Toast 仅用于信息反馈，不可交互。

---

## 9. 各平台源码路径

| 平台 | 源码路径 |
|------|----------|
| Web (Vue) | `packages/web/src/components/Toast/index.vue` |
| React | `packages/react/src/components/Toast/index.tsx` |
| iOS | `ios/Sources/Components/Toast.swift` |
| Android | `android/app/src/main/java/com/pda/components/Toast.kt` |

---

## 10. Changelog

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.0.0 | 2026-04-22 | 初始版本：有图标 + 纯文本两种变体，统一 opacity 0.75，圆角 12px，补充动画规范 |