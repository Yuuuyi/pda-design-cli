/**
 * Fetch design specs - 本地优先，无需网络
 * npx 运行时包已在本地，直接读 spec/ 目录
 */

const fs = require('fs');
const path = require('path');

// 本地 spec 目录（lib/ 的同级 spec/）
const LOCAL_SPEC_DIR = path.resolve(__dirname, '../spec');

/**
 * 读取本地 spec 文件
 * @param {string} relativePath - 相对于 spec/ 的路径，如 'modal-container.md'
 */
function readLocalFile(relativePath) {
  const fullPath = path.join(LOCAL_SPEC_DIR, relativePath);
  if (fs.existsSync(fullPath)) {
    return fs.readFileSync(fullPath, 'utf-8');
  }
  return null;
}

/**
 * 读取本地 registry.json
 */
function readLocalRegistry() {
  const content = readLocalFile('registry.json');
  if (content) {
    return JSON.parse(content);
  }
  return null;
}

/**
 * 获取 registry（本地优先）
 */
async function fetchRegistry(customUrl) {
  const local = readLocalRegistry();
  if (local) {
    return local;
  }
  throw new Error('无法读取本地 registry.json，请确认 pda-design-cli 安装完整');
}

/**
 * 获取规范文件（本地优先）
 */
async function fetchFile(filePath, customUrl) {
  const local = readLocalFile(filePath);
  if (local) {
    return local;
  }
  throw new Error(`文件不存在: ${filePath}，请确认 pda-design-cli 安装完整`);
}

/**
 * 列出本地 spec 目录下的文件
 */
function listLocalFiles(subDir) {
  const dir = path.join(LOCAL_SPEC_DIR, subDir);
  if (!fs.existsSync(dir)) {
    return [];
  }
  return fs.readdirSync(dir);
}

/**
 * 获取本地 spec 目录路径
 */
function getSpecDir() {
  return LOCAL_SPEC_DIR;
}

module.exports = {
  fetchFile,
  fetchRegistry,
  readLocalFile,
  readLocalRegistry,
  listLocalFiles,
  getSpecDir,
};
