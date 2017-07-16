'use strict';

var ngModule = require('../module');
var config = require('config');


function loadPackageStatsIntoScope($scope, $http) {
  var DEFAULT_BASE_URL = 'https://next.openspending.org';
  var BASE_URL = config.baseUrl || DEFAULT_BASE_URL;
  var packageStatsUrl = BASE_URL + '/package/stats';

  $http.get(packageStatsUrl)
    .then(function(response) {
      var data = response.data;
      $scope.num_packages = data.num_packages;
      $scope.num_countries = data.num_countries;
      $scope.num_records = data.num_records;
    });
}

ngModule.controller('HomeController', [
  '$scope', '$http',
  function($scope, $http) {
    loadPackageStatsIntoScope($scope, $http);
  }
]);
