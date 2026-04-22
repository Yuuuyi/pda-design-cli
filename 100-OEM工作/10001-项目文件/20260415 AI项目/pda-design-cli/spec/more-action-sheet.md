# 更多操作面板 (MoreActionSheet)

> **v1.1.0** | 最后更新：2026-04-22
> 新增：Purpose、Use When/Avoid When、Interaction Flow、AI Notes、Code Mapping

---

## Purpose

更多操作面板是底部弹出的动作面板组件，用于承载次要或扩展功能入口。解决导航栏空间有限、无法展示全部功能的问题，通过底部抽屉形式提供扩展操作空间，同时保持主界面简洁。

## Use When / Avoid When

| ✅ 使用场景 | ❌ 避免场景 |
|------------|------------|
| 功能入口超过 3 个，导航栏无法容纳 | 核心高频操作，应直接展示在导航栏 |
| 次要功能需要收起，保持主界面简洁 | 需要用户立即决策的关键操作 |
| 列表页/详情页的批量操作入口 | 操作项少于 2 个，直接展示更高效 |
| 设置类功能的分类入口 | 需要复杂表单输入的场景 |
| 模块评价、刷新等辅助功能 | 层级过深的多级菜单 |

## Interaction Flow

```
[点击"更多"按钮] ──→ [遮罩层淡入 opacity 0→0.5]
                          │
                          ▼
               [面板从底部滑入 translateY(100%)→0]
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
    [点击操作项]    [点击遮罩层]    [点击关闭按钮]
          │               │               │
          ▼               ▼               ▼
    [触发业务操作]   [面板下滑关闭]   [面板下滑关闭]
          │               │               │
          ▼               ▼               ▼
    [面板自动关闭]   [遮罩层淡出]   [遮罩层淡出]
          │               │               │
          └───────────────┴───────────────┘
                          │
                          ▼
                    [恢复页面交互]
```

触发条件：
- **打开**：点击导航栏"更多"按钮，遮罩层 200ms 淡入，面板 300ms 上滑
- **关闭**：点击遮罩层、点击关闭按钮、点击操作项后自动关闭
- **按压态**：操作项按压时背景色变为 `rgba(0,0,0,0.08)`

## Design Tokens

### 颜色 Token 矩阵

| 元素 | 属性 | Token | 色值 |
|------|------|-------|------|
| 面板背景 | Background | Grey NO.2 | `#F5F5F5` |
| 标题文字 | Text Color | Black NO.6 | `#333333` |
| 图标背景 | Background | Black NO.1 | `#FFFFFF` |
| 图标边框 | Border | Grey NO.3 | `#D6D6D6`（注：原规范为 `#E0E0E0`） |
| 标签文字 | Text Color | Black NO.6 | `#333333` |
| 分割线 | Border | Grey NO.2 | `#EEEEEE` |
| 关闭按钮背景 | Background | Black NO.1 | `#FFFFFF` |
| 关闭按钮边框 | Border | Grey NO.5 | `#9E9E9E` |
| 关闭按钮文字 | Text Color | Grey NO.5 | `#9E9E9E` |
| 按压态背景 | Background | — | `rgba(0,0,0,0.08)` |

### 排版 Token

| 元素 | 字号 | 行高 | 字重 | 字体 |
|------|------|------|------|------|
| 面板标题 | 22px | 30px | 600 (Bold) | PingFang SC |
| 功能标签 | 16px | 22px | 600 (Bold) | PingFang SC |
| 关闭按钮 | 22px | 30px | 400 (Regular) | PingFang SC |

### 间距与尺寸 Token

| 属性 | 数值 | Token |
|------|------|-------|
| 面板内边距 | 16px | Gap 默认 |
| 图标容器尺寸 | 68×68px | — |
| 图标尺寸 | 40×40px | — |
| 图标容器圆角 | 50% | — |
| 网格行间距 | 18px | — |
| 网格列间距 | 32px | Gap Large |
| 面板顶部圆角 | 16px | Radius Large |
| 关闭按钮圆角 | 8px | Radius Medium |
| 面板最大高度 | 740px | — |
| 面板最小高度 | 320px | — |
| 关闭按钮高度 | 64px | — |
| 关闭按钮左右边距 | 16px | Gap 默认 |

