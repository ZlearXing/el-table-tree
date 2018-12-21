const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
// vue-loader v15 现在需要配合一个 webpack 插件才能正确使用
const { VueLoaderPlugin } = require('vue-loader')
// extract-text-webpack-plugin不支持热更新，官方建议在开发环境中关闭ExtractText组件。
// const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: './example/main.js'
    // bundle: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../', 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.vue', '.js', '.json'],
    alias: {
      // 因为npm安装的vue默认导出的是dist/vue.runtime.common.js，但我们需要的是vue.js（import Vue from 'vue'）
      'vue$': 'vue/dist/vue.js'
    }
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      // use: ExtractTextPlugin.extract({
        use: ['style-loader', 'css-loader'],
      // })
    }, {
      // 用正则去匹配要用该 loader 转换的 CSS 文件
      test: /\.scss$/,
      // use: ExtractTextPlugin.extract({
        use: ['style-loader', 'css-loader', 'sass-loader'],
      // }),
      exclude: path.resolve(__dirname, 'node_modules')
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'table-tree',
      filename: 'index.html',
      template: './example/index.html'
    }),
    new VueLoaderPlugin(),
    // new ExtractTextPlugin({
    //   // 从 .js 文件中提取出来的 .css 文件的名称
    //   filename: '../dist/css/style.css',
    // }),
  ],
  mode: 'development'
}