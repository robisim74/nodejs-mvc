const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = require('./config');
const { getEntry, MultipleHtmlWebpackPlugin, getAssets } = require('./scripts/utils');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    context: path.resolve(__dirname, 'src'),
    entry: getEntry(config.entries),
    output: {
        path: path.resolve(__dirname, config.buildDir),
        filename: 'js/[name].js',
        publicPath: ''
    },
    optimization: {
        emitOnErrors: false
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                ...getAssets(config.assets)
            ]
        }),
        ...MultipleHtmlWebpackPlugin(config.entries)
    ],
    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                include: path.resolve(__dirname, 'src'),
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    emitWarning: true,
                },
            },
            {
                test: /\.(js|ts)$/,
                include: path.resolve(__dirname, 'src'),
                enforce: 'pre',
                use: ['source-map-loader'],
            },
            {
                test: /\.(js|ts)$/,
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.s?css$/i,
                use: [
                    'style-loader',
                    'css-loader?sourceMap=true',
                    'postcss-loader',
                    'resolve-url-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }
                }
            },
            {
                test: /\.eot$|\.woff$|\.woff2$|\.ttf$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }
                }
            },
        ]
    },
    stats: {
        colors: true,
        modules: false,
        entrypoints: false
    }
};
