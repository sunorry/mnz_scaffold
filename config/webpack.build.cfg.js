const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = merge(require('./webpack.base.cfg.js'), {
    output: {
        filename: '[name]@[chunkhash].js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new UglifyJSPlugin(),
        new ExtractTextPlugin('style@[chunkhash].css')
    ]
})