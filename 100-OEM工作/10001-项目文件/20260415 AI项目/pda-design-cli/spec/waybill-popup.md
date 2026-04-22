# 运单弹出层 (WaybillPopup)

> 通用运单操作弹窗容器组件

- **组件名称**: WaybillPopup
- **类型**: 容器组件 (Container)
- **版本**: 1.0.0
- **最后更新**: 2026-04-22
- **状态**: ✅ 已发布

---

## 1. 组件概述

### Purpose

WaybillPopup 是一个通用的运单操作弹窗容器，支持三种头部样式和可选的底部操作栏。用于承载运单相关的表单、列表、详情等内容的弹窗场景。

### Use When

- 需要弹窗承载运单相关操作（查询、编辑、发货等）
- 需要在弹窗内进行二级标签切换
- 需要手动刷新列表数据的场景
- 需要底部操作按钮组的场景

### Avoid When

- 简单的提示信息展示 → 使用 Toast 或 NoticeBar
- 仅需确认操作的场景 → 使用 Dialog
- 全屏沉浸式浏览 → 使用新页面而非弹窗

---

## 2. 组件结构

```
WaybillPopup (容器)
├── PopupHeader (头部 - 根据 headerType 动态渲染)
│   ├── DefaultHeader (默认：标题 + 关闭)
│   ├── TabHeader (标签切换 + 关闭)
│   └── RefreshHeader (标签切换 + 刷新 + 箭头关闭)
├── PopupContent (内容区域 - Slot)
└── PopupFooter (底部操作栏 - 可选)
    └── ActionButtons (操作按钮组)
```

---

## 3. Props 合约

### WaybillPopup Props

| Prop | Type | Default | 说明 |
|------|------|---------|------|
| `headerType` | `'default' \| 'tab' \| 'refresh'` | `'default'` | 头部样式类型 |
| `showFooter` | `boolean` | `false` | 是否显示底部操作栏 |
| `title` | `string` | `''` | 标题文本 (用于 DefaultHeader) |
| `description` | `string` | `''` | 描述文本 (用于 TabHeader) |
| `tabs` | `TabItem[]` | `[]` | 标签配置数组 |
| `activeTab` | `string \| number` | `0` | 当前激活的标签 |
| `fixedFooter` | `boolean` | `true` | 底部是否固定 (悬浮按钮) |
| `closeOnOverlay` | `boolean` | `true` | 点击遮罩是否关闭 |
| `closeOnEscape` | `boolean` | `true` | 按 ESC 是否关闭 |

### TabItem 类型

```typescript
interface TabItem {
  key: string | number;
  label: string;
  badge?: number; // 可选徽章数
}
```

---

## 4. Visual Design

### 4.1 整体容器

| 属性 | 值 | Token 映射 |
|------|------|-----------|
| 背景色 | `#FFFFFF` | White |
| 顶部圆角 | `16px` | `radius.lg` |
| 阴影 | `0 4px 24px rgba(0,0,0,0.08)` | `shadow.popup` |
| 最小宽度 | `320px` | - |
| 最大宽度 | `90vw` | - |

### 4.2 默认头部 (DefaultHeader)

| 属性 | 值 | Token 映射 |
|------|------|-----------|
| 内边距 | `24px 16px 8px` | `spacing.lg` `spacing.md` `spacing.sm` |
| 标题字号 | `24px` | `fontSize.xl` |
| 标题字重 | `600` | `fontWeight.bold` |
| 标题行高 | `36px` | `lineHeight.xl` |
| 标题颜色 | `#333333` | `color.text.primary` (Black NO.6) |
| 关闭按钮位置 | `absolute, top: 24px, right: 16px` | - |

### 4.3 标签切换头部 (TabHeader)

| 属性 | 值 | Token 映射 |
|------|------|-----------|
| 内边距 | `24px 16px 0` | - |
| Tab 选中态文字颜色 | `#333333` | `color.text.primary` |
| Tab 选中态字重 | `600` | `fontWeight.bold` |
| Tab 指示条高度 | `4px` | - |
| Tab 指示条颜色 | `#6445D1` | `color.primary` (Primary NO.6) |
| Tab 默认态文字颜色 | `#666666` | `color.text.secondary` (Black NO.5) |
| Tab 默认态字重 | `400` | `fontWeight.regular` |
| Tab gap | `24px` | `spacing.xl` |
| 描述文字字号 | `16px` | `fontSize.md` |
| 描述文字行高 | `22px` | `lineHeight.md` |
| 描述文字颜色 | `#666666` | `color.text.secondary` |
| 描述文字位置 | Header 下方, padding-bottom: 8px | - |

### 4.4 刷新头部 (RefreshHeader)

| 属性 | 值 | Token 映射 |
|------|------|-----------|
| 刷新按钮边框 | `1px solid #6445D1` | `color.primary` |
| 刷新按钮圆角 | `16px` | `radius.lg` |
| 刷新按钮内边距 | `5px 12px` | - |
| 刷新按钮文字颜色 | `#6445D1` | `color.primary` |
| 刷新按钮字号 | `16px` | `fontSize.md` |
| 关闭按钮 | 使用箭头图标替代 X 图标 | - |

