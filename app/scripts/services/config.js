'use strict';

/* global window */

var _ = require('lodash');
var $q = require('./ng-promise');
var Promise = require('bluebird');

function getSettings() {
  return Promise.resolve(window.globalConfig || {});
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
