# 弹窗容器 (Modal Container)

> **v1.1.0** | 最后更新：2026-04-22
> 新增：Purpose、Use When/Avoid When、Interaction Flow、AI Notes、Code Mapping

---

## Purpose

弹窗容器（Modal Container）是一种**强制中断式对话框组件**，用于在全屏遮罩之上居中展示内容，迫使用户在继续操作前做出明确响应。

**解决什么问题？**
- 用户可能误操作不可逆任务（如删除、批量确认），需要二次确认保护
- 业务流程中必须收集用户关键决策信息（如选择确认项、输入校验值）才能继续
- 重要信息展示必须被用户看到，不允许被忽略或跳过

**为什么需要这个组件？**
- Popover（轻量气泡）用户可主动关闭，信息传达不可靠
- NoticeBar（顶部横幅）不阻断操作，用户可能直接绕过
- ActionSheet（下拉选择）无法承载复杂确认逻辑
- Modal 通过遮罩背景 + 聚焦弹窗，确保用户必须响应后才能继续

## Use When / Avoid When

| ✅ 使用场景 | ❌ 避免场景 |
|-----------|-----------|
| 删除/取消等不可逆操作前强制确认 | 仅展示补充信息 → 用 Popover |
| 批量操作前需要用户核对数量/范围 | 需要从列表中选择多项 → 用 ActionSheet / Dropdown |
| 表单提交前需要用户输入或选择关键值 | 轻量提示或通知类信息 → 用 NoticeBar |
| 重要提示必须被用户看到才能继续操作 | 用户需要完成多个步骤 → 用 Stepper |
| 业务流程中断，需要强制收口 | 已有完整表单流程中的字段输入 → 用 InputField |

**Modal vs Popover vs NoticeBar vs ActionSheet 决策树：**

```
用户必须看到这条信息才能继续操作吗？
├─ 是，操作不可逆（删除/批量确认）→ Modal（强制聚焦，遮罩背景）
├─ 否，只是补充说明/帮助提示 → Popover（轻量，用户主动触发）
├─ 是，通知类，不阻断流程 → NoticeBar（顶部横幅）
└─ 是，需要从多个选项中选 → ActionSheet / Dropdown

Modal 典型场景：
├─ 删除确认："确定删除此运单？"
├─ 批量操作确认："确定提交 10 条记录？"
└─ 重要信息展示："操作成功，请核对以下信息"
```

## Interaction Flow

```
                    ┌─────────────────────────┐
                    │       CLOSED           │
                    │   (页面正常交互)        │
                    └───────────┬─────────────┘
                                │ 触发打开（用户点击删除/确认按钮等）
                                ▼
                    ┌─────────────────────────┐
                    │     OPENING            │
                    │   (动画入场中)          │
                    │  遮罩 fade-in 300ms     │
                    │  弹窗 scale 缩放 300ms   │
                    └───────────┬─────────────┘
                                │ 动画完成
                                ▼
                    ┌─────────────────────────┐
                    │       OPENED           │◄──────┐
                    │   (可交互状态)          │       │
                    │  背景遮罩: 50% 黑色透明  │       │
                    │  弹窗: 居中显示          │       │
                    └───────────┬─────────────┘       │
                                │                    │
              ┌─────────────────┼─────────────────┐   │
              ▼                 ▼                 ▼   │
    ┌─────────────────┐ ┌─────────────┐ ┌──────────┐ │
    │  点击"取消"/关闭  │ │ 点击遮罩背景  │ │ 点击"确定"│ │
    │  (可配置能否关闭) │ │(可配置能否关闭)│ │          │ │
    └────────┬────────┘ └──────┬──────┘ └────┬─────┘ │
             │                 │             │       │
             ▼                 ▼             ▼       │
    ┌─────────────────┐ ┌─────────────┐ ┌──────────┐ │
    │    CLOSING      │ │   CLOSING   │ │  TRIGGER  │ │
    │  (关闭动画 200ms)│ │(关闭动画200ms)│ │ CALLBACK │ │
    └────────┬────────┘ └──────┬──────┘ └────┬─────┘ │
             │                 │             │       │
             └────────┬────────┴─────────────┘       │
                      │  动画完成                     │
                      ▼                               │
             ┌─────────────────┐                       │
             │     CLOSED      │──────────────────────┘
             │   (页面恢复交互)  │
             └─────────────────┘
```

