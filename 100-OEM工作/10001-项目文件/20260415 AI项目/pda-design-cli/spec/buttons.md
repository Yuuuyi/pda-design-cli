# 按钮系统 (Buttons)

> **v1.1.0** | 最后更新：2026-04-22
> 新增：Interaction Flow、AI Notes、Props Contract、结构化 Design Tokens、Code Mapping

---

## Purpose

PDA Button 是 PDA 设备上的主要操作触发器，设计目标是：

- 在移动 PDA 场景下提供大触控区域（Large 64px / Medium 46px / Small 32px）
- 支持主操作和次要操作的视觉区分（7 种变体）
- 确保高对比度和易触达性（最小点击区域 48×48px）

---

## Use When / Avoid When

### ✅ Use When — 选这个组件的场景

**通用操作：**
- 表单提交、确认操作 → **Primary**
- 取消、返回等次要操作（与 Primary 并列出现）→ **Outline**
- 删除、作废、拒绝等破坏性操作 → **Red**（需配合 Modal 二次确认）
- 警告、注意等提示性操作 → **Yellow**
- 禁用状态 / 低权重辅助操作 → **Gray**
- 最次级操作（轻量感极强）→ **Ghost**

**尺寸选择：**
- 标准扫描场景、页面主操作 → **Large**（64px，默认尺寸）
- 表单内、卡片内、紧凑布局 → **Medium**（46px）
- 输入框内、行组件内、超紧凑空间 → **Small**（32px）

**互斥选项切换：**
- 筛选条件切换、模式切换（一组选项选其一）→ **Button Group**

### ❌ Avoid When — 不要用这个组件的场景

| 场景 | 替代方案 |
|------|---------|
| 页面跳转（不带操作） | NavBar 返回按钮 / Link |
| 只需图标独立触发（无文案） | IconButton |
| 纯展示状态或信息 | Tag / Text |
| 破坏性操作需二次确认 | Modal + Red Button |
| 非 PDA 设备（标准 Web/App） | 标准 Button（44px） |
| 需要图标 + 文案组合 | Icon + Text 自定义组合 |

---

## Quick Decision Table — Primary vs Outline 快速决策

```
这个操作有多重要？
│
├─ 页面唯一主操作（每屏最多 1 个）
│   └─ → Primary Solid
│
├─ 与主操作并列的次级操作（2-3 个并行）
│   └─ → Primary Outline（Outline Subtle 更轻）
│
├─ 取消/返回/最次级（极轻量感即可）
│   └─ → Ghost（Primary / Gray）
│
└─ 破坏性操作（删除/作废）
    └─ → Red + Modal 二次确认
```

---

## Interaction Flow

按钮有 4 种状态，流转规则如下：

```
Default ──[用户按下]──→ Pressed ──[用户松开]──→ Default
    │                                        ↑
    └──[disabled 属性设为 true]──→ Disabled ──┘
```

**规则：**
- **Default → Pressed**：按下瞬间触发（无延迟），背景/边框色变为 Pressed 色值，过渡动画 `500ms ease-out`
- **Pressed → Default**：松开后立即恢复为 Default 色值，动画 `500ms ease-out`
- **Default → Disabled**：当 `disabled` 属性为 `true` 时立即切换，无动画，不可逆
- **Pressed 状态是临时状态**：只存在于用户主动按下的过程中，松开即消失，不会持续存在
- **Disabled 优先级最高**：Disabled 状态下无法触发 Pressed，即使长按也无响应

**动画参数：**

```css
transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
/* ⚠️ 文档约定 0.2s ease，但系统 Motion Token 统一使用 500ms ease-out */
/* 若有冲突，以组件实际实现为准 */
```

---

## Design Tokens

### 核心参数（所有变体共享）

| Token | 值 |
|-------|-----|
| 高度 Large | 64px |
| 高度 Medium | 46px |
| 高度 Small | 32px |
| 圆角 Large | 8px |
| 圆角 Medium/Small | 4px |
| 字号 Large | 22px |
| 字号 Medium | 16px |
| 字号 Small | 14px |
| 字重 | 600 (Bold) |
| 字体 | PingFang SC |
| 最小点击区域 | 48×48px |
| 按钮间距 | 16px |

