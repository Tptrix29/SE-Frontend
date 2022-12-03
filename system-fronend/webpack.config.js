const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-react'],
              }
            }
          },
          {
            test: /\.css$/,
            exclude: /node_modules/,
            use:{
                loader: 'css-loader',
            }
          }
        ]
    },
    devServer: {
        open: true,
        hot: true,
        port:3001,
        static: "./public"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlPlugin({
            template: 'public/index.html'
        })
    ]
}