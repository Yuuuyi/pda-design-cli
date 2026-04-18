# 更多操作面板 (MoreActionSheet)

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
