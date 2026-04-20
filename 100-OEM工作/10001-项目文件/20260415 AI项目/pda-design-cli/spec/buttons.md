# 按钮系统 (Buttons)

按钮是交互的核心组件，用于触发操作、提交表单、导航等。

---

## 核心参数（统一）

所有按钮变体共享以下基础参数：

| 属性 | 值 | Token |
|------|-----|-------|
| 高度 | 64px | - |
| 宽度（最小） | 100px | - |
| 宽度（推荐） | 448px | - |
| 宽度（最大） | 448px | - |
| 内边距 | 16px（垂直） 16px（水平） | Gap: 16px |
| 圆角 | 8px | Radius: 8px |
| 字体 | PingFang SC | - |
| 字号 | 22px | Typography: Bold |
| 行高 | 32px | - |
| 字重 | 600 (Bold) | - |
| 文字对齐 | 居中 | - |

> **注意：** 高度 64px 与扫描框高度一致，宽度 448px 与扫描框宽度 456px 接近（差 8px，保留安全边距）。

---

## 一、紫色系 (Primary)

### 1.1 Primary Solid

主按钮，用于页面主要操作（如提交、确认）。

| 状态 | 背景色 | 文字颜色 | 边框 | Token 映射 |
|------|--------|----------|------|-----------|
| **Default** | `#6445D1` | `#FFFFFF` | 无 | Pri-NO.6 / White |
| **Pressed/Hover** | `#432CB0` | `#FFFFFF` | 无 | Pri-NO.7 / White |
| **Disabled** | `#D4C2F4` | `#FFFFFF` | 无 | Pri-NO.2 / White |

### 1.2 Primary Outline Default

白底紫边紫字，用于次要操作。

| 状态 | 背景色 | 文字颜色 | 边框 | Token 映射 |
|------|--------|----------|------|-----------|
| **Default** | `#FFFFFF` | `#6445D1` | 1px solid #6445D1 | White / Pri-NO.6 |
| **Pressed/Hover** | `#F1E7FF` | `#432CB0` | 1px solid #432CB0 | Pri-NO.1 / Pri-NO.7 |
| **Disabled** | `#FFFFFF` | `#D4C2F4` | 1px solid #D4C2F4 | White / Pri-NO.2 |

### 1.3 Primary Outline Subtle

浅紫底紫边淡紫字，用于更弱的次要操作。

| 状态 | 背景色 | 文字颜色 | 边框 | Token 映射 |
|------|--------|----------|------|-----------|
| **Default** | `#F1E7FF` | `#9C80E3` | 1px solid #6445D1 | Pri-NO.1 / Pri-NO.4 |
| **Pressed/Hover** | `#D4C2F4` | `#6445D1` | 1px solid #6445D1 | Pri-NO.2 / Pri-NO.6 |
| **Disabled** | `#F1E7FF` | `#D4C2F4` | 1px solid #D4C2F4 | Pri-NO.1 / Pri-NO.2 |

---

## 二、红色系 (Functional Red)

警示按钮，用于删除、拒绝、紧急操作。

| 状态 | 背景色 | 文字颜色 | 边框 | Token 映射 |
|------|--------|----------|------|-----------|
| **Default** | `#FF5C5C` | `#FFFFFF` | 无 | Red-NO.4 / White |
| **Pressed/Hover** | `#CC0000` | `#FFFFFF` | 无 | Red-NO.7 / White |
| **Disabled** | `#FFCCCC` | `#FFFFFF` | 无 | Red-NO.1 / White |

> **说明：** 色值已匹配标准色板。Default 使用 Red-NO.4 近似 #FF5C5C。

---

## 三、黄色系 (Functional Yellow)

提示按钮，用于警告、注意、中性提示操作。

| 状态 | 背景色 | 文字颜色 | 边框 | Token 映射 |
|------|--------|----------|------|-----------|
| **Default** | `#FFD933` | `#FFFFFF` | 无 | Yellow-NO.6 / White |
| **Pressed/Hover** | `#F5B000` | `#FFFFFF` | 无 | Yellow-NO.7 / White |
| **Disabled** | `#FFFBE6` | `#F5B000` | 无 | Yellow-NO.1 / Yellow-NO.7 |

