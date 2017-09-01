const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const projectCfgPath = resolve('config.js')
let projectCfg = {}

if(fs.existsSync(projectCfgPath)) {
    projectCfg = require(projectCfgPath)
}

module.exports = {
    entry: projectCfg['exports'],
    output: {
        path: resolve('./dist'),
        publicPath: './'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: getAlias(projectCfg.alias)
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            include:[resolve('src')]
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader'
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })
        }]
    },
    plugins: [
        new CleanWebpackPlugin([resolve('dist')], {
            root: process.cwd()
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify('development')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf("node_modules") !== -1;
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "manifest",
            minChunks: Infinity
        }),
        new ExtractTextPlugin('style.css'),
        new HtmlWebpackPlugin({
            title: 'tpl',
            template: 'index.html',
            // inject: true
        })
    ]
}

function resolve(_path) {
    return path.resolve(process.cwd(), _path)
}

function getAlias(cfg) {
    if(!cfg) return {}
    const alias = {}
    Object.keys(cfg).forEach(el => {
        alias[el] = path.resolve(process.cwd(), cfg[el])
    })
    return alias
}