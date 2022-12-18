const {merge} = require('webpack-merge');
const path = require('path');

const common = require('./webpack.common')

module.exports = merge(common, {
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        // clean: true
    },
    devServer: {
        open: false,
        hot: false,
        port: 80,
        static: "./public"
    },
    performance: {
        hints: false,
    }
})