const merge = require('webpack-merge');
const path = require('path');

const commonConfig = require('./webpack.common.config');

const PROJECT_ROOT = path.resolve(__dirname, '..');

module.exports = merge(commonConfig, {
    mode: 'development',
    entry: path.resolve(PROJECT_ROOT, 'dev-playground/index.ts'),
    output: {
        filename: 'index.js'
    },
    devServer: {
        contentBase: './dev-playground'
    }
});