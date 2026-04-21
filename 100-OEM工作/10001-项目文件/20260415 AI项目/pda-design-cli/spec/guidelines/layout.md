# 布局原则 (Layout)

## 对称构图

- **对称构图：** 使用 5/5、4/4/4 或 2 或 6 列偏移开始。
- **左下对齐：** 将主要内容定位在容器底部，左对齐。

## 垂直间距（慷慨的空气感）

- **区块内边距：** `py-24` 到 `py-32` (6rem 到 8rem) — 区块间巨大的垂直空间。
- **组件内边距：** `p-0` 或 `p-16`。
- **元素间距：** 组件组使用 `gap-12` 或 `gap-16`，绝不紧凑。
- **呼吸感：** 如果觉得空间太多，那可能才是对的。

## 区块交替

- 交替使用浅色 (`#EEEEEE`) 区块以形成节奏。

## 内容宽度

- **最大容器宽度：** `max-w-[480px]`。
- **居中：** `mx-auto`。
- **文本列：** `max-w-md` 到 `max-w-xl` 以保证舒适的阅读体验。

---

## 响应式布局规范（PDA 优先）

### 1. 布局方式优先级

```
✅ 优先使用 Flex 布局
✅ 其次使用 Grid 布局
❌ 禁止使用绝对定位 (position: absolute)
❌ 避免使用固定宽高 (width/height 固定值)
```

### 2. 容器自适应规则

| 场景 | 规则 | 示例 |
|------|------|------|
| **页面容器** | max-width: 480px，水平居中 | `max-width: 480px; margin: 0 auto` |
| **流式容器** | width: 100%，带水平内边距 | `width: 100%; padding: 0 16px` |
| **flex 容器** | flex: 1 自适应 | `flex: 1; min-width: 0` |
| **最小点击区域** | 至少 32×32px | 按钮、图标点击区域 |

### 3. 间距系统（4px 基准网格）

```
基础单位: 4px

间距 token:
4px   → xs   (紧凑元素)
8px   → sm   (组件内元素)
12px  → md   (组件间)
16px  → lg   (区块内)
24px  → xl   (区块间)
32px  → 2xl  (大区块间)
48px  → 3xl  (页面级间距)
```

### 4. Flex 布局模式

| 模式 | 用途 | CSS |
|------|------|-----|
| `flex-row` | 水平排列 | `display: flex; flex-direction: row` |
| `flex-col` | 垂直排列 | `display: flex; flex-direction: column` |
| `flex-center` | 居中对齐 | `justify-content: center; align-items: center` |
| `flex-between` | 两端对齐 | `justify-content: space-between` |
| `flex-start` | 起始对齐 | `justify-content: flex-start` |
| `flex-end` | 末尾对齐 | `justify-content: flex-end` |

### 5. 禁止的布局模式

```css
/* ❌ 禁止绝对定位 */
.position-absolute { position: absolute; }

/* ❌ 禁止固定定位（除 NavBar / BottomTabBar） */
.position-fixed { position: fixed; } /* 仅允许顶部/底部导航 */

/* ❌ 禁止固定宽高 */
.fixed-width { width: 100px; }
.fixed-height { height: 100px; }

/* ❌ 禁止负边距（除特殊动画效果） */
.negative-margin { margin: -16px; }
```

### 6. 响应式断点（如需平板/桌面适配）

```css
/* PDA 手机端（默认） */
.container { max-width: 480px; }

/* 平板端 */
@media (min-width: 768px) {
  .container { max-width: 720px; }
}

/* 桌面端 */
@media (min-width: 1024px) {
  .container { max-width: 960px; }
}
```

---

## AI 友好布局提示

当 AI 生成代码时，遵循以下检查清单：

```
□ 容器是否使用 max-width: 480px？
□ 元素间距是否使用 4px 基准网格？
□ 是否优先使用 Flex 而非绝对定位？
□ 按钮/卡片是否使用自适应宽度？
□ 列表项是否使用 flex: 1 自适应？
□ 禁止的布局模式是否已清除？
```
