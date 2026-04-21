#!/usr/bin/env node

const { program } = require('commander');
const { addCommand } = require('../lib/commands/add');
const { listCommand } = require('../lib/commands/list');
const { initCommand } = require('../lib/commands/init');

program
  .name('pda-design')
  .description('PDA Design System CLI - 拉取设计规范，供 AI 读取和开发参考')
  .version('1.2.32');

program
  .command('add <component>')
  .description('拉取组件/Token/图标的设计规范')
  .option('-o, --output <path>', '输出目录（默认输出到终端）')
  .option('-r, --registry <url>', '自定义 registry URL（默认读取本地）')
  .action(addCommand);

program
  .command('list')
  .description('列出所有可用的组件、Token、图标')
  .option('-c, --category <type>', '按分类筛选')
  .action(listCommand);

program
  .command('init')
  .description('初始化所有设计规范到项目目录')
  .option('-o, --output <path>', '输出目录', './pda-design-specs')
  .action(initCommand);

program.parse();
