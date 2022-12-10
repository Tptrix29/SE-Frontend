const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        // User Management Module
        index: './src/index.js',
        login: './src/user-management-module/pages/login.js',
        admin_home: './src/user-management-module/pages/admin_home.js',
        user_home: './src/user-management-module/pages/user_home.js',
        register_page: './src/user-management-module/pages/register_page.js',
        check_page: './src/user-management-module/pages/check_page.js',
        user_manage_page: './src/user-management-module/pages/user_manage_page.js',
        // Course Module
        course_page: './src/course-management-module/pages/course_page.js',
        // Experiment Module
        exp_page: './src/experiment-management-module/pages/exp_page.js',
        add_exp_page: './src/experiment-management-module/pages/add_exp_page.js',
        // Lib Module
        lib_home: './src/resource-lib-module/pages/lib_home.js',
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
            use: ['style-loader', 'css-loader']
          },
          //配置图片的loader
          {
            test: /\.(gif|png|svg|jpe?g)$/,
            exclude: /node_modules/,
            type: "asset/resource",
        },
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
        new HtmlPlugin({
          template: 'public/index.html',
          filename: 'admin/index.html',
          chunks: ['admin_home'],
        }),
        new HtmlPlugin({
          template: 'public/index.html',
          filename: 'admin/register/index.html',
          chunks: ['register_page'],
        }),
        new HtmlPlugin({
          template: 'public/index.html',
          filename: 'admin/check/index.html',
          chunks: ['check_page'],
        }),
        new HtmlPlugin({
          template: 'public/index.html',
          filename: 'admin/user_manage/index.html',
          chunks: ['user_manage_page'],
        }),

        new HtmlPlugin({
          template: 'public/index.html',
          filename: 'user/index.html',
          chunks: ['user_home'],
        }),

        // Course
        new HtmlPlugin({
          template: 'public/index.html',
          filename: 'course/index.html',
          chunks: ['course_page'],
        }),

        // Exp
        new HtmlPlugin({
          template: 'public/index.html',
          filename: 'course/exp/index.html',
          chunks: ['exp_page'],
        }),

        new HtmlPlugin({
          template: 'public/index.html',
          filename: 'course/exp/add/index.html',
          chunks: ['add_exp_page'],
        }),

        // Lib
        new HtmlPlugin({
          template: 'public/index.html',
          filename: 'lib/index.html',
          chunks: ['lib_home'],
        }),
    ]
}