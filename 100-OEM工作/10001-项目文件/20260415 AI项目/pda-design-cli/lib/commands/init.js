/**
 * `init` command - 初始化所有设计规范到项目目录
 * 输出原始 md/svg 文件，供 AI 直接读取
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const { fetchFile, fetchRegistry, listLocalFiles } = require('../fetch');

async function initCommand(options) {
  const spinner = ora('初始化设计规范...').start();

  try {
    const registry = await fetchRegistry(options.registry);
    const outputDir = path.resolve(options.output);
    fs.mkdirSync(outputDir, { recursive: true });

    let count = 0;

    // 导出组件
    if (registry.components) {
      for (const [name, info] of Object.entries(registry.components)) {
        try {
          const content = await fetchFile(info.file);
          fs.writeFileSync(path.join(outputDir, path.basename(info.file)), content);
          count++;
        } catch (e) {
          // 跳过缺失的文件
        }
      }
    }

    // 导出 Token
    if (registry.tokens) {
      const tokenDir = path.join(outputDir, 'tokens');
      fs.mkdirSync(tokenDir, { recursive: true });

      for (const [name, filePath] of Object.entries(registry.tokens)) {
        try {
          const content = await fetchFile(filePath);
          fs.writeFileSync(path.join(tokenDir, path.basename(filePath)), content);
          count++;
        } catch (e) {
          // 跳过缺失的文件
        }
      }
    }

    // 导出 Guidelines
    if (registry.guidelines) {
      const guideDir = path.join(outputDir, 'guidelines');
      fs.mkdirSync(guideDir, { recursive: true });

      for (const [name, filePath] of Object.entries(registry.guidelines)) {
        try {
          const content = await fetchFile(filePath);
          fs.writeFileSync(path.join(guideDir, path.basename(filePath)), content);
          count++;
        } catch (e) {
          // 跳过缺失的文件
        }
      }
    }

    // 导出 registry.json
    const registryContent = await fetchFile('registry.json');
    fs.writeFileSync(path.join(outputDir, 'registry.json'), registryContent);
    count++;

    // 复制图标目录（如果有）
    const iconFiles = listLocalFiles('icons');
    if (iconFiles.length > 0) {
      const iconDir = path.join(outputDir, 'icons');
      fs.mkdirSync(iconDir, { recursive: true });

      // 只复制 index.json，不复制 335 个 SVG（太大了）
      const indexFile = listLocalFiles('icons').find(f => f === 'index.json');
      if (indexFile) {
        const content = await fetchFile(`icons/${indexFile}`);
        fs.writeFileSync(path.join(iconDir, indexFile), content);
        count++;
      }

      // 创建图标目录说明
      fs.writeFileSync(path.join(iconDir, 'README.md'),
        `# Icons\n\n共 ${iconFiles.length - 1} 个 SVG 图标。\n\n用法: npx pda-design-cli add icon:图标名\n`
      );
    }

    spinner.succeed(chalk.green(`✅ 设计规范已导出到 ${outputDir}（${count} 个文件）`));
    console.log(chalk.dim(`   目录结构:`));
    console.log(chalk.dim(`   ${outputDir}/`));
    console.log(chalk.dim(`   ├── registry.json`));
    console.log(chalk.dim(`   ├── *.md (组件规范)`));
    console.log(chalk.dim(`   ├── tokens/ (设计 Token)`));
    console.log(chalk.dim(`   ├── guidelines/ (设计指南)`));
    console.log(chalk.dim(`   └── icons/ (图标索引)`));
    console.log('');
    console.log(chalk.dim(`   告诉 AI: "参考 ${outputDir}/ 下的设计规范"`));

  } catch (error) {
    spinner.fail(chalk.red(`失败: ${error.message}`));
    process.exit(1);
  }
}

module.exports = { initCommand };
