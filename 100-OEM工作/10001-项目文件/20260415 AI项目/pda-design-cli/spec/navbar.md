# 导航栏组件族 (NavBar)

# 导航栏组件族 (NavBar)

> **v1.1.0** | 最后更新：2026-04-22
> 新增：Purpose、Use When/Avoid When、Interaction Flow、AI Notes、Variants Overview

---

## Purpose

NavBar（导航栏组件族）是 PDA 应用顶部用于页面导航和操作入口的核心组件，设计目标是：在有限屏幕空间内提供清晰的页面层级感知、一致的返回操作和灵活的右侧操作区。包含四个专用变体，覆盖通用页面、多标签切换、成员管理和搜索场景，确保每种导航需求都有对应的最优布局方案。

## Use When / Avoid When

| ✅ 使用场景 | 推荐变体 |
|------------|---------|
| 通用页面标题 + 右侧操作 | `navbar-default` |
| 页面内标签切换（2-5 个标签） | `navbar-tabs` |
| 团队成员管理、显示成员头像 | `navbar-members` |
| 需要在导航栏内直接搜索 | `navbar-search` |

| ❌ 避免场景 | 替代方案 |
|-----------|---------|
| 页面底部导航 | BottomTabBar |
| 弹层内导航 | Dialog / Modal 内置标题区 |
| 沉浸式全屏（无导航） | 去掉 NavBar，使用自定义页面布局 |

## Interaction Flow

```
┌──────────────────────────────────┐
│  NavBar (任意变体)                │
└────────┬─────────────────────────┘
         │
    ┌────┴──────────────────┐
    │ 点击左侧返回图标/区域  │
    ▼
┌──────────────────┐
│  触发 onBack()   │ → 返回上一页 / 关闭页面
└──────────────────┘

┌──────────────────────────────────┐
│  点击右侧操作图标                 │
└────────┬─────────────────────────┘
         │
    ┌────┴────────────┐
    │ 触发对应回调    │
    │ 或路由跳转      │
    └─────────────────┘

┌──────────────────────────────────┐
│  navbar-tabs 切换标签             │
└────────┬─────────────────────────┘
         │
    ┌────┴──────────────────┐
    │ TabActiveIndex 变化     │
    │ 底部指示器动画移动       │
    │ 触发 onChange(tabIndex) │
    └─────────────────────────┘
```

## Design Tokens

| Token | 值 | 用途 |
|-------|---|------|
| `--color-navbar-bg` | `#F3F4F6` | 导航栏背景（Grey NO.2） |
| `--color-navbar-title` | `#333333` | 标题文字（Black NO.6） |
| `--color-navbar-icon-default` | `#666666` | 图标默认色（Black NO.4） |
| `--color-navbar-border` | `#F5F5F5` | 底部边框（Black NO.2） |
| `--color-navbar-tab-active` | `#333333` | Tab 选中态文字（Black NO.6） |
| `--color-navbar-tab-default` | `#666666` | Tab 默认态文字（Black NO.4） |
| `--color-navbar-tab-indicator` | `#6445D1` | Tab 底部指示器（Primary NO.6） |

### 共享尺寸 Token

| Token | 值 | 用途 |
|-------|---|------|
| `--navbar-height` | `56px` | 导航栏标准高度 |
| `--navbar-height-large` | `56px` | 大尺寸导航栏（Large 变体） |
| `--navbar-icon-hit-area` | `40px` | 图标点击热区 |
| `--navbar-padding-x` | `12px` | 左右内边距 |
| `--navbar-z-index` | `1000` | 层级 |

## Props Contract

```typescript
interface NavBarProps {
  title: string;                         // 必填，导航栏标题
  onBack?: () => void;                  // 可选，左侧返回按钮点击事件
  showBack?: boolean;                   // 可选，是否显示返回按钮，默认 true
  rightSlot?: React.ReactNode;          // 可选，右侧操作区自定义内容
  className?: string;                   // 可选，自定义类名
}

interface NavBarTabsProps extends NavBarProps {
  tabs: string[];                      // 标签文案数组（2-5 个）
  activeIndex?: number;               // 当前选中索引
  onChange?: (index: number) => void; // 切换回调
}

interface NavBarMembersProps extends NavBarProps {
  memberCount: number;                 // 成员总数
  maxVisibleAvatars?: number;         // 最大可见头像数，默认 3
}

interface NavBarSearchProps extends NavBarProps {
  placeholder?: string;               // 搜索框占位符
  onSearch?: (value: string) => void; // 搜索提交回调
}
```

## Code Mapping

| 平台 | 路径 | 状态 |
|------|------|------|
| React | `src/components/NavBar/index.tsx` | 待实现 |
| React | `src/components/NavBar/NavBarTabs.tsx` | 待实现 |
| React | `src/components/NavBar/NavBarMembers.tsx` | 待实现 |
| React | `src/components/NavBar/NavBarSearch.tsx` | 待实现 |
| Vue | - | 待实现 |
| iOS (SwiftUI) | `ios/NavBarView.swift` | 待实现 |
| Android (XML) | `android/NavBarView.kt` | 待实现 |

