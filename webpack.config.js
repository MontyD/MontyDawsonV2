const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const OffLinePlugin = require('offline-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const ENV = process.env.npm_lifecycle_event;
const isProd = ENV === 'build';

module.exports = (function() {
    'use strict';

    let config = {};

    config.entry = {
        app: './src/index.js'
    };

    config.output = {

        path: __dirname + '/public',

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
    ];

    if (isProd) {
        config.plugins.push(
            new webpack.NoErrorsPlugin(),
            new OffLinePlugin({
              excludes: ['**/.*', '**/*.map', '**/*.json']
            }),
            new FaviconsWebpackPlugin({
                logo: './src/public/favicon.png',
                background: '#E0E0E0'
            }),
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
