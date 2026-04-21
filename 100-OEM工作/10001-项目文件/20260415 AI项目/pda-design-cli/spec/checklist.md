# 可勾选列表 (Checklist)

在一组列表项中进行单选或多选操作。左侧为复选框图标，右侧为双行文本（主标题+副标题），常用于筛选、分组选择、任务列表等场景。

---

## 何时使用

**用这个组件，当：**
- 用户需要在一组选项中进行单选或多选操作
- 需要展示可勾选的任务列表

**不要用这个组件，当：**
- 只是展示信息（无勾选交互）→ 用 ListItem
- 需要单选切换（互斥选项）→ 用 RadioGroup
- 需要操作类入口（跳转/展开）→ 用 ListItem + 箭头

**Checklist vs ListItem 决策：**

```
列表项需要勾选功能吗？
├─ 是，需要选择操作 → Checklist
└─ 否，只是展示/跳转 → ListItem

是否需要展示多个可选项供用户勾选？
├─ 是 → Checklist
└─ 否 → ListItem
```

---

## ⚠️ 设计规范修正说明

> 以下参数已根据 PDA Design System 进行标准化对齐。原文中的错误值已在备注中说明。

| 修正项 | 原文错误值 | 修正后 | 说明 |
|--------|-----------|--------|------|
| 主标题 正常/选中 | `#333333` | `#333333` | ✅ 无需修正，Black NO.6 正确 |
| 主标题 禁用/未选 | `#BBBBBB` | `#9E9E9E` | ❌ Grey NO.5 = #9E9E9E，非 #BBBBBB |
| 副标题 正常 | `#888888` | `#9E9E9E` | ❌ Grey NO.4 = #BDBDBD，Grey NO.5 = #9E9E9E，按层级应选 NO.5 |
| 副标题 禁用 | `#BBBBBB` | `#9E9E9E` | ✅ 无需修正，Grey NO.5 正确 |
| 分割线 | 未定义 | `#F5F5F5` | 新增，Black NO.2 |
| 字号 | 20px | 20px | ✅ 保留（业务特殊需求） |

> **注意：** 字号 20px 不在标准 Typography 体系（14/16/18/22/24/32），但因业务特殊需求保留。

---

## 一、组件结构

```
┌────────────────────────────────────────────────────────────┐
│  [主标题]   [副标题]                       [✓ 紫色徽章]    │
│  20px Bold  16px Regular                 ←─ 23×23 ──→   │
│  #333333    #9E9E9E                       右上方定点        │
│  ←── 4px ──→                                            │
│                                                            │
│  容器: 480×70px, padding 16px, gap 16px                   │
│  分割线: #F5F5F5 (1px, 底部)                              │
└────────────────────────────────────────────────────────────┘
```

> **图标位置说明：** 复选框图标固定在每行右上角（容器右上角定点），不在左侧。未选中为空框图标，已选中为紫色徽章图标。

---

## 二、布局参数

### 2.1 容器

| 属性 | 值 | Token |
|------|-----|-------|
| 宽度 | 480px | 固定宽度 |
| 高度 | 70px | min-height |
| 内边距 | 16px (水平) / 8px (垂直) | Gap: 16px / Gap: 8px |
| 背景色 | `#FFFFFF` | Black NO.1 |
| Flex 主轴 | `space-between` | 两端对齐 |
| Flex 交叉轴 | `center` | 垂直居中 |
| 分割线 | 1px `#F5F5F5` | Black NO.2 |

### 2.2 文本容器

| 属性 | 值 |
|------|-----|
| 布局 | Flex Column |
| 元素间距 | 4px (主标题与副标题) |
| 对齐 | 靠左 |
| 位置 | 居左 |

### 2.3 复选框图标

