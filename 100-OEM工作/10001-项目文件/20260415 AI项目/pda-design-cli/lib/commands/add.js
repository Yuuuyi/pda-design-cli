/**
 * `add` command - Fetch and generate a component or token
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const { fetchFile, fetchRegistry } = require('../fetch');
const { parseComponent, parseTokenFile } = require('../parser');
const { generateReact } = require('../generator/react');
const { generateVue } = require('../generator/vue');
const { generateHtml } = require('../generator/html');
const { toPascalCase, getFileExt } = require('../utils');

async function addCommand(componentName, options) {
  const spinner = ora(`Fetching ${componentName}...`).start();

  try {
    // 1. Fetch registry to resolve file path
    spinner.text = 'Loading registry...';
    const registry = await fetchRegistry(options.registry);

    // 2. Determine if it's a component, token, or guideline
    const filePath = resolvePath(componentName, registry);
    if (!filePath) {
      spinner.fail(`Component "${componentName}" not found in registry.`);
      console.log(chalk.dim('Run `pda-design list` to see available components.'));
      return;
    }

    // 3. Fetch the markdown (or SVG for icons)
    spinner.text = `Fetching ${componentName}...`;
    const content = await fetchFile(filePath, options.registry);
    const isIcon = filePath.startsWith('icons/') && filePath.endsWith('.svg');

    // 4. Parse
    const isToken = filePath.startsWith('tokens/');
    const outputDir = path.resolve(options.output);

    if (isIcon) {
      // For icons, save SVG directly + generate React/Vue component
      const iconName = path.basename(filePath, '.svg');
      const iconDir = path.join(outputDir, 'icons');
      fs.mkdirSync(iconDir, { recursive: true });

      // Save raw SVG
      fs.writeFileSync(path.join(iconDir, `${iconName}.svg`), content);

      // Generate framework component
      const framework = options.framework;
      const code = generateIconComponent(content, iconName, framework);
      const ext = getFileExt(framework);
      fs.writeFileSync(path.join(iconDir, `${iconName}.${ext}`), code);

      spinner.succeed(chalk.green(`✅ Icon ${iconName} added to ${iconDir}`));
      console.log(chalk.dim(`   Files: ${iconName}.svg, ${iconName}.${ext}`));
      return;
    }

    const parsed = isToken ? parseTokenFile(content) : parseComponent(content);

    // 5. Generate code
    spinner.text = 'Generating code...';

    if (isToken) {
      // For tokens, save the raw markdown + generate a JS/TS token file
      fs.mkdirSync(outputDir, { recursive: true });
      const tokenFile = path.join(outputDir, `${componentName.split('/').pop()}.ts`);
      fs.writeFileSync(tokenFile, generateTokenFile(parsed, componentName));
      spinner.succeed(chalk.green(`✅ ${componentName} tokens saved to ${tokenFile}`));
    } else {
      // For components, generate framework-specific code
      const framework = options.framework;
      const code = generateCode(parsed, framework);

      const componentDir = path.join(outputDir, componentName);
      fs.mkdirSync(componentDir, { recursive: true });

      const ext = getFileExt(framework);
      const outputFile = path.join(componentDir, `${componentName}.${ext}`);
      fs.writeFileSync(outputFile, code);

      // Also save the original markdown spec alongside
      fs.writeFileSync(path.join(componentDir, 'spec.md'), content);

      spinner.succeed(chalk.green(`✅ ${componentName} added to ${componentDir}`));
      console.log(chalk.dim(`   Framework: ${framework}`));
      console.log(chalk.dim(`   Files: ${componentName}.${ext}, spec.md`));
    }

  } catch (error) {
    spinner.fail(chalk.red(`Failed: ${error.message}`));
    if (process.env.DEBUG) {
      console.error(error);
    }
    process.exit(1);
  }
}

/**
 * Resolve component name to file path in registry
 */
function resolvePath(name, registry) {
  // Check components
  if (registry.components && registry.components[name]) {
    return registry.components[name].file;
  }

  // Check tokens
  if (registry.tokens && registry.tokens[name]) {
    return registry.tokens[name];
  }

  // Check guidelines
  if (registry.guidelines && registry.guidelines[name]) {
    return registry.guidelines[name];
  }

  // Check icons (icon:add, icon:arrow_down, etc.)
  if (name.startsWith('icon:') || name.startsWith('icons/')) {
    const iconName = name.replace(/^icon:/, '').replace(/^icons\//, '');
    const svgName = iconName.startsWith('icon_') ? iconName : `icon_${iconName}`;
    return `icons/${svgName}.svg`;
  }

  // Try with tokens/ or components/ prefix
  if (registry.tokens && registry.tokens[name.replace('tokens/', '')]) {
    return registry.tokens[name.replace('tokens/', '')];
  }
  if (registry.components && registry.components[name.replace('components/', '')]) {
    return registry.components[name.replace('components/', '')].file;
  }

  return null;
}

/**
 * Generate code for a given framework
 */
function generateCode(parsed, framework) {
  switch (framework) {
    case 'react':
      return generateReact(parsed);
    case 'vue':
      return require('../generator/vue').generateVue(parsed);
    case 'html':
      return require('../generator/html').generateHtml(parsed);
    default:
      return generateReact(parsed);
  }
}

/**
 * Generate a TypeScript token file from parsed token data
 */
function generateTokenFile(parsed, name) {
  const tokenName = name.split('/').pop();

  // Extract color rows from tables
  const colorEntries = [];
  for (const table of parsed.tables) {
    for (const row of table.rows) {
      const grade = row['分级'] || row['NO.'] || '';
      const value = (row['色值'] || row['值'] || '').replace(/`/g, '');
      if (grade && value && value.startsWith('#')) {
        colorEntries.push(`  ${grade.replace(/\s/g, '')}: '${value}',`);
      }
    }
  }

  if (colorEntries.length > 0) {
    return `// PDA Design System - ${tokenName} tokens
// Auto-generated from design spec

export const ${tokenName.replace(/-/g, '')} = {
${colorEntries.join('\n')}
} as const;
`;
  }

  return `// PDA Design System - ${tokenName} tokens
// Auto-generated from design spec

export const ${tokenName.replace(/-/g, '')} = {} as const;

// Raw spec:
${parsed.raw.split('\n').map(line => '// ' + line).join('\n')}
`;
}

module.exports = { addCommand };

/**
 * Generate an icon component from SVG
 */
function generateIconComponent(svgContent, iconName, framework) {
  const componentName = toPascalCase(iconName.replace('icon_', ''));

  // Extract inner SVG content (strip outer <svg> tag)
  const innerContent = svgContent
    .replace(/<svg[^>]*>/, '')
    .replace(/<\/svg>/, '')
    .trim();

  // Extract viewBox and size
  const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 48 48';

  switch (framework) {
    case 'react':
      return `import React from 'react';

interface ${componentName}Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const ${componentName}: React.FC<${componentName}Props> = ({ size = 48, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    width={size}
    height={size}
    viewBox="${viewBox}"
    {...props}
  >
    ${innerContent}
  </svg>
);

export { ${componentName} };
`;

    case 'vue':
      return `<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    :width="size"
    :height="size"
    viewBox="${viewBox}"
    v-bind="$attrs"
  >
    ${innerContent}
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 48 });
</script>
`;

    case 'html':
    default:
      return svgContent;
  }
}
