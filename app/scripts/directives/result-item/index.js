'use strict';

var searchService = require('../../services/search');
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
      link: function($scope) {
        $scope.$watch('package', function(newValue, oldValue) {
          if (newValue !== oldValue) {
            $scope.formats = searchService.getResourceFormats($scope.package);
          }
        });

        $scope.formats = searchService.getResourceFormats($scope.package);
      }
    };
  }
]);
