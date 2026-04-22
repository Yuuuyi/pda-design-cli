# 运单号展示组件 (WaybillDisplay)

> **v1.1.0** | 最后更新：2026-04-22
> 新增：Purpose、Use When/Avoid When、Interaction Flow、AI Notes、Code Mapping

---

## Purpose

运单号展示组件（WaybillDisplay）是系统中统一展示单条运单信息的全局基础组件，解决"运单号如何规范呈现"的问题。

**解决的问题：**

- 统一运单号、前缀、收件人性别标签、查件按钮等多元素在同一行内的排版规范
- 为业务标签（易损高赔、必装票等）提供扩展插槽，避免重复造轮子
- 支持左侧操作区（多选框/复制按钮）和右侧业务标签区的灵活组合

**为什么需要这个组件：**

- 运单列表是 PDA 核心业务场景，展示格式不统一会导致界面杂乱
- 不同业务线（揽件/派件/签收）对运单行的操作按钮和标签需求不同，需要插槽扩展
- 运单号前缀（如 `KY4000327`）和主体（如 `225662`）在视觉上有层级区分，提升可读性

## Use When / Avoid When

| 场景 | 推荐使用 WaybillDisplay | 推荐替代方案 |
|------|:---:|---|
| 在列表或详情页中展示单条运单（运单号 + 姓名 + 性别标签） | ✅ | |
| 需要在运单行中集成查件按钮或自定义操作 | ✅ | |
| 展示包含业务标签（易损高赔/必装票等）的运单行 | ✅ | |
| 需要在运单行左侧放置多选框或复制按钮 | ✅ | |
| 单纯展示状态标签（"已签收"/"待取件"） | ❌ | 使用 Tag |
| 需要展示多条运单组成的详情卡片 | ❌ | 使用 Card 包装多个 WaybillDisplay |
| 仅为省略超长文本 | ❌ | 使用 Text + overflow |
| 展示图标+标题+副标题+箭头构成的通用列表行 | ❌ | 使用 ListItem |

**决策树：**

```
展示内容是什么？
├─ 单一运单号行（含姓名/性别/运单号）→ WaybillDisplay ✅
├─ 状态标签（"已签收"/"待取件"）→ Tag ❌
├─ 通用列表行（图标+标题+副标题+箭头）→ ListItem ❌
└─ 运单详情信息卡 → Card + WaybillDisplay ❌
```

## Interaction Flow

```
[页面加载 / 组件挂载]
        │
        ▼
  ┌───────────────────────────┐
  │     INIT / RENDERED       │ ← 组件渲染：前缀 → 运单号 → 查件按钮 → 后缀
  └──────────────┬────────────┘
                │
    [运单号前缀 + 主体] ── 静态展示，无交互
                │
    [性别标签] ── 静态展示，无交互
                │
    [查件按钮] ─ 可交互
                │
        ┌───────┴───────┐
        │               │
   [点击查件按钮]   [hover 查件按钮]
        │               │
        ▼               ▼
  ┌─────────────┐  ┌─────────────┐
  │ 发出 click-  │  │ 视觉反馈     │
  │ search 事件  │  │ (下划线/色变)│
  └──────┬──────┘  └─────────────┘
         │
    回调上层 handler
    (跳转查件页面/API调用)
         │
         ▼
    ◄─── 等待下次交互 ───►

--- Prefix / Suffix 插槽 ---

  ┌───────────────────────────┐
  │ [Prefix] [前缀] [主体]    [Suffix]
  └───────────────────────────┘
       │                 │
  插入 Checkbox         插入 Tag 列表
  插入 Copy 按钮         插入业务标签
```

## Design Tokens

### 容器（Container）

| Token | 值 | 说明 |
|-------|-----|------|
| `--waybill-height` | `32px` | 容器高度，对齐 Tag Small |
| `--waybill-max-width` | `448px` | 最大宽度，与按钮系统一致 |
| `--waybill-gap-root` | `8px` | 根容器内间距 |
| `--waybill-gap-children` | `4px` | 子元素间距 |
| `--waybill-align-main` | `flex-start` | 主轴左对齐 |
| `--waybill-align-cross` | `center` | 交叉轴垂直居中 |

### 性别标签（Gender Tag）

| Token | 值 | 说明 |
|-------|-----|------|
| `--waybill-tag-padding` | `2px 8px` | 对齐 Tag Small 尺寸 |
| `--waybill-tag-radius` | `4px` | 对齐 Tag Small 尺寸 |
| `--waybill-tag-bg` | `Yellow-NO.6` `#FFD933` | 默认黄色背景 |
| `--waybill-tag-color` | `White` `#FFFFFF` | 白色文字 |

### 查件按钮（Search Button）

