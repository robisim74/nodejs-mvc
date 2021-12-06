import chalk from 'chalk';

import critical from 'critical';
import { createWriteStream } from 'fs';
import { SitemapStream } from 'sitemap';

import webpackCompiler from './scripts/webpack.compiler.js';
import webpackConfig from './webpack.config.prod.js';
import config from './config.js';
import { getHtmlSourceFiles, getPaths } from './scripts/utils.js';

const log = console.log;

async function build() {
    log(chalk.blue('Start building...'));

    // Runs webpack
    log(chalk.blue('Run webpack'));
    await webpackCompiler(webpackConfig);

    // Runs critical
    // https://github.com/addyosmani/critical
    log(chalk.blue('\nGenerate critical css'));
    for (const source of getHtmlSourceFiles(config.entries)) {
        critical.generate({
            inline: true,
            base: `${config.buildDir}/public/`,
            src: `../${source}`,
            target: {
                html: `../${source}`
            },
            extract: true,
            dimensions: [{
                height: 500,
                width: 300
            },
            {
                height: 720,
                width: 1280
            }]
        });
    }

    // Run sitemap
    // https://github.com/ekalinin/sitemap.js
    log(chalk.blue('Generate sitemap'));
    const sitemap = new SitemapStream({
        hostname: config.hostname,
        lastmodDateOnly: true, // Print date not time
    });

    const writeStream = createWriteStream(`${config.buildDir}/sitemap.xml`);
    sitemap.pipe(writeStream);

    for (const path of getPaths(config.entries)) {
        sitemap.write({
            url: path,
            lastmod: Date.now(),
            // Other options
        });
    }

    sitemap.end();

    log(chalk.blue('End building'));
}

/**
 * Build production
 */
build();
