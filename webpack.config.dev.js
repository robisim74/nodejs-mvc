const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');

const config = require('./config');
const { getEntry, MultipleHtmlWebpackPlugin, getAssets } = require('./scripts/utils');

module.exports = {
    mode: 'development',
    target: 'web',
    devtool: 'source-map',
    context: path.resolve(__dirname, 'src'),
    entry: getEntry(config.entries),
    output: {
        path: path.resolve(__dirname, `${config.buildDir}/public`),
        filename: 'js/[name].js',
        publicPath: './'
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
        ...MultipleHtmlWebpackPlugin(config.entries),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        // Start nodemon
        new NodemonPlugin({
            script: `./${config.buildDir}/app.js`,
            watch: 'src',
            ext: 'ts'
        })
    ],
    module: {
        rules: [
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
                type: 'asset/resource'
            },
            {
                test: /\.eot$|\.woff$|\.woff2$|\.ttf$/,
                type: 'asset/inline'
            },
        ]
    },
    stats: {
        colors: true,
        modules: false,
        entrypoints: false
    },
    devServer: {
        hot: true,
        proxy: {
            '': 'http://localhost:8080', // content base
        },
        port: 3000,
        devMiddleware: {
            writeToDisk: true, // for express
        },
    },
};