| Token | 值 | 说明 |
|-------|-----|------|
| `--waybill-btn-min-width` | `40px` | 最小宽度 |
| `--waybill-btn-max-width` | `120px` | 最大宽度 |
| `--waybill-btn-padding` | `4px 8px` | 内边距 |
| `--waybill-btn-radius` | `4px` | 圆角 |
| `--waybill-btn-border` | `none` | 纯文字按钮无边框 |
| `--waybill-btn-color` | `Primary-NO.6` `#6445D1` | 主色调 |
| `--waybill-btn-font-size` | `18px` | 字号 |
| `--waybill-btn-font-weight` | `600` | Bold |
| `--waybill-btn-line-height` | `25px` | 行高 |

### 文字排版

| Token | 值 | 说明 |
|-------|-----|------|
| `--waybill-prefix-size` | `18px` | 前缀字号 |
| `--waybill-prefix-weight` | `400` | Regular |
| `--waybill-prefix-color` | `Grey-NO.4` `#BDBDBD` | 前缀色 |
| `--waybill-body-size` | `18px` | 主体字号 |
| `--waybill-body-weight` | `600` | Bold |
| `--waybill-body-color` | `Black-NO.6` `#333333` | 主体色 |
| `--waybill-line-height` | `25px` | 行高 |

## Props Contract

```typescript
interface WaybillDisplayProps {
  /** 运单号主体（如 `225662`） */
  waybillNo: string;
  /** 运单号前缀（如 `KY4000327`） */
  prefixCode?: string;
  /** 性别/类型标签配置 */
  genderTag?: {
    /** 标签文本（如 `母`） */
    text: string;
    /** 背景色，默认为 Yellow-NO.6 `#FFD933` */
    bgColor?: string;
  };
  /** 是否显示查件按钮，默认 true */
  showSearchBtn?: boolean;
  /** 查件按钮文案，默认 `查件` */
  searchBtnText?: string;
  /** 点击查件按钮回调 */
  onClickSearch?: (waybillNo: string) => void;
  /** 左侧插槽（多选框、复制按钮等） */
  prefix?: React.ReactNode;
  /** 右侧插槽（位于查件按钮之后，业务标签等） */
  suffix?: React.ReactNode;
}
```

## Code Mapping

| 平台 | 源码路径 |
|------|---------|
| **React** | `packages/react/src/components/WaybillDisplay/index.tsx` |
| **React Native** | `packages/react-native/src/components/WaybillDisplay/index.tsx` |
| **Vue 3** | `packages/vue3/src/components/WaybillDisplay/src/WaybillDisplay.vue` |
| **Flutter** | `packages/flutter/lib/src/components/waybill_display.dart` |
| **小程序 / WXML** | `packages/mini-program/src/components/waybill-display/index.wxml` |
| **Web HTML/CSS** | `packages/web/src/components/WaybillDisplay/styles.css` |
| **Tokens 定义** | `packages/tokens/src/waybill-display.ts` |
| **单元测试** | `packages/react/src/components/WaybillDisplay/__tests__/WaybillDisplay.test.tsx` |

## AI Notes

- **为什么容器高度是 32px 而不是其他值？** 32px 对齐了 Tag Small 的标准高度，保证 WaybillDisplay 在列表中与 Tag 组件同行时视觉对齐，避免高度参差不齐导致的列表行间距问题。

- **为什么查件按钮用 Primary（#6445D1）而不是 Grey 或 Black？** 查件是本组件的核心业务操作，需要视觉突出。Primary 是系统主色调，传达"这是一个可点击的操作入口"，同时与运单号主体的 Black-NO.6 形成合理的视觉层次。

- **为什么标签默认背景用 Yellow-NO.6（#FFD933）？** #FFD933 在业务语义中代表"待处理/进行中"的警示状态，与系统色阶的 Yellow 色系对齐。相比原来非标的 #FF9F02，#FFD933 在白底上对比度更佳，更符合无障碍规范。

- **为什么前缀用 Grey-NO.4（#BDBDBD）而不是与主体同色？** 前缀（如 KY4000327）是运单号的分类标识，不是信息主体，用较浅的灰色降低其视觉权重，让用户优先读取主体运单号（如 225662），符合 F 型阅读模式。

- **为什么用插槽而不是硬编码按钮？** 不同业务线对运单行的操作需求差异大（有的只需复制、有的需要多选），插槽设计让业务方可以注入任意元素，同时保持组件本身职责单一，无需为每种组合创建新的组件变体。

## Variants Overview

| 变体 | 说明 | 适用场景 |
|------|------|---------|
| **基础运单号** | 仅展示 prefixCode + waybillNo | 详情页静态展示 |
| **带性别标签** | 含 genderTag（如"母"标签） | 宠物/活体运输场景 |
| **带查件按钮** | 含 click-search 回调的查件按钮 | 列表页快速查件 |
| **左侧插槽** | 插入多选框/复制按钮 | 批量操作列表 |
| **右侧插槽** | 插入业务标签（易损高赔/必装票） | 业务属性标注 |
| **完整组合** | prefix + genderTag + waybillNo + searchBtn + suffix | 全功能运单行 |

---

## 何时使用

**用这个组件，当：**
- 需要展示运单号（无论是否可点击）
- 需要同时展示运单号 + 收件人姓名 + 性别标签
- 需要在列表中展示一条完整的运单信息行

**不要用这个组件，当：**
- 只展示单一状态标签 → 用 Tag
- 需要展示多条运单的详情卡片 → 用 Card 包装多个 WaybillDisplay
- 只是超长文本省略 → 用 Text + overflow

**WaybillDisplay vs Tag vs ListItem 决策：**

```
展示内容是什么？
├─ 单一运单号行（含姓名/性别/运单号）→ WaybillDisplay
├─ 状态标签（"已签收"/"待取件"）→ Tag
├─ 通用列表行（图标+标题+副标题+箭头）→ ListItem
└─ 运单详情信息卡 → Card + WaybillDisplay
```

---

## ⚠️ 设计规范修正说明

> 以下参数已根据 PDA Design System 进行标准化对齐

| 原始参数 | 问题 | 修正后 | 说明 |
|----------|------|--------|------|
| `#888888` | Grey 色阶外色值 | `#BDBDBD` | 对齐 Grey NO.4 |
| `#FF9F02` | 非标准色值 | `#FFD933` | 对齐 Yellow NO.6 |
| 字号 20px | 非标准字阶 | 统一使用 18px | 符合 Small 组件规范 |
| 容器高度 33px | 非标准尺寸 | 32px | 对齐 Tag Small 尺寸 |
| 字重 600 (Bold) | 表述不精确 | 统一为 600 | 符合设计系统字重定义 |

