import path from 'path';
import { fileURLToPath } from 'url';

import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import NodemonPlugin from 'nodemon-webpack-plugin';

import config from './config.js';
import { getEntry, MultipleHtmlWebpackPlugin, getAssets, getPartials, getEntries } from './scripts/utils.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
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
                ...getAssets(config.assets),
                ...getPartials()
            ]
        }),
        ...MultipleHtmlWebpackPlugin(config.entries),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        // Start nodemon
        new NodemonPlugin({
            script: `./${config.buildDir}/app.js`,
            watch: path.resolve(`./${config.buildDir}/app.js`)
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
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/i,
                type: 'asset/inline'
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
        open: ['http://localhost:8080'],
        hot: true,
        // Live reload for all other files (html, assets, express app)
        liveReload: true,
        watchFiles: {
            paths: ['src/**/*'],
            options: {
                ignored: getEntries(config.entries),
                awaitWriteFinish: true // for express
            }
        },
        static: {
            directory: path.join(__dirname, 'src/assets'),
        },
        proxy: {
            '/index': 'http://localhost:8080', // content base
        },
        port: 3000,
        devMiddleware: {
            writeToDisk: true, // for express
        }
    },
};