**状态说明：**

| 状态 | 描述 | 触发条件 |
|------|------|---------|
| CLOSED | 页面正常交互，弹窗未打开 | 初始状态/动画完成 |
| OPENING | 遮罩 + 弹窗入场动画中（300ms） | open() 调用 |
| OPENED | 用户可与弹窗内容交互 | 动画完成 |
| CLOSING | 遮罩 + 弹窗退场动画中（200ms） | close() / 取消 / 遮罩点击 / 确定 |
| TRIGGER CALLBACK | 触发业务回调（提交/确认） | 用户点击"确定" |

## Design Tokens

### 基础容器

| Token | 值 | 说明 |
|-------|-----|------|
| `--modal-width` | `400px` | 固定宽度，不随内容伸缩 |
| `--modal-bg` | `#FFFFFF` | 白色背景 |
| `--modal-radius` | `20px` | 四周统一圆角 |
| `--modal-shadow` | `0 8px 32px rgba(0,0,0,0.15)` | 阴影（可选） |

### 标题区

| Token | 值 | 说明 |
|-------|-----|------|
| `--modal-title-font` | `PingFang SC` | 苹方字体 |
| `--modal-title-size` | `22px` | - |
| `--modal-title-weight` | `600` | Bold |
| `--modal-title-line-height` | `30px` | - |
| `--modal-title-color` | `#333333` | Black NO.6 |
| `--modal-subtitle-size` | `20px` | - |
| `--modal-subtitle-line-height` | `28px` | - |
| `--modal-subtitle-color` | `#666666` | Black NO.5 |

### 底部操作栏

| Token | 值 | 说明 |
|-------|-----|------|
| `--modal-footer-height` | `70px` | 固定高度 |
| `--modal-btn-confirm-color` | `#6445D1` | Primary NO.6，确认按钮 |
| `--modal-btn-cancel-color` | `#333333` | Black NO.6，取消按钮 |
| `--modal-btn-font` | `PingFang SC` | - |
| `--modal-btn-size` | `22px` | - |
| `--modal-btn-weight` | `600` | Bold |
| `--modal-btn-radius` | `640px` | 全圆角（胶囊按钮） |

### 内容区内边距

| Token | 值 | 说明 |
|-------|-----|------|
| `--modal-content-padding-vertical` | `36px` / `40px` | 上/下内边距 |
| `--modal-content-padding-horizontal` | `40px` | 左右内边距 |
| `--modal-content-gap` | `24px` | 标题与内容区间距 |

### 状态变体样式

#### 状态 B：单选框状态（Radio Group）

| Token | 值 | 说明 |
|-------|-----|------|
| `--modal-radio-gap` | `32px` | 选项横向间距 |
| `--modal-radio-icon-text-gap` | `8px` | 图标与文字间距 |
| `--modal-radio-selected-color` | `#6445D1` | Primary NO.6 选中态 |

#### 状态 C / D：输入框状态（Input / Range）

| Token | 值 | 说明 |
|-------|-----|------|
| `--modal-input-bg` | `#EEEEEE` | Grey NO.2 |
| `--modal-input-radius` | `8px` | - |
| `--modal-input-padding` | `16px` | - |
| `--modal-input-placeholder-color` | `#888888` | Grey NO.5 |
| `--modal-input-width` | `144px` | 区间输入时单框宽度 |

#### 状态 E：单位选择器（Unit Selector）

| Token | 值 | 说明 |
|-------|-----|------|
| `--modal-unit-unselected-bg` | `#FFFFFF` | 未选中白底 |
| `--modal-unit-unselected-border` | `#DDDDDD` | 未选中边框 |
| `--modal-unit-selected-bg` | `#F1E7FF` | Primary NO.1 |
| `--modal-unit-selected-border` | `#6445D1` | Primary NO.6 |

### 遮罩层

| Token | 值 | 说明 |
|-------|-----|------|
| `--modal-overlay-bg` | `rgba(0,0,0,0.5)` | 半透明黑色遮罩 |
| `--modal-overlay-animation` | `fade 300ms ease` | 入场动画 |

## Props Contract