---

## 一、组件属性 (Props)

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `waybillNo` | String | - | 运单号主体（如 `225662`） |
| `prefixCode` | String | - | 运单号前缀（如 `KY4000327`） |
| `genderTag` | Object | `{ text: '母', bgColor: '#FFD933' }` | 性别/类型标签配置，支持自定义文本和背景色 |
| `showSearchBtn` | Boolean | `true` | 是否显示右侧"查件"按钮 |
| `searchBtnText` | String | `'查件'` | "查件"按钮文案 |

---

## 二、插槽 (Slots)

| 插槽名 | 说明 |
|--------|------|
| `prefix` | **左侧插槽**。用于放置多选框、复制按钮等前置操作元素。 |
| `suffix` | **右侧插槽**。位于"查件"按钮之后，用于放置"易损高赔"、"必装票"等业务标签。 |

---

## 三、事件 (Events)

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `click-search` | `(waybillNo: string)` | 点击"查件"按钮时触发，返回当前运单号。 |

---

## 四、布局与间距

### 4.1 容器参数

| 属性 | 值 | 说明 |
|------|-----|------|
| 高度 | 32px | 对齐 Tag Small 尺寸 |
| 最大宽度 | 448px | 与按钮系统一致 |
| 主轴对齐 | `flex-start` | 左对齐 |
| 交叉轴对齐 | `center` | 垂直居中 |
| 内部间距 | 8px / 4px | 根容器 8px，子项 4px |

### 4.2 布局示意

```
+------------------------------------------------------------------+
| [Prefix] [前缀] [运单号主体]  [查件按钮]  [Suffix: 标签...]       |
|                                                                  |
| • Container Height: 32px                                        |
| • Max Width: 448px                                               |
| • Gap (Root): 8px                                               |
| • Gap (Children): 4px                                           |
+------------------------------------------------------------------+
```

---

## 五、排版规范 (Typography)

| 元素 | 字号 | 字重 | 行高 | 色值 | Token |
|------|------|------|------|------|-------|
| **运单前缀** | 18px | 400 (Regular) | 25px | `#BDBDBD` | Grey NO.4 |
| **运单主体** | 18px | 600 (Bold) | 25px | `#333333` | Black NO.6 |
| **查件按钮** | 18px | 600 (Bold) | 25px | `#6445D1` | Primary NO.6 |
| **标签文本** | 14px | 600 (Bold) | 20px | `#FFFFFF` | White |

> **修正说明**：统一字号为 18px，对齐设计系统字阶标准

---

## 六、颜色系统

### 6.1 颜色映射

| 元素 | 色值 | Token | 说明 |
|------|------|-------|------|
| 前缀文字 | `#BDBDBD` | Grey NO.4 | 运单前缀 |
| 主体文字 | `#333333` | Black NO.6 | 运单主体 |
| 查件按钮 | `#6445D1` | Primary NO.6 | 主色调 |
| 标签文字 | `#FFFFFF` | White | 白色文字 |

### 6.2 性别标签颜色

