'use strict';

var _ = require('lodash');
var angular = require('angular');
var template = require('./template.html');

var application = angular.module('Application');

module.exports = application.directive('sidebarList', [
  function() {
    return {
      restrict: 'E',
      replace: true,
      template: template,
      scope: {
        title: '@',
        items: '=',
        selected: '=',
        maxItems: '@?',
        canClear: '@?',
        multiSelect: '@?'
      },
      link: function($scope) {
        $scope.isSelected = function(value) {
          if (!_.isArray($scope.selected)) {
            $scope.selected = [];
          }
          var index = _.findIndex($scope.selected, function(item) {
            return item == value;
          });
          return index >= 0;
        };

        $scope.selectItem = function($event, value) {
          if (!_.isArray($scope.selected)) {
            $scope.selected = [];
          }
          var index = _.findIndex($scope.selected, function(item) {
            return item == value;
          });
          if (index == -1) {
            if (!$scope.multiSelect) {
              $scope.selected = [];
            }
            $scope.selected.push(value);
          }
          $event.stopPropagation();
        };

        $scope.unselectItem = function($event, value) {
          if (!_.isArray($scope.selected)) {
            $scope.selected = [];
          }
          var index = _.findIndex($scope.selected, function(item) {
            return item == value;
          });
          if (index != -1) {
            $scope.selected.splice(index, 1);
          }
          $event.stopPropagation();
        };
      }
    };
  }
]);
