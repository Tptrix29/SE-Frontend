const {merge} = require('webpack-merge');
const path = require('path');

const common = require('./webpack.common')

module.exports = merge(common, {
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'build'),
        clean: true
    },
    devServer: {
        open: true,
        hot: true,
        port: 3001,
        static: "./public"
    },
})