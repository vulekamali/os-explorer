var baseUrl = process.env.OS_BASE_URL || 'https://openspending.org';
var osExplorerSearchHost = process.env.OS_EXPLORER_SEARCH_HOST || baseUrl;
var searchUrl = process.env.OS_SEARCH_URL || osExplorerSearchHost + '/search/package';
var authUrl = process.env.OS_EXPLORER_AUTH_HOST || baseUrl;
var cosmopolitanUrl = process.env.OS_COSMOPOLITAN_URL || 'https://cosmopolitan.openspending.org/?format=json';
var url = require('url');
var assert = require('assert');

function validateUrl(_url) {
  var parsedUrl = url.parse(_url);

  assert(parsedUrl.protocol, 'You need to define the URL protocol (' + _url + ')');
  assert(!_url.endsWith('/'), 'The URL should not end with a slash (' + _url + ')');

  return _url;
}

module.exports = {
  baseUrl: validateUrl(baseUrl),
  searchUrl: validateUrl(searchUrl),
  authUrl: validateUrl(authUrl),
  cosmopolitanUrl: validateUrl(cosmopolitanUrl),
  snippets: {
    ga: process.env.OS_SNIPPETS_GA
  }
};