### Primary Solid Token 矩阵

| 状态 | 背景 | 文字 | Token |
|------|------|------|-------|
| Default | `#6445D1` | `#FFFFFF` | Pri-NO.6 / White |
| Pressed | `#432CB0` | `#FFFFFF` | Pri-NO.7 / White |
| Disabled | `#D4C2F4` | `#FFFFFF` | Pri-NO.2 / White |

### Primary Outline Token 矩阵

| 状态 | 背景 | 文字 | 边框 | Token |
|------|------|------|------|-------|
| Default | `#FFFFFF` | `#6445D1` | 1px solid #6445D1 | White / Pri-NO.6 |
| Pressed | `#F1E7FF` | `#432CB0` | 1px solid #432CB0 | Pri-NO.1 / Pri-NO.7 |
| Disabled | `#FFFFFF` | `#D4C2F4` | 1px solid #D4C2F4 | White / Pri-NO.2 |

### Red Solid Token 矩阵

| 状态 | 背景 | 文字 | Token |
|------|------|------|-------|
| Default | `#FF5C5C` | `#FFFFFF` | Red-NO.4 / White |
| Pressed | `#CC0000` | `#FFFFFF` | Red-NO.7 / White |
| Disabled | `#FFCCCC` | `#FFFFFF` | Red-NO.1 / White |

### Ghost Primary Token 矩阵

| 状态 | 背景 | 文字 | Token |
|------|------|------|-------|
| Default | 无 | `#6445D1` | Pri-NO.6 |
| Pressed | `#F1E7FF` | `#432CB0` | Pri-NO.1 / Pri-NO.7 |
| Disabled | 无 | `#D4C2F4` | Pri-NO.2 |

---

## Props Contract

> 组件 props 接口规范，供 AI 生成代码时参考。

| Prop | 类型 | 必填 | 说明 |
|------|------|------|------|
| `variant` | `'primary' \| 'outline' \| 'subtle' \| 'red' \| 'yellow' \| 'gray-solid' \| 'gray-light' \| 'gray-outline' \| 'ghost-primary' \| 'ghost-gray'` | 是 | 变体类型 |
| `size` | `'large' \| 'medium' \| 'small'` | 否（默认 large） | 尺寸 |
| `disabled` | `boolean` | 否（默认 false） | 禁用状态 |
| `loading` | `boolean` | 否（默认 false） | 加载状态 |
| `icon` | `ReactNode` | 否 | 左侧图标 |
| `iconPosition` | `'left' \| 'right'` | 否（默认 left） | 图标位置 |
| `onClick` | `() => void` | 否 | 点击回调 |
| `children` | `ReactNode` | 是 | 按钮文案 |
| `className` | `string` | 否 | 自定义类名 |
| `style` | `CSSProperties` | 否 | 内联样式 |
| `aria-label` | `string` | 建议填写 | 无障碍标签 |
| `aria-disabled` | `boolean` | 否 | 无障碍禁用标识 |

**Button Group 额外 Props：**

| Prop | 类型 | 必填 | 说明 |
|------|------|------|------|
| `options` | `Array<{ label: string; value: string; disabled?: boolean }>` | 是 | 选项列表 |
| `value` | `string` | 是 | 当前选中值 |
| `onChange` | `(value: string) => void` | 是 | 变更回调 |
| `layout` | `'surrounded' \| 'butt-joint'` | 否（默认 butt-joint） | 形态变体 |
| `size` | `'large' \| 'medium' \| 'small'` | 否（默认 large） | 尺寸 |

---

## Code Mapping

| 平台 | 路径 | 状态 |
|------|------|------|
| React | `src/components/PDAButton/index.tsx` | 待补充 |
| Vue | - | 待实现 |
| iOS (SwiftUI) | - | 待实现 |
| Android (XML) | - | 待实现 |
| Storybook | `?path=/story/pda-button--primary` | 待补充 |

---

## AI Notes

> 设计决策背后的逻辑，AI 在生成代码时应遵守，不应随意偏离。

**为什么 Large 是 64px 而不是 44px？**
64px 与扫描框高度一致，确保按钮触控区域与扫描区域视觉协调。44px 是 Apple HIG 的最低触控标准，适合普通 App；PDA 设备需要更大触控区域以应对戴手套、湿手、户外强光等场景。

