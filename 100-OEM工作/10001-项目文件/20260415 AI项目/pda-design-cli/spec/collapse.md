# 展开收起控件 (Collapse)

> **v1.1.0** | 最后更新：2026-04-22
> 新增：Purpose、Use When/Avoid When、Interaction Flow（带 Loading 态）、AI Notes、Code Mapping、Variants Overview；规范化 Design Tokens 和 Props Contract

---

## Purpose

PDA Collapse 用于在**空间有限的情况下隐藏次要或过长的内容**，用户通过点击触发区域切换内容的显示与隐藏状态。是 PDA 设备上控制信息密度的核心组件。

核心特征：
- 单次触发切换：点击触发器，内容展开/收起
- 图标方向指示状态：图标 0° = 收起，180° = 展开
- 触发器复用 Medium Button 尺寸体系，保持与其他操作组件一致

---

## Use When / Avoid When

### ✅ Use When — 选这个组件的场景

| 场景 | 推荐变体 |
|------|---------|
| 长文本省略展开（"更多/收起"） | 文字触发器 |
| 列表项详情展开 | 图文触发器 |
| 表单高级选项折叠 | 文字触发器 |
| 表格行详情 | 图文触发器 |
| 异步内容展开（带加载态） | 文字触发器 + Loading |

### ❌ Avoid When — 不要用这个组件的场景

| 场景 | 替代方案 |
|------|---------|
| 多选项切换（不收起内容，只切换展示） | Tabs |
| 分步表单（需要按顺序逐步填写） | Steps 组件 |
| 侧边栏导航折叠 | Bottom Tab Bar |
| 需要永久收起/展开的固定面板 | Sidebar / Drawer |
| 详情页内嵌信息（不是用户主动触发） | 直接展示（不加折叠） |

---

## Interaction Flow

```
触发器
    │
    ├──[disabled=true]──→ 触发器 Disabled，不可交互
    │
    └──[点击]──┬──[当前收起]──┐
               │              │
               │              ├─ 图标旋转 180°，展开动画（500ms ease-out）
               │              ├─ 内容 max-height: 0→实际高度 + opacity: 0→1
               │              └─ 文字变为"收起"
               │
               └──[当前展开]──┤
                            ├─ 图标旋转 0°，收起动画（500ms ease-out）
                            ├─ 内容 max-height: 实际高度→0 + opacity: 1→0
                            └─ 文字变为"更多"
```

**异步加载态：**

```
展开 ──[点击后内容异步加载]──→ Loading（图标旋转动画，内容区显示加载指示器）──[加载完成]──→ 展开完成
```

**规则：**
- 图标旋转方向：**始终**顺时针，0° → 180° 表示"展开"
- `aria-expanded`：true = 展开，false = 收起
- 展开态文字："收起" / 收起态文字："更多"（默认中文文案，可外部传入）
- 动画参数：`500ms ease-out`，**禁止使用** ease-in-out、ease-in

---

## Design Tokens

### 触发器核心参数

| Token | 值 |
|-------|-----|
| 高度 | 46px（复用 Medium Button） |
| 内边距 | 12px 12px |
| 最小宽度 | 100px |
| 最大宽度 | 220px |
| 圆角 | 8px |
| 字号 | 22px |
| 字重 | 600 (Bold) |
| 行高 | 32px |
| 图标尺寸 | 20×20px |
| 图标间距 | 8px |
| 容器与内容间距 | 16px |

### 文字触发器 Token 矩阵

| 状态 | 背景 | 文字 | 图标 | 边框 | Token |
|------|------|------|------|------|-------|
| **Default** | transparent | `#333333` | `#333333` | 无 | Grey NO.6 |
| **Hover** | `#F5F5F5` | `#333333` | `#333333` | 无 | Grey NO.2 / NO.6 |
| **Pressed** | `#EBEBEB` | `#333333` | `#333333` | 无 | Grey NO.3 / NO.6 |
| **Disabled** | transparent | `#CCCCCC` | `#CCCCCC` | 无 | Grey NO.3 |

### 图文触发器 Token 矩阵

> 与文字触发器共用同一颜色体系，仅额外控制图标颜色。

| 状态 | 背景 | 文字颜色 | 图标颜色 | Token |
|------|------|---------|---------|-------|
| **Default** | transparent | `#333333` | `#333333` | Grey NO.6 |
| **Hover** | `#F5F5F5` | `#333333` | `#333333` | Grey NO.2 / NO.6 |
| **Pressed** | `#EBEBEB` | `#333333` | `#333333` | Grey NO.3 / NO.6 |
| **Disabled** | transparent | `#CCCCCC` | `#CCCCCC` | Grey NO.3 |

---

## Props Contract

| Prop | 类型 | 必填 | 说明 |
|------|------|------|------|
| `expandedText` | `string` | 否（默认 "收起"） | 展开态按钮文字 |
| `collapsedText` | `string` | 否（默认 "更多"） | 收起态按钮文字 |
| `variant` | `'text' \| 'icon-text'` | 否（默认 text） | 触发器变体 |
| `disabled` | `boolean` | 否（默认 false） | 禁用状态 |
| `loading` | `boolean` | 否（默认 false） | 异步加载态 |
| `onToggle` | `(expanded: boolean) => void` | 否 | 展开/收起回调 |
| `children` | `ReactNode` | 是 | 折叠内容区 |
| `className` | `string` | 否 | 自定义类名 |

---

## Code Mapping