> **说明：** Default 使用 Yellow-NO.6 主色，Pressed 使用 Yellow-NO.7 深色。

---

## 四、灰色系 (Neutral/Secondary)

次级按钮，用于取消、返回、辅助操作。

### 4.1 Gray Solid

深灰蓝实心按钮。

| 状态 | 背景色 | 文字颜色 | 边框 | Token 映射 |
|------|--------|----------|------|-----------|
| **Default** | `#52567B` | `#FFFFFF` | 无 | Grey-NO.6 / White |
| **Pressed/Hover** | `#424242` | `#FFFFFF` | 无 | Grey-NO.7 / White |
| **Disabled** | `#9E9E9E` | `#FFFFFF` | 无 | Grey-NO.5 / White |

### 4.2 Gray Light

浅灰背景按钮。

| 状态 | 背景色 | 文字颜色 | 边框 | Token 映射 |
|------|--------|----------|------|-----------|
| **Default** | `#EEEEEE` | `#52567B` | 无 | Grey-NO.2 / Grey-NO.6 |
| **Pressed/Hover** | `#E0E0E0` | `#424242` | 无 | Grey-NO.3 / Grey-NO.7 |
| **Disabled** | `#EEEEEE` | `#BDBDBD` | 无 | Grey-NO.2 / Grey-NO.4 |

### 4.3 Gray Outline

白底灰边灰字按钮。

| 状态 | 背景色 | 文字颜色 | 边框 | Token 映射 |
|------|--------|----------|------|-----------|
| **Default** | `#FFFFFF` | `#52567B` | 1px solid #52567B | White / Grey-NO.6 |
| **Pressed/Hover** | `#F5F5F5` | `#424242` | 1px solid #424242 | Grey-NO.1 / Grey-NO.7 |
| **Disabled** | `#FFFFFF` | `#BDBDBD` | 1px solid #BDBDBD | White / Grey-NO.4 |

---

## 五、幽灵按钮 (Ghost)

最轻量级按钮，只有文字，无背景无边框。

### 5.1 Ghost Primary

紫字幽灵按钮，用于内联操作、链接式按钮。

| 状态 | 背景色 | 文字颜色 | 边框 | Token 映射 |
|------|--------|----------|------|-----------|
| **Default** | 无 | `#6445D1` | 无 | Pri-NO.6 |
| **Pressed/Hover** | `#F1E7FF` | `#432CB0` | 无 | Pri-NO.1 / Pri-NO.7 |
| **Disabled** | 无 | `#D4C2F4` | 无 | Pri-NO.2 |

### 5.2 Ghost Gray

灰字幽灵按钮，用于取消、返回等弱操作。

| 状态 | 背景色 | 文字颜色 | 边框 | Token 映射 |
|------|--------|----------|------|-----------|
| **Default** | 无 | `#52567B` | 无 | Grey-NO.6 |
| **Pressed/Hover** | `#F5F5F5` | `#424242` | 无 | Grey-NO.1 / Grey-NO.7 |
| **Disabled** | 无 | `#BDBDBD` | 无 | Grey-NO.4 |

---

## 六、按钮尺寸变体

| 尺寸 | 高度 | 字号 | 行高 | 内边距 | 圆角 | 使用场景 |
|------|------|------|------|--------|------|----------|
| **Large** | 64px | 22px | 32px | 17px 16px | 8px | 默认尺寸，移动端主要操作 |
| **Medium** | 46px | 16px | 22px | 12px 12px | 4px | 表单、卡片内操作 |
| **Small** | 32px | 14px | 20px | 5px 8px | 4px | 紧凑空间、输入框内、行组件 |

