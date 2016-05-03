'use strict';

var _ = require('lodash');
var angular = require('angular');
var template = require('./template.html');

var application = angular.module('Application');

module.exports = application.directive('sidebarFilters', [
  function() {
    return {
      restrict: 'E',
      replace: true,
      template: template,
      scope: {
        filters: '=',
        options: '='
      },
      link: function($scope) {
        $scope.noOptionsAvailable = true;
        $scope.$watch('options', function(newValue, oldValue) {
          if (newValue === oldValue) {
            return;
          }
          $scope.noOptionsAvailable = true;
          _.forEach(newValue, function(item) {
            if (_.isArray(item) && (item.length > 0)) {
              $scope.noOptionsAvailable = false;
            }
            return false;
          });
        }, true);
      }
    };
  }
]);
