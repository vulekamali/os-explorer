'use strict';

var _ = require('lodash');
var angular = require('angular');
var searchService = require('../services/ng-search');
var utils = require('../services/utils');
var config = require('../services/config');

var application = angular.module('Application');

module.exports = application.controller('MainController', [
  '$scope', '$rootScope', '$q', '$filter',
  function($scope, $rootScope, $q, $filter) {
    $scope.preview = searchService.ngGetPackages(10);

    var configurations = config.ngGetSettings();

    // Load config and then bootstrap app
    configurations.$promise.then(function() {
      searchService.setSearchApiUrl(configurations.searchApiUrl);
      var promises = [
        $scope.preview.$promise
      ];
      $q.all(promises).then(function() {
        $rootScope.applicationLoaded = true;
      });
    });

    $scope.search = {
      package: {}
    };

    $scope.filter = {
      package: {}
    };

    $scope.filteredResults = [];

    function filterResults(results, filters) {
      var temp = _.extend({}, filters);
      temp.package = {};
      _.forEach(filters.package, function(values, key) {
        if (_.isArray(values)) {
          if (values.length > 0) {
            temp.package[key] = _.first(values);
          }
        } else {
          temp.package[key] = values;
        }
      });
      return $filter('filter')(results, temp);
    }

    $scope.$watch('filter', function(newValue, oldValue) {
      if (newValue === oldValue) {
        return;
      }

      $scope.filteredResults = filterResults($scope.results, $scope.filter);
    }, true);

    $scope.$watch('search', function(newValue, oldValue) {
      if (newValue !== oldValue) {
        var prevResults = $scope.results;
        $scope.results = searchService.ngSearchPackages(newValue);
        if (_.isArray(prevResults)) {
          [].push.apply($scope.results, prevResults);
        }

        $scope.results.$promise.then(function(results) {
          var packages = _.map(results, 'package');
          $scope.filterOptions = utils.getUniqueFilterOptions(packages);
          $scope.filter = {
            package: {}
          };
          $scope.filteredResults = filterResults($scope.results, $scope.filter);
          return results;
        });
      }
    }, true);
  }
]);
