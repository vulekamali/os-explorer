'use strict';

var Promise = require('bluebird');

function getSettings() {
  return Promise.resolve(window.globalConfig || {});
}

module.exports.getSettings = getSettings;