| 颜色 | 色值 | Token | 说明 |
|------|------|-------|------|
| 默认背景 | `#FFD933` | Yellow NO.6 | 性别标签 |
| 标签文字 | `#FFFFFF` | White | 白色文字 |

> **修正说明**：`#FF9F02` 已修正为 `#FFD933`，对齐 Yellow NO.6

---

## 七、样式细节

### 7.1 标签 (Tag)

| 属性 | 值 | 说明 |
|------|-----|------|
| 内边距 | `2px 8px` | 对齐 Tag Small 尺寸 |
| 圆角 | `4px` | 对齐 Tag Small 尺寸 |
| 背景色 | `#FFD933` (Yellow NO.6) | 默认黄色 |
| 文字色 | `#FFFFFF` | 白色 |

### 7.2 查件按钮

| 属性 | 值 | 说明 |
|------|-----|------|
| 最小宽度 | 40px | - |
| 最大宽度 | 120px | - |
| 内边距 | `4px 8px` | - |
| 圆角 | `4px` | - |
| 边框 | 无 | 使用纯文字按钮 |
| 文字色 | `#6445D1` (Primary NO.6) | 主色调 |

---

## 八、组件 API

```typescript
interface WaybillDisplayProps {
  /** 运单号主体 */
  waybillNo: string;
  /** 运单号前缀 */
  prefixCode?: string;
  /** 性别/类型标签配置 */
  genderTag?: {
    text: string;
    bgColor?: string;
  };
  /** 是否显示查件按钮 */
  showSearchBtn?: boolean;
  /** 查件按钮文案 */
  searchBtnText?: string;
  /** 左侧插槽 */
  prefix?: React.ReactNode;
  /** 右侧插槽 */
  suffix?: React.ReactNode;
}
```

### 8.1 事件类型

```typescript
interface WaybillDisplayEvents {
  /** 点击查件按钮事件 */
  'click-search': (waybillNo: string) => void;
}
```

---

## 九、代码示例

### 9.1 基础用法

```jsx
import { WaybillDisplay } from 'pda-design';

<WaybillDisplay 
  waybillNo="225662"
  prefixCode="KY4000327"
/>
```

### 9.2 带性别标签

```jsx
<WaybillDisplay 
  waybillNo="225662"
  prefixCode="KY4000327"
  genderTag={{ text: '母', bgColor: '#FFD933' }}
/>
```

### 9.3 带查件按钮

```jsx
<WaybillDisplay 
  waybillNo="225662"
  prefixCode="KY4000327"
  showSearchBtn={true}
  searchBtnText="查件"
  onClickSearch={(waybillNo) => handleSearch(waybillNo)}
/>
```

### 9.4 带插槽

```jsx
<WaybillDisplay 
  waybillNo="225662"
  prefixCode="KY4000327"
  prefix={<Checkbox />}
  suffix={<Tag color="warning" size="small">易损高赔</Tag>}
  onClickSearch={(waybillNo) => handleSearch(waybillNo)}
/>
```

### 9.5 完整示例

```jsx
import { WaybillDisplay, Tag, Checkbox } from 'pda-design';

<WaybillDisplay 
  waybillNo="225662"
  prefixCode="KY4000327"
  genderTag={{ text: '母', bgColor: '#FFD933' }}
  showSearchBtn={true}
  searchBtnText="查件"
  prefix={<Checkbox />}
  suffix={
    <>
      <Tag color="warning" size="small">易损高赔</Tag>
      <Tag color="error" size="small">必装票</Tag>
    </>
  }
  onClickSearch={(waybillNo) => console.log('查询运单:', waybillNo)}
/>
```

---

## 十、关联组件

| 组件 | 关联说明 |
|------|---------|
| Tag | 右侧业务标签，继承 Tag Small 尺寸规范 |
| Button | 查件按钮基于 Button Small 尺寸，颜色对齐 Primary NO.6 |
| ScanInput | 运单号输入组件，展示组件的下游使用场景 |

---

## 十一、无障碍规范

1. **文字对比度**：所有文字与背景对比度 ≥ 4.5:1
2. **点击区域**：按钮最小点击区域 44px × 44px
3. **键盘支持**：支持 Tab 键聚焦，Enter 键触发点击事件
4. **语义化**：使用 `aria-label` 标注运单号内容
5. **复制功能**：复制按钮需配合 Toast 提示操作结果

---

## Changelog

| 日期 | 版本 | 修改内容 | 作者 |
|------|------|---------|------|
| 2026-04-22 | v1.1.0 | 新增 Purpose、Use When/Avoid When、Interaction Flow、Design Tokens（结构化 Token 矩阵）、Props Contract（TypeScript 接口）、Code Mapping、AI Notes、Variants Overview；原"何时使用"章节已整合至 Use When/Avoid When | AI Refactor |
