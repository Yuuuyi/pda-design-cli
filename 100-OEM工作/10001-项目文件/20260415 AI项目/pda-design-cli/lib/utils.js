/**
 * Utility functions
 */

/**
 * Convert string to PascalCase
 * e.g. "modal-container" → "ModalContainer"
 * e.g. "弹窗容器 (Modal Container)" → "ModalContainer"
 */
function toPascalCase(str) {
  // Try to extract English name from parentheses
  const englishMatch = str.match(/\(([^)]+)\)/);
  if (englishMatch) {
    return englishMatch[1]
      .split(/[\s-]+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  }

  // Fallback: convert kebab-case or space-separated
  return str
    .split(/[\s-_]+/)
    .filter(word => /^[a-zA-Z]/.test(word)) // filter out non-English words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('') || 'Component';
}

/**
 * Convert string to kebab-case
 * e.g. "ModalContainer" → "modal-container"
 */
function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * Get file extension for framework
 */
function getFileExt(framework) {
  const map = {
    react: 'tsx',
    vue: 'vue',
    html: 'html',
  };
  return map[framework] || 'tsx';
}

module.exports = {
  toPascalCase,
  toKebabCase,
  getFileExt,
};
