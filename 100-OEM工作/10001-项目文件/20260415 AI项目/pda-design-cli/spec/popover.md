# 气泡卡片 (Popover)

用于展示补充说明、备注信息或文本溢出内容的轻量级弹层组件。

---

## 一、组件结构

```
┌─────────────────────────┐
│ [图标] 文本内容...      │ ← 气泡主体
└─────────────────────────┘
         ▲                ← 箭头（可选）
```

---

## 二、尺寸参数

| 属性 | 值 | Token 映射 |
|------|-----|-----------|
| 内边距 | **12px 16px** | 上下 12px，左右 16px |
| 圆角 | **8px** | Radius: 8px |
| 最大宽度 | **280px** | - |
| 最小宽度 | **120px** | - |
| 箭头宽度 | **16px** | - |
| 箭头高度 | **8px** | - |

---

## 三、颜色规范

| 元素 | 颜色 | Token |
|------|------|-------|
| 气泡背景 | `#000000` | **Black NO.7** |
| 气泡文字 | `#FFFFFF` | **Black NO.1** |
| 箭头颜色 | `#000000` | **Black NO.7**（与背景同色） |

---

## 四、排版规范

| 属性 | 值 | Token |
|------|-----|-------|
| 字体 | **PingFang SC** | - |
| 字号 | **16px** | Popover 专用字号 |
| 字重 | **400 (Regular)** | - |
| 行高 | **24px** | - |
| 图标与文字间距 | **8px** | Gap: 8px |

> **注意**：Popover 字号 16px 独立于按钮系统，用于提示性文本展示。

---

## 五、状态定义

| 状态 | 可见性 | 动画 | 说明 |
|------|--------|------|------|
| **Hidden** | 隐藏 | opacity: 0, transform: scale(0.95) | 默认隐藏 |
| **Visible** | 显示 | opacity: 1, transform: scale(1) | 展示状态 |
| **Disabled** | 隐藏 | - | 触发元素禁用时不显示 |

---

## 六、箭头设计

### 6.1 方向

| 方向 | 位置 | 使用场景 |
|------|------|---------|
| **向上 ↑** | 气泡底部 | 触发元素在气泡下方 |
| **向下 ↓** | 气泡顶部 | 触发元素在气泡上方 |

### 6.2 CSS 绘制（border）

```css
/* 箭头向下（在气泡顶部） */
.popover-arrow-down::before {
  content: '';
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid #000000;
}

/* 箭头向上（在气泡底部） */
.popover-arrow-up::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid #000000;
}
```

---

## 七、动效规范

| 属性 | 值 | Token |
|------|-----|-------|
| 动画时长 | **500ms** | duration-500 |
| 缓动函数 | **ease-out** | - |
| 显示动画 | opacity 0→1 + scale(0.95)→(1) | - |
| 隐藏动画 | opacity 1→0 + scale(1)→(0.95) | - |

```css
.popover {
  opacity: 0;
  transform: scale(0.95);
  transform-origin: bottom center;
  transition: opacity 500ms ease-out, transform 500ms ease-out;
}

.popover.visible {
  opacity: 1;
  transform: scale(1);
}
```

### 无障碍动效偏好

```css
@media (prefers-reduced-motion: reduce) {
  .popover {
    transition: none;
  }
}
```

---

## 八、层级规范

| 属性 | 值 | 说明 |
|------|-----|------|
| z-index | **1100** | 高于 Modal (1000)，确保在最上层 |
| position | absolute / fixed | 根据定位方式选择 |

---

## 九、组件 API

```typescript
interface PopoverProps {
  /** 气泡内容 */
  content: React.ReactNode;
  /** 箭头方向 */
  placement?: 'top' | 'bottom';
  /** 触发方式（移动端仅 click） */
  trigger?: 'click';
  /** 最大宽度 */
  maxWidth?: number;
  /** 图标插槽 */
  icon?: React.ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义类名 */
  className?: string;
}
```

---

## 十、使用场景

| 场景 | placement | 说明 |
|------|-----------|------|
| 表单提示 | bottom | 输入框下方提示 |
| 文本溢出 | bottom | 展示完整内容 |
| 备注说明 | top | 卡片上方补充信息 |
| 操作指引 | bottom | 引导用户操作 |

---

## 十一、代码示例

### 11.1 基础用法

