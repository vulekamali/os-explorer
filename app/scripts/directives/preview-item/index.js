'use strict';

var template = require('./template.html');
var ngModule = require('../../module');

ngModule.directive('previewItem', [
  function() {
    return {
      restrict: 'E',
      replace: true,
      template: template,
      scope: {
        packageId: '=',
        package: '=',
        base: '='
      },
      link: function() {
      }
    };
  }
]);