### 动画 Token

| 阶段 | 属性 | 时长 | 缓动 |
|------|------|------|------|
| 遮罩层淡入 | opacity 0→0.5 | 200ms | ease-out |
| 面板上滑 | translateY(100%)→0 | 300ms | ease-out |
| 遮罩层淡出 | opacity 0.5→0 | 200ms | ease-in |
| 面板下滑 | translateY(0)→translateY(100%) | 250ms | ease-in |

## Props Contract

```typescript
interface Action {
  /** 操作唯一标识 */
  id: string;
  /** 图标名称（icon 包中的名称，如 'refresh'） */
  icon: string;
  /** 标签文字 */
  label: string;
}

interface MoreActionSheetProps {
  /** 是否可见 */
  visible: boolean;
  /** 操作项列表 */
  actions: Action[];
  /** 操作项点击回调 */
  onAction: (action: Action) => void;
  /** 关闭回调 */
  onClose: () => void;
  /** 自定义标题，默认"更多操作" */
  title?: string;
  /** 关闭按钮文字，默认"关闭" */
  closeText?: string;
}
```

## Code Mapping

| 平台 | 路径 |
|------|------|
| React | `src/components/MoreActionSheet/index.tsx` |
| CSS | `src/components/MoreActionSheet/style.css` |
| 设计稿 | `spec/more-action-sheet.md` |
| 图标包 | `src/components/icon/business/` |

## AI Notes

- **为什么采用底部抽屉形式？** 因为移动端/车载屏幕宽度有限，底部抽屉符合用户单手操作习惯，且不会遮挡当前页面核心内容，提供自然的操作延续感。
- **为什么图标容器用 68×68px？** 因为该尺寸在 4 列网格布局下（32px 列间距）恰好填满 448px 内容区宽度，同时 68px 满足触控最小目标尺寸（44px）且有足够留白，提升点击准确率。
- **为什么面板最大高度限制 740px？** 因为需要预留顶部空间显示遮罩层，暗示用户可点击遮罩关闭；同时确保关闭按钮始终可见，提供明确的关闭入口。
- **为什么关闭按钮用 Grey NO.5（`#9E9E9E`）边框和文字？** 因为低饱和度灰色降低关闭按钮的视觉权重，引导用户优先关注操作项而非关闭；同时保持与面板整体灰调风格一致。
- **为什么动画时长控制在 200-300ms？** 因为该时长范围符合人眼感知舒适区（<300ms 感觉即时，>300ms 感觉缓慢），ease-out 上滑给人自然弹出感，ease-in 下滑给人自然收回感。

## Variants Overview

| 变体 | 图标列数 | 最大操作项 | 说明 |
|------|----------|-----------|------|
| 标准模式 | 4 列 | 8-12 项 | 默认网格布局，超出可滚动 |
| 精简模式 | 4 列 | 4-6 项 | 无滚动，面板高度自适应 |
| 可滚动模式 | 4 列 | 12+ 项 | 操作区最大滚动高度 417px |

---

底部弹出的动作面板，承载次要或扩展功能入口。

## 1. 组件概述

- **功能定位**：底部弹出的动作面板，承载次要或扩展功能入口。
- **触发方式**：点击导航栏右侧"更多"按钮。
- **交互行为**：点击后从屏幕底部向上滑出（Slide-up Overlay）。
- **布局逻辑**：网格状排列图标按钮，支持滚动，底部包含固定的"关闭"按钮。

## 2. 设计变量 (Design Tokens)

### 颜色 (Colors)

