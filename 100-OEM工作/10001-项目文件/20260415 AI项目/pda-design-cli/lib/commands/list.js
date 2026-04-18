/**
 * `list` command - List all available components and tokens
 */

const chalk = require('chalk');
const ora = require('ora');
const { fetchRegistry } = require('../fetch');

async function listCommand(options) {
  const spinner = ora('Loading registry...').start();

  try {
    const registry = await fetchRegistry(options.registry);
    spinner.stop();

    const category = options.category;

    // List components
    if (registry.components) {
      const components = Object.entries(registry.components);
      const filtered = category
        ? components.filter(([, v]) => v.category === category)
        : components;

      if (filtered.length > 0) {
        console.log(chalk.bold('\n📦 Components:\n'));

        // Group by category
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
            if (item.tags && item.tags.length > 0) {
              console.log(chalk.dim(`    ${' '.repeat(25)} tags: ${item.tags.join(', ')}`));
            }
          }
        }
      }
    }

    // List tokens
    if (registry.tokens) {
      console.log(chalk.bold('\n🎨 Design Tokens:\n'));
      for (const [key, value] of Object.entries(registry.tokens)) {
        console.log(`    ${chalk.green(key.padEnd(20))} ${chalk.dim(value)}`);
      }
    }

    // List guidelines
    if (registry.guidelines) {
      console.log(chalk.bold('\n📐 Guidelines:\n'));
      for (const [key, value] of Object.entries(registry.guidelines)) {
        console.log(`    ${chalk.green(key.padEnd(20))} ${chalk.dim(value)}`);
      }
    }

    // List icons
    if (registry.icons) {
      console.log(chalk.bold(`\n🖼️  Icons (${registry.icons.total || ''}):\n`));
      const iconCategories = registry.icons.categories;
      if (iconCategories) {
        for (const [cat, info] of Object.entries(iconCategories)) {
          console.log(`    ${chalk.green(cat.padEnd(18))} ${chalk.dim(`${info.count} icons — ${info.description}`)}`);
        }
      }
      console.log(chalk.dim(`\n    Usage: pda-design add icon:add_outline`));
      console.log(chalk.dim(`           pda-design add icon:arrow_down`));
    }

    console.log('');

  } catch (error) {
    spinner.fail(chalk.red(`Failed: ${error.message}`));
    process.exit(1);
  }
}

module.exports = { listCommand };
