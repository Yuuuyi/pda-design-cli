# 缺省页组件 (EmptyState)

# 缺省页组件 (EmptyState)

> **v1.1.0** | 最后更新：2026-04-22
> 新增：Purpose、Use When/Avoid When、Interaction Flow、AI Notes、Variants Overview

---

## Purpose

EmptyState（缺省页组件）用于页面无数据、无内容、网络异常等场景的空状态展示。在 PDA 仓储物流业务中，运单扫描、任务分配、记录查询等高频场景均依赖缺省页引导用户进行下一步操作。设计目标是：通过插画建立情感连接、通过标题说明当前状态、通过说明文案提供解决路径、通过操作按钮推动用户行动，从而减少用户困惑、降低跳出率。

## Use When / Avoid When

| ✅ 使用场景 | 推荐变体 |
|------------|---------|
| 页面初始加载无数据（暂无任务、暂无记录） | `no-task`、`no-record` |
| 网络异常导致内容无法加载 | `network-error` |
| 搜索结果为空 | `no-result` |
| 权限不足无法访问 | `no-permission` |
| 运单扫描页等待扫码 | `scan-waybill` |
| 托盘扫描页 | `scan-pallet` |

| ❌ 避免场景 | 替代方案 |
|-----------|---------|
| 加载中状态 | Loading/Spinner |
| 操作失败（错误提示） | NoticeBar / Toast |
| 页面有数据但布局出错 | 检查组件使用 |

## Interaction Flow

```
┌──────────────────┐
│   EmptyState      │ ← 页面内容为空/无数据
│  (缺省展示态)      │
└────────┬─────────┘
         │ 用户点击主按钮
         ▼
┌──────────────────┐
│ Primary Action    │ ← 例：刷新页面、重新加载
└──────────────────┘
         │ (可选) 用户点击次级按钮
         ▼
┌──────────────────┐
│ Secondary Action  │ ← 例：返回首页、取消
└──────────────────┘
```

- **插画选择**：根据页面语义从 10 种插画中选择对应 icon 类型
- **按钮展示**：primaryButtonText 存在时显示主按钮；secondaryButtonText 存在时显示次级按钮；两者可同时存在
- **点击态**：按钮按下时背景色变化（主按钮按 `#5838BC`，次级按钮按 `#F1E7FF`）

## Design Tokens

| Token | 值 | 用途 |
|-------|---|------|
| `--color-empty-illustration-title` | `#52567B` | 标题文字（Grey NO.6） |
| `--color-empty-illustration-desc` | `#BDBDBD` | 说明文案（Grey NO.4） |
| `--color-empty-primary-btn-bg` | `#6445D1` | 主按钮背景（Primary NO.6） |
| `--color-empty-primary-btn-text` | `#FFFFFF` | 主按钮文字（White） |
| `--color-empty-secondary-btn-border` | `#6445D1` | 次级按钮边框（Primary NO.6） |
| `--color-empty-secondary-btn-text` | `#6445D1` | 次级按钮文字（Primary NO.6） |

### 插画色调 Token

| Token | 值 | 用途 |
|-------|---|------|
| `--color-empty-art-primary` | `#6B95FF` | 插画主色调 |
| `--color-empty-art-secondary` | `#5477CB` | 插画次色调 |
| `--color-empty-art-light` | `#B1D8FE` | 插画浅色 |
| `--color-empty-art-dark` | `#5584F1` | 插画深色 |
| `--color-empty-art-shadow` | `#4E86E7` | 插画投影 |

## Props Contract

