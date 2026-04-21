# 运单号展示组件 (WaybillDisplay)

运单号展示组件是一个全局通用的基础组件，用于在系统中统一展示运单号及相关操作。该组件支持灵活的插槽配置，可根据业务场景动态添加前缀（如多选、复制按钮）或后缀（如标签信息）。

---

## ⚠️ 设计规范修正说明

> 以下参数已根据 PDA Design System 进行标准化对齐

| 原始参数 | 问题 | 修正后 | 说明 |
|----------|------|--------|------|
| `#888888` | Grey 色阶外色值 | `#BDBDBD` | 对齐 Grey NO.4 |
| `#FF9F02` | 非标准色值 | `#FFD933` | 对齐 Yellow NO.6 |
| 字号 20px | 非标准字阶 | 统一使用 18px | 符合 Small 组件规范 |
| 容器高度 33px | 非标准尺寸 | 32px | 对齐 Tag Small 尺寸 |
| 字重 600 (Bold) | 表述不精确 | 统一为 600 | 符合设计系统字重定义 |

---

## 一、组件属性 (Props)

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `waybillNo` | String | - | 运单号主体（如 `225662`） |
| `prefixCode` | String | - | 运单号前缀（如 `KY4000327`） |
| `genderTag` | Object | `{ text: '母', bgColor: '#FFD933' }` | 性别/类型标签配置，支持自定义文本和背景色 |
| `showSearchBtn` | Boolean | `true` | 是否显示右侧"查件"按钮 |
| `searchBtnText` | String | `'查件'` | "查件"按钮文案 |

---

## 二、插槽 (Slots)

| 插槽名 | 说明 |
|--------|------|
| `prefix` | **左侧插槽**。用于放置多选框、复制按钮等前置操作元素。 |
| `suffix` | **右侧插槽**。位于"查件"按钮之后，用于放置"易损高赔"、"必装票"等业务标签。 |

---

## 三、事件 (Events)

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `click-search` | `(waybillNo: string)` | 点击"查件"按钮时触发，返回当前运单号。 |

---

## 四、布局与间距

### 4.1 容器参数

| 属性 | 值 | 说明 |
|------|-----|------|
| 高度 | 32px | 对齐 Tag Small 尺寸 |
| 最大宽度 | 448px | 与按钮系统一致 |
| 主轴对齐 | `flex-start` | 左对齐 |
| 交叉轴对齐 | `center` | 垂直居中 |
| 内部间距 | 8px / 4px | 根容器 8px，子项 4px |

### 4.2 布局示意

```
+------------------------------------------------------------------+
| [Prefix] [前缀] [运单号主体]  [查件按钮]  [Suffix: 标签...]       |
|                                                                  |
| • Container Height: 32px                                        |
| • Max Width: 448px                                               |
| • Gap (Root): 8px                                               |
| • Gap (Children): 4px                                           |
+------------------------------------------------------------------+
```

---

## 五、排版规范 (Typography)

| 元素 | 字号 | 字重 | 行高 | 色值 | Token |
|------|------|------|------|------|-------|
| **运单前缀** | 18px | 400 (Regular) | 25px | `#BDBDBD` | Grey NO.4 |
| **运单主体** | 18px | 600 (Bold) | 25px | `#333333` | Black NO.6 |
| **查件按钮** | 18px | 600 (Bold) | 25px | `#6445D1` | Primary NO.6 |
| **标签文本** | 14px | 600 (Bold) | 20px | `#FFFFFF` | White |

> **修正说明**：统一字号为 18px，对齐设计系统字阶标准

---

## 六、颜色系统

### 6.1 颜色映射

| 元素 | 色值 | Token | 说明 |
|------|------|-------|------|
| 前缀文字 | `#BDBDBD` | Grey NO.4 | 运单前缀 |
| 主体文字 | `#333333` | Black NO.6 | 运单主体 |
| 查件按钮 | `#6445D1` | Primary NO.6 | 主色调 |
| 标签文字 | `#FFFFFF` | White | 白色文字 |

### 6.2 性别标签颜色

| 颜色 | 色值 | Token | 说明 |
|------|------|-------|------|
| 默认背景 | `#FFD933` | Yellow NO.6 | 性别标签 |
| 标签文字 | `#FFFFFF` | White | 白色文字 |

