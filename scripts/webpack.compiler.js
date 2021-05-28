const webpack = require('webpack');

/**
 * Wrapper for webpack compiler
 */
const webpackCompiler = async (webpackConfig) => {

    return new Promise((resolve, reject) => {

        const compiler = webpack(webpackConfig);

        compiler.run((err, stats) => {
            if (err) {
                console.error(err);
                return reject(err)
            }

            console.log(stats.toString(webpackConfig.stats));
            resolve();
        })
    });
};

module.exports = webpackCompiler;
