import path from 'path';
import { fileURLToPath } from 'url';

import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import config from './config.js';
import {
    getEntry,
    MultipleHtmlWebpackPlugin,
    getAssets,
    getPartials
} from './scripts/utils.js';

// Naming
const FILENAME = `[name].[fullhash]`;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
    mode: 'production',
    context: path.resolve(__dirname, 'src'),
    entry: getEntry(config.entries),
    output: {
        path: path.resolve(__dirname, `${config.buildDir}/public`),
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
                ...getAssets(config.assets),
                ...getPartials()
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
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader' // Autoprefixer
                    },
                    {
                        loader: 'sass-loader'
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
    performance: {
        hints: false
    }
};
