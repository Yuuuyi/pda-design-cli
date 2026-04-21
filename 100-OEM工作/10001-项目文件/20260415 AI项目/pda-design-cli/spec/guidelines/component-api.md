# 组件可变能力标准 (Component API Standards)

本文档定义 PDA Design System 组件的 **五类可变能力**，确保 AI 能够理解和预测组件的变化方式。

> **核心原则**：所有组件变化尽量收敛到以下五种类型。

---

## 五类可变能力定义

| 能力类型 | 英文 | 说明 | 示例 |
|----------|------|------|------|
| **状态变体** | Variants | 预定义的视觉/行为模式 | Button 的 Primary/Outline/Gray |
| **文本属性** | Text Property | 可自定义的文本内容 | Tag 的 label、Button 的 children |
| **实例替换** | Instance Swap | 可替换的图标/图片 | ListItem 的 icon、EmptyState 的插画 |
| **布尔属性** | Boolean Property | 开关类配置 | disabled、showArrow、loading |
| **插槽** | Slot | 自定义内容区域 | Card 的 content、Modal 的 footer |

---

## 组件能力矩阵

### 按钮组件 (Buttons)

| 能力 | 支持 | 说明 |
|------|------|------|
| 状态变体 | ✅ | Primary / Outline / Red / Yellow / Gray / Ghost |
| 文本属性 | ✅ | children (按钮文字) |
| 实例替换 | ❌ | - |
| 布尔属性 | ✅ | disabled / loading |
| 插槽 | ❌ | - |

**API 示例：**
```typescript
interface ButtonProps {
  variant?: 'primary' | 'outline' | 'red' | 'yellow' | 'gray' | 'ghost';
  children: string;
  disabled?: boolean;
  loading?: boolean;
}
```

---

### 标签组件 (Tag)

| 能力 | 支持 | 说明 |
|------|------|------|
| 状态变体 | ✅ | Info / Success / Warning / Error |
| 文本属性 | ✅ | label (标签文字) |
| 实例替换 | ❌ | - |
| 布尔属性 | ❌ | - |
| 插槽 | ❌ | - |

**API 示例：**
```typescript
interface TagProps {
  variant: 'info' | 'success' | 'warning' | 'error';
  label: string;
}
```

---

### 缺省页组件 (EmptyState)

| 能力 | 支持 | 说明 |
|------|------|------|
| 状态变体 | ✅ | 10 种业务插画 (no-content / no-task / network-error 等) |
| 文本属性 | ✅ | title / description |
| 实例替换 | ✅ | customIcon (自定义插画) |
| 布尔属性 | ❌ | - |
| 插槽 | ❌ | - |

**API 示例：**
```typescript
type EmptyStateIcon = 'no-content' | 'no-record' | 'no-task' | 'no-result' 
  | 'no-payment' | 'no-permission' | 'network-error' | 'scan-waybill' 
  | 'scan-pallet' | 'fill-waybill';

interface EmptyStateProps {
  icon: EmptyStateIcon;
  title?: string;
  description?: string;
  customIcon?: React.ReactNode;
}
```

---

### 列表项组件 (ListItem)

| 能力 | 支持 | 说明 |
|------|------|------|
| 状态变体 | ❌ | - |
| 文本属性 | ✅ | title / subtitle |
| 实例替换 | ✅ | icon (左侧图标) |
| 布尔属性 | ✅ | showDivider / showArrow |
| 插槽 | ✅ | rightSlot |

**API 示例：**
```typescript
interface ListItemProps {
  title: string;
  subtitle?: string;
  icon?: string;
  rightSlot?: React.ReactNode;
  showDivider?: boolean;
  showArrow?: boolean;
}
```

---

### 气泡组件 (Popover)

| 能力 | 支持 | 说明 |
|------|------|------|
| 状态变体 | ✅ | direction (上/下/左/右) |
| 文本属性 | ✅ | content (弹出内容) |
| 实例替换 | ❌ | - |
| 布尔属性 | ✅ | visible / closeOnClickOutside |
| 插槽 | ✅ | triggerSlot / contentSlot |

