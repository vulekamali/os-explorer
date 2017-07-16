var _ = require('lodash');
var nodeExternals = require('webpack-node-externals');
var baseConfig = require('./webpack.config');

var config = {
  target: 'node',
  externals: [nodeExternals()]
};

module.exports = _.merge({}, baseConfig, config);