```typescript
type EmptyStateIconType =
  | 'no-content'       // 暂无内容
  | 'no-record'        // 暂无记录
  | 'no-task'          // 暂无任务
  | 'no-result'        // 暂无查询结果
  | 'no-payment'       // 暂无收款项
  | 'no-permission'    // 暂无权限
  | 'network-error'    // 网络无连接
  | 'scan-waybill'     // 请扫描运单号
  | 'scan-pallet'     // 请扫齐托盘货物
  | 'fill-waybill';    // 填写运单号

interface EmptyStateProps {
  icon: EmptyStateIconType;              // 必填，插画类型
  title?: string;                        // 可选，标题文字
  description?: string;                  // 可选，说明文案
  primaryButtonText?: string;           // 可选，主按钮文案
  onPrimaryButtonClick?: () => void;    // 主按钮点击
  secondaryButtonText?: string;         // 可选，次级按钮文案
  onSecondaryButtonClick?: () => void; // 次级按钮点击
  customIcon?: React.ReactNode;         // 可选，自定义插画（优先级高于 icon）
  className?: string;                   // 可选，自定义样式类
}
```

## Code Mapping

| 平台 | 路径 | 状态 |
|------|------|------|
| React | `src/components/EmptyState/index.tsx` | 待实现 |
| Vue | - | 待实现 |
| iOS (SwiftUI) | `ios/EmptyStateView.swift` | 待实现 |
| Android (XML) | `android/EmptyStateView.kt` | 待实现 |
| Storybook | `stories/EmptyState.stories.tsx` | 待补充 |

## AI Notes

**为什么 10 种插画语义必须一一对应？**
因为插画是视觉锚点，错误语义会误导用户判断当前页面状态，导致操作路径混乱。

**为什么字号使用 20px 标题/18px 说明，不在 Typography 标准字阶？**
空状态需要更突出的视觉层级来吸引注意，业务特殊需求允许偏离标准字阶，但需注明。

**为什么主按钮宽度固定 240px？**
避免长文案按钮破坏页面布局一致性，240px 提供足够触控区域同时保持美观。

**为什么插画统一 160×160px？**
标准化尺寸避免不同插画造成页面高度跳动，提升用户阅读流畅性。

**为什么没有动画规范？**
空状态非高频交互态，优先保证加载性能，不强制要求入场动画。

## Variants Overview

| 插画 icon | 标题（参考）| 适用场景 | 优先级 |
|---------|-----------|---------|--------|
| `no-content` | 暂无内容 | 页面内容为空 | 高频 |
| `no-record` | 暂无记录 | 操作记录为空 | 高频 |
| `no-task` | 暂无任务 | 未分配任务 | 高频 |
| `no-result` | 暂无查询结果 | 搜索无结果 | 高频 |
| `no-payment` | 暂无收款项 | 财务类页面 | 低频 |
| `no-permission` | 暂无权限 | 权限限制 | 中频 |
| `network-error` | 网络无连接 | 网络异常/离线 | 高频 |
| `scan-waybill` | 请扫描运单号 | 运单扫描页 | 高频 |
| `scan-pallet` | 请扫齐托盘货物 | 托盘扫描页 | 中频 |
| `fill-waybill` | 填写运单号 | 运单填写页 | 中频 |

---

用于页面无数据、无内容、网络异常等场景的空状态展示。通过插画、标题、说明文本和操作按钮引导用户进行下一步操作。

---

## 何时使用

**用这个组件，当：**
- 页面初始加载无数据（暂无任务、暂无记录）
- 网络异常导致内容无法加载
- 搜索结果为空
- 权限不足无法访问

**不要用这个组件，当：**
- 页面有数据但布局出错 → 检查组件使用
- 加载中状态 → 用 Loading/Spinner，不是 EmptyState
- 错误状态（操作失败）→ 用错误提示组件，不是 EmptyState

**10 种插画选择决策树：**

```
当前页面是什么类型的空状态？

├─ 运单相关：
│   ├─ 扫描运单页面 → "请扫描运单号" (icon: scan-waybill)
│   ├─ 扫描托盘页面 → "请扫齐托盘货物" (icon: scan-pallet)
│   └─ 填写运单页面 → "填写运单号" (icon: fill-waybill)
│
├─ 任务相关：
│   └─ 没有分配任务 → "暂无任务" (icon: no-task)
│
├─ 数据相关：
│   ├─ 查询结果为空 → "暂无查询结果" (icon: no-result)
│   ├─ 无任何记录 → "暂无记录" (icon: no-record)
│   └─ 无收款项 → "暂无收款项" (icon: no-payment)
│
├─ 内容相关：
│   └─ 页面无内容 → "暂无内容" (icon: no-content)
│
├─ 权限相关：
│   └─ 用户无访问权限 → "暂无权限" (icon: no-permission)
│
└─ 网络相关：
    └─ 网络无连接 → "网络无连接" (icon: network-error)
```

