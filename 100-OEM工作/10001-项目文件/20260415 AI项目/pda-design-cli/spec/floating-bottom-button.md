# Floating Bottom Button（底部悬浮按钮组件）

> **v1.1.0** | 最后更新：2026-04-22
> 新增：Purpose、Use When/Avoid When、Interaction Flow、AI Notes、Code Mapping

---

## Purpose

底部悬浮按钮组件为页面提供固定在底部的操作区域，确保用户在长页面滚动后仍可快速触达核心操作（如确认、提交、取消）。解决移动端/车载屏幕中操作按钮随页面滚动消失的问题，保证操作可及性与流程闭环。

## Use When / Avoid When

| ✅ 使用场景 | ❌ 避免场景 |
|------------|------------|
| 页面底部需要始终可见的 CTA 按钮 | 页面内容较短，按钮无需固定 |
| 多步骤流程中的「上一步/下一步」操作 | 操作项超过 3 个，应改用 MoreActionSheet |
| 表单提交/确认场景 | 按钮需随内容联动的场景 |
| 列表页的批量操作入口 | 需要复杂操作面板而非简单按钮 |

## Interaction Flow

```
[页面加载] ──→ [按钮可见（默认态）]
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
    [主按钮按压]  [次按钮按压]  [页面滚动]
          │          │          │
          ▼          ▼          ▼
    [按压态反馈]  [按压态反馈]  [按钮保持固定]
          │          │
          ▼          ▼
    [触发操作]   [触发操作]
          │          │
          ▼          ▼
    [按钮恢复默认态] [按钮恢复默认态]
```

触发条件：
- **按压态**：用户手指/鼠标按下时进入，松开时恢复默认态并触发回调
- **禁用态**：通过 `disabled` prop 控制，按钮不可交互
- **固定定位**：`position: fixed; bottom: 0`，始终悬浮于页面底部

## Design Tokens

### 按钮变体 Token 矩阵

| 变体 | 属性 | Token | 色值 |
|------|------|-------|------|
| 主按钮（Primary） | 背景色 | Primary NO.6 | `#6445D1` |
| 主按钮（Primary） | 文字色 | Black NO.1 | `#FFFFFF` |
| 次按钮（Secondary） | 背景色 | Grey NO.2 | `#EEEEEE`（注：原规范为 `#F3F4F6`） |
| 次按钮（Secondary） | 文字色 | Black NO.6 | `#333333`（注：原规范为 `#52567B`） |
| 禁用态 | 背景色 | Grey NO.3 | `#D6D6D6` |
| 禁用态 | 文字色 | Grey NO.5 | `#9E9E9E` |

### 布局 Token

| 属性 | 值 | Token |
|------|-----|-------|
| 容器背景 | `#FFFFFF` | Black NO.1 |
| 分割线颜色 | `#E5E6EB` | — |
| 按钮高度 | 64px | — |
| 按钮圆角 | 8px | Border Radius 默认 |
| 按钮间距 | 16px | Gap 默认 |
| 按钮内边距 | 17px 垂直 + 16px 水平 | — |
| 按钮最小宽度 | 100px | — |
| 按钮最大宽度 | 448px | — |

### 排版 Token

| 属性 | 值 | Token |
|------|-----|-------|
| 字号 | 22px | Bold 类别 |
| 字重 | Bold | — |
| 行高 | 30px | — |
| 字体 | PingFang SC | 系统字体 |

## Props Contract

```typescript
interface FloatingBottomButtonProps {
  /** 按钮配置列表（2-3个） */
  buttons: FloatingButton[];
  /** 是否显示顶部分割线，默认 true */
  showDivider?: boolean;
  /** 容器自定义类名 */
  className?: string;
  /** 是否固定定位，默认 true */
  fixed?: boolean;
}

interface FloatingButton {
  /** 按钮文本 */
  label: string;
  /** 按钮变体：primary | secondary */
  variant: 'primary' | 'secondary';
  /** 是否禁用 */
  disabled?: boolean;
  /** 点击回调 */
  onClick: () => void;
  /** 无障碍标签 */
  ariaLabel?: string;
}
```

## Code Mapping

| 平台 | 路径 |
|------|------|
| React | `src/components/FloatingBottomButton/index.tsx` |
| CSS | `src/components/FloatingBottomButton/style.css` |
| 设计稿 | `spec/floating-bottom-button.md` |

## AI Notes

