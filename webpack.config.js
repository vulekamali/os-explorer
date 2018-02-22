'use strict';

var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

var plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
];

if (process.env.NODE_ENV == 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compressor: {
        screw_ie8: true
      }
    })
  );
}

module.exports = {
  entry: {
    'os-explorer': './app/scripts/index.js',
    'snippets': _.map(fs.readdirSync('./app/snippets/'), function(filename) {
      return './app/snippets/' + filename;
    })
  },
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/scripts'),
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {test: /\.html$/, loader: 'raw-loader'}
    ]
  },
  plugins: plugins
};
