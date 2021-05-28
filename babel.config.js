module.exports = {
    env: {
        // Config to generate bundles for modern browsers
        modern: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        targets: {
                            esmodules: true
                        }
                    },
                    '@babel/preset-typescript'
                ]
            ],
            plugins: [
                '@babel/plugin-transform-typescript',
                '@babel/plugin-syntax-dynamic-import'
            ]
        },
        // Config to generate bundles for legacy browsers as in .browserslistrc
        legacy: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        useBuiltIns: 'usage',
                        corejs: '3.8'
                    },
                    '@babel/preset-typescript'
                ]
            ],
            plugins: [
                '@babel/plugin-transform-typescript',
                '@babel/plugin-syntax-dynamic-import'
            ]
        },
    }
};
