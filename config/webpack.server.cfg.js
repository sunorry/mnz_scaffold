const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const CFG = require('../common/resolveCfg')

module.exports = merge(require('./webpack.base.cfg.js'), {
    output: {
        filename: 'js/[name].js',
        publicPath: CFG['publicPath']['server']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new webpack.NamedModulesPlugin(),
        new ExtractTextPlugin('css/style.css')
    ]
})