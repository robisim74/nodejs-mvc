import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';

/**
 * Add here external dependencies that actually you use.
 */
const externals = [
    'express',
    'express-handlebars',
    'helmet',
    'url'
];

const environment = process.env.NODE_ENV;

export default {
    input: 'src/app.ts',
    external: externals,
    plugins: [
        typescript(),
        nodeResolve()
    ],
    onwarn: () => { return },
    output: {
        dir: 'dist',
        format: 'es',
        sourcemap: environment === 'production' ? false : true
    }
}
