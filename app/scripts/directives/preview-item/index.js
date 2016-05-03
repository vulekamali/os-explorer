'use strict';

var angular = require('angular');
var template = require('./template.html');

var application = angular.module('Application');

module.exports = application.directive('previewItem', [
  function() {
    return {
      restrict: 'E',
      replace: true,
      template: template,
      scope: {
        packageId: '=',
        package: '='
      },
      link: function() {
      }
    };
  }
]);
