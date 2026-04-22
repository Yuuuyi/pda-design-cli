# 消息通知栏 (NoticeBar)

> 页面顶部嵌入式消息提示组件

- **组件名称**: NoticeBar
- **类型**: 反馈组件 (Feedback)
- **版本**: 1.0.0
- **最后更新**: 2026-04-22
- **状态**: ✅ 已发布

---

## 1. 组件概述

### Purpose

NoticeBar 是一种嵌入式消息通知组件，用于在页面顶部持续展示重要的状态信息或操作提示。它固定在页面顶部，不自动消失，用户可主动关闭或进行后续操作。

### Use When

- 需要展示持续性提示（网络异常、操作结果、政策通知等）
- 需要在提示中嵌入可点击的操作入口（如「查看详情」）
- 需要让用户主动关闭的通知

### Avoid When

- 短暂反馈、数秒后自动消失 → 使用 Toast
- 需要用户必须确认的信息 → 使用 Dialog / Modal
- 需要多行文字和复杂布局 → 使用嵌入式 Banner 组件

### Variants Overview

| 类型 | 说明 |
|------|------|
| Info（蓝色提醒） | 信息提示，告知用户一般性提示 |
| Warning（黄色警示） | 警告提示，需要用户注意 |
| Error（红色警告） | 错误提示，表示操作失败或异常 |
| Default（灰色默认） | 普通通知，无特定情绪 |

---

## 2. 组件结构

```
NoticeBar (容器)
├── NoticeContent (左侧内容区)
│   ├── Icon (状态图标)
│   └── Text (文案)
└── NoticeAction (右侧操作区 - 可配置)
    ├── ActionButton (操作按钮 - 可选)
    └── CloseIcon (关闭图标 - 可选)
```

---

## 3. Props 合约

```typescript
interface NoticeBarProps {
  type?: 'info' | 'warning' | 'error' | 'default';
  message: string;
  // 右侧操作配置
  showClose?: boolean;    // 显示关闭按钮
  actionText?: string;    // 操作按钮文案（如"查看详情"）
  actionUrl?: string;     // 操作跳转链接（可不填，仅触发回调）
  onAction?: () => void; // 操作按钮点击回调
  onClose?: () => void;   // 关闭时回调
}
```

| Prop | Type | Default | 说明 |
|------|------|---------|------|
| `type` | `'info' \| 'warning' \| 'error' \| 'default'` | `'info'` | 通知类型，决定颜色主题 |
| `message` | `string` | 必填 | 通知文案 |
| `showClose` | `boolean` | `false` | 是否显示右侧关闭图标 |
| `actionText` | `string` | `''` | 操作按钮文案（非空时显示按钮） |
| `actionUrl` | `string` | `''` | 操作跳转链接 |
| `onAction` | `() => void` | `undefined` | 操作按钮点击回调 |
| `onClose` | `() => void` | `undefined` | 关闭时回调 |

---

## 4. Visual Design

### 4.1 容器样式（通用）

| 属性 | 值 | Token 映射 |
|------|------|-----------|
| 宽度 | `480px`（最大），超出后折行 | - |
| 最小宽度 | `320px` | - |
| 高度 | `46px` | - |
| 内边距 | `8px` | `spacing.sm` |
| 圆角 | `0px`（直角） | - |
| 定位 | `absolute` | 由父容器控制位置 |
| 布局 | `flex-direction: row` | 横向，items: center |
| 子元素间距 | `12px` | `spacing.sm + 4px` |

### 4.2 左侧内容区 (NoticeContent)

| 属性 | 值 | Token 映射 |
|------|------|-----------|
| 布局 | `flex-direction: row`，居中对齐 | - |
| 元素间距 | `8px` | `spacing.xs` |
| 内边距 | `4px` | - |

#### 图标 (Icon)

| 属性 | 值 | Token 映射 |
|------|------|-----------|
| 尺寸 | `20×20px` | - |
| 类型映射 | info/warning/default → `icon_tips_outline.svg` | - |
| | error → `icon_close_remind_outline.svg` | - |

#### 文案 (Text)

| 属性 | 值 | Token 映射 |
|------|------|-----------|
| 字体 | `PingFang SC` | `font.family.primary` |
| 字号 | `16px` | `fontSize.md` |
| 字重 | `400` | `fontWeight.regular` |
| 行高 | `22px` | `lineHeight.md` |
| 行为 | 单行显示，超出部分 `text-overflow: ellipsis; white-space: nowrap` | - |

### 4.3 右侧操作区 (NoticeAction)

| 属性 | 值 | Token 映射 |
|------|------|-----------|
| 布局 | `flex-direction: row`，居中对齐 | - |
| 元素间距 | `4px` | - |
| 最小宽度 | `40px` | - |
| 最大宽度 | `120px` | - |
| 高度 | `30px`（最小）/ `40px`（最大） | - |
| 内边距 | `4px` | - |
| 圆角 | `4px` | `radius.xs` |

#### 操作按钮（可选）

| 属性 | 值 | Token 映射 |
|------|------|-----------|
| 字号 | `16px` | `fontSize.md` |
| 对齐 | 右对齐 | - |
| 文字颜色 | 与左侧文字颜色一致 | - |

