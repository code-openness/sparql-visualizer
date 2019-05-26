const merge = require('webpack-merge');

const commonConfig = require('./webpack.common.config');

module.exports = merge(commonConfig, {
    mode: 'production',
    output: {
        library: 'sparql-visualizer',
        libraryTarget: 'umd'
    }
});