const {merge} = require('webpack-merge');
const common = require('./webpack.common')

module.exports = merge(common, {
    devServer: {
        open: true,
        hot: true,
        port: 80,
        static: "./public"
    },
})