## AI Notes

**为什么 4 个变体各自独立而非单一组件加 props？**
各变体布局逻辑差异大（Tabs 有标签栏、Members 有头像堆叠、Search 有输入框），强行合并会导致组件膨胀且 props 爆炸。独立变体更清晰、维护成本更低。

**为什么 navbar-tabs 限制 2-5 个标签？**
PDA 屏幕宽度有限，超过 5 个标签会导致文字压缩或需横向滚动，影响体验。

**为什么左侧图标热区 40px×40px？**
移动端触控标准最小热区为 44px×44px，考虑内边距 12px，实际图标区域约 40px 满足要求。

**为什么背景色用 `#F3F4F6` 而非标准 Grey NO.2 `#EEEEEE`？**
原规范使用 `#F3F4F6`，经核对接近 Grey NO.2，但属业务定制色，建议保持与原规范一致或统一迁移到标准 token。

**为什么标题字号有 20px/22px/24px 多个版本？**
各变体标题字号来自原规范（navbar-default=24px、navbar-tabs=22px 等），存在碎片化。建议后续统一收敛到 20px 作为标准。

## Variants Overview

| 变体 | 文件 | 标题字号 | 高度 | 适用场景 |
|------|------|---------|------|---------|
| 默认导航栏 | `navbar-default.md` | 24px | 56px | 通用页面标题 + 右侧操作 |
| 标签页导航栏 | `navbar-tabs.md` | 22px | 56px | 多标签切换场景 |
| 成员导航栏 | `navbar-members.md` | 24px | 56px | 团队成员管理页面 |
| 搜索导航栏 | `navbar-search.md` | - | 56px | 带搜索框的页面 |

---

导航栏是 PDA 应用顶部用于页面导航、操作入口的核心组件族。包含多个变体以适应不同业务场景。

---

## 组件概述

| 属性 | 值 |
|------|-----|
| 容器高度 | 46px (Medium) / 56px (Large) |
| 背景色 | `#FFFFFF` (Black NO.1) |
| 底部边框 | 1px `#F5F5F5` (Black NO.2) |
| 位置 | 固定顶部 `position: fixed; top: 0` |
| Z-Index | 1000 |

---

## 变体一览

| 变体 | 文件 | 适用场景 |
|------|------|----------|
| **默认导航栏** | `navbar-default.md` | 通用页面标题 + 右侧操作 |
| **标签页导航栏** | `navbar-tabs.md` | 多标签切换场景 |
| **成员导航栏** | `navbar-members.md` | 团队成员管理页面 |
| **搜索导航栏** | `navbar-search.md` | 带搜索框的页面 |

---

## 变体选择指南

```
┌─────────────────────────────────────────────────────────┐
│  是否需要搜索框？                                        │
│    ├─ 是 → navbar-search.md                            │
│    └─ 否 → 是否需要标签页切换？                         │
│           ├─ 是 → navbar-tabs.md                       │
│           └─ 否 → 是否有成员列表？                      │
│                  ├─ 是 → navbar-members.md             │
│                  └─ 否 → navbar-default.md             │
└─────────────────────────────────────────────────────────┘
```

---

## 共享规范

### 5.1 左侧区域

| 属性 | 值 |
|------|-----|
| 布局 | Flex Row，垂直居中 |
| 内容 | 返回按钮 + 标题 / 纯标题 |
| 标题字号 | 20px |
| 标题字重 | 600 (Bold) |
| 标题颜色 | `#333333` (Black NO.7) |

### 5.2 右侧区域

| 属性 | 值 |
|------|-----|
| 布局 | Flex Row，垂直居中，间距 16px |
| 内容 | 图标按钮 / 文字按钮 / 混合 |

### 5.3 图标按钮

| 属性 | 值 |
|------|-----|
| 尺寸 | 24×24px (图标) / 32×32px (点击区域) |
| 图标尺寸 | 20px |
| 间距 | 4px (图标与图标) |
| 推荐图标 | `icon_arrow_left_outline.svg` (返回) |

---

## 通用 API

```typescript
interface NavBarProps {
  /** 导航栏标题 */
  title: string;
  /** 左侧返回按钮点击事件 (可选) */
  onBack?: () => void;
  /** 是否显示返回按钮 */
  showBack?: boolean;
  /** 右侧操作区内容 */
  rightSlot?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
}
```

---

## 相关组件

| 组件 | 关系 |
|------|------|
| BottomTabBar | 底部导航栏，与 NavBar 配合使用 |
| Button | 导航栏内操作按钮 |
| Tabs | NavBar-Tabs 内部标签切换 |
