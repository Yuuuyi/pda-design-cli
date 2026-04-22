# 搜索栏 (SearchBar)

> **v1.1.0** | 最后更新：2026-04-22
> 新增：Purpose、Design Tokens、Props Contract、Code Mapping、AI Notes、Variants Overview、Changelog

---

## Purpose

搜索栏（SearchBar）是用户通过输入文字或扫描条码进行数据查询的**核心交互组件**，常用于页面顶部作为统一的搜索入口。

**解决什么问题？**
- PDA 设备需要同时支持扫码和手动文字输入两种查询方式
- 搜索操作需要"确认提交"机制，避免误触发（区别于即时搜索）
- 搜索状态需要在默认→输入中→已输入三个阶段清晰切换

**为什么需要这个组件？**
- ScanInput 仅支持扫码，无法满足手动文字输入需求
- InputField 输入即触发，无确认步骤，在条码模糊/误扫场景下会产生无效查询
- SearchBar 通过"确定/取消"按钮实现二次确认，降低误操作率，适合 PDA 高强度作业环境

## Use When / Avoid When

| ✅ 使用场景 | ❌ 避免场景 |
|-----------|-----------|
| 用户需要通过文字或条码进行数据查询 | 只需要扫码功能 → 用 ScanInput |
| 需要在页面顶部提供统一的搜索入口 | 搜索结果需要下拉联想列表 → 用 InputField + 联想列表 |
| 需要支持扫码 + 手动输入混合场景（如 PDA 运单查询） | 搜索作为表格/列表的内联过滤条件 → 用 InputField |
| 查询前需要用户二次确认，避免误触发 | 全局顶栏中的多入口之一 → 用 NavBar 的 Search 变体 |

**SearchBar vs ScanInput vs InputField 决策树：**

```
主要操作是扫描条码？
├─ 是，以扫描为主，文字输入为辅 → ScanInput
└─ 否，以文字输入为主

是否需要"确定/取消"操作按钮（提交前确认）？
├─ 是，扫码/输入后需确认才提交 → SearchBar（Filled 状态有确定/取消按钮）
└─ 否，输入即触发 → InputField

SearchBar 典型场景：
├─ 运单号查询："请扫描/输入运单号 → 确定"
├─ 批量录入前的单号校验
└─ 需要人工核对后再提交的查询场景
```

## Interaction Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                         状态机总览                                 │
└──────────────────────────────────────────────────────────────────┘

                    ┌─────────────────┐
                    │     Default     │
                    │   (默认状态)     │
                    │  🔍+占位符文字   │
                    └────────┬────────┘
                             │ 点击输入框
                             ▼
┌─────────────────┐  点击"取消"/清空   ┌─────────────────┐
│     Default     │ ◄────────────── │     Active      │
│   (默认状态)     │                  │   (输入中)       │
└────────┬────────┘                  │  标签文字 + |    │
         │                           │  右侧"取消"按钮   │
         │  点击"确定"                 └────────┬────────┘
         │  (触发搜索提交)                     │ 输入字符
         ▼                                    ▼
┌─────────────────┐                  ┌─────────────────┐
│   SUBMITTED     │                  │     Filled     │
│   (已提交)      │                  │   (已输入)      │
│   触发 onSearch │                  │  输入文字 + |   │
│   回调          │                  │  清空+确定+取消  │
└─────────────────┘                  └────────┬────────┘
                                             │
                                             │ 点击"确定"
                                             ▼
                                    ┌─────────────────┐
                                    │   SUBMITTED     │
                                    │   (已提交)      │
                                    └─────────────────┘
```

**状态切换表：**

| 触发操作 | 当前状态 | 结果状态 | 附带效果 |
|---------|---------|---------|---------|
| 点击输入框 | Default | Active | 显示标签文字 + 分割线 + "取消"按钮 |
| 输入字符 | Active | Filled | 显示输入文字 + 分割线 + 清空/确定/取消 |
| 点击"清空"图标 | Filled | Active | 清空内容，保留标签文字 |
| 点击"确定"按钮 | Filled | Submitted | 触发 onSearch 回调，返回查询值 |
| 点击"取消"按钮 | Active / Filled | Default | 清空内容，恢复默认状态 |
| 遮罩点击 | Active / Filled | Default | 同取消 |

**状态样式详情：**

| 状态 | 输入框内容 | 右侧操作 | 边框样式 |
|------|---------|---------|---------|
| Default | 🔍 搜索图标 + 占位符文字 | 无 | 1px solid #6445D1 |
| Active | 标签文字 + 分割线 `\|` | "取消" 按钮 | 1px solid #6445D1 |
| Filled | 输入文字 + 分割线 `\|` | 清空图标 + "确定" + "取消" | 1px solid #6445D1 |

## Design Tokens

### 容器

| Token | 值 | 说明 |
|-------|-----|------|
| `--search-bar-width` | `480px` | 固定宽度 |
| `--search-bar-height` | `84px` | - |
| `--search-bar-padding` | `8px 12px 16px` | 上/左右/下内边距 |
| `--search-bar-bg` | `#F5F5F5` | 容器背景色 |

