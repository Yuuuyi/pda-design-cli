# 图标使用强制规范 (Icon Usage Guidelines)

## 核心约束

**所有图标必须使用本设计系统的图标库（spec/icons/），禁止使用外部图标源。**

---

## 强制规则

### 1. 禁止使用外部图标库

| 禁止行为 | 说明 |
|----------|------|
| ❌ 使用 Lucide | `import { Search } from 'lucide-react'` 禁止 |
| ❌ 使用 Heroicons | `import { HomeIcon } from '@heroicons/react'` 禁止 |
| ❌ 使用 Feather Icons | `import { Camera } from 'react-feather'` 禁止 |
| ❌ 使用 Material Icons | `@mui/icons-material` 禁止 |
| ❌ 使用 Ant Design Icons | `@ant-design/icons` 禁止 |
| ❌ 下载网络 SVG | 从 iconfont、flaticon 等下载禁止 |
| ❌ 自行绘制图标 | 未经审批的新图标禁止 |

### 2. 必须使用系统图标库

| 允许行为 | 说明 |
|----------|------|
| ✅ 从 index.json 选取 | `spec/icons/index.json` 包含全部 499 个图标 |
| ✅ 使用 SVG 文件 | `spec/icons/icon_[name].svg` |
| ✅ 使用 outline 变体 | `spec/icons/icon_[name]_outline.svg` |
| ✅ 使用 filled 变体 | `spec/icons/icon_[name].svg` (无后缀为填充版) |
| ✅ 按分类查找 | action/arrow/business/communication 等 |

---

### 3. 图标变体命名规则（重要）

系统图标分为两类变体：

| 变体类型 | 命名格式 | 示例 | 说明 |
|----------|----------|------|------|
| **填充版 (Filled)** | `icon_[name].svg` | `icon_search.svg` | 实心填充，默认使用 |
| **线性版 (Outline)** | `icon_[name]_outline.svg` | `icon_search_outline.svg` | 线条轮廓 |

**规则：**

```
1. 同名图标，filled 和 outline 成对出现
   ✅ icon_search.svg + icon_search_outline.svg
   ❌ icon_search.svg + icon_line_search.svg

2. 禁止同名不同样式混用
   ❌ 同时使用 icon_box.svg 和 icon_box_outline.svg 表示不同含义

3. 变体选择原则
   - 填充版：图标较大、需要强调时使用
   - 线性版：图标较小、需要轻量感时使用
   - 同一组件内保持统一

4. 业务场景适配
   - 列表项图标：推荐线性版 (outline)
   - 状态指示图标：推荐填充版
   - 导航栏图标：根据整体视觉密度选择
```

**当前图标变体对照表（部分）：**

| 功能 | 填充版 | 线性版 |
|------|--------|--------|
| 添加 | `icon_add.svg` | `icon_add_outline.svg` |
| 关闭 | `icon_close.svg` | `icon_close_outline.svg` |
| 删除 | `icon_delete.svg` | `icon_delete_outline.svg` |
| 搜索 | `icon_search.svg` | `icon_search_outline.svg` |
| 箭头 | `icon_arrow_right.svg` | `icon_arrow_right_outline.svg` |
| 更多 | `icon_more.svg` | `icon_more_outline.svg` |
| 首页 | `icon_home.svg` | `icon_home_outline.svg` |
| 我的 | `icon_me.svg` | `icon_me_outline.svg` |

---

## 图标查找流程

```
第一步：查询 spec/icons/index.json 获取可用图标列表
第二步：按分类筛选（见下方分类表）
第三步：确认图标名称格式：icon_[name].svg 或 icon_[name]_outline.svg
第四步：如未找到所需图标，向设计系统维护者申请添加
```

---

## 图标分类速查

| 分类 | 数量 | 典型图标 | 适用场景 |
|------|------|----------|----------|
| **business** | 165 | 取货、派货、理货、干线、进港、出港 | PDA 业务特有 |
| **action** | 59 | 添加、关闭、删除、编辑、搜索 | 通用操作 |
| **status** | 27 | 成功、警告、提示、加载 | 状态反馈 |
| **arrow** | 25 | 方向箭头、排序箭头 | 导航、排序 |
| **navigation** | 17 | 首页、菜单、地图 | 导航栏 |
| **people** | 17 | 用户、团队、人脸识别 | 用户相关 |
| **communication** | 19 | 电话、消息、WiFi | 通讯 |
| **device** | 27 | 手机、电脑、相机 | 设备 |
| **media** | 14 | 图片、预览、二维码 | 媒体 |
| **security** | 14 | 锁、盾牌、指纹 | 安全 |
| **finance** | 20 | 支付、钱包、银行 | 金融 |
| **weather** | 15 | 雨、雪、风 | 天气 |
| **transport** | 6 | 卡车、飞机 | 物流 |
| **data** | 28 | 图表、列表 | 数据展示 |
| **other** | 46 | 通用图标 | 其他 |

---

## 代码示例

### ✅ 正确用法

```jsx
// 方式一：直接引用 SVG
import searchIcon from '@/icons/icon_search.svg';
<img src={searchIcon} alt="搜索" />;

// 方式二：通过 index.json 查找后使用
import icons from '@/icons/index.json';
const iconName = icons.find(i => i.name === 'search');
```

### ❌ 错误用法

```jsx
// ❌ 使用外部图标库
import { Search } from 'lucide-react';
<Search />;

// ❌ 使用 Ant Design Icons
import { SearchOutlined } from '@ant-design/icons';
<SearchOutlined />;

// ❌ 使用 Material Icons
import SearchIcon from '@mui/icons-material/Search';
<SearchIcon />;

// ❌ 使用网络图标 URL
<img src="https://cdn.example.com/icon.svg" />;
```

---

## 例外情况

以下情况允许使用外部图标，但需满足条件：

| 例外类型 | 条件 |
|----------|------|
| 图标库明确缺失 | 经设计系统维护者确认后，可临时使用 |
| 特殊业务需求 | 需提交申请并标注来源 |
| 第三方组件内部 | 组件自身的图标不在约束范围内 |

---

## 违规检测

在代码审查时，以下模式应被标记为违规：

```regex
# 禁止的外部图标库导入
import.*from.*['"]lucide-react['"]
import.*from.*['"]@heroicons/react['"]
import.*from.*['"]react-feather['"]
import.*from.*['"]@mui/icons-material['"]
import.*from.*['"]@ant-design/icons['"]
import.*from.*['"]@fortawesome/['"]

# 禁止的网络图标引用
<img[^>]*src=['"](https?:|//)[^'"]+\.svg['"]
```

---

## 联系方式

如需添加新图标到图标库，请联系：
- 设计系统维护者
- 提交 Issue 到 pda-design-cli 仓库
