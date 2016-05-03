'use strict';

var _ = require('lodash');
var $q = require('./ng-promise');

function getSettings() {
  var url = 'config.json';
  return fetch(url).then(function(response) {
    if (response.status != 200) {
      throw 'Failed to load data from ' + response.url;
    }
    return response.json();
  });
}

function ngGetSettings() {
  var result = {};
  var promise = $q(getSettings());
  result.$promise = promise;
  promise.then(function(data) {
    _.extend(result, data);
    result.$promise = promise;
    return result;
  });
  return result;
}

module.exports.getSettings = getSettings;
module.exports.ngGetSettings = ngGetSettings;