### 搜索框主体（输入区）

| Token | 值 | 说明 |
|-------|-----|------|
| `--search-input-width` | `100%` | 撑满容器 |
| `--search-input-height` | `60px` | - |
| `--search-input-padding` | `0 16px` | 左右内边距 |
| `--search-input-bg` | `#FFFFFF` | Black NO.1 |
| `--search-input-border` | `1px solid #6445D1` | Functional Purple |
| `--search-input-radius` | `4px` | radius-sm |
| `--search-input-gap` | `8px` | 内部元素间距 |

### 文字样式

| Token | 值 | 说明 |
|-------|-----|------|
| `--search-placeholder-size` | `20px` | 占位符字号（非标准字阶，业务保留） |
| `--search-placeholder-weight` | `600` | Bold |
| `--search-placeholder-line-height` | `28px` | - |
| `--search-placeholder-color` | `#9E9E9E` | Grey NO.5 |
| `--search-input-text-size` | `22px` | 输入文字字号 |
| `--search-input-text-weight` | `600` | Bold |
| `--search-input-text-line-height` | `30px` | - |
| `--search-input-text-color` | `#333333` | Black NO.6 |
| `--search-label-size` | `22px` | 标签文字字号 |
| `--search-label-color` | `#666666` | Black NO.5 |
| `--search-divider-color` | `#6445D1` | Functional Purple |

### 操作区按钮

| Token | 值 | 说明 |
|-------|-----|------|
| `--search-btn-text-size` | `22px` | - |
| `--search-btn-text-weight` | `600` | Bold |
| `--search-btn-text-line-height` | `30px` | - |
| `--search-btn-text-color` | `#6445D1` | Functional Purple |
| `--search-btn-bg` | `transparent` | 透明背景 |
| `--search-btn-radius` | `640px` | 全圆角（胶囊） |
| `--search-btn-padding` | `4px 8px` | - |
| `--search-btn-active-opacity` | `0.6` | 点击时透明度 |

### 图标

| Token | 值 | 说明 |
|-------|-----|------|
| `--search-icon-size` | `22×22px` | 搜索图标、清空图标 |
| `--search-clear-icon-color` | `#666666` | 清空图标颜色 |

### 动画

| Token | 值 | 说明 |
|-------|-----|------|
| `--search-transition-duration` | `200ms` | 状态切换动画时长 |
| `--search-transition-easing` | `cubic-bezier(0.4, 0, 0.2, 1)` | 缓动函数 |

## Props Contract

```typescript
// 搜索栏组件属性接口
interface SearchBarProps {
  /** 搜索栏宽度（默认 480px） */
  width?: number | string;
  /** 占位符文字（Default 状态显示） */
  placeholder?: string;
  /** 输入框最大长度 */
  maxLength?: number;
  /** 当前输入值（受控） */
  value?: string;
  /** 默认值（非受控初始值） */
  defaultValue?: string;
  /** 值变更回调 */
  onChange?: (value: string) => void;
  /** 确认搜索回调（点击"确定"时触发） */
  onSearch?: (value: string) => void;
  /** 取消回调（点击"取消"时触发） */
  onCancel?: () => void;
  /** 清空回调（点击清空图标时触发） */
  onClear?: () => void;
  /** 是否禁用（禁用后不可点击/输入） */
  disabled?: boolean;
  /** 是否只读（只读时可点击取消，不可输入） */
  readOnly?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 是否显示清空图标（Filled 状态，默认 true） */
  showClearIcon?: boolean;
  /** 是否显示取消按钮（Active/Filled 状态，默认 true） */
  showCancelButton?: boolean;
  /** 是否显示确定按钮（Filled 状态，默认 true） */
  showConfirmButton?: boolean;
  /** 搜索图标（传入 null 可隐藏，默认显示） */
  searchIcon?: React.ReactNode | null;
  /** 取消按钮文字（默认"取消"） */
  cancelText?: string;
  /** 确定按钮文字（默认"确定"） */
  confirmText?: string;
  /** 聚焦时的标签文字（Active 状态显示） */
  label?: string;
  /** 输入法回车行为（默认 'search'） */
  enterKeyHint?: 'search' | 'done' | 'go' | 'next' | 'send';
  /** 自动聚焦（默认 false） */
  autoFocus?: boolean;
}

/** SearchBar 状态枚举（供外部状态展示使用） */
type SearchBarState = 'default' | 'active' | 'filled';

/** SearchBar 事件详情 */
interface SearchBarEvent {
  type: SearchBarState;
  value: string;
  timestamp: number;
}
```

