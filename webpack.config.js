'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    'main': './public/js/main.js',
  },
  failOnError: true,
  output: {
    path: path.join(__dirname, 'public/dist/'),
    filename: '[name].bundle.js',
    publicPath: '/dist/',
    sourceMapFilename: '[file].map',
  },
  module: {
    loaders: [
      {
        exclude: /(node_modules|bower_components)/,
        test: /\.jsx?$/,
        loaders: [
          'babel?' +
          // es7.objectRestSpread to enable ES7 rest spread operators
          // eg: let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
          'optional[]=es7.objectRestSpread&' +
          'optional[]=es7.classProperties&' +
          // ES2015
          'stage=2'
        ],
      },
    ],
  },
  plugins: [
    // fetch polyfill: http://mts.io/2015/04/08/webpack-shims-polyfills/
    // relies on imports-loader and exports-loader in node_modules
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: [
      'public/js/',
      'node_modules',
    ],
  },
  stats: {
    // Configure the console output
    colors: true,
    modules: true,
    reasons: true,
  },
  watch: true,
};