```typescript
// 弹窗容器属性接口
interface ModalContainerProps {
  /** 弹窗标题 */
  title: string;
  /** 副标题/描述文字 */
  subtitle?: string;
  /** 内容区变体类型 */
  variant?: 'default' | 'radio' | 'input' | 'range' | 'unit';
  /** 单选项列表（variant=radio 时使用） */
  options?: Array<{
    value: string;
    label: string;
    icon?: string;
    disabled?: boolean;
  }>;
  /** 当前选中的单选项值（variant=radio 时使用） */
  selectedValue?: string;
  /** 单选项变更回调 */
  onSelect?: (value: string) => void;
  /** 输入框值（variant=input/range/unit 时使用） */
  inputValue?: string;
  /** 输入框变更回调 */
  onInputChange?: (value: string) => void;
  /** 区间输入开始值（variant=range 时使用） */
  rangeStart?: string;
  /** 区间输入结束值（variant=range 时使用） */
  rangeEnd?: string;
  /** 区间输入变更回调 */
  onRangeChange?: (start: string, end: string) => void;
  /** 单位选项列表（variant=unit 时使用） */
  unitOptions?: string[];
  /** 当前选中单位（variant=unit 时使用） */
  selectedUnit?: string;
  /** 单位变更回调 */
  onUnitChange?: (unit: string) => void;
  /** 底部按钮配置 */
  buttons?: Array<{
    text: string;
    type?: 'primary' | 'cancel';
    disabled?: boolean;
    onClick?: () => void;
  }>;
  /** 确认回调（点击确定/主按钮时触发） */
  onConfirm?: (payload: ModalPayload) => void;
  /** 取消回调（点击取消/关闭时触发） */
  onCancel?: () => void;
  /** 点击遮罩是否可关闭（默认 false） */
  closeOnOverlayClick?: boolean;
  /** 是否显示关闭按钮 */
  showCloseButton?: boolean;
  /** 是否打开弹窗 */
  visible?: boolean;
}

/** 弹窗提交时的数据载体 */
interface ModalPayload {
  variant: ModalContainerProps['variant'];
  selectedValue?: string;
  inputValue?: string;
  rangeStart?: string;
  rangeEnd?: string;
  selectedUnit?: string;
}
```

## Code Mapping

| 平台 | 文件路径 | 说明 |
|------|---------|------|
| iOS (SwiftUI) | `src/ios/PDAUIKit/Components/Modal/ModalContainer.swift` | 主组件文件 |
| iOS | `src/ios/PDAUIKit/Components/Modal/ModalOverlayView.swift` | 遮罩层 |
| iOS | `src/ios/PDAUIKit/Components/Modal/ModalButton.swift` | 底部按钮 |
| iOS | `src/ios/PDAUIKit/Components/Modal/ModalRadioGroup.swift` | 单选变体 |
| iOS | `src/ios/PDAUIKit/Components/Modal/ModalInputField.swift` | 输入变体 |
| iOS | `src/ios/PDAUIKit/Components/Modal/ModalRangeInput.swift` | 区间输入变体 |
| iOS | `src/ios/PDAUIKit/Components/Modal/ModalUnitSelector.swift` | 单位选择变体 |
| Android (Kotlin) | `src/android/app/src/main/java/com/pda/design/ui/components/ModalContainer.kt` | 主组件 |
| Android | `src/android/app/src/main/java/com/pda/design/ui/components/ModalOverlay.kt` | 遮罩层 |
| Android | `src/android/app/src/main/java/com/pda/design/ui/components/ModalButton.kt` | 底部按钮 |
| Web (React) | `src/web/components/Modal/ModalContainer.tsx` | 主组件 |
| Web | `src/web/components/Modal/ModalOverlay.tsx` | 遮罩层 |
| Web | `src/web/components/Modal/ModalRadio.tsx` | 单选变体 |
| Web | `src/web/components/Modal/ModalInput.tsx` | 输入变体 |
| Web | `src/web/styles/tokens/colors.css` | 设计 Token 颜色变量 |
| Web | `src/web/styles/tokens/spacing.css` | 设计 Token 间距变量 |
| Web | `src/web/styles/tokens/typography.css` | 设计 Token 字体变量 |
| Flutter | `lib/src/widgets/modal/modal_container.dart` | 主组件 |
| Flutter | `lib/src/widgets/modal/modal_button.dart` | 底部按钮 |
| Flutter | `lib/src/theme/pda_colors.dart` | 颜色 Token |
| Flutter | `lib/src/theme/pda_spacing.dart` | 间距 Token |

