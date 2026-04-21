# InputField (输入框)

---

## 何时使用

**用这个组件，当：**
- 用户需要手动输入文字、数字、备注等（不涉及扫码）

**不要用这个组件，当：**
- 需要扫码识别 → 用 ScanInput
- 只是展示信息 → 用 Text 或 Tag
- 需要选择而非输入 → 用 Select / Dropdown / DatePicker

**InputField vs ScanInput 决策：**

```
需要扫码吗？
├─ 是 → ScanInput
└─ 否 → InputField

输入内容是什么？
├─ 运单号（可扫码）→ ScanInput
├─ 纯文字备注 → InputField
├─ 数字金额 → InputField
└─ 日期选择 → DatePicker / Dropdown
```

---

## 1. 组件概览

- **类型：** 基础表单组件
- **支持状态：**
  - Empty (未输入)：显示占位符，视觉层级较弱。
  - Filled (已输入)：显示用户输入的文本，视觉层级较强。
- **布局结构：** 整体容器 → 输入行（固定标题 + 弹性输入区 + 图标）→ 底部分割线。

## 2. 设计变量映射 (Design Tokens)

### 2.1 颜色 (Colors)

| UI 元素 | 属性 | 设计系统 Token | 色值 | 说明 |
|---------|------|---------------|------|------|
| 背景 (Input Row) | background | Color-Functional-Black NO.1 | #FFFFFF | 全局白色背景 |
| 标题文字 (Label) | color | Color-Functional-Black NO.6 | #333333 | 字重 Heavy/Bold |
| 输入文字 (Filled) | color | Color-Functional-Black NO.6 | #333333 | 正文内容色 |
| 占位符 (Empty) | color | Color-Functional-Grey NO.5 | #9E9E9E | 弱文本色（原代码为 #BBBBBB，按设计系统修正为 NO.5） |
| 分割线 (Divider) | color | Color-Functional-Grey NO.2 | #EEEEEE | 默认背景/分割线颜色 |

### 2.2 排版 (Typography)

遵循 PingFang SC 字体族：

| UI 元素 | 字重 | 字号 (px) | 行高 (px) |
|---------|------|-----------|-----------|
| 标题 (Label) | Heavy / Bold | 20px | 28px |
| 输入内容/占位符 | Regular | 20px | 28px |

### 2.3 布局与间距 (Layout & Spacing)

| 属性 | 数值 | 对应 Token | 说明 |
|------|------|-----------|------|
| 组件总宽 | 480px | - | 固定宽度 |
| 组件总高 | 70px | - | 固定高度 |
| 容器内边距 | 16px | - | 上下左右内边距 |
| 标题与输入区间距 | 16px | Gap (Default) | 默认间距 |
| 标题宽度 | 120px | - | 固定宽度，不伸缩 |

### 2.4 右侧插槽 (Right Slot)

输入框右侧支持灵活配置，通过 `rightSlot` 属性传入不同类型的组件。

#### 插槽类型支持

| 类型 | 组件示例 | 适用场景 |
|------|---------|---------|
| **图标** | `IconSearch`, `IconClose`, `IconArrowRight` | 搜索、清除、跳转 |
| **按钮** | `Button` (文字/图标按钮) | 发送验证码、确认操作 |
| **下拉** | `Select`, `Dropdown` | 单位选择、地区选择 |
| **自定义** | 任意 React/Vue 组件 | 特殊业务需求 |

#### 图标调用规则

> **重要：输入框内图标需调用 icon 包**

输入框内图标必须从 `pda-design-cli/spec/icons/` 目录调用。

| 用途 | 推荐图标 | 文件名 | 说明 |
|------|---------|--------|------|
| 搜索触发 | `search` | `icon_search.svg` | 点击展开搜索 |
| 跳转入口 | `arrow_right` | `icon_arrow_right.svg` | 点击进入详情 |
| 清除内容 | `close` | `icon_close.svg` | 点击清空输入 |
| 下拉展开 | `arrow_down` | `icon_arrow_down.svg` | 下拉选择指示 |
| 扫描触发 | `scanning` | `icon_scanning_outline.svg` | 调起扫码功能 |

- 图标尺寸：`24px × 24px`
- 图标颜色：默认 `#333333` (Black NO.6)，禁用态 `#9E9E9E` (Grey NO.5)
- ~~`<img class="input-icon" src="./asset/icons/svg_0c378d38.svg" />`~~ → 请改用 icon 包引用

**引用方式：**
```typescript
import { IconSearch, IconClose, IconArrowDown } from '@/components/icon';

// 图标插槽
<InputField
  label="标题名称"
  rightSlot={<IconSearch />}
/>

// 按钮插槽
<InputField
  label="手机号"
  rightSlot={<Button size="small">获取验证码</Button>}
/>

// 下拉插槽
<InputField
  label="地区"
  value="北京市"
  rightSlot={<IconArrowDown />}
/>
```

完整图标列表见 `spec/icons/index.json`。

#### 插槽布局规范

```
┌─────────────────────────────────────────┐
│  标题名称    输入内容          [插槽]   │  ← 插槽区域固定右对齐
│  ─────────────────────────────────────  │
└─────────────────────────────────────────┘
              ↑
         插槽与输入内容间距：8px
         插槽与容器右边距：16px
```