> **说明：** Large 尺寸为默认，与扫描框高度一致（行高30 + 垂直内边距17×2 = 64px）。Medium 与 Small 圆角为 4px（小于 Large 的 8px）。按钮组为 Large Button 的组合布局，可复用 Medium/Small 尺寸制作不同高度变体。

---

## 六-2、中按钮 (Medium Button)

中按钮与 Large 按钮颜色及状态一致，仅尺寸和字体不同。

### 核心参数

| 属性 | 值 | Token |
|------|-----|-------|
| 高度 | 46px | - |
| 宽度（最小） | 56px | - |
| 宽度（推荐） | 56px | - |
| 宽度（最大） | 220px | - |
| 内边距 | 12px（垂直） 12px（水平） | - |
| 圆角 | 4px | Radius: 4px |
| 字体 | PingFang SC | - |
| 字号 | 16px | Typography: Bold |
| 行高 | 22px | - |
| 字重 | 600 (Bold) | - |

### 紫色系 (Primary)

| 状态 | 背景色 | 文字颜色 | 边框 | Token 映射 |
|------|--------|----------|------|-----------|
| **Default** | `#6445D1` | `#FFFFFF` | 无 | Pri-NO.6 / White |
| **Pressed/Hover** | `#432CB0` | `#FFFFFF` | 无 | Pri-NO.7 / White |
| **Disabled** | `#D4C2F4` | `#FFFFFF` | 无 | Pri-NO.2 / White |
| **Outline Default** | 透明 | `#6445D1` | 1px solid #6445D1 | White / Pri-NO.6 |
| **Outline Subtle** | `#F1E7FF` | `#9C80E3` | 1px solid #6445D1 | Pri-NO.1 / Pri-NO.4 |
| **Outline Disabled** | `#FFFFFF` | `#D4C2F4` | 1px solid #D4C2F4 | White / Pri-NO.2 |

### 红色系 (Functional Red)

| 状态 | 背景色 | 文字颜色 | 边框 | Token 映射 |
|------|--------|----------|------|-----------|
| **Default** | `#FF3333` | `#FFFFFF` | 无 | Red-NO.5 / White |
| **Pressed/Hover** | `#CC0000` | `#FFFFFF` | 无 | Red-NO.7 / White |
| **Disabled** | `#FFB3B3` | `#FFFFFF` | 无 | Red-NO.2 / White |

> **色值映射：** 原规范 #FB5251 → Red-NO.5；#CF3337 → Red-NO.7；#FDB2AC → Red-NO.2。

### 黄色系 (Functional Yellow)

| 状态 | 背景色 | 文字颜色 | 边框 | Token 映射 |
|------|--------|----------|------|-----------|
| **Default** | `#FFEB60` | `#333333` | 无 | Yellow-NO.5 / Black-NO.6 |
| **Pressed/Hover** | `#F5B000` | `#333333` | 无 | Yellow-NO.7 / Black-NO.6 |
| **Disabled** | `#FFF3B0` | `#999999` | 无 | Yellow-NO.3 / Black-NO.4 |

> **色值映射：** 原规范 #FF9F02 → Yellow-NO.5；#D07A01 → Yellow-NO.7；#FFCC5E → Yellow-NO.4（取 #FFEE8A）。

### 灰色系 (Neutral/Secondary)

| 状态 | 背景色 | 文字颜色 | 边框 | Token 映射 |
|------|--------|----------|------|-----------|
| **Gray Solid Default** | `#52567B` | `#FFFFFF` | 无 | Grey-NO.6 / White |
| **Gray Solid Pressed** | `#424242` | `#FFFFFF` | 无 | Grey-NO.7 / White |
| **Gray Solid Disabled** | `#9E9E9E` | `#FFFFFF` | 无 | Grey-NO.5 / White |
| **Gray Light Default** | `#EEEEEE` | `#333333` | 无 | Grey-NO.2 / Black-NO.6 |
| **Gray Light Disabled** | `#EEEEEE` | `#A4ACCA` | 无 | Grey-NO.2 |