## Code Mapping

| 平台 | 文件路径 | 说明 |
|------|---------|------|
| iOS (SwiftUI) | `src/ios/PDAUIKit/Components/SearchBar/SearchBar.swift` | 主组件文件 |
| iOS | `src/ios/PDAUIKit/Components/SearchBar/SearchBarTextField.swift` | 输入框内部封装 |
| iOS | `src/ios/PDAUIKit/Components/SearchBar/SearchBarButton.swift` | 确定/取消按钮 |
| iOS | `src/ios/PDAUIKit/Resources/Assets.xcassets/icon_search_outline.imageset/` | 搜索图标资源 |
| iOS | `src/ios/PDAUIKit/Resources/Assets.xcassets/icon_close_two_outline.imageset/` | 清空图标资源 |
| Android (Kotlin) | `src/android/app/src/main/java/com/pda/design/ui/components/SearchBar.kt` | 主组件 |
| Android | `src/android/app/src/main/res/layout/item_search_bar.xml` | 布局 XML |
| Android | `src/android/app/src/main/res/drawable/ic_search_outline.xml` | 搜索图标 |
| Android | `src/android/app/src/main/res/drawable/ic_close_two_outline.xml` | 清空图标 |
| Android | `src/android/app/src/main/res/values/colors.xml` | 颜色 Token |
| Android | `src/android/app/src/main/res/values/dimens.xml` | 尺寸 Token |
| Web (React) | `src/web/components/SearchBar/SearchBar.tsx` | 主组件 |
| Web | `src/web/components/SearchBar/SearchBarInput.tsx` | 输入框封装 |
| Web | `src/web/components/SearchBar/SearchBarButton.tsx` | 按钮封装 |
| Web | `src/web/styles/components/search-bar.css` | 组件样式 |
| Web | `src/web/styles/tokens/colors.css` | 设计 Token 颜色变量 |
| Web | `src/web/styles/tokens/spacing.css` | 设计 Token 间距变量 |
| Web | `src/web/styles/tokens/typography.css` | 设计 Token 字体变量 |
| Flutter | `lib/src/widgets/search_bar/search_bar.dart` | 主组件 |
| Flutter | `lib/src/widgets/search_bar/search_bar_button.dart` | 按钮封装 |
| Flutter | `lib/src/theme/pda_colors.dart` | 颜色 Token |
| Flutter | `lib/src/theme/pda_spacing.dart` | 间距 Token |
| Flutter | `lib/assets/icons/icon_search_outline.svg` | 搜索图标 |
| Flutter | `lib/assets/icons/icon_close_two_outline.svg` | 清空图标 |

## AI Notes

- **为什么搜索框高度用 60px？** 60px 是 PDA 触控场景下的最小可操作高度（≥ 44px 触控热区标准），配合 480px 宽度在单手握持设备时拇指操作舒适；与顶部导航配合时视觉比例协调，不会显得拥挤。

- **为什么"确定"和"取消"按钮用 640px 圆角？** 640px 是基于按钮实际宽度推算的胶囊圆角值，确保在多语言文字宽度变化时保持统一视觉风格；640px 在按钮文字较长时表现为胶囊形，文字较短时也不会变成正圆。

- **为什么用文字分割线 `|` 而非竖线图标？** 文字 `|` 随字号（22px）自动匹配行高，无需额外图标资源，减少打包体积；同时 `#6445D1` 紫色分隔符在视觉上暗示左右两侧的关联性（标签/输入区与操作区）。

- **为什么占位符字号用 20px 而非标准字阶 22px？** 占位符文字"请扫描/输入运单号"较长，22px 会导致文字溢出容器；20px 在保证可读性的同时为长文案留出充分空间。这是业务特殊需求的保留值，不属于标准 Typography 体系。

