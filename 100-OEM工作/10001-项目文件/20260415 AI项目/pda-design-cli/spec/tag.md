# 标签组件 (Tag)

> **v1.1.0** | 最后更新：2026-04-22
> 新增：Purpose、Interaction Flow、AI Notes、Code Mapping、Variants Overview；规范化 Props Contract

---

## Purpose

PDA Tag 是用于**标记、分类或状态展示**的轻量组件。它是纯展示元件（无操作语义），区别于 Button（操作触发）和 WaybillDisplay（多字段组合展示）。

---

## Use When / Avoid When

### ✅ Use When — 选这个组件的场景

| 场景 | 推荐变体 |
|------|---------|
| 运单状态展示（"已签收"/"待取件"/"已取消"） | Medium / Success/Error/Warning |
| 表单校验错误提示 | Small / Error |
| 分类标签（"加急"/"生鲜"/"到付"） | Small / Primary/Default |
| 筛选标签（可点击多选） | Small / Default |
| 数量/角标提醒 | Small / Info |

### ❌ Avoid When — 不要用这个组件的场景

| 场景 | 替代方案 |
|------|---------|
| 需要触发操作（提交、确认等） | Button |
| 展示运单号+收件人+性别等组合信息 | WaybillDisplay |
| 需要展示完整信息卡片 | Card |
| 数量很多（超过 10 个）需要横向滚动 | Chips / FilterBar |

**Tag vs WaybillDisplay 决策树：**

```
需要展示什么？
├─ 单一状态标签（"已签收"/"待取件"）→ Tag
├─ 运单相关信息组合（运单号+收件人+性别）→ WaybillDisplay
└─ 分类标签（"加急"/"生鲜"/"到付"）→ Tag
```

---

## Interaction Flow

> Tag 有两种模式：**只读模式**和**可点击模式**。

```
只读模式（无 onClick）：
  纯展示，无状态变化

可点击模式（onClick 传入）：
  Default ──[用户按下]──→ Pressed ──[松开]──→ Default
      │                                  ↑
      └──[disabled=true]──→ Disabled ────┘
```

**规则：**
- **可点击 Tag 的 Pressed 态**：背景加深 10%，视觉反馈按下行为（由各颜色变体自行定义深色版）
- **Disabled**：文字和边框颜色淡化，不可触发 Pressed
- **Tag 不存在 Hover 态**：PDA 设备无鼠标悬停，Hover 会浪费渲染性能

**颜色变体 Pressed 态参考（可点击 Tag）：**

| 变体 | Default 背景 | Pressed 背景 | 说明 |
|------|-------------|-------------|------|
| Success | `#F1FFEF` | `#DFF9DF` | 绿色加深约 15% |
| Error | `#FFCCCC` | `#FFB3B3` | 红色加深约 15% |
| Warning | `#FFF3B0` | `#FFE88A` | 黄色加深约 15% |
| Default | `#EEEEEE` | `#E0E0E0` | 灰色加深 |
| Primary | `#F1E7FF` | `#D9C7FA` | 紫色加深 |
| Info | `#D9EFFF` | `#C0E5FF` | 蓝色加深 |

---

## Design Tokens

### 核心参数

| Token | Medium | Small |
|-------|--------|-------|
| 高度 | 32px | 24px |
| 字号 | 18px | 14px |
| 字重 | 400 (Regular) | 600 (Bold) |
| 行高 | 25px | 20px |
| 圆角 | 8px | 4px |
| 内边距 | 4px 12px | 2px 8px |
| 图标尺寸 | 16×16px | 12×12px |
| 图标间距 | 8px | 4px |

### Medium Token 矩阵

| 变体 | 背景 | 边框 | 文字 | Token |
|------|------|------|------|-------|
| **Success** | `#F1FFEF` | `#CCFFCC` | `#4CBB4C` | Green NO.1 / NO.3 / NO.7 |
| **Error** | `#FFCCCC` | `#FF8080` | `#CC0000` | Red NO.1 / NO.3 / NO.7 |
| **Warning** | `#FFF3B0` | `#FFEE8A` | `#F5B000` | Yellow NO.3 / NO.4 / NO.7 |
| **Default** | `#EEEEEE` | `#E0E0E0` | `#52567B` | Grey NO.2 / NO.3 / NO.6 |
| **Primary** | `#F1E7FF` | `#B9A0ED` | `#6445D1` | Primary NO.1 / NO.3 / NO.6 |
| **Info** | `#D9EFFF` | `#C6E6FF` | `#00A2FF` | Blue NO.2 / NO.3 / NO.7 |

### Small Token 矩阵

> Small 与 Medium 共用同一颜色体系，仅尺寸不同。

| 变体 | 背景 | 边框 | 文字 | Token |
|------|------|------|------|-------|
| **Success** | `#F1FFEF` | `#CCFFCC` | `#4CBB4C` | Green NO.1 / NO.3 / NO.7 |
| **Error** | `#FFCCCC` | `#FF8080` | `#CC0000` | Red NO.1 / NO.3 / NO.7 |
| **Warning** | `#FFF3B0` | `#FFEE8A` | `#F5B000` | Yellow NO.3 / NO.4 / NO.7 |
| **Default** | `#EEEEEE` | `#E0E0E0` | `#52567B` | Grey NO.2 / NO.3 / NO.6 |
| **Primary** | `#F1E7FF` | `#B9A0ED` | `#6445D1` | Primary NO.1 / NO.3 / NO.6 |
| **Info** | `#D9EFFF` | `#C6E6FF` | `#00A2FF` | Blue NO.2 / NO.3 / NO.7 |

---

## Props Contract

