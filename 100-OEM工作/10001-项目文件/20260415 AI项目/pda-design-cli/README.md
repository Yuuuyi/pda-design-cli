# PDA Design CLI

PDA 设计系统命令行工具，从 Git 仓库拉取设计规范并生成代码。

## 安装

```bash
# 直接使用
npx @pda-design/cli add modal-container

# 或全局安装
npm install -g @pda-design/cli
pda-design add modal-container
```

## 命令

### `add` - 添加组件

```bash
# 添加单个组件
pda-design add modal-container

# 指定框架
pda-design add modal-container --framework vue

# 指定输出路径
pda-design add modal-container --output ./src/ui

# 添加设计变量
pda-design add tokens/colors
```

### `list` - 列出所有组件

```bash
pda-design list

# 按分类筛选
pda-design list --category button
```

### `init` - 初始化设计变量

```bash
# 在项目中初始化所有 design tokens
pda-design init

# 指定输出目录
pda-design init --output ./src/tokens
```

## 配置

### 公开仓库

无需配置，直接使用。

### 私有仓库

设置环境变量：

```bash
export PDA_GITHUB_TOKEN=ghp_xxx
export PDA_REGISTRY_URL=https://raw.githubusercontent.com/your-org/design-registry/main
```

### 自定义 Registry

```bash
pda-design add modal-container --registry https://your-registry.com
```

## 项目结构

```
pda-design-cli/
├── bin/
│   └── cli.js                # CLI 入口
├── lib/
│   ├── commands/
│   │   ├── add.js            # add 命令
│   │   ├── list.js           # list 命令
│   │   └── init.js           # init 命令
│   ├── parser/
│   │   └── index.js          # Markdown 解析器
│   ├── generator/
│   │   ├── react.js          # React 代码生成
│   │   ├── vue.js            # Vue 代码生成
│   │   └── html.js           # HTML/CSS 代码生成
│   ├── fetch.js              # Git 仓库拉取
│   └── utils.js              # 工具函数
├── templates/                # 模板文件（可扩展）
└── package.json
```

## 开发

```bash
cd pda-design-cli
npm install
npm link  # 本地测试

# 测试
pda-design list
pda-design add modal-container
```

## 发布到 npm

```bash
npm login
npm publish --access public
```

发布后用户可以直接：

```bash
npx @pda-design/cli add modal-container
```
