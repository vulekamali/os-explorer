'use strict';

var OSStyles = require('os-styles');

var themes = {
  default: require('../../../themes/default.json'),
  wacky: require('../../../themes/wacky.json')
};

module.exports = new OSStyles(themes);
