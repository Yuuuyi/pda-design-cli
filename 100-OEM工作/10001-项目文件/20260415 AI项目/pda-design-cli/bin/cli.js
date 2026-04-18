#!/usr/bin/env node

const { program } = require('commander');
const { addCommand } = require('../lib/commands/add');
const { listCommand } = require('../lib/commands/list');
const { initCommand } = require('../lib/commands/init');

program
  .name('pda-design')
  .description('PDA Design System CLI - Fetch and apply design specifications')
  .version('1.0.0');

program
  .command('add <component>')
  .description('Add a design component or token to your project')
  .option('-f, --framework <type>', 'target framework (react/vue/html)', 'react')
  .option('-o, --output <path>', 'output directory', './components')
  .option('-r, --registry <url>', 'custom registry URL')
  .action(addCommand);

program
  .command('list')
  .description('List all available components and tokens')
  .option('-c, --category <type>', 'filter by category')
  .action(listCommand);

program
  .command('init')
  .description('Initialize PDA design tokens in your project')
  .option('-o, --output <path>', 'output directory', './design-tokens')
  .action(initCommand);

program.parse();
