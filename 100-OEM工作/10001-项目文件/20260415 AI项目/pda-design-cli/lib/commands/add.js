/**
 * `add` command - 拉取组件/Token/图标的设计规范
 * 核心定位：输出 md 规范，供 AI 读取
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const { fetchFile, fetchRegistry, getSpecDir, listLocalFiles } = require('../fetch');

async function addCommand(componentName, options) {
  const spinner = ora(`查找 ${componentName}...`).start();

  try {
    // 1. 加载 registry
    const registry = await fetchRegistry(options.registry);

    // 2. 解析路径
    const filePath = resolvePath(componentName, registry);
    if (!filePath) {
      spinner.fail(`找不到 "${componentName}"，运行 pda-design-cli list 查看可用组件`);
      return;
    }

    // 3. 读取内容
    spinner.text = '读取规范...';
    const content = await fetchFile(filePath, options.registry);
    const isIcon = filePath.startsWith('icons/') && filePath.endsWith('.svg');

    // 4. 输出
    const outputDir = options.output;

    if (outputDir) {
      // 写入文件
      const absDir = path.resolve(outputDir);
      fs.mkdirSync(absDir, { recursive: true });

      if (isIcon) {
        // 图标：保存 SVG
        const iconDir = path.join(absDir, 'icons');
        fs.mkdirSync(iconDir, { recursive: true });
        const iconName = path.basename(filePath);
        fs.writeFileSync(path.join(iconDir, iconName), content);
        spinner.succeed(chalk.green(`✅ 图标已保存到 ${iconDir}/${iconName}`));
      } else {
        // 组件/Token/规范：保存 md
        const fileName = path.basename(filePath);
        fs.writeFileSync(path.join(absDir, fileName), content);
        spinner.succeed(chalk.green(`✅ 规范已保存到 ${absDir}/${fileName}`));
      }
    } else {
      // 输出到终端（默认行为，供 AI 读取）
      spinner.stop();
      console.log('');
      console.log(chalk.bold(`━━━ ${componentName} 设计规范 ━━━`));
      console.log('');
      console.log(content);
      console.log('');
      console.log(chalk.dim(`来源: pda-design-cli spec/${filePath}`));
    }

  } catch (error) {
    spinner.fail(chalk.red(`失败: ${error.message}`));
    process.exit(1);
  }
}

/**
 * 解析组件名到文件路径
 */
function resolvePath(name, registry) {
  // 检查组件
  if (registry.components && registry.components[name]) {
    return registry.components[name].file;
  }

  // 检查 Token
  if (registry.tokens && registry.tokens[name]) {
    return registry.tokens[name];
  }

  // 检查 Guidelines
  if (registry.guidelines && registry.guidelines[name]) {
    return registry.guidelines[name];
  }

  // 图标：icon:add, icon:arrow_down 等
  if (name.startsWith('icon:') || name.startsWith('icons/')) {
    const iconName = name.replace(/^icon:/, '').replace(/^icons\//, '');
    const svgName = iconName.startsWith('icon_') ? iconName : `icon_${iconName}`;
    return `icons/${svgName}.svg`;
  }

  // Token 快捷方式：token:colors → tokens/colors.md
  if (name.startsWith('token:')) {
    const tokenName = name.replace('token:', '');
    if (registry.tokens && registry.tokens[tokenName]) {
      return registry.tokens[tokenName];
    }
    return `tokens/${tokenName}.md`;
  }

  // Guideline 快捷方式：guideline:role → guidelines/role.md
  if (name.startsWith('guideline:')) {
    const guideName = name.replace('guideline:', '');
    if (registry.guidelines && registry.guidelines[guideName]) {
      return registry.guidelines[guideName];
    }
    return `guidelines/${guideName}.md`;
  }

  // 尝试直接作为文件名
  const specDir = getSpecDir();
  const directPath = `${name}.md`;
  if (fs.existsSync(path.join(specDir, directPath))) {
    return directPath;
  }
  if (fs.existsSync(path.join(specDir, name))) {
    return name;
  }

  return null;
}

module.exports = { addCommand };