| Prop | 类型 | 必填 | 说明 |
|------|------|------|------|
| `label` | `string` | 是 | 标签显示文本 |
| `color` | `'success' \| 'error' \| 'warning' \| 'default' \| 'primary' \| 'info'` | 否（默认 default） | 颜色变体 |
| `size` | `'medium' \| 'small'` | 否（默认 medium） | 尺寸变体 |
| `disabled` | `boolean` | 否（默认 false） | 禁用状态 |
| `iconLeft` | `ReactNode` | 否 | 左侧图标 |
| `iconRight` | `ReactNode` | 否 | 右侧图标（目前未用） |
| `onClick` | `() => void` | 否 | 点击回调（传入则变为可点击态） |
| `className` | `string` | 否 | 自定义类名 |

---

## Code Mapping

| 平台 | 路径 | 状态 |
|------|------|------|
| React | `src/components/PDATag/index.tsx` | 待补充 |
| Vue | - | 待实现 |
| iOS (SwiftUI) | - | 待实现 |
| Android (XML) | - | 待实现 |
| Storybook | - | 待补充 |

---

## AI Notes

**为什么 Tag 有边框而 Button 没有？**
Tag 是"标签"，边框增强其"卡片感"和"可分离性"，视觉上更像一个物理标签。Button 是"操作"，无边框使触控区域更干净。对比：Tag 需要在列表中与内容共存（有边框更易区分），Button 需要突出的触控区域（无边框更大）。

**为什么 Medium 和 Small 的字重不同（Regular vs Bold）？**
Medium 通常用于状态展示，需要柔和感（Regular）；Small 用于分类/筛选，需要在有限空间内更醒目（Bold）。这是经过验证的 UX 权衡。

**为什么 Tag 没有 Hover 态？**
PDA 设备无鼠标悬停能力，Hover 会造成无效渲染。Tag 只需处理 Pressed（触控）和 Disabled 两种状态。

**为什么 Info 变体单独列出而不是合并到 Default？**
Info（信息提示）与 Default（中性/辅助）的语义完全不同。Info 用于传递"有新消息/有新内容"的暗示，Default 仅表示"分类/中性标签"。语义分离有助于 AI 和开发者正确选择。

---

## Variants Overview

| 变体 | 用途 | 语义 |
|------|------|------|
| Success | 成功/通过/完成 | ✅ 正向 |
| Error | 失败/错误/取消 | ❌ 负向 |
| Warning | 警告/注意 | ⚠️ 中性偏负 |
| Default | 通用/中性分类 | ⭕ 辅助 |
| Primary | 主色强调/加急 | 🔵 突出 |
| Info | 信息提示/角标 | ℹ️ 通知 |

---

## 核心参数

### Medium

| 属性 | 值 | Token |
|------|-----|-------|
| 高度 | 32px | - |
| 内边距 | 4px 12px | Gap: 4px H / 12px V |
| 圆角 | 8px | Radius: 8px |
| 字号 | 18px | Typography |
| 字重 | 400 (Regular) | - |

### Small

| 属性 | 值 | Token |
|------|-----|-------|
| 高度 | 24px | - |
| 内边距 | 2px 8px | Gap: 2px H / 8px V |
| 圆角 | 4px | Radius: 4px |
| 字号 | 14px | Typography |
| 字重 | 600 (Bold) | - |

---

## 图标规范

| 尺寸 | 图标尺寸 | 图标间距 |
|------|---------|---------|
| **Medium** | 16×16px | 8px |
| **Small** | 12×12px | 4px |

**推荐图标映射：**

| 变体 | 左侧图标 | 说明 |
|------|---------|------|
| Success | `icon_success_outline.svg` | 成功指示 |
| Error | `icon_close_two_outline.svg` | 错误指示 |
| Warning | `icon_attention_outline.svg` | 警告指示 |
| Info | `icon_information_outline.svg` | 信息提示 |

---

## 无障碍规范

1. 所有文字与背景对比度 ≥ 4.5:1（WCAG AA）
2. 可点击 Tag 触控区域 ≥ 44×44px（iOS/Android 最低标准）
3. 可点击 Tag 支持键盘 Tab 聚焦
4. 使用 `role="button"` + `aria-label` 说明含义

---

## 代码示例

```css
/* Tag 基础 */
.tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-style: solid;
  border-width: 1px;
  font-family: 'PingFang SC';
}

/* Medium */
.tag--medium {
  height: 32px;
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 400;
  line-height: 25px;
  gap: 8px;
}

/* Small */
.tag--small {
  height: 24px;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  gap: 4px;
}
```

```jsx
// 基础用法
<Tag color="success" size="medium">完成成功</Tag>
<Tag color="error" size="small">失败出错</Tag>
<Tag color="primary" size="small">正常状态</Tag>

// 带图标
<Tag color="success" size="medium" iconLeft={<SuccessIcon />}>审核通过</Tag>
<Tag color="error" size="small" iconLeft={<CloseIcon />}>已取消</Tag>

// 容器布局
<div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
  <Tag color="success" size="medium">完成</Tag>
  <Tag color="error" size="medium">失败</Tag>
  <Tag color="warning" size="medium">待审核</Tag>
  <Tag color="primary" size="small">标签一</Tag>
  <Tag color="default" size="small">标签二</Tag>
  <Tag color="info" size="small">3</Tag>
</div>
```

---

## Changelog

| 版本 | 日期 | 变更 |
|------|------|------|
| v1.1.0 | 2026-04-22 | 新增 Purpose、Interaction Flow（声明 Pressed/Disabled）、AI Notes、Code Mapping、Variants Overview；规范化 Props Contract |
| v1.0.0 | 2026-04-16 | 初始版本 |
