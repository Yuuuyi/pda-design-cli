/**
 * Fetch design specs from Git registry
 * Supports both public and private repositories
 */

const fetch = require('node-fetch');

// Default registry: public GitHub repo
const DEFAULT_REGISTRY_BASE = 'https://raw.githubusercontent.com/Yuuuyi/pda-design-registry/main';

/**
 * Get the registry base URL
 */
function getRegistryUrl(customUrl) {
  return customUrl || process.env.PDA_REGISTRY_URL || DEFAULT_REGISTRY_BASE;
}

/**
 * Get GitHub token for private repos
 */
function getAuthToken() {
  return process.env.PDA_GITHUB_TOKEN || process.env.GITHUB_TOKEN || null;
}

/**
 * Build fetch headers with optional auth
 */
function buildHeaders() {
  const headers = {
    'Accept': 'text/plain',
  };
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `token ${token}`;
  }
  return headers;
}

/**
 * Fetch a markdown file from the registry
 * @param {string} path - file path relative to registry root (e.g. 'components/modal-container.md')
 * @param {string} customUrl - optional custom registry URL
 */
async function fetchFile(path, customUrl) {
  const baseUrl = getRegistryUrl(customUrl);

  // For GitHub API (private repos), use API endpoint
  const token = getAuthToken();
  let url;
  if (token && baseUrl.includes('github.com')) {
    // Convert raw URL to API URL for private repo access
    const repoMatch = baseUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (repoMatch) {
      const [, owner, repo] = repoMatch;
      const branch = baseUrl.split('/').pop() || 'main';
      url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
    } else {
      url = `${baseUrl}/${path}`;
    }
  } else {
    url = `${baseUrl}/${path}`;
  }

  const response = await fetch(url, { headers: buildHeaders() });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.status} ${response.statusText}`);
  }

  return await response.text();
}

/**
 * Fetch the registry index
 */
async function fetchRegistry(customUrl) {
  const text = await fetchFile('registry.json', customUrl);
  return JSON.parse(text);
}

module.exports = {
  fetchFile,
  fetchRegistry,
  getRegistryUrl,
};
