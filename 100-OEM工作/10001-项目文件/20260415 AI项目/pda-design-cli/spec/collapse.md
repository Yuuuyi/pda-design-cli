# 展开收起控件 (Collapse)

用于在空间有限的情况下隐藏次要或过长的内容，用户通过点击触发区域切换内容的显示与隐藏状态。

---

## 一、组件变体

### 1.1 文字触发器

纯文字按钮，点击后展开/收起内容。

### 1.2 图文触发器

文字 + 图标组合，图标指示展开方向。

---

## 二、尺寸参数

| 属性 | 值 | Token 映射 |
|------|-----|-----------|
| 触发器高度 | **46px** | 使用 Medium Button 高度 |
| 触发器内边距 | **12px 12px** | Gap: 12px |
| 触发器最小宽度 | **100px** | - |
| 触发器最大宽度 | **220px** | - |
| 触发器圆角 | **8px** | Radius: 8px |
| 触发器字体 | **PingFang SC** | - |
| 触发器字号 | **22px** | Typography: Bold |
| 触发器字重 | **600 (Bold)** | - |
| 触发器行高 | **32px** | - |
| 图标与文字间距 | **8px** | Gap: 8px |
| 容器与内容间距 | **16px** | - |

> **注意**：统一使用 Medium Button 尺寸体系，确保与其他按钮组件的一致性。

---

## 三、颜色规范

### 3.1 文字触发器

| 状态 | 背景色 | 文字颜色 | 边框 | Token 映射 |
|------|--------|----------|------|-----------|
| **Default** | 透明 | Grey NO.6 `#333333` | 无 | - |
| **Hover** | Grey NO.2 `#F5F5F5` | Grey NO.6 `#333333` | 无 | - |
| **Active/Pressed** | Grey NO.3 `#EBEBEB` | Grey NO.6 `#333333` | 无 | - |
| **Disabled** | 透明 | Grey NO.3 `#CCCCCC` | 无 | - |

### 3.2 图文触发器

| 状态 | 背景色 | 文字颜色 | 图标颜色 | 边框 | Token 映射 |
|------|--------|----------|----------|------|-----------|
| **Default** | 透明 | Grey NO.6 `#333333` | Grey NO.6 `#333333` | 无 | - |
| **Hover** | Grey NO.2 `#F5F5F5` | Grey NO.6 `#333333` | Grey NO.6 `#333333` | 无 | - |
| **Active/Pressed** | Grey NO.3 `#EBEBEB` | Grey NO.6 `#333333` | Grey NO.6 `#333333` | 无 | - |
| **Disabled** | 透明 | Grey NO.3 `#CCCCCC` | Grey NO.3 `#CCCCCC` | 无 | - |

---

## 四、图标规范

### 4.1 图标选择

| 图标名称 | 文件 | 用途 |
|----------|------|------|
| 展开状态 | `icon_arrow_down_outline.svg` | 收起内容，显示向下箭头 |
| 收起状态 | `icon_arrow_up_outline.svg` | 展开内容，显示向上箭头 |

> **注意**：也可使用 `icon_arrow_down.svg` 实心版本，根据视觉风格选择。

### 4.2 图标尺寸

| 属性 | 值 |
|------|-----|
| 图标宽度 | 20px |
| 图标高度 | 20px |
| 图标与文字间距 | 8px |

### 4.3 图标颜色

使用 `currentColor`，随文字颜色自动变化。

---

## 五、交互状态

### 5.1 状态定义

| 状态 | 触发器文字 | 图标方向 | 内容区 | 含义 |
|------|-----------|----------|--------|------|
| **收起** | 更多 | 向下 (0°) | `display: none` 或 `max-height: 0` | 内容隐藏 |
| **展开** | 收起 | 向上 (180°) | `display: block` 或 `max-height: [内容高度]` | 内容显示 |
| **加载中** | - | 旋转动画 | 加载指示器 | 异步加载内容 |

### 5.2 状态转换

```
收起 ──点击──> 展开
   <──点击───
```

---

## 六、动效规范

### 6.1 动画参数

| 属性 | 值 | Token |
|------|-----|-------|
| 动画时长 | **500ms** | duration-500 |
| 缓动函数 | **ease-out** 或 `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | - |

> **禁止使用**：ease-in-out、ease-in

### 6.2 内容区展开动画

```css
/* 推荐：使用 max-height + opacity */
.collapse-content {
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition: max-height 500ms ease-out, opacity 500ms ease-out;
}

.collapse-content.expanded {
  max-height: [实际内容高度];
  opacity: 1;
}
```

### 6.3 图标旋转动画

```css
/* 推荐：使用 transform */
.collapse-icon {
  transition: transform 500ms ease-out;
}

