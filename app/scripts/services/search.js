'use strict';

require('isomorphic-fetch');
var _ = require('lodash');

var searchApiUrl = 'http://next.openspending.org/search/package';

function setSearchApiUrl(url) {
  if (url) {
    searchApiUrl = url;
  }
}

function queryToUrlParams(query) {
  var traverse = function(path, value, result) {
    if (_.isArray(value)) {
      _.forEach(value, function(value) {
        result.push(encodeURIComponent(path) + '=' +
          encodeURIComponent(JSON.stringify(value)));
      });
    } else
    if (_.isObject(value)) {
      _.forEach(value, function(value, key) {
        var newPath = (path == '') ? key : path + '.' + key;
        traverse(newPath, value, result);
      });
    } else {
      result.push(encodeURIComponent(path) + '=' +
        encodeURIComponent(JSON.stringify(value)));
    }
  };
  var result = [];
  traverse('', query, result);
  if (!query.size) {
    result.push('size=10000');
  }
  return result.join('&');
}

function searchPackages(query) {
  var url = searchApiUrl + '?' + queryToUrlParams(query);
  return fetch(url).then(function(response) {
    if (response.status != 200) {
      throw 'Failed to load data from ' + response.url;
    }
    return response.json();
  });
}

function getPackages(limit) {
  return searchPackages({
    size: limit
  });
}

module.exports.setSearchApiUrl = setSearchApiUrl;
module.exports.queryToUrlParams = queryToUrlParams;
module.exports.searchPackages = searchPackages;
module.exports.getPackages = getPackages;
