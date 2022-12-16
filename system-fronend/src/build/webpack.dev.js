const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    devServer: {
        open: true,
        hot: true,
        port: 3001,
        static: "./public"
    },
})