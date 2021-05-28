/**
 * Site configuration
 */
const config = {
    buildDir: 'dist',
    /**
     * Entry points as in src folder
     */
    entries: [
        { name: 'home', template: './index.html', module: './index.ts', style: './index.scss', path: '' },
    ],
    /**
     * Files or directories to copy from src to the build directory
     */
    assets: [
        'assets',
        '404.html'
    ],
    /**
     * Production base href
     */
    baseHref: '/',
    /**
     * For sitemap URLs
     */
    hostname: 'https://example.com'
};

module.exports = config;
