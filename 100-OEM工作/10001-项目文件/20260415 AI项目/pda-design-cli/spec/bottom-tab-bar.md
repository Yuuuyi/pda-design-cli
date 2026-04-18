# Bottom Tab Bar (底部标签栏)

## 1. 组件概述

底部标签栏用于在移动端应用的主界面之间进行快速切换，通常包含 **3-5 个核心入口**。该组件固定在视口底部，图标在上，文字在下。

---

## 2. 设计 Token 映射

根据 pda-design-system.md，样式对应如下：

| 属性 | 原始值 | 设计系统 Token | 备注 |
|------|--------|----------------|------|
| 选中态文字颜色 | #6445D1 | var(--color-primary-6) | Primary 主色系 NO.6 |
| 未选中态文字颜色 | #666666 | var(--color-functional-black-5) | Black 系 NO.5 |
| 背景颜色 | #FFFFFF | var(--color-functional-black-1) | Black 系 NO.1 (White) |
| 分割线颜色 | SVG 图片 | var(--color-functional-grey-2) | Grey 系 NO.2 |
| 文字字号 | 14px | var(--font-size-sm) | Regular/Bold |
| 行高 | 20px | var(--line-height-sm) | 对应 14px 字号 |
| 图标尺寸 | 32px | var(--icon-size-lg) | 自定义变量 |
| 标签间距 | gap: 6px | var(--spacing-xs) | 自定义变量 |

---

## 3. 图标调用规则

> **重要：Tab Bar 内的图标需调用 icon 包**

底部标签栏的图标必须从 `pda-design-cli/spec/icons/` 目录调用，支持以下格式：

- **填充态（选中）**：`icon_{name}.svg`
- **描边态（未选中）**：`icon_{name}_outline.svg`

### 示例

```javascript
// React 示例
import { IconHome, IconHomeOutline } from 'pda-design-cli/spec/icons';

function TabBar() {
  return (
    <div className="tab-bar">
      <TabItem 
        icon={isActive ? <IconHome /> : <IconHomeOutline />}
        label="首页"
        active={isActive}
      />
    </div>
  );
}
```

---

## 4. Props 定义

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `items` | `TabItem[]` | `[]` | 标签项数组 |
| `activeIndex` | `number` | `0` | 当前选中索引 |
| `onChange` | `(index: number) => void` | - | 切换回调 |

### TabItem 类型

```typescript
interface TabItem {
  label: string;           // 标签文字
  icon: string;            // 图标名称（不含前缀和后缀）
  activeIcon?: string;     // 选中态图标（可选，默认使用填充态）
}
```

---

## 5. 使用示例

```typescript
const tabs = [
  { label: '首页', icon: 'home' },
  { label: '消息', icon: 'message' },
  { label: '我的', icon: 'me' },
];

<TabBar items={tabs} activeIndex={0} onChange={(i) => console.log(i)} />
```

---

## 6. 可用图标

Tab Bar 常用图标（来自 icon 包）：

| 图标名称 | 填充态 | 描边态 |
|----------|--------|--------|
| `home` | icon_home.svg | icon_home_outline.svg |
| `message` | icon_message.svg | icon_message_outline.svg |
| `me` | icon_me.svg | icon_me_outline.svg |
| `search` | icon_search.svg | icon_search_outline.svg |
| `setting` | icon_setting.svg | icon_setting_outline.svg |

完整图标列表见 `spec/icons/index.json`。