> **色值映射：** 原规范 #F3F4F6 → Grey-NO.2；#A4ACCA → 无标准色，建议用 #BDBDBD (Grey-NO.4)。

### 幽灵按钮 (Ghost)

| 状态 | 背景色 | 文字颜色 | 边框 | Token 映射 |
|------|--------|----------|------|-----------|
| **Ghost Primary Default** | 无 | `#6445D1` | 无 | Pri-NO.6 |
| **Ghost Primary Pressed** | `#F1E7FF` | `#432CB0` | 无 | Pri-NO.1 / Pri-NO.7 |
| **Ghost Gray Default** | 无 | `#52567B` | 无 | Grey-NO.6 |
| **Ghost Gray Pressed** | `#F5F5F5` | `#424242` | 无 | Grey-NO.1 / Grey-NO.7 |

---

## 六-3、小按钮 (Small Button)

小按钮用于输入框内、行组件等紧凑空间。

### 核心参数

| 属性 | 值 |
|------|-----|
| 高度 | 32px |
| 宽度（最小） | 48px |
| 宽度（推荐） | 48px |
| 宽度（最大） | 144px |
| 内边距 | 5px（垂直） 8px（水平） |
| 圆角 | 4px |
| 字体 | PingFang SC |
| 字号 | 14px |
| 行高 | 20px |
| 字重 | 600 (Bold) |

### 紫色系 (Primary)

| 状态 | 背景色 | 文字颜色 | 边框 | Token 映射 |
|------|--------|----------|------|-----------|
| **Default** | `#6445D1` | `#FFFFFF` | 无 | Pri-NO.6 / White |
| **Pressed/Hover** | `#432CB0` | `#FFFFFF` | 无 | Pri-NO.7 / White |
| **Disabled** | `#D4C2F4` | `#FFFFFF` | 无 | Pri-NO.2 / White |
| **Outline Default** | `#FFFFFF` | `#6445D1` | 1px solid #6445D1 | White / Pri-NO.6 |
| **Outline Subtle** | `#F1E7FF` | `#9C80E3` | 1px solid #6445D1 | Pri-NO.1 / Pri-NO.4 |
| **Outline Disabled** | `#FFFFFF` | `#D4C2F4` | 1px solid #D4C2F4 | White / Pri-NO.2 |

### 红色系 (Functional Red)

| 状态 | 背景色 | 文字颜色 | Token 映射 |
|------|--------|----------|-----------|
| **Default** | `#FF3333` | `#FFFFFF` | Red-NO.5 / White |
| **Pressed/Hover** | `#CC0000` | `#FFFFFF` | Red-NO.7 / White |
| **Disabled** | `#FFB3B3` | `#FFFFFF` | Red-NO.2 / White |

> **色值映射：** 原规范 #FB5251 → Red-NO.5；#CF3337 → Red-NO.7；#FFD0C9 → Red-NO.2；#FD948D → 无标准色，建议用 #FFB3B3。

### 黄色系 (Functional Yellow)

| 状态 | 背景色 | 文字颜色 | Token 映射 |
|------|--------|----------|-----------|
| **Default** | `#FFEB60` | `#333333` | Yellow-NO.5 / Black-NO.6 |
| **Pressed/Hover** | `#F5B000` | `#333333` | Yellow-NO.7 / Black-NO.6 |
| **Disabled** | `#FFF3B0` | `#999999` | Yellow-NO.3 / Black-NO.4 |

> **色值映射：** 原规范 #FF9F02 → Yellow-NO.5；#D07A01 → Yellow-NO.7；#FFEEBA → Yellow-NO.3。

### 灰色系 (Neutral/Secondary)

