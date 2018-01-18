const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin')

const CFG = require('../common/resolveCfg')

module.exports = merge(require('./webpack.base.cfg.js'), {
  output: {
    filename: 'js/[name]_[chunkhash].js',
    publicPath: CFG.publicPath['build']
  },
  resolve: {
    mainFields: ['jsnext:main', 'browser', 'main']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        beautify: false
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin('css/style@[chunkhash].css'),
    new ModuleConcatenationPlugin()
  ]
})
