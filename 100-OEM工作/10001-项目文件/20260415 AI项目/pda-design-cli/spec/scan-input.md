# 扫描框组件 (ScanInput)

> **v1.2.0** | 最后更新：2026-04-22
> 新增：Purpose、Interaction Flow（结构化）、AI Notes、Code Mapping、Variants Overview；规范化 Design Tokens 和 Props Contract

---

## Purpose

PDA ScanInput 是扫描场景的**专用输入组件**，用于运单号、托盘码、包裹码等条码/二维码的扫描识别。**必须独占一行**，通常置于页面顶部或操作区。

核心特征：
- 左侧：未扫态显示扫描引导图标，已扫态显示复制图标+运单号
- 右侧：操作按钮（"查件"/"查询"等），未扫时禁用
- 强制规范：扫描运单场景必须使用此组件，禁止自定义实现

---

## Use When / Avoid When

### ✅ Use When — 选这个组件的场景

| 场景 | 说明 |
|------|------|
| 运单号扫描（运单/快件/收件/派件）| 扫描运单号的核心入口 |
| 托盘码扫描 | 仓库托盘扫描 |
| 包裹码扫描 | 包裹级扫描 |
| 入库/出库扫描 | 仓库管理扫描 |

> 所有扫描运单相关组件**必须使用** ScanInput，不可自定义实现。

### ❌ Avoid When — 不要用这个组件的场景

| 场景 | 替代方案 |
|------|---------|
| 纯文字搜索（非扫描场景） | SearchBar |
| 数字/金额/备注等文字输入 | InputField |
| 日期、人名等选择类输入 | Select / Dropdown |

**组件选择决策树：**

```
主要操作是扫描条码？
├─ 是 → ScanInput
└─ 否，以文字输入为主 → SearchBar
    └─ 需要确定/取消确认？→ SearchBar
    └─ 输入即触发 → InputField
```

---

## Interaction Flow

> ScanInput 是**状态驱动型**组件，左侧和右侧内容随扫描状态联动变化。

```
未扫态 (Empty)
    │
    ├──[点击左侧图标]──→ 触发扫码（唤起扫码枪或软键盘）
    │
    └──[扫码成功]──→ 已扫态 (Filled)
                        │
                        ├──[点击复制图标]──→ 复制运单号 → Toast 提示
                        │
                        └──[点击右侧操作按钮]──→ 执行操作（查件/查询等）
```

**状态矩阵：**

| 状态 | 左侧内容 | 左侧图标颜色 | 右侧按钮 | 右侧按钮状态 |
|------|---------|------------|---------|------------|
| **Empty（未扫）** | 扫描引导图标 | `#666666` | 操作按钮 | **Disabled** |
| **Filled（已扫）** | 复制图标 + 运单号文本 | `#666666` | 操作按钮 | **Active** |

**布局规则（强制）：**
- ScanInput 必须**独占一行**，不可与其他组件并列
- 上下间距固定 **16px**
- 宽度固定 **448px**，与按钮系统一致

---

## Design Tokens

### 核心参数

| Token | 值 |
|-------|-----|
| 宽度 | 448px |
| 高度 | 64px（与 Button Large 一致）|
| 内边距 | 0 16px |
| 元素间距 | 8px / 16px |
| 边框 | 1px solid #6445D1 |
| 圆角 | 8px |
| 背景 | #FFFFFF (Black NO.1) |

### Token 矩阵

| 元素 | 值 | Token |
|------|------|-------|
| 边框 | `#6445D1` | Primary NO.6 |
| 已扫文本 | `#333333` | Black NO.6 |
| 图标色 | `#666666` | Black NO.5 |
| 占位符文本 | `#9E9E9E` | Grey NO.5 |
| 背景 | `#FFFFFF` | Black NO.1 |

### 排版 Token

| 元素 | 字号 | 行高 | 字重 | 颜色 |
|------|------|------|------|------|
| 已扫单号 | 22px | 30px | Bold | `#333333` (Black NO.6) |
| 占位符 | 20px | 28px | Regular | `#9E9E9E` (Grey NO.5) |

---

## Props Contract

| Prop | 类型 | 必填 | 说明 |
|------|------|------|------|
| `value` | `string` | 否 | 当前扫描值（为空表示未扫态） |
| `placeholder` | `string` | 否（默认"请扫描/输入运单号"）| 未扫态占位符 |
| `actionText` | `string` | 是 | 右侧操作按钮文字（如"查件"/"查询"） |
| `onScan` | `(value: string) => void` | 否 | 扫描成功回调 |
| `onAction` | `(value: string) => void` | 否 | 右侧按钮点击回调 |
| `onCopy` | `(value: string) => void` | 否 | 复制运单号回调 |
| `disabled` | `boolean` | 否（默认 false）| 整体禁用 |
| `className` | `string` | 否 | 自定义类名 |

---

## Code Mapping

| 平台 | 路径 | 状态 |
|------|------|------|
| React | `src/components/ScanInput/index.tsx` | 待补充 |
| Vue | - | 待实现 |
| iOS (SwiftUI) | - | 待实现 |
| Android (XML) | - | 待实现 |
| Storybook | - | 待补充 |

---

## AI Notes

**为什么复制图标在左侧而操作按钮在右侧？**
操作按钮（"查件"/"查询"）是主操作，视觉权重更高，放在右侧符合 F 形阅读习惯和操作按钮位置约定。复制图标是辅助功能，放在左侧次要位置。