- **为什么激活/已输入状态下边框不变化？** 在 PDA 高亮户外环境，强对比边框变化感知度低，且频繁切换边框颜色会产生视觉抖动；统一保持 `#6445D1` 边框，通过内容文字变化来传达状态转换，体验更稳定。

## Variants Overview

| 状态 | 类名 | 输入框内容 | 右侧操作区 | 触发方式 |
|------|------|---------|-----------|---------|
| Default（默认） | `.search-bar--default` | 🔍 搜索图标 + 占位符文字 | 无 | 点击输入框 → Active |
| Active（输入中） | `.search-bar--active` | 标签文字 + 分割线 `\|` | "取消"按钮 | 输入字符 → Filled；点击取消 → Default |
| Filled（已输入） | `.search-bar--filled` | 输入文字 + 分割线 `\|` | 清空图标 + "确定" + "取消" | 点击清空 → Active；点击确定 → 提交；点击取消 → Default |

---

用户通过输入文字或扫描条码进行查询操作的核心交互组件。常用于页面顶部，支持扫描输入和文字输入两种方式。

---

## 何时使用

**用这个组件，当：**
- 用户需要通过输入文字或扫描条码进行数据查询
- 需要在页面顶部提供统一的搜索入口
- 需要支持扫码 + 手动输入混合场景（如 PDA 运单查询）

**不要用这个组件，当：**
- 只需要扫码功能 → 用 ScanInput
- 搜索结果需要下拉联想 → 用 InputField + 联想列表
- 搜索作为表格/列表的过滤条件 → 用 InputField
- 全局顶栏中的多入口之一 → 用 NavBar 的 Search 变体（navbar-search.md）

**SearchBar vs ScanInput 决策：**

```
主要操作是扫描条码？
├─ 是，以扫描为主 → ScanInput
└─ 否，以文字输入为主 → SearchBar

是否需要"确定/取消"操作按钮？
├─ 是，提交前需要确认 → SearchBar（Filled 状态有确定/取消按钮）
└─ 否，输入即触发 → InputField
```

---

## ⚠️ 设计规范修正说明

> 以下参数已根据 PDA Design System 进行标准化对齐。原文中的错误值已在备注中说明。

| 修正项 | 原文错误值 | 修正后 | 说明 |
|--------|-----------|--------|------|
| 背景色 | `--grey-2: #EEEEEE` | `#F5F5F5` | ❌ #EEEEEE 混入 Grey 系列，应为 Black NO.2 |
| 占位符色 | `--grey-5: #BBBBBB` | `#9E9E9E` | ⚠️ 近似值，Grey NO.5 = #9E9E9E |
| 边框色 | `--primary-6: #6445D1` | ✅ 正确 | Functional Purple |
| 提示文字色 | `#666666` | `#666666` | ✅ 无需修正，Black NO.5 |
| 常规文字色 | `#333333` | `#333333` | ✅ 无需修正，Black NO.6 |
| 背景色（输入框） | `#FFFFFF` | `#FFFFFF` | ✅ 无需修正，Black NO.1 |
| 圆角 | `--radius-sm: 6px` | `4px` | ❌ 6px 超标准，radius-sm = 4px |
| 间距（图标与文字） | `--gap-sm: 8px` | `8px` | ✅ 对齐 Gap: 8px |
| 间距（输入框内边距） | `--gap-md: 16px` | `16px` | ✅ 对齐 Gap: 16px |
| 字号（占位符） | `--font-size-m: 20px` | `20px` | ✅ 保留（业务特殊需求，非标准字阶） |
| 字号（输入/标签文字） | `--font-size-l: 22px` | `22px` | ✅ 无需修正，Bold 22px |
| 字重 | `--font-weight-bold: 600` | `600` | ✅ 无需修正，功能字重 |

> **注意：** 字号 20px 不在标准 Typography 体系（14/16/18/22/24/32），但因业务特殊需求保留。

---