- **为什么固定底部？** 因为车载/移动场景下用户操作频繁，底部悬浮确保核心操作始终可达，减少滚动回底部的操作成本。
- **为什么限制 2-3 个按钮？** 因为底部空间有限，超过 3 个按钮会导致每个按钮过窄难以点击，且视觉层级混乱；更多操作应使用 MoreActionSheet。
- **为什么主次按钮使用不同色系？** 因为 Primary NO.6（`#6445D1`）高饱和度紫色在白色背景上对比强烈，引导用户优先点击主操作；次按钮用浅灰背景降低视觉权重。
- **为什么用 `div.h-px` 替代 `img` 做分割线？** 因为语义更清晰、渲染性能更好、无需额外资源请求，且可方便地通过 CSS 控制样式。
- **为什么按钮高度固定 64px？** 因为与 Primary Button 统一高度，保证设计系统一致性，同时满足车载触控最小目标尺寸要求。

## Variants Overview

| 变体 | 背景 | 文字色 | 说明 |
|------|------|--------|------|
| Primary | `#6445D1` (Primary NO.6) | `#FFFFFF` (Black NO.1) | 主要操作，视觉权重最高 |
| Secondary | `#F3F4F6` | `#52567B` | 次要操作，视觉权重较低 |
| Disabled | `#D6D6D6` (Grey NO.3) | `#9E9E9E` (Grey NO.5) | 不可交互状态 |

---

## 结构

- **外层容器：** `div` 采用 Flex 列布局（`flex-direction: column`），背景色为 `#FFFFFF`（设计系统背景色）。
- **分割线：** `img` 标签实现水平分割线，宽度 `480px`，高度 `1px`（建议使用 `div.h-px` 替代，背景色为设计系统 Border 色 `#E5E6EB`）。
- **按钮组：** `div` 采用 Flex 行布局（`justify-content: center`），包含 2-3 个按钮，间距 `16px`（默认 Gap 值）。
  - 按钮容器：`div` 弹性布局（`flex: 1`），最小宽度 `100px`，最大宽度 `448px`，固定高度 `64px`，内边距 `17px` 垂直 + `16px` 水平，圆角 `8px`（默认 Border Radius）。
  - 按钮文本：`p` 标签，字体 `PingFang SC`，字号 `22px`（Bold 类别），行高 `30px`，文本居中。

## 状态

按钮继承主按钮状态。

## 代码要求

1. **语义化类名：** 禁止使用行内样式，改用 CSS 类管理：

```css
.floating-btn-container { display: flex; flex-direction: column; background: #FFFFFF; }
.floating-divider { height: 1px; background: #E5E6EB; width: 100%; }
.floating-btn-group { display: flex; gap: 16px; padding: 8px 16px; }
.floating-btn { min-width: 100px; max-width: 448px; height: 64px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
.floating-btn-secondary { background: #F3F4F6; color: #52567B; }
.floating-btn-primary { background: #6445D1; color: #FFFFFF; }
```

2. **响应式适配：** 按钮组宽度 `100%`，通过 `max-width: 448px` 限制最大宽度，适配移动端屏幕。
3. **颜色合规：** 严格使用设计系统色值（如 Primary NO.6 `#6445D1`、Functional Grey NO.1 `#F3F4F6`），禁止自定义颜色。
4. **字体合规：** 按钮文字字号 `22px` 对应 Bold 类别，字体 `PingFang SC`，符合设计系统规范。
5. **无障碍优化：** 为按钮添加 `aria-label`（如 `aria-label="确认操作"`），确保可访问性。
6. **固定定位：** 建议添加 `position: fixed; bottom: 0; left: 0; right: 0;` 实现底部悬浮效果。

## 样式

- **尺寸规范：** 按钮高度固定 `64px`，与 Primary Button 高度一致（设计系统统一高度）。
- **圆角规范：** 统一使用 `8px`（默认 Border Radius）。
- **间距规范：** 按钮组内间距 `16px`（默认 Gap 值），内边距 `16px` 水平（符合设计系统间距规则）。

## 分割线

- 使用 `div.h-px` 替代 `img`，背景色为设计系统 Border 色 `#E5E6EB`，宽度 `100%`，高度 `1px`。
- 若需垂直分割线（按钮间），使用 `div.w-px`，背景色 `#E5E6EB`，宽度 `1px`。

## 合规说明

完全遵循设计系统色值（无纯黑）、字号（22px Bold 类别）、间距（默认 Gap 16px）及 Anti-Patterns（禁用纯黑、快动画、harsh shadows）。

## Changelog

| 日期 | 版本 | 变更内容 |
|------|------|---------|
| 2026-04-22 | v1.1.0 | 新增 Purpose、Use When/Avoid When、Interaction Flow、Design Tokens、Props Contract、Code Mapping、AI Notes、Variants Overview 章节；保留原有全部规格数据 |
