'use strict';

var angular = require('angular');
require('angular-marked');
require('angular-animate');

module.exports = angular.module('Application', [
  'ngAnimate',
  'hc.marked'
]);

require('./controllers');
require('./directives');
require('./filters');
require('./animations');
