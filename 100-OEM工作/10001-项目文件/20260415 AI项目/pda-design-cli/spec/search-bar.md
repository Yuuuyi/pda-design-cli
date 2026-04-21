# 搜索栏 (SearchBar)

用户通过输入文字或扫描条码进行查询操作的核心交互组件。常用于页面顶部，支持扫描输入和文字输入两种方式。

---

## 何时使用

**用这个组件，当：**
- 用户需要通过输入文字或扫描条码进行数据查询
- 需要在页面顶部提供统一的搜索入口
- 需要支持扫码 + 手动输入混合场景（如 PDA 运单查询）

**不要用这个组件，当：**
- 只需要扫码功能 → 用 ScanInput
- 搜索结果需要下拉联想 → 用 InputField + 联想列表
- 搜索作为表格/列表的过滤条件 → 用 InputField
- 全局顶栏中的多入口之一 → 用 NavBar 的 Search 变体（navbar-search.md）

**SearchBar vs ScanInput 决策：**

```
主要操作是扫描条码？
├─ 是，以扫描为主 → ScanInput
└─ 否，以文字输入为主 → SearchBar

是否需要"确定/取消"操作按钮？
├─ 是，提交前需要确认 → SearchBar（Filled 状态有确定/取消按钮）
└─ 否，输入即触发 → InputField
```

---

## ⚠️ 设计规范修正说明

> 以下参数已根据 PDA Design System 进行标准化对齐。原文中的错误值已在备注中说明。

| 修正项 | 原文错误值 | 修正后 | 说明 |
|--------|-----------|--------|------|
| 背景色 | `--grey-2: #EEEEEE` | `#F5F5F5` | ❌ #EEEEEE 混入 Grey 系列，应为 Black NO.2 |
| 占位符色 | `--grey-5: #BBBBBB` | `#9E9E9E` | ⚠️ 近似值，Grey NO.5 = #9E9E9E |
| 边框色 | `--primary-6: #6445D1` | ✅ 正确 | Functional Purple |
| 提示文字色 | `#666666` | `#666666` | ✅ 无需修正，Black NO.5 |
| 常规文字色 | `#333333` | `#333333` | ✅ 无需修正，Black NO.6 |
| 背景色（输入框） | `#FFFFFF` | `#FFFFFF` | ✅ 无需修正，Black NO.1 |
| 圆角 | `--radius-sm: 6px` | `4px` | ❌ 6px 超标准，radius-sm = 4px |
| 间距（图标与文字） | `--gap-sm: 8px` | `8px` | ✅ 对齐 Gap: 8px |
| 间距（输入框内边距） | `--gap-md: 16px` | `16px` | ✅ 对齐 Gap: 16px |
| 字号（占位符） | `--font-size-m: 20px` | `20px` | ✅ 保留（业务特殊需求，非标准字阶） |
| 字号（输入/标签文字） | `--font-size-l: 22px` | `22px` | ✅ 无需修正，Bold 22px |
| 字重 | `--font-weight-bold: 600` | `600` | ✅ 无需修正，功能字重 |

> **注意：** 字号 20px 不在标准 Typography 体系（14/16/18/22/24/32），但因业务特殊需求保留。

---

## 一、组件结构

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│  🔍  请扫描/输入运单号                                     │
│  ←8px→                                              ←16px→│
│  容器: 480×84px, padding 8px 12px 16px                    │
│  搜索框: 480×60px, border 1px #6445D1, radius 4px        │
└────────────────────────────────────────────────────────────┘
```

---

## 二、布局参数

### 2.1 容器

| 属性 | 值 | Token |
|------|-----|-------|
| 宽度 | 480px | 固定宽度 |
| 高度 | 84px | - |
| 内边距 | 8px 12px 16px（上下左右） | Gap: 8px / 12px / 16px |
| 布局 | Flex Row，align-items: center | 垂直居中 |

### 2.2 搜索框（输入区）

| 属性 | 值 | Token |
|------|-----|-------|
| 宽度 | 100% | 撑满容器 |
| 高度 | 60px | - |
| 内边距 | 0 16px（左右） | Gap: 16px |
| 背景色 | `#FFFFFF` | Black NO.1 |
| 边框 | 1px solid `#6445D1` | Functional Purple |
| 边框（激活/已输入） | 1px solid `#6445D1` | 同上，状态不区分 |
| 圆角 | 4px | radius-sm |
| Flex | `flex: 1` | 撑满剩余空间 |