| 元素 | 属性 | Token 名称 | 色值 | 说明 |
|------|------|-----------|------|------|
| 面板背景 | Background | `grey.1` / `Grey-NO.1` | `#F5F5F5` | 面板容器背景 |
| 标题文字 | Text Color | `black.6` | `#333333` | 标题及功能标签文字 |
| 图标背景 | Background | `black.1` / `Black-NO.1` | `#FFFFFF` | 圆形图标容器背景 |
| 图标边框 | Border | `grey.3` / `Grey-NO.3` | `#E0E0E0` | 图标圆形边框 |
| 标签文字 | Text Color | `black.6` | `#333333` | 功能标签文字，与标题同色 |
| 分割线 | Border | `grey.2` / `Grey-NO.2` | `#EEEEEE` | 关闭按钮上方分割线 |
| 关闭按钮背景 | Background | `black.1` / `Black-NO.1` | `#FFFFFF` | 关闭按钮背景 |
| 关闭按钮边框 | Border | `grey.5` / `Grey-NO.5` | `#9E9E9E` | 关闭按钮边框 |
| 关闭按钮文字 | Text Color | `grey.5` / `Grey-NO.5` | `#9E9E9E` | 关闭按钮文字颜色 |

### 排版 (Typography)

| 元素 | 字号 | 行高 | 字重 | 字体 | Token 映射 |
|------|------|------|------|------|-----------|
| 面板标题 | 22px | 30px | 600 (Bold) | PingFang SC | `text-headline-lg` |
| 功能标签 | 16px | 22px | 600 (Bold) | PingFang SC | `text-body-md-bold` |
| 关闭按钮 | 22px | 30px | 400 (Regular) | PingFang SC | `text-headline-lg` |

### 间距与尺寸 (Spacing & Sizing)

| 属性 | 数值 | 说明 |
|------|------|------|
| 面板内边距 | `gap` / 16px | 面板左右内边距及标题区域上下边距 |
| 图标容器尺寸 | 68 × 68px | 圆形图标背景容器 |
| 图标尺寸 | 40 × 40px | SVG 图标内容大小 |
| 图标容器圆角 | 50% | 圆形背景 |
| 网格行间距 | 18px | 图标行之间垂直间距 |
| 网格列间距 | `gap-large` / 32px | 图标列之间水平间距（设计稿 36px，归入 32px 层级） |
| 面板顶部圆角 | `radius-lg` / 16px | 面板上方圆角 |
| 关闭按钮圆角 | `radius-md` / 8px | 关闭按钮圆角 |
| 面板最大高度 | 740px | 超出可滚动 |
| 面板最小高度 | 320px | 至少显示 4 行图标 |
| 关闭按钮高度 | 64px | 固定高度 |
| 关闭按钮左右边距 | 16px | 与面板左右边距一致 |

## 3. 图标 (Icons)

> **重要**：图标统一调用 `icon` 包中的业务图标，**禁止硬编码 SVG**。
> 调用方式：`import { IconName } from '@/components/icon'`

### 面板内可用图标

图标位于 `icon` 包的 `business` 分类下，调用时使用图标名称（不含 `icon_` 前缀和 `.svg` 后缀）：

| 用途 | 图标名 | 示例代码 |
|------|--------|---------|
| 刷新 | `refresh` | `<IconRefresh />` 或 `<Icon name="refresh" />` |
| 报单切换 | `report-switch` | `<IconReportSwitch />` |
| 模块评价 | `module-rating` | `<IconModuleRating />` |

> 图标包说明详见 [icon/index.json](../icons/index.json) 的 `business` 分类。

## 4. 结构与布局 (Structure)

### 整体容器 (Container)

- **布局方式**：Flexbox Column
- **对齐方式**：顶部对齐 (`align-items: flex-start`)
- **宽度**：100% 或固定最大宽度 448px，居中显示
- **最大高度**：740px，超出后内容区滚动

```
+------------------+
|  [更多操作] 标题  |  ← sheet-header
|                  |
|  [●] [●] [●] [●] |  ← action-grid (4列，可滚动)
|  [●] [●] [●] [●] |
|  [●] [●]         |
|                  |
|------------------|  ← divider
|    [ 关闭 ]      |  ← close-button
+------------------+
```

### 头部 (Header)

- 标题文本"更多操作"
- 文本居中对齐
- 上下内边距 16px

### 操作区网格 (Action Grid)