| 平台 | 路径 | 状态 |
|------|------|------|
| React | `src/components/Collapse/index.tsx` | 待补充 |
| Vue | - | 待实现 |
| iOS (SwiftUI) | - | 待实现 |
| Android (XML) | - | 待实现 |
| Storybook | - | 待补充 |

---

## AI Notes

**为什么触发器复用 Medium Button 高度（46px）？**
Collapse 的触发器本质上是一个按钮（虽然语义上不完全是 `<button>`），复用 Button 尺寸体系确保整个系统的高度步调一致。用户在不同操作区域的触控期望是一致的。

**为什么图标是 20px 而非 16px？**
图标需要清晰可见以指示状态变化，20px 是 Collapse 触发器区域（46px 高）内的合适比例。16px 在 46px 高度区域会显得太小，不够醒目。

**为什么用 rotate(180deg) 而不是多张图标切换？**
单图标旋转避免了状态切换时的图标加载问题（旋转是纯 CSS，无需加载第二张图）。同时旋转的方向感最强：180° = "翻转到背面" = "内容已翻转到可见状态"。

**为什么禁止使用 ease-in-out？**
原规范已明确：ease-in-out 在收起时（内容退出）会产生减速感，在快收回的瞬间速度变慢，给用户"卡顿"的感觉。ease-out 在展开时自然加速（内容涌出），在收起时立即退出，符合"展开是释放、收起是关闭"的心理模型。

**为什么 Loading 态单独设计？**
PDA 场景下异步加载很常见（如展开后加载详情），Loading 态让用户知道正在处理，避免重复点击。Loading 态下图标旋转动画（而非静态），提供了明确的"正在工作"信号。

---

## Variants Overview

| 变体 | 触发器外观 | 内容区 | 典型场景 |
|------|-----------|--------|---------|
| 文字触发器 | 纯文字按钮 | 任意内容 | "更多/收起"、高级选项 |
| 图文触发器 | 文字 + 箭头图标 | 任意内容 | 列表项展开详情 |
| Loading 态 | 触发器 + 旋转图标 | 加载指示器 | 异步内容展开 |

---

## 核心参数

| 属性 | 值 | Token |
|------|-----|-------|
| 触发器高度 | 46px | 复用 Medium Button |
| 内边距 | 12px 12px | Gap: 12px |
| 最小宽度 | 100px | - |
| 最大宽度 | 220px | - |
| 圆角 | 8px | Radius: 8px |
| 字号 | 22px | Typography: Bold |
| 字重 | 600 (Bold) | - |
| 行高 | 32px | - |
| 图标尺寸 | 20×20px | - |
| 图标间距 | 8px | Gap: 8px |
| 容器与内容间距 | 16px | Gap: 16px |

---

## 详细规格

### 一、图标规范

**图标选择：**
- 展开态（收起触发）：`icon_arrow_down_outline.svg`
- 收起态（展开触发）：`icon_arrow_up_outline.svg`

**旋转规则：**
- 默认状态（收起）：图标 rotate(0°)
- 展开态：图标 rotate(180°)
- 图标颜色：`currentColor`，随文字颜色自动变化

### 二、动画规范

```css
/* 图标旋转 */
.collapse-icon {
  transition: transform 500ms ease-out;
}
.collapse-icon.expanded {
  transform: rotate(180deg);
}

/* 内容展开 */
.collapse-content {
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition: max-height 500ms ease-out, opacity 500ms ease-out;
}
.collapse-content:not([hidden]) {
  max-height: var(--collapse-content-height);
  opacity: 1;
}

/* 加载旋转 */
.collapse-icon.loading {
  animation: collapse-spin 1s linear infinite;
}
@keyframes collapse-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 无障碍动效偏好 */
@media (prefers-reduced-motion: reduce) {
  .collapse-icon,
  .collapse-content { transition: none; }
}
```

---

## 无障碍规范

| 属性 | 值 |
|------|-----|
| role | `button` |
| aria-expanded | `true`（展开）/ `false`（收起）|
| aria-controls | 关联内容区 DOM id |
| tabindex | `0` |
| 键盘 | Enter / Space 切换 |

---

## 代码示例

```jsx
const Collapse = ({ expandedText = '收起', collapsedText = '更多', ... }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <button
        className={`collapse-trigger ${expanded ? 'expanded' : ''}`}
        aria-expanded={expanded}
        aria-controls="collapse-panel"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="collapse-text">
          {expanded ? expandedText : collapsedText}
        </span>
        <svg className="collapse-icon" aria-hidden="true">
          <use href="/icons/icon_arrow_down_outline.svg" />
        </svg>
      </button>

      <div
        id="collapse-panel"
        className="collapse-content"
        hidden={!expanded}
      >
        {children}
      </div>
    </>
  );
};
```

---

## 关联组件

| 组件 | 关系 |
|------|------|
| Button | 触发器复用 Button 尺寸体系（46px） |
| Icon | 使用 icon_arrow 系列 |
| Tabs | Collapse 的"多选项切换"替代品 |
| Steps | Collapse 的"分步流程"替代品 |

---

## Changelog

| 版本 | 日期 | 变更 |
|------|------|------|
| v1.1.0 | 2026-04-22 | 新增 Purpose、Use When/Avoid When、Interaction Flow（结构化含 Loading 态）、AI Notes、Code Mapping、Variants Overview；规范化 Design Tokens 和 Props Contract |
| v1.0.0 | 2026-04-16 | 初始版本 |