## AI Notes

- **为什么遮罩透明度设为 50%？** 因为 PDA 设备常在户外强光下使用，过淡的遮罩会导致弹窗与页面内容视觉混淆；50% 在大多数光照条件下都能清晰区分层级，同时不会完全遮挡操作员需要参考的页面信息。

- **为什么确认按钮用主色（Purple #6445D1）而非纯黑？** 确认操作是业务流程的关键决策点，主色能够有效引导视觉焦点，降低误操作取消/确认按钮的概率，尤其在高压快节奏的分拣环境下更为重要。

- **为什么底部栏高度固定 70px？** 固定高度确保按钮布局在触控热区内（PDA 大屏单手操作时底部可达性最优），避免内容区过长导致按钮被推出可视区域；同时 70px 接近 3 倍基准间距（24px），视觉比例协调。

- **为什么单选框最多支持 3 个选项？** 弹窗内内容须在单屏内完整展示（不滚动），3 个选项横向排列可在 400px 宽度内保持良好间距；超过 3 项建议改用 ActionSheet 组件。

- **为什么胶囊按钮圆角用 640px（而非 50%）？** 640px 是基于按钮实际宽度（≈ 按钮文字宽度 + padding）推算出的最大圆角值，确保在多语言文字宽度变化时仍保持近似胶囊形态，而非在窄文字时变成正圆。

## Variants Overview

| 变体 | 内容区形态 | 底部按钮 | 典型场景 |
|------|-----------|---------|---------|
| 状态 A（Default） | 仅标题 + 副标题 | 2 按钮（确定/取消）或 3 按钮 | 信息确认、单一操作确认 |
| 状态 B（Radio Group） | 标题 + 副标题 + 1-3 个单选项 | 2 按钮 | 选项确认，如确认操作类型 |
| 状态 C（Input Field） | 标题 + 副标题 + 单行输入框 | 2 按钮 | 文字输入校验，如备注确认 |
| 状态 D（Range Input） | 标题 + 副标题 + 区间输入框（两个输入框 + 短横线连接） | 2 按钮 | 时间/数值区间选择，如时间范围确认 |
| 状态 E（Unit Selector） | 标题 + 副标题 + 输入框 + 单位切换组 | 2 按钮 | 带单位的数值输入，如重量/件数确认 |

| 底部布局 | 按钮排列 | 说明 |
|---------|---------|------|
| 场景 1 | 左右分栏（确定在右） | 双按钮场景，中间有分割线 |
| 场景 2 | 竖向堆叠（三个按钮） | 三按钮场景，取消在最后 |

---

## 何时使用

**用这个组件，当：**
- 需要强制用户确认重要信息后才能继续操作
- 需要打断用户当前流程进行二次确认
- 操作不可逆，需要显式确认

**不要用这个组件，当：**
- 只是展示补充信息 → 用 Popover
- 需要选择列表项 → 用 ActionSheet / Dropdown
- 需要轻量提示 → 用 NoticeBar
- 需要用户完成多个步骤 → 用 Stepper

**Modal vs Popover vs NoticeBar 决策：**

```
用户必须看到这条信息才能继续操作吗？
├─ 是（操作不可逆）→ Modal（强制聚焦，遮罩背景）
├─ 否，只是补充说明 → Popover（轻量，用户主动触发）
├─ 是（通知类，不阻断）→ NoticeBar（顶部横幅）
└─ 是（多选项选择）→ ActionSheet

Modal 的典型场景：
├─ 删除确认："确定删除此运单？"
├─ 批量操作确认："确定提交 10 条记录？"
└─ 重要信息展示："操作成功，请核对信息"
```

---

## 1. 组件概述

该组件是一个全屏居中弹窗，包含固定的头部标题区、动态的内容区和固定的底部操作区。根据业务需求，内容区支持多种形态切换。

## 2. 基础结构与样式规范

所有模态框共享以下基础样式：

| 区域 | 属性 | 数值/规范 | 备注 |
|------|------|-----------|------|
| **容器** | Width | `400px` | 固定宽度 |
| | Background | `#FFFFFF` | 白色背景 |
| | Border Radius | `20px` | 四周统一圆角 |
| **标题** | Font Family | `PingFang SC` | 苹方字体 |
| | Font Size | `22px` | - |
| | Font Weight | `600` (Bold) | - |
| | Line Height | `30px` | - |
| | Color | `#333333` | Black NO.6 |
| **副标题** | Font Size | `20px` | - |
| | Line Height | `28px` | - |
| | Color | `#666666` | Black NO.5 |
| **底部栏** | Height | `70px` | 固定高度 |
| | Button Style | 胶囊状/图文 | 见下方按钮规范 |


