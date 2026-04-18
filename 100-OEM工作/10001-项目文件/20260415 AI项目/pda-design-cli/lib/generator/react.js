/**
 * React code generator
 * Generates React components from PDA design system specs
 */

const { toPascalCase } = require('../utils');

/**
 * Generate a React component from parsed spec
 */
function generateReact(component) {
  const componentName = toPascalCase(component.name);
  const imports = generateImports(component);
  const styles = generateStyles(component);
  const variants = generateVariants(component);
  const props = generateProps(component);

  return `${imports}

${styles}

${variants}

${props}

export { ${componentName} };
`;
}

/**
 * Generate import statements
 */
function generateImports(component) {
  return `import React, { useState } from 'react';`;
}

/**
 * Generate styled-component or CSS module styles
 */
function generateStyles(component) {
  const styles = [];

  for (const table of component.tables) {
    // Extract style properties from tables
    for (const row of table.rows) {
      if (row['属性'] && row['数值'] || row['属性'] && row['值']) {
        const prop = row['属性'];
        const value = row['数值'] || row['值'];
        styles.push(`  /* ${row['备注'] || row['说明'] || prop} */`);
      }
    }
  }

  if (styles.length === 0) {
    return `// Styles extracted from: ${component.name}`;
  }

  return `// Styles for ${component.name}\nconst styles = {\n${styles.join('\n')}\n};`;
}

/**
 * Generate variant components based on state sections
 */
function generateVariants(component) {
  const variants = [];

  for (const section of component.sections) {
    if (section.title.includes('状态') || section.title.includes('变体') || section.title.includes('Variant')) {
      variants.push(`// ${section.title}\n// ${section.content.split('\n')[0]}`);
    }
  }

  if (variants.length === 0) {
    return '// No variants defined';
  }

  return variants.join('\n\n');
}

/**
 * Generate Props interface
 */
function generateProps(component) {
  const componentName = toPascalCase(component.name);

  // Extract props from code blocks if available
  const tsBlocks = component.codeBlocks.filter(b => b.language === 'typescript');
  if (tsBlocks.length > 0) {
    return `// Props\n${tsBlocks[0].code}\n\nconst ${componentName}: React.FC<${componentName}Props> = (props) => {\n  // Implementation based on design spec\n  return null;\n};`;
  }

  return `interface ${componentName}Props {\n  /** Design spec: ${component.name} */\n  variant?: string;\n}\n\nconst ${componentName}: React.FC<${componentName}Props> = ({ variant = 'default' }) => {\n  // Implementation based on design spec\n  return null;\n};`;
}

module.exports = { generateReact };
