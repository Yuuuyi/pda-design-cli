# 标签组件 (Tag)

用于标记、分类或状态展示的轻量组件。

---

## 一、组件变体

### 1.1 按尺寸

| 变体 | 高度 | 字号 | 字重 | 行高 | 圆角 | 内边距 |
|------|------|------|------|------|------|--------|
| **Medium** | 32px | 18px | 400 (Regular) | 25px | 8px | 4px 12px |
| **Small** | 24px | 14px | 600 (Bold) | 20px | 4px | 2px 8px |

> 注意：高度 32px = Small Button 高度 - 2px，为标签专用尺寸

### 1.2 按颜色

| 颜色 | 背景色 | 边框色 | 文字色 | 用途 |
|------|--------|--------|--------|------|
| **Success** | Green NO.1 `#F1FFEF` | Green NO.3 `#CCFFCC` | Green NO.7 `#4CBB4C` | 成功状态 |
| **Error** | Red NO.1 `#FFCCCC` | Red NO.3 `#FF8080` | Red NO.7 `#CC0000` | 失败/错误 |
| **Warning** | Yellow NO.3 `#FFF3B0` | Yellow NO.4 `#FFEE8A` | Yellow NO.7 `#F5B000` | 警告提示 |
| **Default** | Grey NO.2 `#EEEEEE` | Grey NO.3 `#E0E0E0` | Grey NO.6 `#52567B` | 默认状态 |
| **Primary** | Primary NO.1 `#F1E7FF` | Primary NO.3 `#B9A0ED` | Primary NO.6 `#6445D1` | 主色强调 |
| **Info** | Blue NO.2 `#D9EFFF` | Blue NO.3 `#C6E6FF` | Blue NO.7 `#00A2FF` | 信息提示 |

---

## 二、颜色规范

### 2.1 Medium 尺寸

| 状态 | 背景色 | 边框色 | 文字色 | Token 映射 |
|------|--------|--------|--------|-----------|
| **Success** | `#F1FFEF` | `#CCFFCC` | `#4CBB4C` | Green NO.1 / NO.3 / NO.7 |
| **Error** | `#FFCCCC` | `#FF8080` | `#CC0000` | Red NO.1 / NO.3 / NO.7 |
| **Warning** | `#FFF3B0` | `#FFEE8A` | `#F5B000` | Yellow NO.3 / NO.4 / NO.7 |
| **Default** | `#EEEEEE` | `#E0E0E0` | `#52567B` | Grey NO.2 / NO.3 / NO.6 |
| **Primary** | `#F1E7FF` | `#B9A0ED` | `#6445D1` | Primary NO.1 / NO.3 / NO.6 |
| **Info** | `#D9EFFF` | `#C6E6FF` | `#00A2FF` | Blue NO.2 / NO.3 / NO.7 |

### 2.2 Small 尺寸

| 状态 | 背景色 | 边框色 | 文字色 | Token 映射 |
|------|--------|--------|--------|-----------|
| **Success** | `#F1FFEF` | `#CCFFCC` | `#4CBB4C` | Green NO.1 / NO.3 / NO.7 |
| **Error** | `#FFCCCC` | `#FF8080` | `#CC0000` | Red NO.1 / NO.3 / NO.7 |
| **Warning** | `#FFF3B0` | `#FFEE8A` | `#F5B000` | Yellow NO.3 / NO.4 / NO.7 |
| **Default** | `#EEEEEE` | `#E0E0E0` | `#52567B` | Grey NO.2 / NO.3 / NO.6 |
| **Primary** | `#F1E7FF` | `#B9A0ED` | `#6445D1` | Primary NO.1 / NO.3 / NO.6 |
| **Info** | `#D9EFFF` | `#C6E6FF` | `#00A2FF` | Blue NO.2 / NO.3 / NO.7 |

> 注意：Small 尺寸使用与 Medium 相同的颜色，仅高度和字号不同

---

## 三、图标规范

### 3.1 图标尺寸

