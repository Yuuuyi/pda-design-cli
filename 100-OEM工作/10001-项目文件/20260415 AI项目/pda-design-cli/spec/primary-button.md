# 主按钮 (Primary Button)

## 状态

### Default

| 属性 | 数值 |
|------|------|
| 宽度 | `448px`（最小 `100px` / 最大 `448px`） |
| 高度 | `64px` |
| 背景色 | `#6445D1` |
| 圆角 | `8px` |
| 文字颜色 | `#F1E7FF` |
| 字号 | `22px` |
| 字体 | `PingFang SC` |
| 行高 | `30px` |
| 文字对齐 | 居中 |
| 内边距 | 上下 `17px`、左右 `16px` |

### Tap

- 背景色调整为 `#6445D1`（主色加深）
- 添加 `transition: background-color 0.2s ease` 平滑过渡

### Disabled

- 背景色调整为 `#A086E3`（主色淡化）
- 文字颜色 `#D4C2F4`
- 透明度 `opacity: 0.6`
- 禁用点击交互（`pointer-events: none`）

## 代码要求

- 使用语义化类名（如 `.btn` `.btn-primary`），便于复用与维护。
- 避免直接使用行内样式，推荐通过 CSS 类统一管理样式。
