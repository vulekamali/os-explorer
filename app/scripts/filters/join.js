'use strict';

var _ = require('lodash');
var angular = require('angular');
var module = angular.module('Application');

module.filter('join', [
  function() {
    return function(input, separator) {
      if (_.isArray(input)) {
        return _.filter(input).join(separator || ', ');
      }
      return input;
    };
  }
]);
