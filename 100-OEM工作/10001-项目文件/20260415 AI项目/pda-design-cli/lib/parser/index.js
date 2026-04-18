/**
 * Parse PDA design system markdown into structured data
 */

/**
 * Parse a markdown component spec into a structured object
 */
function parseComponent(markdown) {
  const component = {
    name: '',
    overview: '',
    sections: [],
    tokens: {},
  };

  // Extract title (first # heading)
  const titleMatch = markdown.match(/^#\s+(.+)/m);
  if (titleMatch) {
    component.name = titleMatch[1].trim();
  }

  // Extract overview (text after title, before first ##)
  const overviewMatch = markdown.match(/^#\s+.+\n\n([\s\S]*?)(?=\n## |\n$)/);
  if (overviewMatch) {
    component.overview = overviewMatch[1].trim();
  }

  // Extract sections (## headings)
  const sectionRegex = /^##\s+(\d+\.\s*)?(.+)/gm;
  let sectionMatch;
  const sections = [];
  let lastIndex = 0;

  while ((sectionMatch = sectionRegex.exec(markdown)) !== null) {
    if (lastIndex > 0) {
      sections[sections.length - 1].content = markdown.slice(lastIndex, sectionMatch.index).trim();
    }
    sections.push({
      title: sectionMatch[2].trim(),
      content: '',
    });
    lastIndex = sectionMatch.index + sectionMatch[0].length;
  }
  if (sections.length > 0 && lastIndex < markdown.length) {
    sections[sections.length - 1].content = markdown.slice(lastIndex).trim();
  }

  component.sections = sections;

  // Extract tables
  component.tables = extractTables(markdown);

  // Extract Design Tokens
  component.tokens = extractTokens(markdown);

  // Extract code blocks
  component.codeBlocks = extractCodeBlocks(markdown);

  return component;
}

/**
 * Extract all markdown tables
 */
function extractTables(markdown) {
  const tables = [];
  const tableRegex = /\|.*\|\n\|[-\s|:]+\|\n((?:\|.*\|\n)*)/g;
  let match;

  while ((match = tableRegex.exec(markdown)) !== null) {
    const rawTable = match[0];
    const lines = rawTable.trim().split('\n');

    // Parse header
    const headers = lines[0].split('|').map(c => c.trim()).filter(Boolean);

    // Parse rows
    const rows = [];
    for (let i = 2; i < lines.length; i++) {
      const cells = lines[i].split('|').map(c => c.trim()).filter(Boolean);
      if (cells.length > 0) {
        const row = {};
        headers.forEach((header, idx) => {
          row[header] = cells[idx] || '';
        });
        rows.push(row);
      }
    }

    tables.push({ headers, rows });
  }

  return tables;
}

/**
 * Extract design tokens from markdown
 */
function extractTokens(markdown) {
  const tokens = {
    colors: [],
    spacing: [],
    radius: [],
  };

  // Extract color values
  const colorRegex = /`(#(?:[0-9a-fA-F]{3}){1,2})`/g;
  let colorMatch;
  const seenColors = new Set();
  while ((colorMatch = colorRegex.exec(markdown)) !== null) {
    const color = colorMatch[1];
    if (!seenColors.has(color)) {
      seenColors.add(color);
      tokens.colors.push(color);
    }
  }

  // Extract spacing values
  const spacingRegex = /间距[：:]\s*`?(\d+)px`?/g;
  let spacingMatch;
  while ((spacingMatch = spacingRegex.exec(markdown)) !== null) {
    tokens.spacing.push(spacingMatch[1] + 'px');
  }

  // Extract radius values
  const radiusRegex = /圆角[半径：:]*\s*`?(\d+)px`?/g;
  let radiusMatch;
  while ((radiusMatch = radiusRegex.exec(markdown)) !== null) {
    tokens.radius.push(radiusMatch[1] + 'px');
  }

  return tokens;
}

/**
 * Extract code blocks
 */
function extractCodeBlocks(markdown) {
  const blocks = [];
  const codeRegex = /```(\w+)?\n([\s\S]*?)```/g;
  let match;

  while ((match = codeRegex.exec(markdown)) !== null) {
    blocks.push({
      language: match[1] || 'text',
      code: match[2].trim(),
    });
  }

  return blocks;
}

/**
 * Parse a token file (colors, typography, spacing, motion)
 */
function parseTokenFile(markdown) {
  const tables = extractTables(markdown);
  return {
    tables,
    raw: markdown,
  };
}

module.exports = {
  parseComponent,
  parseTokenFile,
  extractTables,
  extractTokens,
  extractCodeBlocks,
};
