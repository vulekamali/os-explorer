'use strict';

var utils = require('../../services/utils');
var template = require('./template.html');
var ngModule = require('../../module');

ngModule.directive('resultItem', [
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
