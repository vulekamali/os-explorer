'use strict';

var search = require('./search');
var $q = require('./ng-promise');

function setSearchApiUrl(url) {
  return search.setSearchApiUrl(url);
}

function ngSearchPackages(query, filters) {
  var result = [];
  result.$promise = $q(search.searchPackages(query, filters));
  result.$promise.then(function(items) {
    result.splice(0, result.length);
    [].push.apply(result, items);
    return result;
  });
  return result;
}

function ngGetPackages(limit) {
  return ngSearchPackages({
    size: limit
  });
}

module.exports.setSearchApiUrl = setSearchApiUrl;
module.exports.ngSearchPackages = ngSearchPackages;
module.exports.ngGetPackages = ngGetPackages;
