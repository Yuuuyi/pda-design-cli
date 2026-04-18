# Floating Bottom Button（底部悬浮按钮组件）

## 结构

- **外层容器：** `div` 采用 Flex 列布局（`flex-direction: column`），背景色为 `#FFFFFF`（设计系统背景色）。
- **分割线：** `img` 标签实现水平分割线，宽度 `480px`，高度 `1px`（建议使用 `div.h-px` 替代，背景色为设计系统 Border 色 `#E5E6EB`）。
- **按钮组：** `div` 采用 Flex 行布局（`justify-content: center`），包含 2-3 个按钮，间距 `16px`（默认 Gap 值）。
  - 按钮容器：`div` 弹性布局（`flex: 1`），最小宽度 `100px`，最大宽度 `448px`，固定高度 `64px`，内边距 `17px` 垂直 + `16px` 水平，圆角 `8px`（默认 Border Radius）。
  - 按钮文本：`p` 标签，字体 `PingFang SC`，字号 `22px`（Bold 类别），行高 `30px`，文本居中。

## 状态

按钮继承主按钮状态。

## 代码要求

1. **语义化类名：** 禁止使用行内样式，改用 CSS 类管理：

```css
.floating-btn-container { display: flex; flex-direction: column; background: #FFFFFF; }
.floating-divider { height: 1px; background: #E5E6EB; width: 100%; }
.floating-btn-group { display: flex; gap: 16px; padding: 8px 16px; }
.floating-btn { min-width: 100px; max-width: 448px; height: 64px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
.floating-btn-secondary { background: #F3F4F6; color: #52567B; }
.floating-btn-primary { background: #6445D1; color: #FFFFFF; }
```

2. **响应式适配：** 按钮组宽度 `100%`，通过 `max-width: 448px` 限制最大宽度，适配移动端屏幕。
3. **颜色合规：** 严格使用设计系统色值（如 Primary NO.6 `#6445D1`、Functional Grey NO.1 `#F3F4F6`），禁止自定义颜色。
4. **字体合规：** 按钮文字字号 `22px` 对应 Bold 类别，字体 `PingFang SC`，符合设计系统规范。
5. **无障碍优化：** 为按钮添加 `aria-label`（如 `aria-label="确认操作"`），确保可访问性。
6. **固定定位：** 建议添加 `position: fixed; bottom: 0; left: 0; right: 0;` 实现底部悬浮效果。

## 样式

- **尺寸规范：** 按钮高度固定 `64px`，与 Primary Button 高度一致（设计系统统一高度）。
- **圆角规范：** 统一使用 `8px`（默认 Border Radius）。
- **间距规范：** 按钮组内间距 `16px`（默认 Gap 值），内边距 `16px` 水平（符合设计系统间距规则）。

## 分割线

- 使用 `div.h-px` 替代 `img`，背景色为设计系统 Border 色 `#E5E6EB`，宽度 `100%`，高度 `1px`。
- 若需垂直分割线（按钮间），使用 `div.w-px`，背景色 `#E5E6EB`，宽度 `1px`。

## 合规说明

完全遵循设计系统色值（无纯黑）、字号（22px Bold 类别）、间距（默认 Gap 16px）及 Anti-Patterns（禁用纯黑、快动画、harsh shadows）。