### 4.5 底部操作栏 (PopupFooter)

| 属性 | 值 | Token 映射 |
|------|------|-----------|
| 内边距 | `17px 16px` | - |
| 按钮组 gap | `16px` | `spacing.md` |
| 分割线 | `border-top: 1px solid #F3F4F6` | `color.divider` (Grey NO.2) |

### 4.6 按钮样式

#### 主按钮 (Primary)

| 属性 | 值 | Token 映射 |
|------|------|-----------|
| 背景色 | `#6445D1` | `color.primary` (Primary NO.6) |
| 文字颜色 | `#FFFFFF` | `color.text.inverse` |
| 圆角 | `8px` | `radius.md` |
| 最小高度 | `64px` | - |
| 内边距 | `17px 16px` | - |

#### 次按钮 (Secondary)

| 属性 | 值 | Token 映射 |
|------|------|-----------|
| 背景色 | `#F3F4F6` | `color.surface.secondary` (Grey NO.2) |
| 文字颜色 | `#52567B` | `color.text.tertiary` (自定义) |
| 圆角 | `8px` | `radius.md` |
| 最小高度 | `64px` | - |
| 内边距 | `17px 16px` | - |

---

## 5. 交互流程

### 5.1 状态机

```
[关闭] ──点击打开──>[打开]
     │            │
     │            │──点击遮罩/Esc/关闭按钮──>[关闭]
     │            │
     │            │──点击 Tab 切换──>[Tab切换中]
     │            │         │
     │            │         └───[Tab切换完成]
     │            │
     │            │──点击刷新──>[刷新中]
     │            │         │
     │            │         └───[刷新完成]
     │            │
     │            │──点击底部按钮──>[底部操作进行中]
     │                      │
     │                      └───[操作完成 → 关闭]
```

### 5.2 动画

| 动画 | 时长 | 缓动函数 |
|------|------|---------|
| 弹窗打开 | `300ms` | `ease-out` |
| 弹窗关闭 | `250ms` | `ease-in` |
| Tab 切换 | `200ms` | `ease` |
| 刷新旋转 | `1000ms` | `linear` (循环) |

---

## 6. Design Tokens 引用表

### 颜色 Tokens

| Token | 用途 | 当前值 |
|-------|------|--------|
| `color.primary` | 主色、按钮背景、Tab 指示条 | `#6445D1` (Primary NO.6) |
| `color.text.primary` | 标题、Tab 选中态 | `#333333` (Black NO.6) |
| `color.text.secondary` | Tab 默认态、描述文字 | `#666666` (Black NO.5) |
| `color.text.tertiary` | 次按钮文字 | `#52567B` (自定义) |
| `color.surface` | 容器背景 | `#FFFFFF` |
| `color.surface.secondary` | 次按钮背景 | `#F3F4F6` (Grey NO.2) |
| `color.divider` | 分割线 | `#F3F4F6` (Grey NO.2) |
| `color.text.inverse` | 主按钮文字 | `#FFFFFF` |

### 间距 Tokens

| Token | 用途 | 当前值 |
|-------|------|--------|
| `spacing.sm` | 头部底部内边距 | `8px` |
| `spacing.md` | 按钮组 gap | `16px` |
| `spacing.lg` | 头部顶部内边距 | `24px` |
| `spacing.xl` | Tab gap | `24px` |

### 圆角 Tokens

| Token | 用途 | 当前值 |
|-------|------|--------|
| `radius.lg` | 容器顶部、刷新按钮 | `16px` |
| `radius.md` | 按钮 | `8px` |

---

## 7. AI Notes

### 设计原理

1. **圆角差异**: 容器顶部圆角 16px 与按钮圆角 8px 形成视觉层次，强调弹窗的整体性和按钮的可点击性
2. **三种头部设计**: 
   - Default: 简洁场景
   - Tab: 需要内容分组的场景
   - Refresh: 需要手动刷新数据的场景
3. **底部固定按钮**: 弹窗内容区域可滚动时，底部操作按钮固定在底部，保证操作可见性
4. **不建议用 SVG 做分割线**: 推荐用 CSS `border-top` 减少 DOM 节点

### 与其他组件的关系

- **与 ModalContainer 的对比**: 
  - ModalContainer 是通用容器，不包含预设的 Header/Footer 结构
  - WaybillPopup 是面向运单业务的封装，自带 Header/Footer
- **与 Popover 的对比**:
  - Popover 是轻量级气泡提示
  - WaybillPopup 是重型模态弹窗，有遮罩层

---

## 8. 各平台源码路径

| 平台 | 源码路径 |
|------|----------|
| Web (Vue) | `packages/web/src/components/WaybillPopup/index.vue` |
| React | `packages/react/src/components/WaybillPopup/index.tsx` |
| iOS | `ios/Sources/Components/WaybillPopup.swift` |
| Android | `android/app/src/main/java/com/pda/components/WaybillPopup.kt` |

---

## 9. Changelog

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.0.0 | 2026-04-22 | 初始版本：三种头部样式 + 底部操作栏 |