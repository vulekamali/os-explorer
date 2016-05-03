'use strict';

var _ = require('lodash');
var utils = require('../../services/utils');
var angular = require('angular');
var template = require('./template.html');

var application = angular.module('Application');

module.exports = application.directive('resultItem', [
  function() {
    return {
      restrict: 'E',
      replace: true,
      template: template,
      scope: {
        packageId: '=',
        package: '='
      },
      link: function($scope) {
        $scope.$watch('package', function(newValue, oldValue) {
          if (newValue !== oldValue) {
            $scope.formats = utils.getResourceFormats($scope.package);
          }
        });

        $scope.formats = utils.getResourceFormats($scope.package);
      }
    };
  }
]);