| 属性 | 值 | 说明 |
|------|-----|------|
| 图标文件 | `icon_checkbox_checked.svg` | 已选中：紫色徽章右上角固定 |
| 未选中图标 | 路径待定（空框） | 系统图标库暂缺，需补充 |
| 图标尺寸 | 23×23px | 与 SVG 原始尺寸一致 |
| 位置 | 容器右上角顶点对齐 | `position: absolute; top: 16px; right: 16px;` |
| 已选中背景色 | `#6445D1` | Functional Purple |
| 已选中图标色 | `#FFFFFF` | 白色勾号 |

> **布局说明：** 文本区使用 Flex Column 靠左排列，图标使用 `position: absolute` 固定在右上角。与 ListItem 布局完全相反——ListItem 文本居左、图标在右侧；Checklist 文本在左、图标在右上角。

---

## 三、排版规范

### 3.1 主标题

| 属性 | 值 |
|------|-----|
| 字号 | 20px |
| 字重 | 600 (Bold) |
| 行高 | 28px |
| 字体 | PingFang SC |
| 颜色（正常/选中） | `#333333` → Black NO.6 |
| 颜色（禁用） | `#9E9E9E` → Grey NO.5 |

### 3.2 副标题

| 属性 | 值 |
|------|-----|
| 字号 | 16px |
| 字重 | 400 (Regular) |
| 行高 | 22px |
| 字体 | PingFang SC |
| 颜色（正常） | `#9E9E9E` → Grey NO.5 |
| 颜色（禁用） | `#9E9E9E` → Grey NO.5 |

---

## 四、状态规范

### 4.1 状态定义

| 状态 | 标题颜色 | 副标题颜色 | 复选框图标 | 交互 |
|------|---------|-----------|-----------|------|
| **未选中** | `#333333` Black NO.6 | `#9E9E9E` Grey NO.5 | 空框（待补充） | 可点击 |
| **已选中** | `#333333` Black NO.6 | `#9E9E9E` Grey NO.5 | `icon_checkbox_checked.svg` | 可点击 |
| **未选中-禁用** | `#9E9E9E` Grey NO.5 | `#9E9E9E` Grey NO.5 | 空框置灰 | 不可点击 |
| **已选中-禁用** | `#9E9E9E` Grey NO.5 | `#9E9E9E` Grey NO.5 | `icon_checkbox_checked.svg` opacity: 0.4 | 不可点击 |

### 4.2 已选中图标规范

图标文件：`spec/checklist-icons/icon_checkbox_checked.svg`

| 属性 | 值 |
|------|-----|
| 尺寸 | 23×23px |
| 背景色 | `#6445D1` (Functional Purple) |
| 勾号颜色 | `#FFFFFF` |
| 形状 | 右上角切角矩形，带底部圆角 |
| 位置 | 固定于每行右上角 (`top: 16px; right: 16px`) |
| 文件路径 | `spec/checklist-icons/icon_checkbox_checked.svg` |

### 4.3 未选中图标（待补充）

> ⚠️ 系统图标库中暂无专用空复选框（空框）图标，需补充以下图标：
> - `icon_checkbox_outline.svg` — 23×23px 白色空框，用于未选中状态

### 4.4 状态切换动画

| 属性 | 值 |
|------|-----|
| 动画时长 | 200ms |
| 缓动函数 | `cubic-bezier(0.4, 0, 0.2, 1)` |
| 触发时机 | 点击时状态切换 |

---

## 五、API 设计

### 5.1 Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `items` | `Array<Item>` | `[]` | 数据源数组 |
| `checked` | `boolean` | `false` | 是否选中 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `title` | `string` | - | 主标题 |
| `subtitle` | `string` | - | 副标题（可选） |
| `onChange` | `(item) => void` | - | 勾选状态变化回调 |
| `mode` | `'single' \| 'multiple'` | `'multiple'` | 单选/多选模式 |

### 5.2 数据结构

```typescript
interface ChecklistItem {
  id: string;
  title: string;
  subtitle?: string;
  checked?: boolean;
  disabled?: boolean;
}
```

---

## 六、组件代码示例

