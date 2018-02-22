'use strict';

require('js-polyfills/xhr');
require('isomorphic-fetch');

var _ = require('lodash');
var jquery = require('jquery');
var angular = require('angular');

// Init some global variables - needed for proper work of angular and
// some other 3rd-party libraries
(function(globals) {
  if (globals.globalConfig === undefined) {
    throw Error('Missing globalConfig object in the global scope');
  }

  globals._ = _;
  globals.jQuery = globals.$ = jquery;
  globals.angular = angular;
  if (typeof globals.Promise != 'function') {
    globals.Promise = require('bluebird');
  }

  require('os-bootstrap/dist/js/os-bootstrap');

  // Load externally hosted authClient.services lib (makes `authenticate`
  // and `authorize` services available to angular modules).
  var libUrl = globalConfig.conductorUrl + '/user/lib';
  $.getScript(libUrl)
    .fail(function(jqxhr, settings, exception) {
      throw Error('Unable to load authClient.services from ' + libUrl);
    })
    .done(function() {
      require('./application');
      angular.bootstrap(globals.document, ['Application']);
    });
})(window);