| 尺寸 | 图标宽度 | 图标高度 |
|------|----------|----------|
| **Medium** | 16px | 16px |
| **Small** | 12px | 12px |

### 3.2 图标与文字间距

| 尺寸 | 间距 |
|------|------|
| **Medium** | 8px |
| **Small** | 4px |

### 3.3 推荐图标

| 状态 | 左侧图标 | 右侧图标 |
|------|----------|----------|
| **Success** | `icon_success_outline.svg` | - |
| **Error** | `icon_close_two_outline.svg` | - |
| **Warning** | `icon_attention_outline.svg` | - |
| **Default** | - | - |
| **Primary** | - | - |
| **Info** | `icon_information_outline.svg` | - |

---

## 四、布局规范

### 4.1 容器布局

使用 Flexbox 流式布局，禁止使用绝对定位。

```css
/* 父容器 */
.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px; /* 使用设计系统默认间距 */
  padding: 16px;
}
```

### 4.2 Tag 自身布局

```css
/* Tag 基础样式 */
.tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-style: solid;
  border-width: 1px;
  font-family: 'PingFang SC';
}

/* Medium 尺寸 */
.tag--medium {
  height: 32px;
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 400;
  line-height: 25px;
  gap: 8px;
}

/* Small 尺寸 */
.tag--small {
  height: 24px;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  gap: 4px;
}
```

---

## 五、组件 API

```typescript
interface TagProps {
  /** 标签显示的文本 */
  label: string;
  /** 标签的颜色主题 */
  color?: 'success' | 'error' | 'warning' | 'default' | 'primary' | 'info';
  /** 标签的尺寸 */
  size?: 'medium' | 'small';
  /** 左侧图标 (可选) */
  iconLeft?: React.ReactNode;
  /** 右侧图标 (可选) */
  iconRight?: React.ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 点击事件 */
  onClick?: () => void;
}
```

---

## 六、无障碍规范

1. 使用语义化颜色组合，确保文字与背景对比度 ≥ 4.5:1
2. 点击区域最小 44px × 44px（移动端）
3. 支持键盘聚焦（Tab 键）
4. 使用 `role="button"` 和 `aria-label` 说明含义

---

## 七、使用场景

| 场景 | 推荐变体 | 说明 |
|------|---------|------|
| 订单状态 | Medium / Success/Error | 大号标签展示状态 |
| 表单校验 | Small / Error | 错误提示信息 |
| 筛选标签 | Small / Default | 多选标签 |
| 分类标签 | Small / Primary | 业务分类 |
| 角标 | Small / Info | 数量/消息提醒 |

---

## 八、代码示例

### 8.1 基础用法

```jsx
import { Tag } from 'pda-design';

<Tag color="success" size="medium">
  完成成功
</Tag>

<Tag color="error" size="small">
  失败出错
</Tag>

<Tag color="primary" size="small">
  正常状态
</Tag>

<Tag color="default" size="medium">
  默认通用
</Tag>
```

### 8.2 带图标

```jsx
<Tag 
  color="success" 
  size="medium"
  iconLeft={<SuccessIcon />}
>
  审核通过
</Tag>

<Tag 
  color="error" 
  size="small" 
  iconLeft={<CloseIcon />}
>
  已取消
</Tag>
```

### 8.3 容器布局

```jsx
<div className="tag-container">
  <Tag color="success" size="medium" iconLeft={<CheckIcon />}>完成</Tag>
  <Tag color="error" size="medium" iconLeft={<CloseIcon />}>失败</Tag>
  <Tag color="warning" size="medium">待审核</Tag>
  <Tag color="primary" size="small">标签一</Tag>
  <Tag color="default" size="small">标签二</Tag>
  <Tag color="info" size="small">3</Tag>
</div>
```

---

## 九、关联组件

| 组件 | 关联说明 |
|------|---------|
| Button | 继承按钮的配色体系 |
| Badge | Tag 的计数变体 |
| Input | 表单校验错误提示联动 |