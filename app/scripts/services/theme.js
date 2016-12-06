'use strict';

var _ = require('lodash');

var defaultTheme = require('./themes/default.json');

var themes = {
  'default': defaultTheme,
  // Other themes
  'wacky': require('./themes/wacky.json')
};

module.exports.get = function(theme) {
  return _.merge({}, themes.default, themes[theme]);
};
