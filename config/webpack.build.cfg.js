const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CFG = require('../common/resolveCfg')

module.exports = merge(require('./webpack.base.cfg.js'), {
    output: {
        filename: 'js/[name]@[chunkhash].js',
        publicPath: CFG.publicPath['build']
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
          }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new ExtractTextPlugin('css/style@[chunkhash].css')
    ]
})