## 3. 内容区状态变体 (Variants)

### 状态 A：默认状态 (Default)

+ **描述**：仅包含标题和副标题，无额外交互元素。
+ **布局**：纵向排列，标题与副标题间距为 `24px`。
+ **内边距**：上下 `36px` / `40px`，左右 `40px`。

### 状态 B：带单选框状态 (Radio Group)

+ **描述**：在副标题下方增加选项列表，支持1-3个选项。
+ **布局**：
  - 选项横向排列 (`gap: 32px`)。
  - 单选项内部图标与文字间距 `8px`。
+ **交互**：点击切换选中态。
+ **选中态样式**：图标与文字变为主色 `#6445D1` (Primary NO.6)。

### 状态 C：带输入框状态 (Input Field)

+ **描述**：包含单行文本输入区域。
+ **输入框样式**：
  - Background: `#EEEEEE` (Grey NO.2)
  - Border Radius: `8px`
  - Padding: `16px`
  - Placeholder Color: `#888888` (Grey NO.5)

### 状态 D：区间输入状态 (Range Input)

+ **描述**：用于选择开始和结束时间/数值的区间。
+ **布局**：两个输入框中间由短横线连接。
+ **结构**：`[开始件]` — `[结束件]`
+ **样式**：同"带输入框状态"，输入框宽度为 `144px`。

### 状态 E：带单位状态 (Unit Selector)

+ **描述**：输入框附带单位选择功能。
+ **布局**：左侧为输入框，右侧为单位切换组。
+ **单位切换组**：
  - 左右结构，无间隔。
  - 左侧（未选中）：白底 + `#DDDDDD` 边框。
  - 右侧（选中）：`#F1E7FF` 背景 (Primary NO.1) + `#6445D1` 边框 (Primary NO.6)。

## 4. 底部操作按钮规范

底部区域高度固定为 `70px`，根据按钮数量动态调整布局。

### 场景 1：双按钮（确定/取消）

+ **布局**：左右分栏。
+ **分割线**：位于正中间 (`left: 50%`)，通常为 SVG 图形。
+ **样式**：
  - **取消**：文字颜色 `#333333` (Black NO.6)，居左。
  - **确定**：文字颜色 `#6445D1` (Primary NO.6)，居右。

### 场景 2：三按钮（竖向排列）

+ **描述**：当存在三个操作选项时使用（如：按钮一、按钮二、取消）。
+ **布局**：垂直堆叠，每个按钮高度约为 `70px` 或其倍数。
+ **样式**：
  - 前两个按钮文字颜色为 `#6445D1` (主色)。
  - 第三个按钮（通常为取消/关闭）文字颜色为 `#333333`。

## 5. 设计 Token 映射 (Design Tokens)

在开发实现时，建议将硬编码的颜色和尺寸替换为以下设计变量：

+ **主色 (Primary):** `#6445D1` (NO.6) —— 用于按钮、选中态、强调文字。
+ **背景色 (Background):** `#FFFFFF` (White) & `#EEEEEE` (Grey NO.2)。
+ **文本色 (Text):**
  - 标题：`#333333` (Black NO.6)
  - 正文/副标：`#666666` (Black NO.5)
  - 辅助文字：`#888888` (Grey NO.5)
+ **间距 (Spacing):**
  - 组件内大间距：`32px`
  - 常规间距：`16px`
  - 元素间小间距：`8px`
+ **圆角 (Radius):**
  - 卡片/容器：`20px`
  - 输入框：`8px`

---

_(注：原始HTML中的绝对定位布局已转化为相对的逻辑布局描述，以便于组件化开发)_

---

## Changelog

| 版本 | 日期 | 变更内容 |
|------|------|---------|
| v1.1.0 | 2026-04-22 | 新增：Purpose、Use When/Avoid When、Interaction Flow、AI Notes、Code Mapping、Variants Overview；补充 Design Tokens 完整 token 矩阵；新增 Props Contract TypeScript 接口 |