| 状态 | 背景色 | 文字颜色 | 边框 | Token 映射 |
|------|--------|----------|------|-----------|
| **Gray Solid Default** | `#52567B` | `#FFFFFF` | 无 | Grey-NO.6 / White |
| **Gray Solid Subtle** | `#383B6F` | `#FFFFFF` | 无 | 深色变体（无标准色） |
| **Gray Solid Disabled** | `#9E9E9E` | `#FFFFFF` | 无 | Grey-NO.5 / White |
| **Gray Light Default** | `#EEEEEE` | `#52567B` | 无 | Grey-NO.2 / Grey-NO.6 |
| **Gray Light Disabled** | `#EEEEEE` | `#A4ACCA` | 无 | Grey-NO.2 |
| **Gray Outline Default** | `#FFFFFF` | `#52567B` | 1px solid #52567B | White / Grey-NO.6 |

> **色值映射：** 原规范 #F3F4F6 → Grey-NO.2；#A4ACCA → 无标准色，建议用 #BDBDBD (Grey-NO.4)。

### 幽灵按钮 (Ghost)

| 状态 | 背景色 | 文字颜色 | Token 映射 |
|------|--------|----------|-----------|
| **Ghost Primary Default** | 无 | `#6445D1` | Pri-NO.6 |
| **Ghost Primary Pressed** | `#F1E7FF` | `#432CB0` | Pri-NO.1 / Pri-NO.7 |
| **Ghost Gray Default** | 无 | `#52567B` | Grey-NO.6 |
| **Ghost Gray Pressed** | `#F5F5F5` | `#424242` | Grey-NO.1 / Grey-NO.7 |

---

## 六-4、按钮组 (Button Group)

按钮组是 Large Button 的组合布局，用于在多个互斥选项中切换（如筛选、模式切换）。子项继承 Large Button 的核心参数，通过 `border-radius` 控制整体形状。

### 核心参数

| 属性 | 值 |
|------|-----|
| 容器圆角 | 8px |
| 子项高度 | 64px（继承 Large Button） |
| 子项内边距 | 17px（垂直） 16px（水平） |
| 子项宽度 | min-width: 100px，max-width: 448px，flex: 1 均分 |
| 字体 | PingFang SC / 22px / Line-height: 30px / font-weight: 600 (Bold) |
| 子项间距 | gap: 1px（露出底层色作为分割线） |

### 默认状态 (Default)

| 子项状态 | 背景色 | 文字颜色 | 边框 | Token 映射 |
|----------|--------|----------|------|-----------|
| **未选中项** | `#EEEEEE` | `#52567B` | 无 | Grey-NO.2 / Grey-NO.6 |
| **选中项** | `#6445D1` | `#FFFFFF` | 无 | Pri-NO.6 / White |

> **色值映射：** 原规范 #F3F4F6 → Grey-NO.2（#EEEEEE）；#52567B 命中标准色，保留。

### 交互状态

| 子项状态 | Hover | Pressed | Disabled |
|----------|-------|---------|----------|
| **未选中项** | 背景加深至 `#E0E0E0` | 背景加深至 `#D0D0D0` | 背景 `#EEEEEE`，文字 `#BDBDBD`，cursor: not-allowed |
| **选中项** | 背景加深至 `#4A33A8` | 背景加深至 `#432CB0`（同 Large Pressed） | 背景 `#D4C2F4`，文字 `#FFFFFF` |

### 形态变体 (Layout Variants)

#### 全包围式

外层容器设置 `border-radius: 8px`，内部子项 `border-radius: 0`，首尾子项由容器统一控制圆角。

```css
.button-group {
  display: flex;
  border-radius: 8px;
  overflow: hidden; /* 裁切首尾子项超出部分 */
}
.button-group__item {
  border-radius: 0; /* 内部子项无需圆角 */
  flex: 1;
}
```

> ⚠️ **使用条件：** 仅适用于透明背景场景。若容器有背景色（卡片、弹窗），分割线会被容器背景遮盖，建议改用"左右拼接式"。

#### 左右拼接式

每个子项独立控制自身圆角，左侧项保留左圆角、右侧项保留右圆角，中间子项无圆角。

```css
.button-group__item {
  border-radius: 0;
  flex: 1;
}
.button-group__item:first-child {
  border-radius: 8px 0 0 8px;
}
.button-group__item:last-child {
  border-radius: 0 8px 8px 0;
}
/* 若有中间子项，保持 border-radius: 0 */
```

