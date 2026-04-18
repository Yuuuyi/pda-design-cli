# InputField (输入框)

## 1. 组件概览

- **类型：** 基础表单组件
- **支持状态：**
  - Empty (未输入)：显示占位符，视觉层级较弱。
  - Filled (已输入)：显示用户输入的文本，视觉层级较强。
- **布局结构：** 整体容器 → 输入行（固定标题 + 弹性输入区 + 图标）→ 底部分割线。

## 2. 设计变量映射 (Design Tokens)

### 2.1 颜色 (Colors)

| UI 元素 | 属性 | 设计系统 Token | 色值 | 说明 |
|---------|------|---------------|------|------|
| 背景 (Input Row) | background | Color-Functional-Black NO.1 | #FFFFFF | 全局白色背景 |
| 标题文字 (Label) | color | Color-Functional-Black NO.6 | #333333 | 字重 Heavy/Bold |
| 输入文字 (Filled) | color | Color-Functional-Black NO.6 | #333333 | 正文内容色 |
| 占位符 (Empty) | color | Color-Functional-Grey NO.5 | #9E9E9E | 弱文本色（原代码为 #BBBBBB，按设计系统修正为 NO.5） |
| 分割线 (Divider) | color | Color-Functional-Grey NO.2 | #EEEEEE | 默认背景/分割线颜色 |

### 2.2 排版 (Typography)

遵循 PingFang SC 字体族：

| UI 元素 | 字重 | 字号 (px) | 行高 (px) |
|---------|------|-----------|-----------|
| 标题 (Label) | Heavy / Bold | 20px | 28px |
| 输入内容/占位符 | Regular | 20px | 28px |

### 2.3 布局与间距 (Layout & Spacing)

| 属性 | 数值 | 对应 Token | 说明 |
|------|------|-----------|------|
| 组件总宽 | 480px | - | 固定宽度 |
| 组件总高 | 70px | - | 固定高度 |
| 容器内边距 | 16px | - | 上下左右内边距 |
| 标题与输入区间距 | 16px | Gap (Default) | 默认间距 |
| 标题宽度 | 120px | - | 固定宽度，不伸缩 |

### 2.4 图标 (Icons)

- 尺寸：`24px × 24px`
- 位置：输入区域最右侧

## 3. 组件结构

```html
<!-- Root Container: 定义整体尺寸 -->
<div class="input-field-container">

  <!-- Input Row: 实际输入区域 -->
  <div class="input-field-row">

    <!-- Label: 左侧标题 (固定样式) -->
    <label class="input-label">标题名称</label>

    <!-- Input Area: 右侧输入与图标 -->
    <div class="input-area">
      <!--
      根据状态切换 class 或内容：
      - Empty State: <span class="input-placeholder">请输入</span>
      - Filled State: <span class="input-value">已输入文本</span>
      -->
      <span class="input-value">已输入文本</span>

      <!-- 右侧图标 -->
      <img class="input-icon" src="./asset/icons/svg_0c378d38.svg" />
    </div>

  </div>

  <!-- Divider: 底部分割线 -->
  <img class="input-divider" src="./asset/icons/svg_24cd536b.svg" />

</div>
```

## 4. 状态差异对照表

| 维度 | Empty (未输入) | Filled (已输入) | 处理方式 |
|------|---------------|----------------|----------|
| 内容源 | placeholder Prop | value Prop | 组件内部逻辑判断 |
| 显示文本 | 请输入 | 已输入文本 | 动态渲染 |
| 文字颜色 | #9E9E9E (Grey NO.5) | #333333 (Black NO.6) | 绑定不同 CSS Class |
| 交互焦点 | 聚焦后光标显示在占位符位置 | 聚焦后光标显示在文本末尾 | 原生 input 行为 |

## 5. Props 定义 (TypeScript)

```typescript
interface InputFieldProps {
  /** 左侧标题 */
  label: string;
  /** 已输入的文本值 (Filled 状态) */
  value?: string;
  /** 占位符文本 (Empty 状态)，默认为 "请输入" */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 右侧图标路径，为空则不显示 */
  iconSrc?: string;
}

// 使用示例
// <InputField label="标题名称" placeholder="请输入" />
// <InputField label="标题名称" value="已输入文本" />
```

## 总结

通过将两种状态合并为一个组件，避免了代码重复。组件内部通过判断 `value` 是否存在来决定渲染"占位符"（弱色）还是"实际值"（主色），从而完美适配设计系统中的 Color-Functional-Black 与 Color-Functional-Grey 层级。