- **布局**：CSS Grid，`grid-template-columns: repeat(4, 1fr)`
- **行间距**：18px
- **列间距**：32px（归入 `gap-large`）
- **滚动**：内容高度超过 417px 时，`overflow-y: auto`
- **单个操作项结构**：

```
.action-item
├── .icon-wrapper     (68×68px, 圆形, 白色背景, 灰色边框)
│   └── <Icon />      (40×40px, #333333)
└── .label            (16px Bold, #333333, 行高22px)
```

### 底部区域 (Footer)

- 分割线：`border-top: 1px solid #EEEEEE`（`grey.2`）
- 关闭按钮：全宽（两侧各留 16px），高 64px，白色背景，1px `grey.5` 边框，8px 圆角，文字 `grey.5` 颜色

## 5. 交互 (Interactions)

### 打开动画

| 阶段 | 属性 | 时长 | 缓动 |
|------|------|------|------|
| 遮罩层 | opacity 0→0.5 | 200ms | ease-out |
| 面板 | translateY(100%)→translateY(0) | 300ms | ease-out |

### 关闭动画

| 阶段 | 属性 | 时长 | 缓动 |
|------|------|------|------|
| 遮罩层 | opacity 0.5→0 | 200ms | ease-in |
| 面板 | translateY(0)→translateY(100%) | 250ms | ease-in |

### 用户操作

- **点击遮罩层**：关闭面板（等同于点击关闭按钮）
- **点击关闭按钮**：关闭面板
- **点击操作项**：触发对应业务操作后关闭面板

### 状态

| 状态 | 图标背景 | 说明 |
|------|---------|------|
| 默认 | `#FFFFFF` | 静止态 |
| 按压 (Active) | `rgba(0,0,0,0.08)` | 轻微变灰，透明度反馈 |

## 6. 组件化建议 (Componentization)

### React 组件示例

```tsx
// MoreActionSheet.tsx
interface Action {
  id: string
  icon: string    // 图标名称，如 'refresh'
  label: string   // 标签文字
}

interface MoreActionSheetProps {
  visible: boolean
  actions: Action[]
  onAction: (action: Action) => void
  onClose: () => void
}

// 使用示例
const actions: Action[] = [
  { id: 'refresh', icon: 'refresh', label: '刷新' },
  { id: 'report-switch', icon: 'report-switch', label: '报单切换' },
  { id: 'module-rating', icon: 'module-rating', label: '模块评价' },
]
```

### 样式变量 (CSS Variables)

```css
:root {
  --more-sheet-bg: #F5F5F5;
  --more-sheet-radius: 16px;
  --more-item-bg: #FFFFFF;
  --more-item-border: #E0E0E0;
  --more-item-size: 68px;
  --more-icon-size: 40px;
  --more-text-color: #333333;
  --more-divider: #EEEEEE;
  --more-close-border: #9E9E9E;
  --more-close-text: #9E9E9E;
}
```

## 7. 无障碍 (Accessibility)

- 面板容器添加 `role="dialog"` `aria-modal="true"`
- 面板标题添加 `aria-label="更多操作"`
- 关闭按钮添加 `aria-label="关闭"`
- 每个操作项添加 `aria-label={label}`（如"刷新"、"报单切换"）
- 遮罩层添加 `aria-hidden="true"`

## 8. 注意事项

1. **图标规范**：所有图标必须通过 `icon` 包引入，禁止在组件内嵌入 SVG 路径，确保全局图标一致性。
2. **颜色标准化**：`#52567B` 已映射至 `Grey-NO.5`（`#9E9E9E`），关闭按钮文字与边框同色。
3. **图标管理**：业务图标均位于 `icon` 包的 `business` 分类下，维护于 `spec/icons/` 目录。
4. **滚动边界**：面板最大高度 740px，操作区最大滚动高度 417px，确保关闭按钮始终可见。

## Changelog

| 日期 | 版本 | 变更内容 |
|------|------|---------|
| 2026-04-22 | v1.1.0 | 新增 Purpose、Use When/Avoid When、Interaction Flow、Design Tokens、Props Contract、Code Mapping、AI Notes、Variants Overview 章节；保留原有全部规格数据 |
