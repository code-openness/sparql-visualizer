const merge = require('webpack-merge');
const path = require('path');

const commonConfig = require('./webpack.common.config');

const PROJECT_ROOT = path.resolve(__dirname, '..');

module.exports = merge(commonConfig, {
    mode: 'development',
    entry: path.resolve(PROJECT_ROOT, 'playground/index.ts'),
    module: {
        rules: [
            {
                test: /\.(scss|sass)$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader",
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    output: {
        filename: 'index.js'
    },
    devServer: {
        contentBase: './playground'
    }
});