```tsx
import React from 'react';
import './Checklist.css';

interface ChecklistItem {
  id: string;
  title: string;
  subtitle?: string;
  checked?: boolean;
  disabled?: boolean;
}

interface ChecklistProps {
  items: ChecklistItem[];
  onChange?: (item: ChecklistItem) => void;
  mode?: 'single' | 'multiple';
}

// 单个可勾选列表项
const ChecklistItem: React.FC<{
  item: ChecklistItem;
  onChange?: (item: ChecklistItem) => void;
}> = ({ item, onChange }) => {
  const { title, subtitle, checked = false, disabled = false } = item;

  const handleClick = () => {
    if (!disabled && onChange) {
      onChange({ ...item, checked: !checked });
    }
  };

  return (
    <div
      className={`checklist-item ${disabled ? 'is-disabled' : ''}`}
      role="listitem"
      onClick={!disabled ? handleClick : undefined}
    >
      {/* 文本内容 */}
      <div className="checklist-text">
        <span className="checklist-title">{title}</span>
        {subtitle && <p className="checklist-subtitle">{subtitle}</p>}
      </div>

      {/* 复选框图标 — 固定右上角 */}
      <img
        src={
          checked
            ? './icons/icon_checkbox_checked.svg'
            : './icons/icon_checkbox_outline.svg'
        }
        alt={checked ? '已选中' : '未选中'}
        className={`checklist-icon ${checked ? 'is-checked' : ''}`}
        aria-hidden="true"
      />
    </div>
  );
};

const Checklist: React.FC<ChecklistProps> = ({ items, onChange }) => {
  return (
    <div className="checklist" role="list">
      {items.map((item) => (
        <ChecklistItem key={item.id} item={item} onChange={onChange} />
      ))}
    </div>
  );
};

export default Checklist;
```

### 配套 CSS

```css
.checklist {
  width: 480px;
}

.checklist-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative; /* 为右上角图标建立定位上下文 */
  height: 70px;
  min-height: 70px;
  padding: 8px 16px;
  background: #FFFFFF; /* Black NO.1 */
  cursor: pointer;
  border-bottom: 1px solid #F5F5F5; /* Black NO.2 */
  transition: background-color 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.checklist-item:last-child {
  border-bottom: none;
}

.checklist-item:active {
  background-color: #F5F5F5; /* Black NO.2 */
}

/* 禁用状态 */
.checklist-item.is-disabled {
  cursor: not-allowed;
}

.checklist-item.is-disabled .checklist-title,
.checklist-item.is-disabled .checklist-subtitle {
  color: #9E9E9E; /* Grey NO.5 */
}

.checklist-item.is-disabled .checklist-icon.is-checked {
  opacity: 0.4; /* 已选中禁用态：图标 40% 透明度 */
}

/* 文本 */
.checklist-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  padding-right: 36px; /* 为右上角图标留出空间 */
}

/* 图标 — 固定于右上角 */
.checklist-icon {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 23px;
  height: 23px;
  transition: opacity 200ms ease;
}

.checklist-title {
  font-family: 'PingFang SC';
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  color: #333333; /* Black NO.6 */
}

.checklist-subtitle {
  font-family: 'PingFang SC';
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  color: #9E9E9E; /* Grey NO.5 */
  margin: 0;
}
```

---

## 七、无障碍规范

| 规范 | 实现方式 |
|------|---------|
| 列表容器角色 | `role="list"` |
| 列表项角色 | `role="listitem"` |
| 勾选状态暴露 | `aria-checked="{checked}"` |
| 图标隐藏 | `aria-hidden="true"` |
| 禁用状态 | `aria-disabled="true"` |
| 键盘支持 | Tab 聚焦，Space/Enter 切换状态 |
| 焦点样式 | 2px `#3366FF` outline，offset 2px |

---

## 八、变更记录

| 版本 | 日期 | 变更内容 |
|------|------|---------|
| 1.0.0 | 2026-04-21 | 初始创建，对齐 PDA Design System |
