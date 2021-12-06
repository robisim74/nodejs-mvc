/**
 * App configuration
 */
const config = {
    buildDir: 'dist',
    /**
     * Entry points as in src folder
     */
    entries: [
        { name: 'index', template: './views/index.html', module: './index.ts', style: './index.scss', path: '' },
    ],
    /**
     * Files or directories to copy from src to the build directory
     */
    assets: [
        'assets'
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

export default config;
