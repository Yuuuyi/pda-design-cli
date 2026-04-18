# 扫描框组件 (Scan Input)

## 1. 尺寸 (Dimensions)

- **宽度：** `456px`
- **高度：** `60px`
- **内边距 (Padding)：** 左右 `16px`（对应设计系统 Gap: 16px）

## 2. 背景 (Background)

- **背景色：** 使用 Color-Functional-Black 系列 NO.1
- **Token：** `bg-black-1`
- **色值：** `#FFFFFF`

## 3. 边框 (Border)

- **边框样式：** solid
- **边框宽度：** `1px`
- **聚焦宽度：** `1px`
- **边框颜色：** 使用 Primary 系列 NO.6 (主色调)
- **Token：** `border-primary-6`
- **色值：** `#6445D1`

## 4. 圆角 (Radius)

- **圆角半径：** `6px`

## 5. 图标调用规则

> **重要：扫描框内图标需调用 icon 包**

扫描框内图标必须从 `pda-design-cli/spec/icons/` 目录调用。

| 用途 | 推荐图标 | 文件名 | 说明 |
|------|---------|--------|------|
| 扫描图标 | `scanning` | `icon_scanning_outline.svg` | 扫描入口图标 |

- 图标尺寸：`24px × 24px`

**引用方式：**
```typescript
import { IconScanningOutline } from 'pda-design-cli/spec/icons';

<ScanInput icon={<IconScanningOutline />} />
```

完整图标列表见 `spec/icons/index.json`。