**变体速查表：**

| icon 值 | 标题（参考）| 适用场景 |
|---------|-----------|---------|
| `no-content` | 暂无内容 | 页面内容为空 |
| `no-record` | 暂无记录 | 列表无数据 |
| `no-task` | 暂无任务 | 未分配任务 |
| `no-result` | 暂无查询结果 | 搜索无结果 |
| `no-payment` | 暂无收款项 | 财务类页面 |
| `no-permission` | 暂无权限 | 权限限制 |
| `network-error` | 网络无连接 | 网络异常 |
| `scan-waybill` | 请扫描运单号 | 运单扫描页 |
| `scan-pallet` | 请扫齐托盘货物 | 托盘扫描页 |
| `fill-waybill` | 填写运单号 | 运单填写页 |

---

## 一、组件结构

```
+------------------------------------------------------------------+
|                                                                  |
|                        [缺省插画区域]                             |
|                        宽度: 160px                                |
|                        高度: 160-170px (自适应插画高度)           |
|                                                                  |
|                        距离顶部: 32px                            |
|                                                                  |
+------------------------------------------------------------------+
|                                                                  |
|                     标题文字 (可选)                              |
|                     字号: 20px                                  |
|                     字重: 600 (Bold)                             |
|                     颜色: #52567B (Grey NO.6)                    |
|                     行高: 28px                                   |
|                     距离插画底部: 16px                           |
|                                                                  |
|                     说明文案 (可选)                              |
|                     宽度: max 384px                             |
|                     字号: 18px                                   |
|                     字重: 400 (Regular)                         |
|                     颜色: #BDBDBD (Grey NO.4)                   |
|                     行高: 25px                                   |
|                     距离标题: 12px                               |
|                     text-align: center                          |
|                                                                  |
+------------------------------------------------------------------+
|                     [操作按钮区域] (可选)                         |
|                     距离说明文案: 16px                           |
|                     按钮尺寸: Medium (高度 46px)                 |
|                     主按钮宽度: 240px                            |
|                     主/次按钮间距: 16px                          |
|                                                                  |
+------------------------------------------------------------------+
```

---

## 二、布局参数

### 2.1 容器

| 属性 | 值 | 说明 |
|------|-----|------|
| 距顶部距离 | 32px | 插画距容器顶部固定间距 |
| Flex 主轴 | `flex-start` | 垂直方向顶部对齐 |
| Flex 交叉轴 | `center` | 水平方向居中 |
| 元素间距 | 12-16px | 根据内容层级递减 |
| 最大内容宽度 | 384px | 说明文案最大宽度 |

### 2.2 插画区域

| 属性 | 值 | 说明 |
|------|-----|------|
| 插画宽度 | 160px | 统一尺寸 |
| 插画高度 | 160-170px | 根据插画内容自适应 |
| 内边距 | 无 | 插画占满宽度 |

### 2.3 按钮布局

| 属性 | 值 | 说明 |
|------|-----|------|
| 按钮宽度 | 240px | 主/次按钮统一宽度 |
| 按钮间距 | 16px | 按钮之间间距 |
| 距上方内容 | 16px | 按钮与说明文案间距 |

---

## 三、排版规范

### 3.1 标题文字

| 属性 | 值 | Token |
|------|-----|-------|
| 字号 | 20px | 非标准字阶，继承业务需求 |
| 字重 | 600 (Bold) | 加粗突出 |
| 行高 | 28px | 1.4 倍行高 |
| 颜色 | `#52567B` | Grey NO.6 |
| 对齐 | center | 居中对齐 |

