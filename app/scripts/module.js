'use strict';

var angular = require('angular');
require('angular-marked');
require('angular-animate');

var ngModule = angular.module('Application', [
  'ngAnimate',
  'hc.marked',
  'authClient.services'
])
  .config([
    '$httpProvider', '$compileProvider', '$logProvider', 'markedProvider',
    '$locationProvider',
    function($httpProvider, $compileProvider, $logProvider, markedProvider,
      $locationProvider) {
      $compileProvider.aHrefSanitizationWhitelist(
        /^\s*(https?|ftp|mailto|file|javascript):/);
      $logProvider.debugEnabled(true);
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false,
        rewriteLinks: false
      });
      markedProvider.setOptions({gfm: true});
    }
  ])
  .run([
    '$rootScope',
    function($rootScope) {
      $rootScope.isLoaded = {
        application: false
      };
    }
  ]);

module.exports = ngModule;