**为什么 Ghost Button 的 Pressed 态是 Pri-NO.1（#F1E7FF）而不是完全透明？**
Ghost Button 在按下时需要提供明确的视觉反馈。若背景完全透明，按下时没有任何变化会让用户困惑。Pri-NO.1 提供了柔和的视觉确认，同时保持"轻量"的感知。

**为什么 Medium 和 Small 的 Pressed/Hover 用同一个状态（合并了 Hover）？**
Medium 和 Small 主要用于紧凑场景，用户更少使用 Hover（无鼠标悬停）。合并简化了状态管理，减少认知负担。

**为什么 Medium 的 Outline 边框在 Pressed 时也变深色？**
Medium 尺寸按钮常用于需要快速定位的操作区域，Press 态加深边框有助于强化"已按下"的反馈感。

**为什么 Yellow 按钮文字用 #FFFFFF 而 Medium Yellow 用 #333333？**
Large Yellow（#FFD933）背景亮度高，白色文字对比度强；Medium Yellow（#FFEB60）相对暗一些，黑色文字（#333333）对比度更优，保证可读性。

**超过 8 个中文字符怎么办？**
若按钮文案超过 8 个中文字符，建议改用图标 + 短文案组合，或将文案换行（需在设计评审中确认）。不要通过压缩字号来强行容纳长文案。

---

## Variants Overview

7 种变体速查：

| 变体 | 场景 | 每屏建议数量 |
|------|------|-------------|
| Primary | 主操作 | ≤1 |
| Outline | 次级操作 | ≤2 |
| Outline Subtle | 更弱的次级操作 | ≤2 |
| Red | 破坏性操作（删除/作废）| ≤1 |
| Yellow | 警告/注意提示 | ≤1 |
| Gray | 禁用/低权重辅助 | 无限制 |
| Ghost | 最次级操作（内联） | ≤1 |

---

## 核心参数（Large — 默认）

| 属性 | 值 | Token |
|------|-----|-------|
| 高度 | 64px | - |
| 宽度（最小） | 100px | - |
| 宽度（推荐） | 448px | - |
| 宽度（最大） | 448px | - |
| 内边距 | 16px（垂直） 16px（水平） | Gap: 16px |
| 圆角 | 8px | Radius: 8px |
| 字体 | PingFang SC | - |
| 字号 | 22px | Typography: Bold |
| 行高 | 32px | - |
| 字重 | 600 (Bold) | - |
| 文字对齐 | 居中 | - |

> **注意：** 高度 64px 与扫描框高度一致，宽度 448px 与扫描框宽度 456px 接近（差 8px，保留安全边距）。

---

## 一、紫色系 (Primary)

### 1.1 Primary Solid

主按钮，用于页面主要操作（如提交、确认）。

| 状态 | 背景色 | 文字颜色 | 边框 | Token 映射 |
|------|--------|----------|------|-----------|
| **Default** | `#6445D1` | `#FFFFFF` | 无 | Pri-NO.6 / White |
| **Pressed** | `#432CB0` | `#FFFFFF` | 无 | Pri-NO.7 / White |
| **Disabled** | `#D4C2F4` | `#FFFFFF` | 无 | Pri-NO.2 / White |

### 1.2 Primary Outline Default

白底紫边紫字，用于次要操作。

| 状态 | 背景色 | 文字颜色 | 边框 | Token 映射 |
|------|--------|----------|------|-----------|
| **Default** | `#FFFFFF` | `#6445D1` | 1px solid #6445D1 | White / Pri-NO.6 |
| **Pressed** | `#F1E7FF` | `#432CB0` | 1px solid #432CB0 | Pri-NO.1 / Pri-NO.7 |
| **Disabled** | `#FFFFFF` | `#D4C2F4` | 1px solid #D4C2F4 | White / Pri-NO.2 |

### 1.3 Primary Outline Subtle

浅紫底紫边淡紫字，用于更弱的次要操作。