**API 示例：**
```typescript
interface PopoverProps {
  direction?: 'top' | 'bottom' | 'left' | 'right';
  content?: string;
  visible?: boolean;
  closeOnClickOutside?: boolean;
  triggerSlot?: React.ReactNode;
  contentSlot?: React.ReactNode;
}
```

---

### 折叠面板组件 (Collapse)

| 能力 | 支持 | 说明 |
|------|------|------|
| 状态变体 | ❌ | - |
| 文本属性 | ✅ | title / content |
| 实例替换 | ✅ | icon (展开图标) |
| 布尔属性 | ✅ | expanded (展开状态) |
| 插槽 | ✅ | contentSlot |

**API 示例：**
```typescript
interface CollapseProps {
  title: string;
  content?: string;
  icon?: string;
  expanded?: boolean;
  contentSlot?: React.ReactNode;
}
```

---

### 运单展示组件 (WaybillDisplay)

| 能力 | 支持 | 说明 |
|------|------|------|
| 状态变体 | ❌ | - |
| 文本属性 | ✅ | prefix / waybillNo / suffixText |
| 实例替换 | ✅ | suffixTag (右侧标签) |
| 布尔属性 | ✅ | clickable |
| 插槽 | ❌ | - |

**API 示例：**
```typescript
interface WaybillDisplayProps {
  prefix?: string;
  waybillNo: string;
  suffixText?: string;
  suffixTag?: 'male' | 'female' | 'normal';
  clickable?: boolean;
}
```

---

### 扫描输入组件 (ScanInput)

| 能力 | 支持 | 说明 |
|------|------|------|
| 状态变体 | ✅ | 场景模式 (default / scan-waybill / scan-pallet) |
| 文本属性 | ✅ | placeholder |
| 实例替换 | ✅ | prefixIcon / suffixIcon |
| 布尔属性 | ✅ | disabled |
| 插槽 | ❌ | - |

**API 示例：**
```typescript
type ScanInputScene = 'default' | 'scan-waybill' | 'scan-pallet';

interface ScanInputProps {
  scene?: ScanInputScene;
  placeholder?: string;
  prefixIcon?: string;
  suffixIcon?: string;
  disabled?: boolean;
}
```

---

### 导航栏组件 (NavBar)

| 能力 | 支持 | 说明 |
|------|------|------|
| 状态变体 | ✅ | navbar-default / navbar-tabs / navbar-members / navbar-search |
| 文本属性 | ✅ | title |
| 实例替换 | ❌ | - |
| 布尔属性 | ✅ | showBack |
| 插槽 | ✅ | rightSlot |

**API 示例：**
```typescript
interface NavBarProps {
  variant?: 'default' | 'tabs' | 'members' | 'search';
  title: string;
  showBack?: boolean;
  rightSlot?: React.ReactNode;
}
```

---

## AI 友好组件检查清单

当评估一个新组件是否符合 AI 友好标准时，使用以下检查：

```
□ 组件名是否一眼看懂用途？
□ 状态变体是否提前定义（枚举）？
□ 文本内容是否通过 props 传入？
□ 图标/图片是否可替换？
□ 开关类属性是否用布尔值？
□ 变化部分是否留有插槽？
□ 变化是否能归类到五种方式里？
```

---

## 新组件设计模板

```typescript
interface NewComponentProps {
  // 1. 状态变体（可选）
  variant?: 'default' | 'option-a' | 'option-b';
  
  // 2. 文本属性（可选）
  title?: string;
  description?: string;
  
  // 3. 实例替换（可选）
  icon?: string;
  image?: string;
  
  // 4. 布尔属性（可选）
  disabled?: boolean;
  loading?: boolean;
  
  // 5. 插槽（可选）
  prefixSlot?: React.ReactNode;
  suffixSlot?: React.ReactNode;
}
```

---

## 关联文档

- [图标使用规范](./icon-usage.md) - 图标命名和变体规则
- [布局原则](./layout.md) - 响应式布局和 Flex 规范
- [组件注册表](./registry.json) - 全部组件索引
