'use strict';

var ngModule = require('../module');

ngModule.filter('prettyName', [
  function() {
    var result = function(value) {
      return result.map[value] || value;
    };
    result.map = {};
    return result;
  }
]);