| 状态 | 背景色 | 文字颜色 | 边框 | Token 映射 |
|------|--------|----------|------|-----------|
| **Default** | `#F1E7FF` | `#9C80E3` | 1px solid #6445D1 | Pri-NO.1 / Pri-NO.4 |
| **Pressed** | `#D4C2F4` | `#6445D1` | 1px solid #6445D1 | Pri-NO.2 / Pri-NO.6 |
| **Disabled** | `#F1E7FF` | `#D4C2F4` | 1px solid #D4C2F4 | Pri-NO.1 / Pri-NO.2 |

---

## 二、红色系 (Functional Red)

警示按钮，用于删除、拒绝、紧急操作。

| 状态 | 背景色 | 文字颜色 | 边框 | Token 映射 |
|------|--------|----------|------|-----------|
| **Default** | `#FF5C5C` | `#FFFFFF` | 无 | Red-NO.4 / White |
| **Pressed** | `#CC0000` | `#FFFFFF` | 无 | Red-NO.7 / White |
| **Disabled** | `#FFCCCC` | `#FFFFFF` | 无 | Red-NO.1 / White |

> **说明：** 色值已匹配标准色板。Default 使用 Red-NO.4 近似 #FF5C5C。

---

## 三、黄色系 (Functional Yellow)

提示按钮，用于警告、注意、中性提示操作。

| 状态 | 背景色 | 文字颜色 | 边框 | Token 映射 |
|------|--------|----------|------|-----------|
| **Default** | `#FFD933` | `#FFFFFF` | 无 | Yellow-NO.6 / White |
| **Pressed** | `#F5B000` | `#FFFFFF` | 无 | Yellow-NO.7 / White |
| **Disabled** | `#FFFBE6` | `#F5B000` | 无 | Yellow-NO.1 / Yellow-NO.7 |

> **说明：** Default 使用 Yellow-NO.6 主色，Pressed 使用 Yellow-NO.7 深色。

---

## 四、灰色系 (Neutral/Secondary)

次级按钮，用于取消、返回、辅助操作。

### 4.1 Gray Solid

深灰蓝实心按钮。

| 状态 | 背景色 | 文字颜色 | 边框 | Token 映射 |
|------|--------|----------|------|-----------|
| **Default** | `#52567B` | `#FFFFFF` | 无 | Grey-NO.6 / White |
| **Pressed** | `#424242` | `#FFFFFF` | 无 | Grey-NO.7 / White |
| **Disabled** | `#9E9E9E` | `#FFFFFF` | 无 | Grey-NO.5 / White |

### 4.2 Gray Light

浅灰背景按钮。

| 状态 | 背景色 | 文字颜色 | 边框 | Token 映射 |
|------|--------|----------|------|-----------|
| **Default** | `#EEEEEE` | `#52567B` | 无 | Grey-NO.2 / Grey-NO.6 |
| **Pressed** | `#E0E0E0` | `#424242` | 无 | Grey-NO.3 / Grey-NO.7 |
| **Disabled** | `#EEEEEE` | `#BDBDBD` | 无 | Grey-NO.2 / Grey-NO.4 |

### 4.3 Gray Outline

白底灰边灰字按钮。

| 状态 | 背景色 | 文字颜色 | 边框 | Token 映射 |
|------|--------|----------|------|-----------|
| **Default** | `#FFFFFF` | `#52567B` | 1px solid #52567B | White / Grey-NO.6 |
| **Pressed** | `#F5F5F5` | `#424242` | 1px solid #424242 | Grey-NO.1 / Grey-NO.7 |
| **Disabled** | `#FFFFFF` | `#BDBDBD` | 1px solid #BDBDBD | White / Grey-NO.4 |

---

## 五、幽灵按钮 (Ghost)

最轻量级按钮，只有文字，无背景无边框。

### 5.1 Ghost Primary

紫字幽灵按钮，用于内联操作、链接式按钮。

| 状态 | 背景色 | 文字颜色 | 边框 | Token 映射 |
|------|--------|----------|------|-----------|
| **Default** | 无 | `#6445D1` | 无 | Pri-NO.6 |
| **Pressed** | `#F1E7FF` | `#432CB0` | 无 | Pri-NO.1 / Pri-NO.7 |
| **Disabled** | 无 | `#D4C2F4` | 无 | Pri-NO.2 |

### 5.2 Ghost Gray

灰字幽灵按钮，用于取消、返回等弱操作。

