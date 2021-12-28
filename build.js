import shell from 'shelljs';
import chalk from 'chalk';

import critical from 'critical';
import inline from 'inline-critical';
import { createWriteStream, readFileSync, writeFileSync } from 'fs';
import { SitemapStream } from 'sitemap';

import config from './config.js';
import { getHtmlSourceFiles, getPaths } from './scripts/utils.js';

async function build() {
    shell.echo(chalk.blue('Start building...'));

    // Runs rollup to build the app
    shell.echo(chalk.blue('Run rollup to build the app'));
    shell.exec('rollup -c rollup.config.js');

    // Runs webpack to build the client
    shell.echo(chalk.blue('\nRun webpack to build the client'));
    shell.exec('webpack --config webpack.config.prod.js');

    // Runs critical
    // https://github.com/addyosmani/critical
    // A Node.js server is started to render also partial views, using PM2 process manager
    // https://github.com/unitech/pm2
    shell.echo(chalk.blue('\nGenerate critical css'));

    shell.echo(chalk.blue('Start Node.js server for rendering'));
    shell.exec(`pm2 start ${config.buildDir}/app.js`);

    for (const source of getHtmlSourceFiles(config.entries)) {
        const result = await critical.generate({
            base: `${config.buildDir}/public/`,
            src: `http://localhost:8080${source.path}`,
            dimensions: [{
                height: 500,
                width: 300
            },
            {
                height: 720,
                width: 1280
            }]
        });

        const html = readFileSync(`${config.buildDir}/${source.template}`, 'utf8');

        const inlined = inline(html, result.css, {
            basePath: `${config.buildDir}/public/`,
            extract: true
        });

        writeFileSync(`${config.buildDir}/${source.template}`, inlined);
    }

    // Stop & delete process
    shell.exec(`pm2 delete ${config.buildDir}/app.js`);

    // Run sitemap
    // https://github.com/ekalinin/sitemap.js
    shell.echo(chalk.blue('\nGenerate sitemap'));
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

    shell.echo(chalk.blue('End building'));
}

/**
 * Build production
 */
build();