## 一、组件结构

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│  🔍  请扫描/输入运单号                                     │
│  ←8px→                                              ←16px→│
│  容器: 480×84px, padding 8px 12px 16px                    │
│  搜索框: 480×60px, border 1px #6445D1, radius 4px        │
└────────────────────────────────────────────────────────────┘
```

---

## 二、布局参数

### 2.1 容器

| 属性 | 值 | Token |
|------|-----|-------|
| 宽度 | 480px | 固定宽度 |
| 高度 | 84px | - |
| 内边距 | 8px 12px 16px（上下左右） | Gap: 8px / 12px / 16px |
| 布局 | Flex Row，align-items: center | 垂直居中 |

### 2.2 搜索框（输入区）

| 属性 | 值 | Token |
|------|-----|-------|
| 宽度 | 100% | 撑满容器 |
| 高度 | 60px | - |
| 内边距 | 0 16px（左右） | Gap: 16px |
| 背景色 | `#FFFFFF` | Black NO.1 |
| 边框 | 1px solid `#6445D1` | Functional Purple |
| 边框（激活/已输入） | 1px solid `#6445D1` | 同上，状态不区分 |
| 圆角 | 4px | radius-sm |
| Flex | `flex: 1` | 撑满剩余空间 |

### 2.3 搜索框内部结构

| 属性 | 值 |
|------|-----|
| 布局 | Flex Row，align-items: center |
| 元素间距 | 8px（图标/分割线与文字） |
| 垂直对齐 | 居中 |

---

## 三、排版规范

### 3.1 占位符文字（Default 状态）

| 属性 | 值 |
|------|-----|
| 字号 | 20px |
| 字重 | 600 (Bold) |
| 行高 | 28px |
| 字体 | PingFang SC |
| 颜色 | `#9E9E9E` → Grey NO.5 |

### 3.2 输入文字（Filled 状态）

| 属性 | 值 |
|------|-----|
| 字号 | 22px |
| 字重 | 600 (Bold) |
| 行高 | 30px |
| 字体 | PingFang SC |
| 颜色 | `#333333` → Black NO.6 |

### 3.3 分割线（竖线）

| 属性 | 值 |
|------|-----|
| 字符 | `|` |
| 字号 | 22px |
| 字重 | 600 |
| 颜色 | `#6445D1` → Functional Purple |
| 左右间距 | 8px |

### 3.4 标签文字（Active 状态）

| 属性 | 值 |
|------|-----|
| 字号 | 22px |
| 字重 | 600 (Bold) |
| 行高 | 30px |
| 字体 | PingFang SC |
| 颜色 | `#666666` → Black NO.5 |

---

## 四、状态规范

### 4.1 状态定义

| 状态 | 类名 | 搜索框内容 | 右侧操作区 | 交互 |
|------|------|-----------|-----------|------|
| **Default（默认）** | `.search-bar--default` | 搜索图标 + 占位符文字 | 无 | 点击 → Active |
| **Active（输入中）** | `.search-bar--active` | 标签文字 + 分割线 `|` | 取消按钮 | 输入字符 → Filled；点击取消 → Default |
| **Filled（已输入）** | `.search-bar--filled` | 输入文字 + 分割线 `|` | 清空图标 + 确定 + 取消 | 点击清空 → Active；点击确定 → 提交；点击取消 → Default |

### 4.2 右侧操作区

| 元素 | 尺寸 | 颜色 | 行为 |
|------|------|------|------|
| 清空图标 | 22×22px | `#666666` | 点击清空内容 → Active |
| 确定按钮 | 字号 22px，行高 30px，圆角 640px | 文字色 `#6445D1` | 点击提交搜索 |
| 取消按钮 | 字号 22px，行高 30px，圆角 640px | 文字色 `#6445D1` | 点击取消 → Default |

### 4.3 状态切换动画

| 属性 | 值 |
|------|-----|
| 动画时长 | 200ms |
| 缓动函数 | `cubic-bezier(0.4, 0, 0.2, 1)` |

---

## 五、图标规范

| 用途 | 图标文件 | 尺寸 | 说明 |
|------|---------|------|------|
| 搜索图标 | `icon_search_outline.svg` 或 `icon_search.svg` | 22×22px | Default 状态左侧 |
| 清空图标 | `icon_close_two_outline.svg` | 22×22px | Filled 状态右侧清空 |

---

## 六、组件代码

### 6.1 HTML 结构

