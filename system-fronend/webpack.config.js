const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js',
        login: './src/user-management-module/pages/login.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'build'),
        clean: true
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
          },
          {
            test: /\.(jpg|jpe?g|gif)$/,
            exclude: /node_modules/,
            use:{
                loader: 'file-loader',
            }
          }
        ]
    },
    devServer: {
        open: true,
        hot: true,
        port: 3001,
        static: "./public"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlPlugin({
            template: 'public/index.html',  // 模版，不需改动
            filename: 'index.html',  // 输出文件名称，浏览器访问路径，HTML文件名默认index.html，需要改动
            chunks: ['index'],  // js入口，对应entry中的key，需要改动
        }),
        new HtmlPlugin({
            template: 'public/index.html',
            filename: 'login/index.html',
            chunks: ['login'],
        }),
    ]
}