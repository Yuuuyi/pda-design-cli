/**
 * `list` command - 列出所有可用的组件、Token、图标
 */

const chalk = require('chalk');
const ora = require('ora');
const { fetchRegistry, listLocalFiles } = require('../fetch');

async function listCommand(options) {
  const spinner = ora('加载规范列表...').start();

  try {
    const registry = await fetchRegistry(options.registry);
    spinner.stop();

    const category = options.category;

    // 组件
    if (registry.components) {
      const components = Object.entries(registry.components);
      const filtered = category
        ? components.filter(([, v]) => v.category === category)
        : components;

      if (filtered.length > 0) {
        console.log(chalk.bold('\n📦 组件 (Components):\n'));

        // 按分类分组
        const grouped = {};
        for (const [key, value] of filtered) {
          const cat = value.category || 'other';
          if (!grouped[cat]) grouped[cat] = [];
          grouped[cat].push({ key, ...value });
        }

        for (const [cat, items] of Object.entries(grouped)) {
          console.log(chalk.cyan(`  ${cat}:`));
          for (const item of items) {
            console.log(`    ${chalk.green(item.key.padEnd(25))} ${chalk.dim(item.name)}`);
          }
        }

        console.log(chalk.dim('\n  用法: npx pda-design-cli add <组件名>'));
      }
    }

    // Token
    if (registry.tokens) {
      console.log(chalk.bold('\n🎨 设计 Token:\n'));
      for (const [key, value] of Object.entries(registry.tokens)) {
        console.log(`    ${chalk.green(key.padEnd(20))} ${chalk.dim(value)}`);
      }
      console.log(chalk.dim('\n  用法: npx pda-design-cli add token:colors'));
    }

    // Guidelines
    if (registry.guidelines) {
      console.log(chalk.bold('\n📐 设计指南:\n'));
      for (const [key, value] of Object.entries(registry.guidelines)) {
        console.log(`    ${chalk.green(key.padEnd(20))} ${chalk.dim(value)}`);
      }
      console.log(chalk.dim('\n  用法: npx pda-design-cli add guideline:role'));
    }

    // 图标
    if (registry.icons) {
      console.log(chalk.bold(`\n🖼️  图标 (Icons, 共 ${registry.icons.total || ''} 个):\n`));
      const iconCategories = registry.icons.categories;
      if (iconCategories) {
        for (const [cat, info] of Object.entries(iconCategories)) {
          console.log(`    ${chalk.green(cat.padEnd(18))} ${chalk.dim(`${info.count} 个 — ${info.description}`)}`);
        }
      }
      console.log(chalk.dim('\n  用法: npx pda-design-cli add icon:add_outline'));
    }

    // 保存全部
    console.log(chalk.bold('\n💾 批量导出:\n'));
    console.log(`    ${chalk.green('npx pda-design-cli init')}            ${chalk.dim('导出所有规范到 ./pda-design-specs/')}`);
    console.log(`    ${chalk.green('npx pda-design-cli init -o ./docs')}  ${chalk.dim('导出所有规范到 ./docs/')}`);

    console.log('');

  } catch (error) {
    spinner.fail(chalk.red(`失败: ${error.message}`));
    process.exit(1);
  }
}

module.exports = { listCommand };
