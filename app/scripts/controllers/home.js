'use strict';

var ngModule = require('../module');
var config = window.globalConfig || {};


function loadPackageStatsIntoScope($scope, $http) {
  var packageStatsUrl = config.conductorUrl + '/package/stats';

  $http.get(packageStatsUrl)
    .then(function(response) {
      var data = response.data;
      $scope.num_packages = data.num_packages;
      $scope.num_countries = data.num_countries;
      $scope.num_records = data.num_records;
    });
}

function loadUrlsIntoScope($scope) {
  $scope.packagerUrl = config.packagerUrl;
  $scope.viewerUrl = config.viewerUrl;
}

ngModule.controller('HomeController', [
  '$scope', '$http',
  function($scope, $http) {
    loadPackageStatsIntoScope($scope, $http);
    loadUrlsIntoScope($scope);
  }
]);
