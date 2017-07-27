var baseUrl = process.env.OS_BASE_URL || 'https://staging.openspending.org';
var osExplorerSearchHost = process.env.OS_EXPLORER_SEARCH_HOST || baseUrl;

module.exports = {
  baseUrl: baseUrl,
  searchUrl: process.env.OS_SEARCH_URL || osExplorerSearchHost + '/search/package',
  authUrl: process.env.OS_EXPLORER_AUTH_HOST || baseUrl,
  snippets: {
    ga: process.env.OS_SNIPPETS_GA
  }
};