### 2.3 搜索框内部结构

| 属性 | 值 |
|------|-----|
| 布局 | Flex Row，align-items: center |
| 元素间距 | 8px（图标/分割线与文字） |
| 垂直对齐 | 居中 |

---

## 三、排版规范

### 3.1 占位符文字（Default 状态）

| 属性 | 值 |
|------|-----|
| 字号 | 20px |
| 字重 | 600 (Bold) |
| 行高 | 28px |
| 字体 | PingFang SC |
| 颜色 | `#9E9E9E` → Grey NO.5 |

### 3.2 输入文字（Filled 状态）

| 属性 | 值 |
|------|-----|
| 字号 | 22px |
| 字重 | 600 (Bold) |
| 行高 | 30px |
| 字体 | PingFang SC |
| 颜色 | `#333333` → Black NO.6 |

### 3.3 分割线（竖线）

| 属性 | 值 |
|------|-----|
| 字符 | `|` |
| 字号 | 22px |
| 字重 | 600 |
| 颜色 | `#6445D1` → Functional Purple |
| 左右间距 | 8px |

### 3.4 标签文字（Active 状态）

| 属性 | 值 |
|------|-----|
| 字号 | 22px |
| 字重 | 600 (Bold) |
| 行高 | 30px |
| 字体 | PingFang SC |
| 颜色 | `#666666` → Black NO.5 |

---

## 四、状态规范

### 4.1 状态定义

| 状态 | 类名 | 搜索框内容 | 右侧操作区 | 交互 |
|------|------|-----------|-----------|------|
| **Default（默认）** | `.search-bar--default` | 搜索图标 + 占位符文字 | 无 | 点击 → Active |
| **Active（输入中）** | `.search-bar--active` | 标签文字 + 分割线 `|` | 取消按钮 | 输入字符 → Filled；点击取消 → Default |
| **Filled（已输入）** | `.search-bar--filled` | 输入文字 + 分割线 `|` | 清空图标 + 确定 + 取消 | 点击清空 → Active；点击确定 → 提交；点击取消 → Default |

### 4.2 右侧操作区

| 元素 | 尺寸 | 颜色 | 行为 |
|------|------|------|------|
| 清空图标 | 22×22px | `#666666` | 点击清空内容 → Active |
| 确定按钮 | 字号 22px，行高 30px，圆角 640px | 文字色 `#6445D1` | 点击提交搜索 |
| 取消按钮 | 字号 22px，行高 30px，圆角 640px | 文字色 `#6445D1` | 点击取消 → Default |

### 4.3 状态切换动画

| 属性 | 值 |
|------|-----|
| 动画时长 | 200ms |
| 缓动函数 | `cubic-bezier(0.4, 0, 0.2, 1)` |

---

## 五、图标规范

| 用途 | 图标文件 | 尺寸 | 说明 |
|------|---------|------|------|
| 搜索图标 | `icon_search_outline.svg` 或 `icon_search.svg` | 22×22px | Default 状态左侧 |
| 清空图标 | `icon_close_two_outline.svg` | 22×22px | Filled 状态右侧清空 |

---

## 六、组件代码

### 6.1 HTML 结构

