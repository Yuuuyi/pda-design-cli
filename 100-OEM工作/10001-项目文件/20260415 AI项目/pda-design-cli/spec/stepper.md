# 步进器 (Stepper)

> **v1.1.0** | 最后更新：2026-04-22
> 新增：Purpose、Interaction Flow（结构化）、AI Notes、Code Mapping、Design Tokens 结构化；规范化 Props Contract

---

## Purpose

PDA Stepper 用于**精确数值增减操作**，典型场景如购物车商品数量、包裹件数等。步进器强制数值在 [0, 业务上限] 范围内调整，避免用户输入越界值。

核心特征：
- 固定尺寸：146×40px，不随数值位数变化
- 精确控制：仅支持整数 +1/-1 步进
- 边界感知：0 时自动禁用减号，防止越界

---

## Use When / Avoid When

### ✅ Use When — 选这个组件的场景

| 场景 | 说明 |
|------|------|
| 商品/包裹数量调整 | 增减操作，有明确上下限 |
| 计数器（有限范围） | 如库存数量、已选件数 |
| 表单数值微调 | 需要精确控制而非自由输入 |

### ❌ Avoid When — 不要用这个组件的场景

| 场景 | 替代方案 |
|------|---------|
| 需要自由输入任意数值（整数或小数） | InputField |
| 只需展示固定数值，无操作需求 | 普通文本 |
| 需要多位数联动（如金额计算） | InputField + 计算逻辑 |

---

## Interaction Flow

> Stepper 是**边界感知型**组件，状态由当前数值决定。

```
数值 = 0：
  减号 Disabled（#D6D6D6，不可点击）
  加号 Active（#333333，可点击）
  数值文本 Disabled（#D6D6D6）

数值 > 0：
  减号 Active（#333333，可点击）
  加号 Active（#333333，可点击）
  数值文本 Active（#333333）

数值 = 业务上限（由业务定义）：
  减号 Active
  加号 Disabled
```

**状态触发规则：**
- **加号 Disabled**：当 `value >= max`（业务上限，组件不硬编码）
- **减号 Disabled**：当 `value <= 0`（固定下限，不可配置）
- **数值 Disabled**：当 `value = 0`
- 增减按钮触发时，数值立即更新（无延迟），`onChange(value ± 1)` 回调触发

---

## Design Tokens

### 核心参数

| Token | 值 |
|-------|-----|
| 组件宽度 | 146px（固定，不可伸缩）|
| 组件高度 | 40px（固定）|
| 图标按钮尺寸 | 40×40px |
| 数值区域宽度 | 66px（146 - 40 - 40）|
| 数值区内边距 | 6px 8px |

### 数值文本 Token

| 状态 | 字号 | 字重 | 行高 | 颜色 | Token |
|------|------|------|------|------|-------|
| **Active** | 22px | 600 (Bold) | 32px | `#333333` | Black NO.6 |
| **Disabled** | 22px | 600 (Bold) | 32px | `#D6D6D6` | Grey NO.3 |

### 图标 Token

| 图标 | 英文名 | 尺寸 | 颜色（Active）| 颜色（Disabled）|
|------|--------|------|-------------|---------------|
| 减号 | `stepper_minus.svg` | 40×40px | `#333333` (Black NO.6) | `#D6D6D6` (Grey NO.3) |
| 加号 | `stepper_add.svg` | 40×40px | `#333333` (Black NO.6) | `#D6D6D6` (Grey NO.3) |

---

## Props Contract

| Prop | 类型 | 必填 | 说明 |
|------|------|------|------|
| `value` | `number` | 是 | 当前数值 |
| `min` | `number` | 否（默认 0） | 最小值 |
| `max` | `number` | 否（默认 Infinity） | 最大值（业务定义） |
| `step` | `number` | 否（默认 1） | 步进单位（目前固定 1） |
| `onChange` | `(value: number) => void` | 是 | 数值变化回调 |
| `disabled` | `boolean` | 否（默认 false） | 全组件禁用 |
| `className` | `string` | 否 | 自定义类名 |

---

## Code Mapping

| 平台 | 路径 | 状态 |
|------|------|------|
| React | `src/components/Stepper/index.tsx` | 待补充 |
| Vue | - | 待实现 |
| iOS (SwiftUI) | - | 待实现 |
| Android (XML) | - | 待实现 |
| Storybook | - | 待补充 |

---

## AI Notes

