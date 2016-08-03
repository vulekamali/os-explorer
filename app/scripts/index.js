'use strict';

require('js-polyfills/xhr');
require('isomorphic-fetch');

var _ = require('lodash');
var jquery = require('jquery');
var angular = require('angular');

require('./application');

// Init some global variables - needed for proper work of angular and
// some other 3rd-party libraries
(function(globals) {
  globals._ = _;
  globals.jQuery = globals.$ = jquery;
  globals.angular = angular;
  if (typeof globals.Promise != 'function') {
    globals.Promise = require('bluebird');
  }

  require('os-bootstrap/dist/js/os-bootstrap');
})(window || this);
