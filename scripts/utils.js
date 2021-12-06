import path from 'path';
import { fileURLToPath } from 'url';

import HtmlWebpackPlugin from 'html-webpack-plugin';

import config from '../config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const getEntry = (entries) => {
    const entry = {};
    for (const value of entries) {
        entry[value.name] = [value.module, value.style];
    }
    return entry;
};

export const MultipleHtmlWebpackPlugin = (entries, baseHref = '/') => {
    return entries.map(value =>
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, `../${config.buildDir}/${value.template}`),
            template: path.resolve(__dirname, `../src/${value.template}`),
            favicon: path.resolve(__dirname, '../src/favicon.ico'),
            base: baseHref,
            minify: false
        })
    );
};

export const getHtmlSourceFiles = (entries) => {
    return entries.map(value =>
        value.template
    );
};

export const getPaths = (entries) => {
    return entries.filter(value => value.path != undefined).map(value =>
        value.path
    );
};

export const getAssets = (assets) => {
    return assets.map(asset => {
        return {
            from: path.resolve(__dirname, `../src/${asset}`),
            to: path.resolve(__dirname, `../${config.buildDir}/public/${asset}`),
        };
    });
};
