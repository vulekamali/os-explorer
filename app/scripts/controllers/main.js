'use strict';

var _ = require('lodash');
var Promise = require('bluebird');
var theme = require('../services/themes');
var $q = require('../services/ng-utils').$q;
var searchService = require('../services/search');
var osExplorerService = require('../services/os-explorer');
var cosmopolitan = require('../services/cosmopolitan');
var ngModule = require('../module');

function createToken() {
  return '' + (new Date() * 1) + ':' + Math.round(Math.random() * 1000000);
}

function createNameMap(items) {
  return _.chain(items)
    .map(function(item) {
      return [item.code, item.name];
    })
    .fromPairs()
    .value();
}

ngModule.controller('MainController', [
  '$scope', '$rootScope', '$filter', '$location', 'LoginService',
  function($scope, $rootScope, $filter, $location, LoginService) {
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

    var promises = [
      osExplorerService.getSettings(),
      cosmopolitan.getContinents(),
      cosmopolitan.getCountries()
    ];

    $q(Promise.all(promises))
      .then(function(results) {
        $filter('prettyName').map = _.extend({}, createNameMap(results[1]),
          createNameMap(results[2]));

        var config = results[0];

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