.collapse-icon.expanded {
  transform: rotate(180deg);
}
```

### 6.4 尊重无障碍动效偏好

```css
@media (prefers-reduced-motion: reduce) {
  .collapse-content,
  .collapse-icon {
    transition: none;
  }
}
```

---

## 七、无障碍规范

### 7.1 角色与属性

```html
<!-- 触发按钮 -->
<button
  class="collapse-trigger"
  role="button"
  aria-expanded="false"
  aria-controls="collapse-content-1"
  tabindex="0"
>
  <span class="collapse-text">更多</span>
  <svg class="collapse-icon" aria-hidden="true">...</svg>
</button>

<!-- 内容区 -->
<div
  id="collapse-content-1"
  class="collapse-content"
  hidden
>
  <!-- 内容 -->
</div>
```

### 7.2 键盘交互

| 按键 | 行为 |
|------|------|
| Enter / Space | 切换展开/收起状态 |
| Tab | 进入/移出触发器 |

---

## 八、使用场景

| 场景 | 推荐变体 | 说明 |
|------|---------|------|
| 长文本省略 | 文字触发器 | 纯文字"更多/收起" |
| 列表项展开 | 图文触发器 | 配合箭头指示方向 |
| 复杂内容区域 | 文字触发器 + 加载状态 | 支持异步加载 |
| 表格行展开 | 图文触发器 | 紧凑空间使用 Small Button |

---

## 九、示例代码

### 9.1 基础用法

```html
<!-- HTML -->
<div class="collapse">
  <button
    class="collapse-trigger"
    aria-expanded="false"
    aria-controls="collapse-panel"
  >
    <span class="collapse-text">更多</span>
    <svg class="collapse-icon" aria-hidden="true">
      <use href="/icons/icon_arrow_down_outline.svg" />
    </svg>
  </button>
  
  <div id="collapse-panel" class="collapse-content" hidden>
    <!-- 隐藏的内容 -->
    <p>这里是可折叠的内容区域。</p>
  </div>
</div>
```

### 9.2 CSS

```css
/* Collapse 容器 */
.collapse {
  /* 容器样式 */
}

/* 触发器 */
.collapse-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px; /* Gap: 8px */
  
  height: 46px; /* Medium Button 高度 */
  padding: 12px 12px; /* Gap: 12px */
  
  font-family: PingFang SC;
  font-size: 22px; /* Typography: Bold */
  font-weight: 600;
  line-height: 32px;
  
  color: #333333; /* Grey NO.6 */
  background: transparent;
  border: none;
  border-radius: 8px; /* Radius: 8px */
  
  cursor: pointer;
  transition: background-color 500ms ease-out;
}

.collapse-trigger:hover {
  background: #F5F5F5; /* Grey NO.2 */
}

.collapse-trigger:active {
  background: #EBEBEB; /* Grey NO.3 */
}

.collapse-trigger:disabled {
  color: #CCCCCC; /* Grey NO.3 */
  cursor: not-allowed;
}

/* 图标 */
.collapse-icon {
  width: 20px;
  height: 20px;
  color: currentColor;
  transition: transform 500ms ease-out;
}

.collapse-trigger[aria-expanded="true"] .collapse-icon {
  transform: rotate(180deg);
}

/* 内容区 */
.collapse-content {
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition: max-height 500ms ease-out, opacity 500ms ease-out;
}

.collapse-content:not([hidden]) {
  max-height: [实际内容高度];
  opacity: 1;
}

/* 无障碍：减少动效 */
@media (prefers-reduced-motion: reduce) {
  .collapse-trigger,
  .collapse-icon,
  .collapse-content {
    transition: none;
  }
}
```

### 9.3 JavaScript

```javascript
class Collapse {
  constructor(trigger, panel) {
    this.trigger = trigger;
    this.panel = panel;
    this.isExpanded = false;
    
    this.trigger.addEventListener('click', () => this.toggle());
    this.trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggle();
      }
    });
  }
  
  toggle() {
    this.isExpanded = !this.isExpanded;
    this.trigger.setAttribute('aria-expanded', this.isExpanded);
    
    if (this.isExpanded) {
      this.trigger.querySelector('.collapse-text').textContent = '收起';
      this.panel.hidden = false;
    } else {
      this.trigger.querySelector('.collapse-text').textContent = '更多';
      this.panel.hidden = true;
    }
  }
}

// 使用
const collapse = new Collapse(
  document.querySelector('.collapse-trigger'),
  document.querySelector('.collapse-content')
);
```

---

## 十、关联组件

| 组件 | 关联说明 |
|------|---------|
| Button | 触发器基于 Button 组件 |
| Divider | 分割线可作为展开区域的视觉分隔 |
| Icon | 使用 icon_arrow 系列图标 |
