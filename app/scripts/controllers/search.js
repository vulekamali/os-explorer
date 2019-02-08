'use strict';

var _ = require('lodash');
var Promise = require('bluebird');
var themes = require('../services/themes');
var $q = require('../services/ng-utils').$q;
var searchService = require('../services/search');
var cosmopolitan = require('../services/cosmopolitan');
var ngModule = require('../module');
var config = window.globalConfig || {};

var SEARCH_FILTERS = [
  'authors',
  'regions',
  'countries',
  'cities',
  'formats'
];

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

function getInitialSearchParams(searchQuery) {
  var params = _.assign(
    {},
    searchQuery,
    {
      filter: {}
    }
  );

  SEARCH_FILTERS.forEach(function(filter) {
    if (params[filter] !== undefined) {
      // eslint-disable-next-line max-len
      var value = (_.isArray(params[filter])) ? params[filter] : [params[filter]];
      params.filter[filter] = value;

      delete params[filter];
    }
  });

  return params;
}

function performSearch($location, $scope) {
  var token = createToken();
  $scope.searchToken = token;
  updateQueryString($location, $scope.search);
  $q(searchService.performSearch($scope.search))
    .then(function(searchResults) {
      if ($scope.searchToken == token) {
        $scope.filterOptions = searchResults.options;
        $scope.results = searchResults.items;
      }
    });
}

function updateQueryString($location, searchParams) {
  Object.keys(searchParams).forEach(function(key) {
    if (key === 'filter') {
      Object.keys(searchParams[key]).forEach(function(filter) {
        $location.search(filter, searchParams[key][filter]);
      });
    } else {
      $location.search(key, searchParams[key]);
    }
  });
}

ngModule.controller('SearchController', [
  '$scope', '$rootScope', '$filter', '$location', 'LoginService',
  function($scope, $rootScope, $filter, $location, LoginService) {
    $scope.login = LoginService;
    $scope.theme = themes.getTheme($location.search().theme);
    $rootScope.BASE = config.baseUrl;
    searchService.searchApiUrl = config.searchUrl;

    $scope.clearAllFilters = function() {
      $location.search('q', null);
      $location.search('viewAll', null);

      SEARCH_FILTERS.forEach(function(filter) {
        $location.search(filter, null);
      });

      $scope.search = getInitialSearchParams($location.search());
    };

    $scope.$watch('search', function(newValue, oldValue) {
      if (newValue !== oldValue) {
        performSearch($location, $scope);
      }
    }, true);

    $scope.search = getInitialSearchParams($location.search());
    $scope.preview = [];

    var promises = [
      searchService.getAllDataPackages(),
      cosmopolitan.getContinents(),
      cosmopolitan.getCountries()
    ];

    $q(Promise.all(promises))
      .then(function(results) {
        var dataPackages = results[0];
        var continents = results[1];
        var countries = results[2];
        $filter('prettyName').map = _.extend(
          {},
          createNameMap(continents),
          createNameMap(countries)
        );

        $scope.preview = _.slice(dataPackages, 0, 50);
        $scope.isLoaded.application = true;
      });

    performSearch($location, $scope);
  }
]);
