const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');

module.exports = {
    context: PROJECT_ROOT,
    entry: './sparql-visualizer/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.tsx', '.js', '.json' ]
    },
    output: {
        filename: 'sparql-visualizer.js',
        path: path.resolve(PROJECT_ROOT, 'dist')
    }
};