| 状态 | 背景色 | 文字颜色 | 边框 | Token 映射 |
|------|--------|----------|------|-----------|
| **Default** | 无 | `#52567B` | 无 | Grey-NO.6 |
| **Pressed** | `#F5F5F5` | `#424242` | 无 | Grey-NO.1 / Grey-NO.7 |
| **Disabled** | 无 | `#BDBDBD` | 无 | Grey-NO.4 |

---

## 六、尺寸变体

| 尺寸 | 高度 | 字号 | 行高 | 内边距 | 圆角 | 使用场景 |
|------|------|------|------|--------|------|----------|
| **Large** | 64px | 22px | 32px | 17px 16px | 8px | 默认尺寸，移动端主要操作 |
| **Medium** | 46px | 16px | 22px | 12px 12px | 4px | 表单、卡片内操作 |
| **Small** | 32px | 14px | 20px | 5px 8px | 4px | 紧凑空间、输入框内、行组件 |

> **说明：** Large 尺寸为默认，与扫描框高度一致。Medium 与 Small 圆角为 4px（小于 Large 的 8px）。

---

## 六-2、中按钮 (Medium Button)

中按钮与 Large 按钮颜色及状态一致，仅尺寸和字体不同。

### 核心参数

| 属性 | 值 | Token |
|------|-----|-------|
| 高度 | 46px | - |
| 宽度（最小） | 56px | - |
| 宽度（推荐） | 56px | - |
| 宽度（最大） | 220px | - |
| 内边距 | 12px（垂直） 12px（水平） | - |
| 圆角 | 4px | Radius: 4px |
| 字体 | PingFang SC | - |
| 字号 | 16px | Typography: Bold |
| 行高 | 22px | - |
| 字重 | 600 (Bold) | - |

### 紫色系 (Primary)

| 状态 | 背景色 | 文字颜色 | 边框 | Token 映射 |
|------|--------|----------|------|-----------|
| **Default** | `#6445D1` | `#FFFFFF` | 无 | Pri-NO.6 / White |
| **Pressed** | `#432CB0` | `#FFFFFF` | 无 | Pri-NO.7 / White |
| **Disabled** | `#D4C2F4` | `#FFFFFF` | 无 | Pri-NO.2 / White |
| **Outline Default** | `#FFFFFF` | `#6445D1` | 1px solid #6445D1 | White / Pri-NO.6 |
| **Outline Pressed** | `#F1E7FF` | `#432CB0` | 1px solid #432CB0 | Pri-NO.1 / Pri-NO.7 |
| **Outline Disabled** | `#FFFFFF` | `#D4C2F4` | 1px solid #D4C2F4 | White / Pri-NO.2 |
| **Outline Subtle Default** | `#F1E7FF` | `#9C80E3` | 1px solid #6445D1 | Pri-NO.1 / Pri-NO.4 / Pri-NO.6 |
| **Outline Subtle Pressed** | `#D4C2F4` | `#6445D1` | 1px solid #6445D1 | Pri-NO.2 / Pri-NO.6 |
| **Outline Subtle Disabled** | `#F1E7FF` | `#D4C2F4` | 1px solid #D4C2F4 | Pri-NO.1 / Pri-NO.2 |

### 红色系 (Functional Red)

| 状态 | 背景色 | 文字颜色 | 边框 | Token 映射 |
|------|--------|----------|------|-----------|
| **Default** | `#FF3333` | `#FFFFFF` | 无 | Red-NO.5 / White |
| **Pressed** | `#CC0000` | `#FFFFFF` | 无 | Red-NO.7 / White |
| **Disabled** | `#FFB3B3` | `#FFFFFF` | 无 | Red-NO.2 / White |

> **色值映射：** 原规范 #FB5251 → Red-NO.5；#CF3337 → Red-NO.7；#FDB2AC → Red-NO.2。

### 黄色系 (Functional Yellow)

| 状态 | 背景色 | 文字颜色 | 边框 | Token 映射 |
|------|--------|----------|------|-----------|
| **Default** | `#FFEB60` | `#333333` | 无 | Yellow-NO.5 / Black-NO.6 |
| **Pressed** | `#F5B000` | `#333333` | 无 | Yellow-NO.7 / Black-NO.6 |
| **Disabled** | `#FFF3B0` | `#999999` | 无 | Yellow-NO.3 / Black-NO.4 |

