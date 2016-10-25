'use strict';

var _ = require('lodash');
var angular = require('angular');
var searchService = require('../services/ng-search');
var utils = require('../services/utils');
var config = require('../services/config');
var theme = require('../services/theme');

var application = angular.module('Application');

module.exports = application.controller('MainController', [
  '$scope', '$rootScope', '$q', '$filter', '$location',
  function($scope, $rootScope, $q, $filter, $location) {
    var configurations = config.ngGetSettings();

    // Load config and then bootstrap app
    configurations.$promise.then(function() {
      searchService.setSearchApiUrl(configurations.baseUrl+'/search/package');
      $rootScope.BASE = configurations.baseUrl;
      $scope.preview = searchService.ngGetPackages(50);
      var promises = [
        //$scope.preview.$promise
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

    $scope.theme = theme.get($location.search()['theme']);

    function fetchResults(getFilterOptions) {
      var prevResults = $scope.results;
      $scope.results = searchService.ngSearchPackages($scope.search, $scope.filter);
      if (_.isArray(prevResults)) {
        [].push.apply($scope.results, prevResults);
      }

      if (getFilterOptions) {
        $scope.results.$promise.then(function (results) {
          var packages = _.map(results, 'package');
          $scope.filterOptions = utils.getUniqueFilterOptions(packages);
          return results;
        });
      }
    }

    $scope.$watch('filter', function(newValue, oldValue) {
      if (newValue !== oldValue) {
        fetchResults();
      }
    }, true);

    $scope.$watch('search', function(newValue, oldValue) {
      if (newValue !== oldValue) {
        fetchResults(true);
      }
    }, true);
  }
]);