```html
<!-- 场景一：默认状态 (Default) -->
<div class="search-bar search-bar--default">
  <div class="search-bar__input-wrapper">
    <img
      class="search-bar__icon"
      src="./icons/icon_search_outline.svg"
      alt="搜索"
    />
    <span class="search-bar__placeholder">请扫描/输入运单号</span>
  </div>
</div>

<!-- 场景二：输入中 (Active) -->
<div class="search-bar search-bar--active">
  <div class="search-bar__input-wrapper">
    <span class="search-bar__label">请输入</span>
    <span class="search-bar__divider">|</span>
  </div>
  <button class="search-bar__btn search-bar__btn--cancel">取消</button>
</div>

<!-- 场景三：已输入内容 (Filled) -->
<div class="search-bar search-bar--filled">
  <div class="search-bar__input-wrapper">
    <span class="search-bar__text">已输入的文案</span>
    <span class="search-bar__divider">|</span>
  </div>
  <div class="search-bar__actions">
    <img
      class="search-bar__clear-icon"
      src="./icons/icon_close_two_outline.svg"
      alt="清除"
    />
    <button class="search-bar__btn search-bar__btn--confirm">确定</button>
    <button class="search-bar__btn search-bar__btn--cancel">取消</button>
  </div>
</div>
```

### 6.2 CSS 样式

```css
/* ==========================================
 SearchBar 组件
 ========================================== */

.search-bar {
  width: 480px;
  height: 84px;
  display: flex;
  align-items: center;
  padding: 8px 12px 16px;
  box-sizing: border-box;
  gap: 8px;
}

/* 搜索框主体 */
.search-bar__input-wrapper {
  flex: 1;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  background: #FFFFFF; /* Black NO.1 */
  border: 1px solid #6445D1; /* Functional Purple */
  border-radius: 4px; /* radius-sm */
  gap: 8px;
  box-sizing: border-box;
}

/* 搜索图标 */
.search-bar__icon {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
}

/* 占位符 */
.search-bar__placeholder {
  font-family: 'PingFang SC', sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  color: #9E9E9E; /* Grey NO.5 */
  flex: 1;
}

/* 输入文字 */
.search-bar__text {
  font-family: 'PingFang SC', sans-serif;
  font-size: 22px;
  font-weight: 600;
  line-height: 30px;
  color: #333333; /* Black NO.6 */
  flex: 1;
}

/* 标签文字 */
.search-bar__label {
  font-family: 'PingFang SC', sans-serif;
  font-size: 22px;
  font-weight: 600;
  line-height: 30px;
  color: #666666; /* Black NO.5 */
}

/* 分割线 */
.search-bar__divider {
  font-family: 'PingFang SC', sans-serif;
  font-size: 22px;
  font-weight: 600;
  line-height: 30px;
  color: #6445D1; /* Functional Purple */
  flex-shrink: 0;
}

/* 操作区 */
.search-bar__actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

/* 清空图标 */
.search-bar__clear-icon {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  cursor: pointer;
  filter: brightness(0) saturate(100%) invert(36%) sepia(0%) saturate(0%)
    hue-rotate(323deg) brightness(95%) contrast(86%); /* #666666 */
}

/* 按钮 */
.search-bar__btn {
  font-family: 'PingFang SC', sans-serif;
  font-size: 22px;
  font-weight: 600;
  line-height: 30px;
  color: #6445D1; /* Functional Purple */
  background: transparent;
  border: none;
  border-radius: 640px; /* radius-full */
  padding: 4px 8px;
  cursor: pointer;
  transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.search-bar__btn:active {
  opacity: 0.6;
}
```

---

## 七、状态机交互逻辑

```
┌─────────────┐  点击输入框   ┌─────────────┐  输入字符   ┌─────────────┐
│   Default   │ ───────────→  │   Active    │ ─────────→  │   Filled    │
│  (默认状态)  │               │  (输入中)    │             │  (已输入)   │
└─────────────┘               └─────────────┘             └─────────────┘
     ↑                              ↑                              │
     │                              │                              │
     └──────────────────────────────┴───────  点击"取消"/清空 ──────┘
```

| 交互操作 | 触发条件 | 结果状态 |
|---------|---------|---------|
| 点击输入框 | Default 时点击搜索框 | → Active |
| 开始输入 | Active 时输入字符 | → Filled |
| 清空内容 | Filled 时点击清空图标 | → Active |
| 确认搜索 | Filled 时点击"确定" | 提交搜索结果 |
| 取消 | Active/Filled 时点击"取消" | → Default |
