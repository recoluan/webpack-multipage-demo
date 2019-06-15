const path = require('path')
const webpack = require('webpack')
const rulesConfig = require('./webpack.rules.conf.js')
const { getHtmlArray, getEntry } = require('./utils.js')

module.exports = {
  entry: getEntry(),
  devtool: 'source-map',
  output: {
    filename: 'js/[name].[hash:8].bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    extensions: ['.js', '.ts', '.css'],
    alias: {
      '@src': path.resolve(__dirname, '../src'),
      '@assets': path.resolve(__dirname, '../src/assets')
    }
  },
  module: {
    rules: rulesConfig
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      jquery: 'jquery'
    })
  ]
}

getHtmlArray(module.exports.plugins)