#### 关闭图标（可选）

| 属性 | 值 | Token 映射 |
|------|------|-----------|
| 尺寸 | `20×20px` | - |
| 图标 | `icon_close_outline.svg` | - |
| 颜色 | 与文字颜色一致 | - |

### 4.4 四种状态颜色对照

| 类型 | 背景色 | Token | 文字颜色 | Token | 图标 |
|------|--------|-------|---------|-------|------|
| **Info（蓝色）** | `#D9EFFF` | Blue NO.2 | `#1F55CF` | Blue NO.6 | `icon_tips_outline.svg` |
| **Warning（黄色）** | `#FFF3CC` | Yellow NO.2 | `#D07A01` | Yellow NO.6 | `icon_tips_outline.svg` |
| **Error（红色）** | `#FFD9D6` | Red NO.2 | `#CF3337` | Red NO.6 | `icon_close_remind_outline.svg` |
| **Default（灰色）** | `#F3F4F6` | Grey NO.2 | `#52567B` | Grey NO.4 | `icon_tips_outline.svg` |

---

## 5. 动画规范

### 5.1 动画时长

| 阶段 | 时长 | 缓动函数 |
|------|------|---------|
| 进入动画 | `200ms` | `ease-out`（从上方滑入） |
| 退出动画 | `200ms` | `ease-in`（向下滑出） |

### 5.2 动画细节

**进入动画（从上方滑入）**：
```css
@keyframes noticebar-enter {
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**退出动画（向下滑出）**：
```css
@keyframes noticebar-exit {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-100%);
  }
}
```

---

## 6. 交互流程

### 6.1 状态机

```
[隐藏] ──show()──>[进入动画 200ms]──>[显示中]
                                         │
                         ├──点击关闭图标──>[退出动画 200ms]──>[隐藏] → onClose()
                         │
                         ├──点击操作按钮──> onAction() / 跳转 actionUrl
                         │
                         └──duration=-1（不自动消失）
```

### 6.2 交互约束

- 同一页面可同时显示多个 NoticeBar（建议最多 3 条，超出建议合并为一条）
- NoticeBar 应始终固定在页面顶部，不随页面滚动消失
- 操作按钮文字过长时，超出部分截断（`text-overflow: ellipsis`）

---

## 7. Design Tokens 引用表

### 颜色 Tokens

| Token | 类型 | 当前值 | 用途 |
|-------|------|--------|------|
| `color.notice.info.bg` | Blue NO.2 | `#D9EFFF` | Info 背景 |
| `color.notice.info.text` | Blue NO.6 | `#1F55CF` | Info 文字/图标 |
| `color.notice.warning.bg` | Yellow NO.2 | `#FFF3CC` | Warning 背景 |
| `color.notice.warning.text` | Yellow NO.6 | `#D07A01` | Warning 文字/图标 |
| `color.notice.error.bg` | Red NO.2 | `#FFD9D6` | Error 背景 |
| `color.notice.error.text` | Red NO.6 | `#CF3337` | Error 文字/图标 |
| `color.notice.default.bg` | Grey NO.2 | `#F3F4F6` | Default 背景 |
| `color.notice.default.text` | Grey NO.4 | `#52567B` | Default 文字/图标 |

### 间距 Tokens

| Token | 用途 | 当前值 |
|-------|------|--------|
| `spacing.xs` | 子元素间距 | `8px` |
| `spacing.sm` | 容器内边距 | `8px` |

### 圆角 Tokens

| Token | 用途 | 当前值 |
|-------|------|--------|
| `radius.xs` | 操作按钮圆角 | `4px` |

---

## 8. AI Notes

### 设计原理

1. **直角设计**：NoticeBar 使用直角（无圆角），使其在视觉上更「嵌入式」，与页面内容融合，而非像 Toast 那样「悬浮」。
2. **固定位置**：不自动消失，适合需要用户持续关注的信息（如网络异常、政策通知）。
3. **可配置操作**：右侧支持关闭和跳转两种操作，给予用户主动权，避免「看到了却无法操作」的困境。
4. **四种状态语义**：Info（蓝）= 告知、Warning（黄）= 提醒、Error（红）= 错误、Default（灰）= 通用，颜色语义遵循用户直觉。

### 与其他组件的关系

- **与 Toast 的对比**：Toast 是临时弹出、自动消失；NoticeBar 是固定显示、需手动关闭。
- **与 Dialog 的对比**：Dialog 打断用户操作；NoticeBar 不打断，用户可继续当前操作。
- **与 WaybillPopup 的对比**：Popup 是弹窗容器；NoticeBar 是内嵌提示条。

---

## 9. 各平台源码路径

| 平台 | 源码路径 |
|------|----------|
| Web (Vue) | `packages/web/src/components/NoticeBar/index.vue` |
| React | `packages/react/src/components/NoticeBar/index.tsx` |
| iOS | `ios/Sources/Components/NoticeBar.swift` |
| Android | `android/app/src/main/java/com/pda/components/NoticeBar.kt` |

---

## 10. Changelog

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.0.0 | 2026-04-22 | 初始版本：四种状态样式、右侧操作可配置、补充动画规范、颜色映射到设计系统 Token |