- 插槽区域最大宽度：120px（超出时截断或换行）
- 多个元素时水平排列，间距 `8px`
- 插槽内元素垂直居中对齐

## 3. 组件结构

```html
<!-- Root Container: 定义整体尺寸 -->
<div class="input-field-container">

  <!-- Input Row: 实际输入区域 -->
  <div class="input-field-row">

    <!-- Label: 左侧标题 (固定样式) -->
    <label class="input-label">标题名称</label>

    <!-- Input Area: 中间输入区域 -->
    <div class="input-area">
      <!--
      根据状态切换 class 或内容：
      - Empty State: <span class="input-placeholder">请输入</span>
      - Filled State: <span class="input-value">已输入文本</span>
      -->
      <span class="input-value">已输入文本</span>
    </div>

    <!-- Right Slot: 右侧插槽（图标/按钮/下拉等） -->
    <div class="input-right-slot">
      <!-- 可配置：图标、按钮、下拉组件等 -->
      <img class="input-icon" src="icon_search.svg" />
    </div>

  </div>

  <!-- Divider: 底部分割线（使用 CSS border 实现） -->
  <div class="input-divider"></div>

</div>
```

## 4. 状态差异对照表

| 维度 | Empty (未输入) | Filled (已输入) | 处理方式 |
|------|---------------|----------------|----------|
| 内容源 | placeholder Prop | value Prop | 组件内部逻辑判断 |
| 显示文本 | 请输入 | 已输入文本 | 动态渲染 |
| 文字颜色 | #9E9E9E (Grey NO.5) | #333333 (Black NO.6) | 绑定不同 CSS Class |
| 交互焦点 | 聚焦后光标显示在占位符位置 | 聚焦后光标显示在文本末尾 | 原生 input 行为 |

## 5. Props 定义 (TypeScript)

```typescript
interface InputFieldProps {
  /** 左侧标题 */
  label: string;
  /** 已输入的文本值 (Filled 状态) */
  value?: string;
  /** 占位符文本 (Empty 状态)，默认为 "请输入" */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 
   * 右侧插槽内容
   * 支持：图标组件、按钮、下拉选择器、自定义组件
   * @deprecated iconSrc 已废弃，请使用 rightSlot
   */
  rightSlot?: React.ReactNode;
  /** @deprecated 请使用 rightSlot */
  iconSrc?: string;
}

// 使用示例

// 基础用法
<InputField label="标题名称" placeholder="请输入" />

// 带搜索图标
<InputField 
  label="搜索" 
  placeholder="请输入关键词"
  rightSlot={<IconSearch />}
/>

// 带清除按钮（有内容时显示）
<InputField 
  label="用户名" 
  value="张三"
  rightSlot={<IconClose onClick={handleClear} />}
/>

// 带验证码按钮
<InputField 
  label="手机号" 
  placeholder="请输入手机号"
  rightSlot={<Button size="small" disabled={counting}>{count}秒后重发</Button>}
/>

// 带下拉指示
<InputField 
  label="地区" 
  value="北京市"
  rightSlot={<IconArrowDown />}
  onClick={() => setPickerVisible(true)}
/>
```

## 6. 右侧插槽样式规范

```css
.input-field-row {
  display: flex;
  align-items: center;
  padding: 16px;
}

.input-label {
  width: 120px;
  flex-shrink: 0;
  font-weight: bold;
  color: #333333;
}

.input-area {
  flex: 1;
  min-width: 0; /* 确保 flex 子项可以收缩 */
}

.input-right-slot {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;
  max-width: 120px;
  flex-shrink: 0;
}

/* 插槽内图标样式 */
.input-right-slot .icon {
  width: 24px;
  height: 24px;
  color: #333333; /* Black NO.6 */
}

/* 禁用态 */
.input-field-container.disabled .input-right-slot .icon {
  color: #9E9E9E; /* Grey NO.5 */
}

/* 插槽内按钮样式 */
.input-right-slot .btn {
  font-size: 14px;
  padding: 4px 12px;
  white-space: nowrap;
}
```

## 7. 常见组合示例

| 场景 | 插槽配置 | 交互说明 |
|------|---------|---------|
| 搜索框 | `IconSearch` | 点击图标触发搜索 |
| 可清除输入 | 有内容时显示 `IconClose` | 点击清空输入内容 |
| 手机验证码 | `Button` | 点击发送验证码，倒计时禁用 |
| 地区选择 | `IconArrowDown` + 点击展开 | 点击整行或图标展开选择器 |
| 扫码输入 | `IconScanning` | 点击调起扫码功能 |
| 跳转详情 | `IconArrowRight` | 点击进入详情页 |

## 总结

通过将两种状态合并为一个组件，避免了代码重复。组件内部通过判断 `value` 是否存在来决定渲染"占位符"（弱色）还是"实际值"（主色），从而完美适配设计系统中的 Color-Functional-Black 与 Color-Functional-Grey 层级。

**v1.2.6 更新**：新增 `rightSlot` 属性，支持图标、按钮、下拉等灵活配置，废弃 `iconSrc` 属性。
