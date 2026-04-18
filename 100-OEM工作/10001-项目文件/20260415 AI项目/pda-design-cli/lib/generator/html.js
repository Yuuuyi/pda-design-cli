/**
 * HTML/CSS code generator
 */

const { toPascalCase } = require('../utils');

function generateHtml(component) {
  const componentName = toPascalCase(component.name);
  const cssRules = extractCssFromTables(component);

  return `<!-- ${component.name} - PDA Design System -->
<div class="${componentName.toLowerCase()}">
  <!-- Implementation based on design spec -->
</div>

<style>
.${componentName.toLowerCase()} {
${cssRules}
}
</style>
`;
}

function extractCssFromTables(component) {
  const rules = [];

  for (const table of component.tables) {
    for (const row of table.rows) {
      const prop = row['属性'];
      const value = row['数值'] || row['值'];
      if (prop && value) {
        const cssProp = mapToCssProperty(prop);
        if (cssProp) {
          rules.push(`  ${cssProp}: ${value.replace(/`/g, '')};`);
        }
      }
    }
  }

  return rules.join('\n') || '  /* Extract from design spec */';
}

function mapToCssProperty(prop) {
  const map = {
    'Width': 'width',
    'Height': 'height',
    'Background': 'background',
    '背景色': 'background-color',
    'Border Radius': 'border-radius',
    '圆角': 'border-radius',
    'Font Size': 'font-size',
    '字号': 'font-size',
    'Font Weight': 'font-weight',
    '字重': 'font-weight',
    'Line Height': 'line-height',
    '行高': 'line-height',
    'Color': 'color',
    '文字颜色': 'color',
    '文本颜色': 'color',
    'Padding': 'padding',
    '内边距': 'padding',
    'Border': 'border',
    '边框': 'border',
    'Font Family': 'font-family',
    '字体': 'font-family',
    'Gap': 'gap',
    '间距': 'gap',
  };
  return map[prop] || null;
}

module.exports = { generateHtml };
