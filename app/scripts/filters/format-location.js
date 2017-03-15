'use strict';

var _ = require('lodash');
var ngModule = require('../module');

ngModule.filter('formatLocation', [
  function() {
    return function(dataPackage) {
      var result = [];
      if (dataPackage.regions.length > 0) {
        result.push(_.join(dataPackage.regions, ' '));
      }
      if (dataPackage.countries.length > 0) {
        result.push(_.join(dataPackage.countries, ' '));
      }
      if (dataPackage.cities.length > 0) {
        result.push(_.join(dataPackage.cities, ' '));
      }
      return _.join(result, ', ');
    };
  }
]);
