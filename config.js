/**
 * App configuration
 */
const config = {
    buildDir: 'dist',
    /**
     * Entry points as in src folder
     */
    entries: [
        { name: 'index', template: './views/index.html', module: './routes/index.ts', style: './routes/index.scss', path: '' },
    ],
    /**
     * Files or directories to copy from src to the build directory
     */
    assets: [
        'assets',
        '../entry.cjs'
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
