'use strict';

var _ = require('lodash');
var template = require('./template.html');
var ngModule = require('../../module');

ngModule.directive('sidebarFilters', [
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
