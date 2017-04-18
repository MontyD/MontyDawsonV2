const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
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
        app: './src/index.ts'
    };

    config.resolve = {
        extensions: [
            '.webpack.js',
            '.js',
            '.ts',
        ]
    };

    config.output = {

        path: __dirname + '/public_html',

        publicPath: isProd ? '/' : 'http://localhost:8080/',

        filename: isProd ? '[name].[hash].js' : '[name].bundle.js',

    };

    config.module = {
        rules: [{
            test: /\.ts$/,
            loader: 'awesome-typescript-loader',
            exclude: [
                /node_modules/
            ]
        }, {
            test: /\.scss$/,
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function() {
                                return [
                                    autoprefixer,
                                    cssnano
                                ];
                            }
                        }
                    },
                    'sass-loader'
                ]
            })
        }, {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            loader: 'file-loader'
        }, {
            test: /\.html$/,
            loader: 'raw-loader'
        }]
    };

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
            new OffLinePlugin({
                excludes: ['**/.*', '**/*.map', '**/*.json']
            }),
            new FaviconsWebpackPlugin({
                logo: './src/public/favicon.png',
                background: '#E0E0E0'
            }),
            new webpack.optimize.UglifyJsPlugin(),
            new CopyWebpackPlugin([{
                from: __dirname + '/src/public'
            }])
        );
    }

    config.devServer = {
        contentBase: './src/public'
    }

    config.devtool = 'source-map';


    return config;
})();
