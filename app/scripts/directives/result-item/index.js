'use strict';

var template = require('./template.html');
var ngModule = require('../../module');

ngModule.directive('resultItem', [
  function() {
    return {
      restrict: 'E',
      replace: true,
      template: template,
      scope: {
        package: '=',
        base: '='
      },
      link: function() {
      }
    };
  }
]);
