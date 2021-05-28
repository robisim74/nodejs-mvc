const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = require('./config');
const {
    getEntry,
    MultipleHtmlWebpackPlugin,
    getAssets
} = require('./scripts/utils');

// Naming
const FILENAME = `[name].[fullhash]`;

module.exports = {
    mode: 'production',
    context: path.resolve(__dirname, 'src'),
    entry: getEntry(config.entries),
    output: {
        path: path.resolve(__dirname, config.buildDir),
        filename: `js/${FILENAME}.js`,
        chunkFilename: `js/${FILENAME}.js`,
        publicPath: './'
    },
    optimization: {
        emitOnErrors: false,
        splitChunks: {
            chunks: 'all'
        }
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
        ...MultipleHtmlWebpackPlugin(config.entries, config.baseHref),
        new MiniCssExtractPlugin({
            filename: `css/${FILENAME}.css`
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.s?css/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'postcss-loader' // Autoprefixer
                    },
                    {
                        loader: "resolve-url-loader",
                        options: { sourceMap: true } // source-maps required for loaders preceding resolve-url-loader
                    },
                    {
                        loader: "sass-loader",
                        options: { sourceMap: true }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            // Fallback
                            fallback: require.resolve('file-loader'),
                            name: '[path][name].[ext]',
                            publicPath: '../'
                        }
                    }
                ]
            },
            {
                test: /\.eot$|\.woff$|\.woff2$|\.ttf$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            // Fallback
                            fallback: require.resolve('file-loader'),
                            name: '[path][name].[ext]',
                            publicPath: '../'
                        }
                    }
                ]
            },
        ]
    },
    stats: {
        colors: true,
        modules: false,
        entrypoints: false
    },
    performance: {
        hints: false
    }
};