### 灰色系 (Neutral/Secondary)

| 状态 | 背景色 | 文字颜色 | 边框 | Token 映射 |
|------|--------|----------|------|-----------|
| **Gray Solid Default** | `#52567B` | `#FFFFFF` | 无 | Grey-NO.6 / White |
| **Gray Solid Pressed** | `#424242` | `#FFFFFF` | 无 | Grey-NO.7 / White |
| **Gray Solid Disabled** | `#9E9E9E` | `#FFFFFF` | 无 | Grey-NO.5 / White |
| **Gray Light Default** | `#EEEEEE` | `#333333` | 无 | Grey-NO.2 / Black-NO.6 |
| **Gray Light Pressed** | `#E0E0E0` | `#333333` | 无 | Grey-NO.3 / Black-NO.6 |
| **Gray Light Disabled** | `#EEEEEE` | `#BDBDBD` | 无 | Grey-NO.2 / Grey-NO.4 |
| **Gray Outline Default** | `#FFFFFF` | `#52567B` | 1px solid #52567B | White / Grey-NO.6 |
| **Gray Outline Pressed** | `#EEEEEE` | `#424242` | 1px solid #424242 | Grey-NO.2 / Grey-NO.7 |
| **Gray Outline Disabled** | `#FFFFFF` | `#BDBDBD` | 1px solid #BDBDBD | White / Grey-NO.4 |

### 幽灵按钮 (Ghost)

| 状态 | 背景色 | 文字颜色 | Token 映射 |
|------|--------|----------|-----------|
| **Ghost Primary Default** | 无 | `#6445D1` | Pri-NO.6 |
| **Ghost Primary Pressed** | `#F1E7FF` | `#432CB0` | Pri-NO.1 / Pri-NO.7 |
| **Ghost Primary Disabled** | 无 | `#D4C2F4` | Pri-NO.2 |
| **Ghost Gray Default** | 无 | `#52567B` | Grey-NO.6 |
| **Ghost Gray Pressed** | `#EEEEEE` | `#424242` | Grey-NO.2 / Grey-NO.7 |
| **Ghost Gray Disabled** | 无 | `#BDBDBD` | Grey-NO.4 |

---

## 六-3、小按钮 (Small Button)

小按钮用于输入框内、行组件等紧凑空间。

### 核心参数

| 属性 | 值 |
|------|-----|
| 高度 | 32px |
| 宽度（最小） | 48px |
| 宽度（推荐） | 48px |
| 宽度（最大） | 144px |
| 内边距 | 5px（垂直） 8px（水平） |
| 圆角 | 4px |
| 字体 | PingFang SC |
| 字号 | 14px |
| 行高 | 20px |
| 字重 | 600 (Bold) |

### 紫色系 (Primary)

| 状态 | 背景色 | 文字颜色 | 边框 | Token 映射 |
|------|--------|----------|------|-----------|
| **Default** | `#6445D1` | `#FFFFFF` | 无 | Pri-NO.6 / White |
| **Pressed** | `#432CB0` | `#FFFFFF` | 无 | Pri-NO.7 / White |
| **Disabled** | `#D4C2F4` | `#FFFFFF` | 无 | Pri-NO.2 / White |
| **Outline Default** | `#FFFFFF` | `#6445D1` | 1px solid #6445D1 | White / Pri-NO.6 |
| **Outline Pressed** | `#F1E7FF` | `#432CB0` | 1px solid #432CB0 | Pri-NO.1 / Pri-NO.7 |
| **Outline Disabled** | `#FFFFFF` | `#D4C2F4` | 1px solid #D4C2F4 | White / Pri-NO.2 |
| **Outline Subtle Default** | `#F1E7FF` | `#9C80E3` | 1px solid #6445D1 | Pri-NO.1 / Pri-NO.4 / Pri-NO.6 |
| **Outline Subtle Pressed** | `#D4C2F4` | `#6445D1` | 1px solid #6445D1 | Pri-NO.2 / Pri-NO.6 |
| **Outline Subtle Disabled** | `#F1E7FF` | `#D4C2F4` | 1px solid #D4C2F4 | Pri-NO.1 / Pri-NO.2 |

### 红色系 (Functional Red)

