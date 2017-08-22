'use strict';

var ngModule = require('../module');
var config = require('config');


function loadPackageStatsIntoScope($scope, $http) {
  var packageStatsUrl = config.baseUrl + '/package/stats';

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
