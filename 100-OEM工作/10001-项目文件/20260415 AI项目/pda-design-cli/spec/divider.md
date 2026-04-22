# 分割线 (Divider)

> **v1.1.0** | 最后更新：2026-04-22
> 新增：Purpose、Use When/Avoid When、Interaction Flow（声明无状态）、AI Notes、Props Contract

---

## Purpose

分割线用于在内容区块之间建立视觉分隔，帮助用户快速识别信息层级。**Divider 是纯展示组件，无交互状态**（无 Default/Pressed/Disabled），仅有线条类型变体。

---

## Use When / Avoid When

### ✅ Use When — 选这个组件的场景

| 场景 | 推荐变体 |
|------|---------|
| 不同功能区域的分隔 | **Solid** |
| 列表项之间的分隔 | **Solid** |
| 表单字段的分隔 | **Solid** |
| 内容区块的大块断点 | **Solid** |
| 可选内容的分隔（弱化视觉） | **Dashed** |
| 临时/待确认内容的分隔（传递"待处理"暗示） | **Dashed** |

### ❌ Avoid When — 不要用这个组件的场景

| 场景 | 替代方案 |
|------|---------|
| 页面整体结构分隔（Header/Section/Footer） | 语义化 `<hr>` + 背景色区分 |
| 内容本身已有强视觉层级 | 纯留白（margin/padding 代替） |
| 需要区分不同表单步骤 | Steps / Stepper 组件 |
| 强调某段内容的独立性 | Card 组件 |

---

## Interaction Flow

> Divider 是**无状态**组件，无交互行为。
> 无需定义 Default/Pressed/Disabled 状态，也无需过渡动画。

```text
无状态 — 仅通过 type 属性切换 Solid / Dashed 线条样式
```

---

## Design Tokens

### 核心参数

| Token | 值 |
|-------|-----|
| 颜色 | `#F5F5F5` |
| 线宽 | `1px` |
| 上间距 | `16px` |
| 下间距 | `16px` |
| 宽度 | `100%` |

### Token 矩阵

| 变体 | border-top | margin | Token 映射 |
|------|-----------|--------|-----------|
| **Solid** | `1px solid #F5F5F5` | `16px 0` | Black NO.2 |
| **Dashed** | `1px dashed #F5F5F5` | `16px 0` | Black NO.2 |

---

## Props Contract

| Prop | 类型 | 必填 | 说明 |
|------|------|------|------|
| `type` | `'solid' \| 'dashed'` | 否（默认 solid） | 线条类型 |
| `color` | `string` | 否（默认 #F5F5F5） | 自定义颜色（极少使用） |
| `style` | `CSSProperties` | 否 | 内联样式覆盖 |

---

## Code Mapping

| 平台 | 路径 | 状态 |
|------|------|------|
| React | `src/components/Divider/index.tsx` | 待补充 |
| Vue | - | 待实现 |
| iOS (SwiftUI) | - | 待实现 |
| Android (XML) | - | 待实现 |
| Storybook | - | 待补充 |

---

## AI Notes

**为什么 Divider 不需要 Disabled 状态？**
Divider 是纯展示组件，不接收用户点击事件，因此不存在"禁用"场景。若需要视觉上弱化分隔，应直接移除该 Divider，而不是显示一个禁用态。

**为什么 Solid 和 Dashed 都用同一颜色？**
两者共用 `#F5F5F5` (Black NO.2)。区分在于线条形状，而非颜色。颜色统一保证视觉语言一致，避免页面出现过多色彩噪声。

**为什么间距固定 16px？**
Divider 的作用是建立内容节奏，上下文间距必须固定才能形成一致的视觉节拍。若间距需要灵活调整，应通过父容器 margin 覆盖，而非给 Divider 增加 spacing prop。

---

## Variants Overview

| 变体 | 场景 | 视觉权重 |
|------|------|---------|
| **Solid** | 明确的内容分隔 | 强 |
| **Dashed** | 可选/临时内容 | 弱 |

---

## 核心参数

| 属性 | 值 | Token |
|------|-----|-------|
| 颜色 | `#F5F5F5` | Black NO.2 |
| 线宽 | `1px` | - |
| 上间距 | `16px` | Gap: 16px |
| 下间距 | `16px` | Gap: 16px |
| 宽度 | `100%` | - |

---

## 详细规格

### 一、实线 (Solid)

**描述**：连续的直线，用于明确的内容区块分隔。

**样式**：`border-top: 1px solid #F5F5F5`

### 二、虚线 (Dashed)

**描述**：断续的线条，用于较弱的内容分隔或特殊含义的区分。

**样式**：`border-top: 1px dashed #F5F5F5`

---

## 代码示例

```css
/* 实线 */
.divider-solid {
  border-top: 1px solid #F5F5F5;
  margin: 16px 0;
  width: 100%;
}

/* 虚线 */
.divider-dashed {
  border-top: 1px dashed #F5F5F5;
  margin: 16px 0;
  width: 100%;
}
```

```jsx
const Divider = ({ type = 'solid' }) => (
  <div style={{
    borderTop: `1px ${type} #F5F5F5`,
    margin: '16px 0',
    width: '100%'
  }} />
);

// 用法
<Divider />             // 实线（默认）
<Divider type="solid" />  // 实线
<Divider type="dashed" /> // 虚线
```

---

## 注意事项

1. **避免过度使用**：分割线应服务于内容层级，而非装饰。过多分割线会增加视觉噪音。
2. **保持一致性**：同一页面中，相同场景应使用相同类型的分割线。
3. **间距统一**：所有分割线的上下间距保持 16px，确保视觉节奏一致。
4. **优先留白**：在某些场景下，纯留白比分割线更优雅，优先考虑内容本身的层级关系。

---

## Changelog

| 版本 | 日期 | 变更 |
|------|------|------|
| v1.1.0 | 2026-04-22 | 新增 Purpose、Use When/Avoid When、Interaction Flow（声明无状态）、AI Notes、Props Contract、Code Mapping |
| v1.0.0 | 2026-04-16 | 初始版本 |