> **修正说明**：`#FF9F02` 已修正为 `#FFD933`，对齐 Yellow NO.6

---

## 七、样式细节

### 7.1 标签 (Tag)

| 属性 | 值 | 说明 |
|------|-----|------|
| 内边距 | `2px 8px` | 对齐 Tag Small 尺寸 |
| 圆角 | `4px` | 对齐 Tag Small 尺寸 |
| 背景色 | `#FFD933` (Yellow NO.6) | 默认黄色 |
| 文字色 | `#FFFFFF` | 白色 |

### 7.2 查件按钮

| 属性 | 值 | 说明 |
|------|-----|------|
| 最小宽度 | 40px | - |
| 最大宽度 | 120px | - |
| 内边距 | `4px 8px` | - |
| 圆角 | `4px` | - |
| 边框 | 无 | 使用纯文字按钮 |
| 文字色 | `#6445D1` (Primary NO.6) | 主色调 |

---

## 八、组件 API

```typescript
interface WaybillDisplayProps {
  /** 运单号主体 */
  waybillNo: string;
  /** 运单号前缀 */
  prefixCode?: string;
  /** 性别/类型标签配置 */
  genderTag?: {
    text: string;
    bgColor?: string;
  };
  /** 是否显示查件按钮 */
  showSearchBtn?: boolean;
  /** 查件按钮文案 */
  searchBtnText?: string;
  /** 左侧插槽 */
  prefix?: React.ReactNode;
  /** 右侧插槽 */
  suffix?: React.ReactNode;
}
```

### 8.1 事件类型

```typescript
interface WaybillDisplayEvents {
  /** 点击查件按钮事件 */
  'click-search': (waybillNo: string) => void;
}
```

---

## 九、代码示例

### 9.1 基础用法

```jsx
import { WaybillDisplay } from 'pda-design';

<WaybillDisplay 
  waybillNo="225662"
  prefixCode="KY4000327"
/>
```

### 9.2 带性别标签

```jsx
<WaybillDisplay 
  waybillNo="225662"
  prefixCode="KY4000327"
  genderTag={{ text: '母', bgColor: '#FFD933' }}
/>
```

### 9.3 带查件按钮

```jsx
<WaybillDisplay 
  waybillNo="225662"
  prefixCode="KY4000327"
  showSearchBtn={true}
  searchBtnText="查件"
  onClickSearch={(waybillNo) => handleSearch(waybillNo)}
/>
```

### 9.4 带插槽

```jsx
<WaybillDisplay 
  waybillNo="225662"
  prefixCode="KY4000327"
  prefix={<Checkbox />}
  suffix={<Tag color="warning" size="small">易损高赔</Tag>}
  onClickSearch={(waybillNo) => handleSearch(waybillNo)}
/>
```

### 9.5 完整示例

```jsx
import { WaybillDisplay, Tag, Checkbox } from 'pda-design';

<WaybillDisplay 
  waybillNo="225662"
  prefixCode="KY4000327"
  genderTag={{ text: '母', bgColor: '#FFD933' }}
  showSearchBtn={true}
  searchBtnText="查件"
  prefix={<Checkbox />}
  suffix={
    <>
      <Tag color="warning" size="small">易损高赔</Tag>
      <Tag color="error" size="small">必装票</Tag>
    </>
  }
  onClickSearch={(waybillNo) => console.log('查询运单:', waybillNo)}
/>
```

---

## 十、关联组件

| 组件 | 关联说明 |
|------|---------|
| Tag | 右侧业务标签，继承 Tag Small 尺寸规范 |
| Button | 查件按钮基于 Button Small 尺寸，颜色对齐 Primary NO.6 |
| ScanInput | 运单号输入组件，展示组件的下游使用场景 |

---

## 十一、无障碍规范

1. **文字对比度**：所有文字与背景对比度 ≥ 4.5:1
2. **点击区域**：按钮最小点击区域 44px × 44px
3. **键盘支持**：支持 Tab 键聚焦，Enter 键触发点击事件
4. **语义化**：使用 `aria-label` 标注运单号内容
5. **复制功能**：复制按钮需配合 Toast 提示操作结果
