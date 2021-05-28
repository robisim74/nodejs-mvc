const chalk = require('chalk');
const log = console.log;

const critical = require('critical');
const { createWriteStream } = require('fs');
const { SitemapStream } = require('sitemap');

const webpackCompiler = require('./scripts/webpack.compiler');
const { modernConfig, legacyConfig } = require('./webpack.config.prod');
const config = require('./config');
const { getHtmlSourceFiles, getPaths } = require('./scripts/utils');

async function build() {
    log(chalk.blue('Start building...'));

    // Runs webpack
    log(chalk.blue('Run webpack es2015 version'));
    await webpackCompiler(modernConfig);
    log(chalk.blue('\nRun webpack es5 version'));
    await webpackCompiler(legacyConfig);

    // Runs critical
    // https://github.com/addyosmani/critical
    log(chalk.blue('\nGenerate critical css'));
    for (const source of getHtmlSourceFiles(config.entries)) {
        critical.generate({
            inline: true,
            base: config.buildDir,
            src: source,
            target: {
                html: source
            },
            minify: true,
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