| 状态 | 背景色 | 文字颜色 | Token 映射 |
|------|--------|----------|-----------|
| **Default** | `#FF3333` | `#FFFFFF` | Red-NO.5 / White |
| **Pressed** | `#CC0000` | `#FFFFFF` | Red-NO.7 / White |
| **Disabled** | `#FFB3B3` | `#FFFFFF` | Red-NO.2 / White |

### 黄色系 (Functional Yellow)

| 状态 | 背景色 | 文字颜色 | Token 映射 |
|------|--------|----------|-----------|
| **Default** | `#FFEB60` | `#333333` | Yellow-NO.5 / Black-NO.6 |
| **Pressed** | `#F5B000` | `#333333` | Yellow-NO.7 / Black-NO.6 |
| **Disabled** | `#FFF3B0` | `#999999` | Yellow-NO.3 / Black-NO.4 |

### 灰色系 (Neutral/Secondary)

| 状态 | 背景色 | 文字颜色 | 边框 | Token 映射 |
|------|--------|----------|------|-----------|
| **Gray Solid Default** | `#52567B` | `#FFFFFF` | 无 | Grey-NO.6 / White |
| **Gray Solid Pressed** | `#424242` | `#FFFFFF` | 无 | Grey-NO.7 / White |
| **Gray Solid Disabled** | `#9E9E9E` | `#FFFFFF` | 无 | Grey-NO.5 / White |
| **Gray Light Default** | `#EEEEEE` | `#52567B` | 无 | Grey-NO.2 / Grey-NO.6 |
| **Gray Light Pressed** | `#E0E0E0` | `#424242` | 无 | Grey-NO.3 / Grey-NO.7 |
| **Gray Light Disabled** | `#EEEEEE` | `#BDBDBD` | 无 | Grey-NO.2 / Grey-NO.4 |
| **Gray Outline Default** | `#FFFFFF` | `#52567B` | 1px solid #52567B | White / Grey-NO.6 |
| **Gray Outline Pressed** | `#EEEEEE` | `#424242` | 1px solid #424242 | Grey-NO.2 / Grey-NO.7 |
| **Gray Outline Disabled** | `#FFFFFF` | `#BDBDBD` | 1px solid #BDBDBD | White / Grey-NO.4 |

### 幽灵按钮 (Ghost)

| 状态 | 背景色 | 文字颜色 | Token 映射 |
|------|--------|----------|-----------|
| **Ghost Primary Default** | 无 | `#6445D1` | Pri-NO.6 |
| **Ghost Primary Pressed** | `#F1E7FF` | `#432CB0` | Pri-NO.1 / Pri-NO.7 |
| **Ghost Primary Disabled** | 无 | `#D4C2F4` | Pri-NO.2 |
| **Ghost Gray Default** | 无 | `#52567B` | Grey-NO.6 |
| **Ghost Gray Pressed** | `#EEEEEE` | `#424242` | Grey-NO.2 / Grey-NO.7 |
| **Ghost Gray Disabled** | 无 | `#BDBDBD` | Grey-NO.4 |

---

## 六-4、按钮组 (Button Group)

按钮组是 Large Button 的组合布局，用于在多个互斥选项中切换（如筛选、模式切换）。子项继承 Large Button 的核心参数，通过 `border-radius` 控制整体形状。

### 尺寸变体

| 尺寸 | 容器圆角 | 子项高度 | 子项内边距 | 子项宽度 | 字体 | 子项间距 |
|------|----------|----------|------------|----------|------|----------|
| **Large** | 8px | 64px | 17px 16px | min-width: 100px，max-width: 448px，flex: 1 | PingFang SC / 22px / line-height: 32px / 600 | 1px |
| **Medium** | 4px | 46px | 12px 12px | min-width: 56px，max-width: 220px，flex: 1 | PingFang SC / 16px / line-height: 22px / 600 | 1px |
| **Small** | 4px | 32px | 5px 8px | min-width: 48px，max-width: 144px，flex: 1 | PingFang SC / 14px / line-height: 20px / 600 | 1px |

### 状态矩阵

