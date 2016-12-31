var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
var OffLinePlugin = require('offline-plugin');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');

var ENV = process.env.npm_lifecycle_event;
var isProd = ENV === 'build';

module.exports = (function() {
    'use strict';

    var config = {};

    config.entry = {
        app: './src/index.js'
    };

    config.output = {

        path: __dirname + '/dist',

        publicPath: isProd ? '/' : 'http://localhost:8080/',

        filename: isProd ? '[name].[hash].js' : '[name].bundle.js',

        chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'


    };

    config.module = {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader?postcss-loader!sass-loader!')
        }, {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            loader: 'file'
        }, {
            test: /\.html$/,
            loader: 'raw'
        }]
    };
    config.postcss = [
        autoprefixer({
            browsers: ['last 2 version']
        })
    ];

    config.plugins = [
        new HtmlWebpackPlugin({
            template: './src/public/index.html',
            inject: 'body',
            inlineSource: '.(js|css)$'
        }),
        new HtmlWebpackInlineSourcePlugin(),
        new ExtractTextPlugin('[name].[hash].css'),
        new OffLinePlugin(),
        new FaviconsWebpackPlugin({
            logo: './src/favicon.png',
            background: '#0D47A1'
        })
    ];

    if (isProd) {
        config.plugins.push(
            new webpack.NoErrorsPlugin(),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin(),
            new CopyWebpackPlugin([{
                from: __dirname + '/src/public'
            }])
        );
    }

    config.devServer = {
        contentBase: './src/public'
    };

    return config;
})();