```html
<!-- 场景一：默认状态 (Default) -->
<div class="search-bar search-bar--default">
  <div class="search-bar__input-wrapper">
    <img
      class="search-bar__icon"
      src="./icons/icon_search_outline.svg"
      alt="搜索"
    />
    <span class="search-bar__placeholder">请扫描/输入运单号</span>
  </div>
</div>

<!-- 场景二：输入中 (Active) -->
<div class="search-bar search-bar--active">
  <div class="search-bar__input-wrapper">
    <span class="search-bar__label">请输入</span>
    <span class="search-bar__divider">|</span>
  </div>
  <button class="search-bar__btn search-bar__btn--cancel">取消</button>
</div>

<!-- 场景三：已输入内容 (Filled) -->
<div class="search-bar search-bar--filled">
  <div class="search-bar__input-wrapper">
    <span class="search-bar__text">已输入的文案</span>
    <span class="search-bar__divider">|</span>
  </div>
  <div class="search-bar__actions">
    <img
      class="search-bar__clear-icon"
      src="./icons/icon_close_two_outline.svg"
      alt="清除"
    />
    <button class="search-bar__btn search-bar__btn--confirm">确定</button>
    <button class="search-bar__btn search-bar__btn--cancel">取消</button>
  </div>
</div>
```

### 6.2 CSS 样式

```css
/* ==========================================
 SearchBar 组件
 ========================================== */

.search-bar {
  width: 480px;
  height: 84px;
  display: flex;
  align-items: center;
  padding: 8px 12px 16px;
  box-sizing: border-box;
  gap: 8px;
}

/* 搜索框主体 */
.search-bar__input-wrapper {
  flex: 1;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  background: #FFFFFF; /* Black NO.1 */
  border: 1px solid #6445D1; /* Functional Purple */
  border-radius: 4px; /* radius-sm */
  gap: 8px;
  box-sizing: border-box;
}

/* 搜索图标 */
.search-bar__icon {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
}

/* 占位符 */
.search-bar__placeholder {
  font-family: 'PingFang SC', sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  color: #9E9E9E; /* Grey NO.5 */
  flex: 1;
}

/* 输入文字 */
.search-bar__text {
  font-family: 'PingFang SC', sans-serif;
  font-size: 22px;
  font-weight: 600;
  line-height: 30px;
  color: #333333; /* Black NO.6 */
  flex: 1;
}

/* 标签文字 */
.search-bar__label {
  font-family: 'PingFang SC', sans-serif;
  font-size: 22px;
  font-weight: 600;
  line-height: 30px;
  color: #666666; /* Black NO.5 */
}

/* 分割线 */
.search-bar__divider {
  font-family: 'PingFang SC', sans-serif;
  font-size: 22px;
  font-weight: 600;
  line-height: 30px;
  color: #6445D1; /* Functional Purple */
  flex-shrink: 0;
}

/* 操作区 */
.search-bar__actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

/* 清空图标 */
.search-bar__clear-icon {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  cursor: pointer;
  filter: brightness(0) saturate(100%) invert(36%) sepia(0%) saturate(0%)
    hue-rotate(323deg) brightness(95%) contrast(86%); /* #666666 */
}

/* 按钮 */
.search-bar__btn {
  font-family: 'PingFang SC', sans-serif;
  font-size: 22px;
  font-weight: 600;
  line-height: 30px;
  color: #6445D1; /* Functional Purple */
  background: transparent;
  border: none;
  border-radius: 640px; /* radius-full */
  padding: 4px 8px;
  cursor: pointer;
  transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.search-bar__btn:active {
  opacity: 0.6;
}
```

---

## 七、状态机交互逻辑

```
┌─────────────┐  点击输入框   ┌─────────────┐  输入字符   ┌─────────────┐
│   Default   │ ───────────→  │   Active    │ ─────────→  │   Filled    │
│  (默认状态)  │               │  (输入中)    │             │  (已输入)   │
└─────────────┘               └─────────────┘             └─────────────┘
     ↑                              ↑                              │
     │                              │                              │
     └──────────────────────────────┴───────  点击"取消"/清空 ──────┘
```

| 交互操作 | 触发条件 | 结果状态 |
|---------|---------|---------|
| 点击输入框 | Default 时点击搜索框 | → Active |
| 开始输入 | Active 时输入字符 | → Filled |
| 清空内容 | Filled 时点击清空图标 | → Active |
| 确认搜索 | Filled 时点击"确定" | 提交搜索结果 |
| 取消 | Active/Filled 时点击"取消" | → Default |

---

## Changelog

| 版本 | 日期 | 变更内容 |
|------|------|---------|
| v1.1.0 | 2026-04-22 | 新增：Purpose、Design Tokens 完整 token 矩阵、Props Contract TypeScript 接口、Code Mapping、AI Notes、Variants Overview、Changelog；优化 Interaction Flow 状态机结构；补充 Use When/Avoid When 决策表 |
