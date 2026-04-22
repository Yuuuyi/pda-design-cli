# NavBar.SideBar 侧边导航栏

## Purpose 用途

> 侧边导航栏组件，用于管理系统左侧菜单区域，支持嵌套子菜单，提供页面导航功能。

### Use When

- 需要左侧固定导航菜单
- 存在多级菜单结构（支持嵌套）
- 与内容区域左右布局

### Avoid When

- 移动端场景（请使用 BottomTabBar）
- 不需要永久显示的导航（请使用 Drawer/Hamburger）

---

## Component Structure 组件结构

```
SideBar (Root Container)
├── SideBar.Menu (左侧菜单区域)
│   ├── SideBar.MenuItem (一级菜单项)
│   │   ├── Icon
│   ├── SideBar.SubMenu (二级菜单容器)
│   │   ├── SideBar.MenuItem (二级菜单项)
│   └── ...
└── SideBar.Content (右侧内容区域)
```

### Props Contract

```typescript
interface SideBarProps {
  /** 当前选中的菜单 key */
  activeKey?: string;
  /** 菜单数据 */
  menus: MenuItem[];
  /** 选中回调 */
  onSelect?: (key: string) => void;
  /** 是否支持折叠 */
  collapsible?: boolean;
}

interface MenuItem {
  key: string;
  label: string;
  icon?: string;
  children?: MenuItem[];
}
```

---

## Design Tokens

### Color 颜色

| 元素 | 属性 | Token | 值 | 说明 |
|------|------|------|-----|------|
| Root Container | Background | Black NO.2 | `#F5F5F5` | 页面背景色 |
| Menu Area | Background | Custom | `#EEEEEE` | 菜单区域背景 |
| Content Area | Background | Black NO.1 / White | `#FFFFFF` | 内容区背景 |
| MenuItem (Active) | Background | Black NO.1 | `#FFFFFF` | 选中态背景 |
| MenuItem (Active) | Text Color | Black NO.6 | `#333333` | 选中态文字 |
| MenuItem (Active) | Font Weight | - | `600` | 选中态字重 |
| MenuItem (Inactive) | Text Color | Black NO.4 | `#999999` | 未选中态文字 |
| MenuItem (Inactive) | Font Weight | - | `400` | 未选中态字重 |
| MenuItem (Hover) | Background | Black NO.3 | `#E0E0E0` | 悬停反馈背景 |

### Typography 排版

| 元素 | Font Size | Line Height | Font Weight |
|------|----------|-----------|-----------|
| MenuItem | 16px | 22px | 400 / 600 (Active) |

### Spacing 间距

| 元素 | 值 |
|------|-----|
| Menu Area Width | 120px |
| MenuItem Padding | 16px |
| MenuItem Gap | 0px |

---

## Interaction Flow 交互流程

### 菜单选择

```
1. 用户点击 MenuItem
   ↓
2. 切换 active 状态
   ↓
3. 高亮当前选中项（背景 #FFFFFF，字重 600）
   ↓
4. 触发 onSelect(key) 回调
```

### 子菜单展开/收起

```
1. 用户点击有子菜单的 MenuItem
   ↓
2. 展开/收起二级菜单（可选动画）
   ↓
3. 箭头图标旋转 90°/0°
```

---

## Code Mapping 代码示例

### CSS Modules

```css
/* SideBar.module.css */
.sidebar {
  display: flex;
  height: 100vh;
  background-color: #F5F5F5; /* Black NO.2 */
}

.menu {
  width: 120px;
  background-color: #EEEEEE;
  padding: 8px 0;
}

.content {
  flex: 1;
  background-color: #FFFFFF;
  overflow: hidden;
}

.menuItem {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  font-size: 16px;
  line-height: 22px;
  color: #999999; /* Black NO.4 */
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.menuItem:hover {
  background-color: #E0E0E0; /* Black NO.3 */
}

.menuItem.active {
  background-color: #FFFFFF;
  font-weight: 600;
  color: #333333; /* Black NO.6 */
}
```

### React Component

```tsx
import React, { useState } from 'react';
import styles from './SideBar.module.css';

interface MenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

interface SideBarProps {
  activeKey?: string;
  menus: MenuItem[];
  onSelect?: (key: string) => void;
}

export function SideBar({ activeKey, menus, onSelect }: SideBarProps) {
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  const handleClick = (key: string, hasChildren: boolean) => {
    if (hasChildren) {
      setExpandedKeys(prev =>
        prev.includes(key)
          ? prev.filter(k => k !== key)
          : [...prev, key]
      );
    }
    onSelect?.(key);
  };

  return (
    <div className={styles.sidebar}>
      <nav className={styles.menu}>
        {menus.map(menu => (
          <div key={menu.key}>
            <button
              className={`${styles.menuItem} ${activeKey === menu.key ? styles.active : ''}`}
              onClick={() => handleClick(menu.key, !!menu.children)}
              aria-current={activeKey === menu.key ? 'page' : undefined}
            >
              {menu.icon}
              <span>{menu.label}</span>
            </button>
            {menu.children && expandedKeys.includes(menu.key) && (
              <div className={styles.subMenu}>
                {menu.children.map(child => (
                  <button
                    key={child.key}
                    className={`${styles.menuItem} ${activeKey === child.key ? styles.active : ''}`}
                    onClick={() => onSelect?.(child.key)}
                  >
                    {child.icon}
                    <span>{child.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      <section className={styles.content}>
        {/* Custom Content */}
      </section>
    </div>
  );
}
```

---

## Accessibility 无障碍

- MenuItem 使用 `<button>` 标签
- 选中态添加 `aria-current="page"`
- 聚焦状态添加 `outline: 2px solid #8061DA` (Primary)
- 左侧菜单区域使用 `<nav>` 标签包裹
- 支持键盘导航（Tab / Enter / Escape）

---

## Related Components 相关组件

- [BottomTabBar](./bottom-tab-bar.md) - 移动端底部导航
- [Navbar](./navbar.md) - 顶部导航栏
- [Drawer](./drawer.md) - 抽屉导航