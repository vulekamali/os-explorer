'use strict';

var _ = require('lodash');
var theme = require('../services/themes');
var $q = require('../services/ng-utils').$q;
var searchService = require('../services/search');
var osExplorerService = require('../services/os-explorer');
var ngModule = require('../module');

function createToken() {
  return '' + (new Date() * 1) + ':' + Math.round(Math.random() * 1000000);
}

ngModule.controller('MainController', [
  '$scope', '$rootScope', '$location', 'LoginService',
  function($scope, $rootScope, $location, LoginService) {
    $scope.login = LoginService;
    $scope.theme = theme.get($location.search().theme);

    function getDefaultSearchParams() {
      return {
        viewAll: false,
        q: '',
        filter: {
          authors: [],
          regions: [],
          countries: [],
          cities: [],
          formats: []
        }
      };
    }

    $scope.search = $scope.search = getDefaultSearchParams();

    var allDataPackages = [];
    $scope.preview = [];

    $q(osExplorerService.getSettings())
      .then(function(config) {
        $rootScope.BASE = config.baseUrl;
        searchService.searchApiUrl = config.searchUrl;
        return $q(searchService.getAllDataPackages());
      })
      .then(function(dataPackages) {
        allDataPackages = dataPackages;
        $scope.preview = _.slice(dataPackages, 0, 50);
        $scope.isLoaded.application = true;
      });

    $scope.clearAllFilters = function() {
      $scope.search = getDefaultSearchParams();
    };

    $scope.$watch('search', function(newValue, oldValue) {
      if (newValue !== oldValue) {
        var token = createToken();
        $scope.searchToken = token;
        $q(searchService.performSearch(allDataPackages, $scope.search))
          .then(function(searchResults) {
            if ($scope.searchToken == token) {
              $scope.filterOptions = searchResults.options;
              $scope.results = searchResults.items;
            }
          });
      }
    }, true);
  }
]);