```html
<!-- 箭头向下 -->
<div class="popover popover-arrow-down" role="tooltip">
  <div class="popover-content">
    <span class="popover-icon">
      <svg width="16" height="16" aria-hidden="true">
        <use href="/icons/icon_tips_outline.svg" />
      </svg>
    </span>
    <span class="popover-text">这是一条提示信息</span>
  </div>
</div>
```

### 11.2 CSS 样式

```css
/* Popover 容器 */
.popover {
  position: absolute;
  display: inline-flex;
  flex-direction: column;
  max-width: 280px;
  min-width: 120px;
  
  /* 动画初始状态 */
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 500ms ease-out, transform 500ms ease-out;
  
  z-index: 1100;
}

.popover.visible {
  opacity: 1;
  transform: scale(1);
}

/* 内容区域 */
.popover-content {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px 16px;
  
  background-color: #000000; /* Black NO.7 */
  border-radius: 8px;
}

/* 文本样式 */
.popover-text {
  font-family: 'PingFang SC', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #FFFFFF; /* Black NO.1 */
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* 图标 */
.popover-icon {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
}

.popover-icon svg {
  width: 16px;
  height: 16px;
  color: #FFFFFF;
}

/* 箭头向下（在气泡顶部） */
.popover-arrow-down::before {
  content: '';
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid #000000;
}

/* 箭头向上（在气泡底部） */
.popover-arrow-up::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid #000000;
}

/* 无障碍：减少动效 */
@media (prefers-reduced-motion: reduce) {
  .popover {
    transition: none;
  }
}
```

### 11.3 JavaScript 控制

```javascript
class Popover {
  constructor(trigger, options = {}) {
    this.trigger = trigger;
    this.popover = this.createPopover(options);
    this.visible = false;
    
    // 点击触发元素显示/隐藏
    this.trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });
    
    // 点击外部关闭
    document.addEventListener('click', (e) => {
      if (!this.popover.contains(e.target) && !this.trigger.contains(e.target)) {
        this.hide();
      }
    });
  }
  
  createPopover(options) {
    const el = document.createElement('div');
    el.className = `popover popover-arrow-${options.placement || 'down'}`;
    el.setAttribute('role', 'tooltip');
    el.innerHTML = `
      <div class="popover-content">
        ${options.icon ? `<span class="popover-icon">${options.icon}</span>` : ''}
        <span class="popover-text">${options.content}</span>
      </div>
    `;
    document.body.appendChild(el);
    return el;
  }
  
  show() {
    this.visible = true;
    this.popover.classList.add('visible');
    this.updatePosition();
  }
  
  hide() {
    this.visible = false;
    this.popover.classList.remove('visible');
  }
  
  toggle() {
    this.visible ? this.hide() : this.show();
  }
  
  updatePosition() {
    const triggerRect = this.trigger.getBoundingClientRect();
    const popoverRect = this.popover.getBoundingClientRect();
    
    // 根据placement计算位置
    // ...定位逻辑
  }
}
```

---

## 十二、无障碍规范

1. 使用 `role="tooltip"` 语义化角色
2. 触发元素添加 `aria-describedby` 关联气泡
3. 装饰性图标添加 `aria-hidden="true"`
4. 确保颜色对比度符合 WCAG AA 标准（黑底白字 > 4.5:1）
5. 支持键盘关闭（Escape 键）

```html
<button aria-describedby="popover-1">提示</button>
<div id="popover-1" class="popover" role="tooltip">
  <!-- 内容 -->
</div>
```

```javascript
// ESC 键关闭
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    popover.hide();
  }
});
```

---

## 十三、变体对照

| 变体 | 箭头 | 图标 | 用途 |
|------|------|------|------|
| 基础气泡 | - | - | 纯文本提示 |
| 带箭头气泡 | ✓ | - | 指向性提示 |
| 带图标气泡 | ✓ | ✓ | 状态性提示（警告/成功） |
| 无箭头气泡 | - | ✓ | 悬浮卡片 |

---

## 十四、关联组件

| 组件 | 关系 |
|------|------|
| Tooltip | Popover 的简化版，纯文本无图标 |
| Dropdown | 下拉菜单，结构类似但内容不同 |
| Modal | 全屏弹层，Popver 是微型弹层 |
| Badge | 可作为 Popover 内容的计数标记 |
