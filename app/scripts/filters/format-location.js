'use strict';

var _ = require('lodash');
var ngModule = require('../module');

ngModule.filter('formatLocation', [
  '$filter',
  function($filter) {
    return function(dataPackage) {
      var result = [];
      var pn = $filter('prettyName');
      if (dataPackage.regions.length > 0) {
        result.push(_.join(_.map(dataPackage.regions, pn), ' '));
      }
      if (dataPackage.countries.length > 0) {
        result.push(_.join(_.map(dataPackage.countries, pn), ' '));
      }
      if (dataPackage.cities.length > 0) {
        result.push(_.join(_.map(dataPackage.cities, pn), ' '));
      }
      return _.join(result, ', ');
    };
  }
]);