| 子项状态 | 背景色 | 文字颜色 | 边框 | Token 映射 |
|----------|--------|----------|------|-----------|
| **未选中 Default** | `#EEEEEE` | `#52567B` | 无 | Grey-NO.2 / Grey-NO.6 |
| **未选中 Pressed** | `#E0E0E0` | `#424242` | 无 | Grey-NO.3 / Grey-NO.7 |
| **未选中 Disabled** | `#EEEEEE` | `#BDBDBD` | 无 | Grey-NO.2 / Grey-NO.4 |
| **选中 Default** | `#6445D1` | `#FFFFFF` | 无 | Pri-NO.6 / White |
| **选中 Pressed** | `#432CB0` | `#FFFFFF` | 无 | Pri-NO.7 / White |
| **选中 Disabled** | `#D4C2F4` | `#FFFFFF` | 无 | Pri-NO.2 / White |

> **交互规则：** Button Group 的 Large / Medium / Small 三种尺寸共用同一套颜色状态，仅尺寸、圆角和字级随对应按钮规格变化。

### 形态变体 (Layout Variants)

#### 全包围式

外层容器设置对应尺寸的 `border-radius`，内部子项 `border-radius: 0`，首尾子项由容器统一控制圆角。

```css
.button-group {
  display: flex;
  border-radius: 8px;
  overflow: hidden;
}
.button-group__item {
  border-radius: 0;
  flex: 1;
}
```

> ⚠️ **使用条件：** 仅适用于透明背景场景。若容器有背景色（卡片、弹窗），分割线会被容器背景遮盖，建议改用"左右拼接式"。

#### 左右拼接式

每个子项独立控制自身圆角，左侧项保留左圆角、右侧项保留右圆角，中间子项无圆角。

```css
.button-group__item {
  border-radius: 0;
  flex: 1;
}
.button-group__item:first-child {
  border-radius: 8px 0 0 8px;
}
.button-group__item:last-child {
  border-radius: 0 8px 8px 0;
}
```

> **推荐优先使用左右拼接式**，子项独立性强，不依赖父容器背景条件。

### Disabled 状态

| 状态 | 背景色 | 文字颜色 | 说明 |
|------|--------|----------|------|
| **未选中 Disabled** | `#EEEEEE` | `#BDBDBD` | 不可交互，文字变淡 |
| **选中 Disabled** | `#D4C2F4` | `#FFFFFF` | 同 Primary Disabled |

---

## 交互规范

### 状态过渡

```css
transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
```

### 点击区域

- 最小点击区域：48px × 48px（移动端触摸友好）
- 按钮间距：16px

### 禁用态

```css
cursor: not-allowed;
pointer-events: none;
opacity: 0.6; /* 可选，部分场景 */
```

---

## 代码示例

### CSS 类名规范

```css
/* 基础按钮类 */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  min-width: 100px;
  max-width: 448px;
  padding: 16px;
  border-radius: 8px;
  font-family: 'PingFang SC', sans-serif;
  font-size: 22px;
  line-height: 32px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

/* Primary 变体 */
.btn-primary { background: #6445D1; color: #FFFFFF; }
.btn-primary:hover { background: #432CB0; }
.btn-primary:disabled { background: #D4C2F4; cursor: not-allowed; }

/* Primary Outline */
.btn-outline { background: #FFFFFF; color: #6445D1; border: 1px solid #6445D1; }
.btn-outline:hover { background: #F1E7FF; color: #432CB0; border-color: #432CB0; }

/* Gray Light */
.btn-gray-light { background: #EEEEEE; color: #52567B; }
.btn-gray-light:hover { background: #E0E0E0; color: #424242; }

/* Ghost */
.btn-ghost { background: transparent; color: #6445D1; }
.btn-ghost:hover { background: #F1E7FF; color: #432CB0; }
```

### HTML 示例

```html
<button class="btn btn-primary">确认提交</button>
<button class="btn btn-outline">取消</button>
<button class="btn btn-gray-light">返回</button>
<button class="btn btn-ghost">查看详情</button>
```

---

## Changelog

| 版本 | 日期 | 变更 |
|------|------|------|
| v1.1.0 | 2026-04-22 | 新增 Purpose、Use When/Avoid When、Interaction Flow、AI Notes、Props Contract、Code Mapping；规范化 Hover→Pressed 命名 |
| v1.0.0 | 2026-04-16 | 初始版本 |