### 3.2 说明文案

| 属性 | 值 | Token |
|------|-----|-------|
| 字号 | 18px | Small 组件标准 |
| 字重 | 400 (Regular) | 常规字重 |
| 行高 | 25px | 约 1.39 倍 |
| 颜色 | `#BDBDBD` | Grey NO.4 |
| 对齐 | center | 居中对齐 |
| 最大宽度 | 384px | 超出换行 |

---

## 四、颜色规范

| 元素 | 色值 | Token |
|------|------|-------|
| 标题文字 | `#52567B` | Grey NO.6 |
| 说明文案 | `#BDBDBD` | Grey NO.4 |
| 主按钮背景 | `#6445D1` | Primary NO.6 |
| 主按钮文字 | `#FFFFFF` | White |
| 次按钮边框 | `#6445D1` | Primary NO.6 |
| 次按钮文字 | `#6445D1` | Primary NO.6 |

---

## 五、按钮样式

### 5.1 主按钮

| 属性 | 值 |
|------|-----|
| 高度 | 46px (Medium) |
| 宽度 | 240px |
| 背景色 | `#6445D1` (Primary NO.6) |
| 圆角 | 4px |
| 内边距 | 12px 72px |
| 文字色 | `#FFFFFF` |
| 字号 | 16px |
| 行高 | 22px |
| 字重 | 400 (Regular) |

### 5.2 次级按钮

| 属性 | 值 |
|------|-----|
| 高度 | 46px (Medium) |
| 宽度 | 240px |
| 背景色 | 透明 |
| 边框 | 1px solid `#6445D1` (Primary NO.6) |
| 圆角 | 4px |
| 内边距 | 12px 72px |
| 文字色 | `#6445D1` (Primary NO.6) |
| 字号 | 16px |
| 行高 | 22px |
| 字重 | 400 (Regular) |

---

## 六、缺省插画库

> 插画统一存放于 `empty-state-icons/` 目录，尺寸均为 160×160px 或 160×170px，风格统一。

### 6.1 插画清单

| 插画名称 | 文件名 | 适用场景 |
|---------|--------|---------|
| 暂无内容 | `暂无内容.svg` | 列表为空、无数据 |
| 暂无记录 | `暂无记录.svg` | 操作记录为空 |
| 暂无任务 | `暂无任务.svg` | 任务列表为空 |
| 暂无查询结果 | `暂无查询结果.svg` | 搜索无结果 |
| 暂无收款项 | `暂无收款项.svg` | 收付款记录为空 |
| 暂无权限 | `暂无权限.svg` | 无访问权限 |
| 网络无连接 | `网络无连接.svg` | 网络异常/离线 |
| 请扫描运单号 | `请扫描运单号.svg` | 等待扫码场景 |
| 请扫齐托盘货物 | `请扫齐托盘货物.svg` | 托盘扫描场景 |
| 填写运单号 | `填写运单号.svg` | 待填写运单场景 |

### 6.2 插画风格规范

所有缺省插画统一风格：

- **主色调**: `#6B95FF` / `#5477CB` 蓝色渐变系
- **辅助色**: `#B1D8FE` / `#5584F1` 浅蓝-深蓝
- **强调色**: `#FFFFFF` 白色文字/图标
- **阴影色**: `#D6E0FF` 淡蓝阴影
- **背景卡片**: `#ADC8FF` 半透明白色卡片，带圆角 4px
- **投影效果**: 底部椭圆投影，颜色 `#4E86E7`，透明度 70%
- **装饰元素**: 半透明背景叠加、渐变填充、模糊背景

### 6.3 插画使用规则

1. **按语义选择**：根据当前空状态的实际语义选择对应插画
2. **不得混用**：插画与文案语义需匹配
3. **不得修改**：插画文件不可私自修改颜色或元素
4. **按需引入**：仅加载当前场景使用的插画

---

## 七、组件 API

