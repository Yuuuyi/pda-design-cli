/**
 * `init` command - Initialize design tokens in the project
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const { fetchFile, fetchRegistry } = require('../fetch');
const { parseTokenFile } = require('../parser');

async function initCommand(options) {
  const spinner = ora('Initializing design tokens...').start();

  try {
    // Fetch registry
    const registry = await fetchRegistry(options.registry);

    if (!registry.tokens) {
      spinner.fail('No tokens found in registry.');
      return;
    }

    const outputDir = path.resolve(options.output);
    fs.mkdirSync(outputDir, { recursive: true });

    // Fetch and generate each token file
    for (const [name, filePath] of Object.entries(registry.tokens)) {
      spinner.text = `Fetching ${name} tokens...`;

      const markdown = await fetchFile(filePath, options.registry);
      const parsed = parseTokenFile(markdown);

      // Generate TypeScript token file
      const outputFile = path.join(outputDir, `${name}.ts`);
      const code = generateTokenModule(parsed, name);
      fs.writeFileSync(outputFile, code);

      // Also save raw markdown
      fs.writeFileSync(path.join(outputDir, `${name}.md`), markdown);
    }

    // Generate index file
    const indexContent = Object.keys(registry.tokens)
      .map(name => `export * from './${name}';`)
      .join('\n');
    fs.writeFileSync(path.join(outputDir, 'index.ts'), indexContent);

    spinner.succeed(chalk.green(`✅ Design tokens initialized in ${outputDir}`));
    console.log(chalk.dim(`   Tokens: ${Object.keys(registry.tokens).join(', ')}`));

  } catch (error) {
    spinner.fail(chalk.red(`Failed: ${error.message}`));
    process.exit(1);
  }
}

function generateTokenModule(parsed, name) {
  const entries = [];

  for (const table of parsed.tables) {
    for (const row of table.rows) {
      const grade = row['分级'] || row['NO.'] || row['字重分类'] || '';
      const value = (row['色值'] || row['值'] || row['字号 (px)'] || row['行高 (px)'] || '').replace(/`/g, '');
      const note = row['说明'] || row['备注'] || row['应用示例/说明'] || '';

      if (grade || value) {
        const key = grade.replace(/\s/g, '').replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '_');
        if (value.startsWith('#') || /^\d/.test(value)) {
          entries.push(`  /** ${note} */`);
          entries.push(`  ${key || 'value'}: '${value}',`);
        }
      }
    }
  }

  const exportName = name.replace(/-/g, '');

  if (entries.length > 0) {
    return `// PDA Design System - ${name} tokens\n// Auto-generated\n\nexport const ${exportName} = {\n${entries.join('\n')}\n} as const;\n`;
  }

  return `// PDA Design System - ${name} tokens\n// Auto-generated\n\nexport const ${exportName} = {} as const;\n`;
}

module.exports = { initCommand };
