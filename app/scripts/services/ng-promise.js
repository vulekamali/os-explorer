'use strict';

var angular = require('angular');

module.exports = function(promise) {
  return module.exports.$q(function(resolve, reject) {
    promise.then(resolve).catch(reject);
  }).then(function(data) {
    return data;
  });
};

module.exports.$q = null;

angular.module('ng').run([
  '$q',
  function($q) {
    module.exports.$q = $q;
  }
]);