**为什么必须使用 icon_copy_outline.svg 而不是其他复制图标？**
规范强制指定 `icon_copy_outline.svg`，因为它与 ScanInput 的图标风格一致（outline 版本而非实心版本），保持扫描框内部的图标视觉统一。

**为什么边框色是 Primary NO.6（#6445D1）而非 Grey？**
ScanInput 是核心扫描入口，紫色边框提供视觉识别度，让用户快速定位扫描区域。这是 ScanInput 的专属标识色，与按钮系统的 Primary 色彩一致。

**为什么未扫态时操作按钮 Disabled 而非隐藏？**
Disabled 状态告知用户"需要先完成扫描才能操作"，比隐藏更清晰。若隐藏按钮，用户不知道接下来应该做什么。

**为什么 ScanInput 不能与其他组件同行排列？**
扫描需要精准定位（同屏只有一个扫描目标），同行排列会分散注意力。强制独占一行确保扫描区域始终清晰可见。

---

## Variants Overview

> ScanInput 目前为单一变体，通过 `scene` prop 可扩展不同业务场景（运单/托盘/包裹），但视觉规格统一。

| 变体 | 场景 | 说明 |
|------|------|------|
| **标准扫描框** | 通用扫描 | 默认尺寸，448×64px |
| 运单扫描 | 快件/收件/派件 | ScanInput + 运单业务逻辑 |
| 托盘扫描 | 仓库管理 | ScanInput + 托盘业务逻辑 |

---

## 核心参数

| 属性 | 值 | Token |
|------|-----|-------|
| 宽度 | 448px | - |
| 高度 | 64px | 复用 Button Large |
| 内边距 | 0 16px | Gap: 16px |
| 圆角 | 8px | Radius: 8px |
| 边框 | 1px solid #6445D1 | Primary NO.6 |
| 背景 | #FFFFFF | Black NO.1 |
| 扫描引导图标 | 22×22px | icon_qr_code.svg |
| 复制图标 | 22×22px | icon_copy_outline.svg |

---

## 详细规格

### 一、图标规范

| 状态 | 位置 | 图标 | 文件名 | 颜色 | 说明 |
|------|------|------|--------|------|------|
| **未扫态** | 左侧 | 扫描引导 | `icon_qr_code.svg` | `#666666` | 点击触发扫码 |
| **已扫态** | 左侧 | 复制 | `icon_copy_outline.svg` | `#666666` | 点击复制运单号 |

> **强制约束**：复制按钮必须使用 `icon_copy_outline.svg`，禁止使用 `icon_copy_two.svg` 或其他复制图标。

### 二、操作按钮

- 按钮样式：继承 `buttons.md` 规范，推荐 Primary Outline 或 Ghost
- 按钮文字：由业务决定（"查件"/"查询"/"详情"等）
- Disabled 态：未扫时置灰，不可点击

---

## 强制约束（绝对禁止违规）

| 禁止 | 说明 |
|------|------|
| ❌ 扫描框与按钮同行排列 | 必须独占一行 |
| ❌ 自定义输入框替代 ScanInput | 必须使用此组件 |
| ❌ 修改核心样式（高度/圆角/边框）| 固定规格，禁止修改 |
| ❌ 使用其他复制图标 | 必须使用 `icon_copy_outline.svg` |

---

## 代码示例

```jsx
const ScanInput = ({
  value,
  actionText,
  onScan,
  onAction,
  onCopy,
  placeholder = '请扫描/输入运单号',
}) => {
  const isEmpty = !value;

  return (
    <div className="scan-input">
      {/* 左侧区域 */}
      <div className="scan-input__left">
        {isEmpty ? (
          <ScanIcon /> // icon_qr_code.svg
        ) : (
          <CopyIcon onClick={() => onCopy?.(value)} /> // icon_copy_outline.svg
        )}
        <span style={{ color: isEmpty ? '#9E9E9E' : '#333333' }}>
          {isEmpty ? placeholder : value}
        </span>
      </div>

      {/* 右侧操作按钮 */}
      <button
        className="scan-input__action"
        disabled={isEmpty}
        onClick={() => !isEmpty && onAction?.(value)}
      >
        {actionText}
      </button>
    </div>
  );
};
```

```css
.scan-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 448px;
  height: 64px;
  padding: 0 16px;
  background: #FFFFFF;
  border: 1px solid #6445D1;
  border-radius: 8px;
  box-sizing: border-box;
  /* 上下间距由父容器控制（16px）*/
}
```

---

## 关联组件

| 组件 | 关系 |
|------|------|
| InputField | ScanInput 的"手动文字输入"替代方案 |
| SearchBar | ScanInput 的"搜索"替代方案（非扫描）|
| Button | 右侧操作按钮样式参考 |

---

## Changelog

| 版本 | 日期 | 变更 |
|------|------|------|
| v1.2.0 | 2026-04-22 | 新增 Purpose、Interaction Flow（结构化）、AI Notes、Code Mapping、Variants Overview；规范化 Design Tokens 和 Props Contract |
| v1.1.0 | 2026-04-21 | 布局修正：复制图标从右侧移至左侧，右侧仅放置操作按钮 |
| v1.0.0 | 2026-04-16 | 初始版本 |