**为什么宽度固定 146px 而不是随数值自适应？**
固定宽度避免数值位数变化时布局抖动（如 1 → 100 时组件宽度会突然变大）。数值居中显示，位数少时两侧留白，位数多时自然撑满，这是刻意设计的 UX 决策。

**为什么减号在 0 时禁用，而加号在 max 时才禁用？**
0 是业务的通用下限（数量不能为负），组件层面硬编码。max 由业务决定（如库存上限），需要业务侧传入。两者边界不同，所以禁用逻辑分开处理。

**为什么图标尺寸是 40×40px 而不是 32px？**
图标需要与 40px 高的组件对齐，40×40px 让图标撑满按钮高度，保证触控区域最大化。触控按钮本身是 40×40px，图标在按钮内居中。

**为什么图标从 stepper_minus.svg 和 stepper_add.svg 调用而不是通用 minus/add 图标？**
Stepper 的图标是定制图标（线条粗细、圆角与 Stepper 尺寸匹配），通用 minus/add 图标可能比例不匹配。必须使用 spec/icons/ 内的专用图标。

**为什么不支持小数步进（step=0.1）？**
PDA 步进器主要用于包裹数量、件数等整数场景，小数无实际业务意义。若未来需要小数支持，需重新评估交互方案（此时 InputField 更适合）。

---

## Variants Overview

> Stepper 目前为单一变体，无尺寸变体。

| 变体 | 尺寸 | 说明 |
|------|------|------|
| **标准步进器** | 146×40px | 固定尺寸，通用场景 |

---

## 核心参数

| 属性 | 值 | Token |
|------|-----|-------|
| 组件宽度 | 146px（固定）| - |
| 组件高度 | 40px | - |
| 图标按钮尺寸 | 40×40px | - |
| 数值区域内边距 | 6px 8px | Gap: 6px V / 8px H |
| 数值字号 | 22px | Typography: Bold |
| 数值字重 | 600 (Bold) | - |
| 数值行高 | 32px | - |

---

## 详细规格

### 一、布局

```
[图标 40×40] [数值区域 66px] [图标 40×40]
←─────────────── 146px ────────────────→
```

- 外层容器：`display: flex; align-items: center; justify-content: space-between`
- 数值区域：`flex: 1`，文本水平垂直居中
- 图标：固定 40×40px，可点击区域最大

### 二、交互动效

| 属性 | 值 |
|------|-----|
| 过渡时长 | 200ms |
| 缓动函数 | ease-out |
| 过渡内容 | 颜色、透明度 |

---

## 约束与边界

1. **宽度固定**：组件总宽度 146px，不支持伸缩
2. **数值显示范围**：最大显示 `9999`，超出显示 `9999+`
3. **数值精度**：仅支持整数（不支持小数）
4. **最小值**：固定 `0`，不可低于此值
5. **最大值**：由业务侧定义（通过 `max` prop），组件不硬编码
6. **初始值**：由业务侧传入，组件不预设默认值

---

## 代码示例

```jsx
const Stepper = ({ value, min = 0, max = Infinity, onChange }) => {
  const handleMinus = () => {
    if (value > min) onChange(value - 1);
  };
  const handlePlus = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div className="stepper" style={{ width: '146px', height: '40px', display: 'flex', alignItems: 'center' }}>
      <button
        className="stepper-btn"
        disabled={value <= min}
        onClick={handleMinus}
        aria-label="减少"
      >
        {/* stepper_minus.svg */}
      </button>
      <span
        className="stepper-value"
        style={{ color: value === 0 ? '#D6D6D6' : '#333333' }}
      >
        {value > 9999 ? '9999+' : value}
      </span>
      <button
        className="stepper-btn"
        disabled={value >= max}
        onClick={handlePlus}
        aria-label="增加"
      >
        {/* stepper_add.svg */}
      </button>
    </div>
  );
};
```

---

## 关联组件

| 组件 | 关系 |
|------|------|
| InputField | Stepper 的"自由输入"替代方案 |
| NumberInput | Stepper + InputField 的组合版本 |

---

## Changelog

| 版本 | 日期 | 变更 |
|------|------|------|
| v1.1.0 | 2026-04-22 | 新增 Purpose、Interaction Flow（结构化）、AI Notes、Code Mapping、Design Tokens 结构化；规范化 Props Contract |
| v1.0.0 | 2026-04-16 | 初始版本 |
