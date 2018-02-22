'use strict';

require('js-polyfills/xhr');
require('isomorphic-fetch');

var _ = require('lodash');
var jquery = require('jquery');
var angular = require('angular');

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

  // Make config global available to app, then load scripts that require
  // globalConfig.
  $.get('/config.json')
    .then(function(config) {
      globals.globalConfig = Object.assign({}, globals.globalConfig, config);
      return globals.globalConfig;
    })
    .then(function() {
      // Load snippets (requires globalConfig)
      return $.getScript('/scripts/snippets.js')
        .fail(function(jqxhr, settings, exception) {
          throw(exception);
        });
    })
    .then(function() {
      // Load externally hosted authClient.services lib (makes `authenticate`
      // and `authorize` services available to angular modules).
      var libUrl = globalConfig.conductorUrl + '/user/lib';
      return $.getScript(libUrl)
        .fail(function(jqxhr, settings, exception) {
          console.log('Unable to load authClient.services from ' + libUrl);
        });
    })
    .then(function() {
      require('./application');
      angular.bootstrap(globals.document, ['Application']);
    });
})(window);