> **推荐优先使用左右拼接式**，子项独立性强，不依赖父容器背景条件。

### 分割线逻辑

按钮组内相邻子项通过 `gap: 1px` 露出底层色模拟分割线效果。底层色即**未选中项背景色**（#EEEEEE），视觉上与未选中项融为一体。

> **设计说明：** 1px 是经过视觉验证的最小分割单位，不遮挡内容且边界清晰。若改用 2px 会显得粗糙，0px 则无法形成分割感。

### Disabled 状态

| 状态 | 背景色 | 文字颜色 | 说明 |
|------|--------|----------|------|
| **未选中 Disabled** | `#EEEEEE` | `#BDBDBD` | 不可交互，文字变淡 |
| **选中 Disabled** | `#D4C2F4` | `#FFFFFF` | 同 Primary Disabled |

---

## 七、交互规范

### 7.1 状态过渡

```css
transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
```

### 7.2 点击区域

- 最小点击区域：48px × 48px（移动端触摸友好）
- 按钮间距：16px

### 7.3 禁用态

```css
cursor: not-allowed;
pointer-events: none;
opacity: 0.6; /* 可选，部分场景 */
```

---

## 八、使用场景对照

| 变体 | 使用场景 | 优先级 |
|------|----------|--------|
| Primary Solid (Large) | 提交、确认、下一步 | 高 |
| Primary Solid (Medium) | 表单内、卡片内操作 | 中 |
| Primary Solid (Small) | 输入框内、行组件操作 | 低 |
| **Button Group** | 互斥选项切换（筛选、模式切换） | 中 |
| Primary Outline | 取消、返回、次要操作 | 中 |
| Primary Outline Subtle | 辅助操作、弱引导 | 低 |
| Red Solid | 删除、拒绝、紧急操作 | 高（谨慎使用） |
| Yellow Solid | 警告、注意、中性提示 | 中 |
| Gray Solid | 次要操作、辅助按钮 | 低 |
| Gray Solid Subtle (Small) | 强调的次级操作 | 低 |
| Gray Light | 取消、返回 | 低 |
| Gray Outline | 辅助操作、弱次要 | 低 |
| Ghost | 内联操作、链接式按钮 | 低 |

> **Small 按钮特别说明：** 主要用于输入框（Input Field）内、行组件内等紧凑空间。与其他尺寸按钮颜色状态一致，仅尺寸不同。
>
> **按钮组特别说明：** 按钮组是 Large Button 的组合应用，可复用 Medium/Small 按钮尺寸制作不同高度变体。

---

## 九、代码示例

### CSS 类名规范

```css
/* 基础按钮类 */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  min-width: 100px;
  max-width: 448px;
  padding: 16px;
  border-radius: 8px;
  font-family: 'PingFang SC', sans-serif;
  font-size: 22px;
  line-height: 32px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

/* Primary 变体 */
.btn-primary { background: #6445D1; color: #FFFFFF; }
.btn-primary:hover { background: #432CB0; }
.btn-primary:disabled { background: #D4C2F4; cursor: not-allowed; }

/* Primary Outline */
.btn-outline { background: #FFFFFF; color: #6445D1; border: 1px solid #6445D1; }
.btn-outline:hover { background: #F1E7FF; color: #432CB0; border-color: #432CB0; }

/* Gray Light */
.btn-gray-light { background: #EEEEEE; color: #52567B; }
.btn-gray-light:hover { background: #E0E0E0; color: #424242; }

/* Ghost */
.btn-ghost { background: transparent; color: #6445D1; }
.btn-ghost:hover { background: #F1E7FF; color: #432CB0; }
```

### HTML 示例

```html
<button class="btn btn-primary">确认提交</button>
<button class="btn btn-outline">取消</button>
<button class="btn btn-gray-light">返回</button>
<button class="btn btn-ghost">查看详情</button>
```