```typescript
interface EmptyStateProps {
  /** 缺省插画类型 */
  icon: EmptyStateIconType;
  /** 标题文字 (可选) */
  title?: string;
  /** 说明文案 (可选) */
  description?: string;
  /** 主按钮文案 (可选，不传则不显示主按钮) */
  primaryButtonText?: string;
  /** 主按钮点击事件 */
  onPrimaryButtonClick?: () => void;
  /** 次级按钮文案 (可选，不传则不显示次级按钮) */
  secondaryButtonText?: string;
  /** 次级按钮点击事件 */
  onSecondaryButtonClick?: () => void;
  /** 自定义插画 (优先级高于 icon) */
  customIcon?: React.ReactNode;
  /** 自定义样式 */
  className?: string;
}
```

### 7.1 插画类型枚举

```typescript
type EmptyStateIconType =
  | 'no-content'       // 暂无内容
  | 'no-record'        // 暂无记录
  | 'no-task'          // 暂无任务
  | 'no-result'         // 暂无查询结果
  | 'no-payment'       // 暂无收款项
  | 'no-permission'     // 暂无权限
  | 'network-error'     // 网络无连接
  | 'scan-waybill'      // 请扫描运单号
  | 'scan-pallet'       // 请扫齐托盘货物
  | 'fill-waybill';     // 填写运单号
```

---

## 八、代码示例

### 8.1 基础用法

```jsx
import { EmptyState } from 'pda-design';

<EmptyState
  icon="no-content"
  title="暂无内容"
  description="当前列表为空，暂无数据"
/>
```

### 8.2 带主按钮

```jsx
<EmptyState
  icon="no-task"
  title="暂无任务"
  description="当前没有可处理的任务"
  primaryButtonText="刷新页面"
  onPrimaryButtonClick={() => window.location.reload()}
/>
```

### 8.3 带双按钮

```jsx
<EmptyState
  icon="network-error"
  title="网络连接失败"
  description="请检查您的网络设置后重试"
  primaryButtonText="重新加载"
  onPrimaryButtonClick={handleRetry}
  secondaryButtonText="返回首页"
  onSecondaryButtonClick={handleGoHome}
/>
```

### 8.4 自定义插画

```jsx
<EmptyState
  title="自定义缺省"
  description="使用自定义插画"
  customIcon={<img src="/custom-empty.svg" alt="empty" />}
  primaryButtonText="去操作"
  onPrimaryButtonClick={handleAction}
/>
```

---

## 九、使用场景对照表

| 场景 | 推荐插画 | 典型文案 |
|------|---------|---------|
| 列表为空 | `暂无内容.svg` | "暂无内容" |
| 操作记录为空 | `暂无记录.svg` | "暂无操作记录" |
| 任务列表为空 | `暂无任务.svg` | "暂无任务" |
| 搜索无结果 | `暂无查询结果.svg` | "暂无查询结果" |
| 收付款为空 | `暂无收款项.svg` | "暂无收款项" |
| 无访问权限 | `暂无权限.svg` | "暂无权限" |
| 网络异常 | `网络无连接.svg` | "网络连接失败" |
| 等待扫码 | `请扫描运单号.svg` | "请扫描运单号" |
| 托盘扫描 | `请扫齐托盘货物.svg` | "请扫齐托盘货物" |
| 待填写运单 | `填写运单号.svg` | "请填写运单号" |

---

## Changelog

| 版本 | 日期 | 变更 |
|------|------|------|
| v1.0.0 | 2026-04-21 | 初始版本 |
| v1.1.0 | 2026-04-22 | 新增 Purpose、Use When/Avoid When、Interaction Flow、AI Notes、Variants Overview、Design Tokens 结构化 |


| 组件 | 关联说明 |
|------|---------|
| Button | 操作按钮继承 Button Medium 尺寸规范 |
| Tag | 可作为 suffix 插槽内容使用 |
| WaybillDisplay | 运单号展示组件，空状态场景的下游使用 |
