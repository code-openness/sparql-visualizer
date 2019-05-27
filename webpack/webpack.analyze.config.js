const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const commonConfig = require('./webpack.common.config');

module.exports = merge(commonConfig, {
    mode: 'production',
    plugins: [
        new BundleAnalyzerPlugin({
            openAnalyzer: true
        })
    ]
});
