const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
// vue-loader v15 现在需要配合一个 webpack 插件才能正确使用
const { VueLoaderPlugin } = require('vue-loader')
// extract-text-webpack-plugin不支持热更新，官方建议在开发环境中关闭ExtractText组件。
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// 去除dist文件中的残余文件(因为添加了hash之后，会导致改变文件内容后重新打包时，文件名不同而内容越来越多)
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  // devtool: 'eval-source-map',
  entry: {
    app: './example/main.js'
    // bundle: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../', 'dist'),
    filename: 'bundle-[hash].js'
  },
  resolve: {
    extensions: ['.vue', '.js', '.json'],
    alias: {
      // 因为npm安装的vue默认导出的是dist/vue.runtime.common.js，但我们需要的是vue.js（import Vue from 'vue'）
      'vue$': 'vue/dist/vue.js',
      '@': path.resolve(__dirname, '../', 'src'),
    },
    modules: ['node_modules']
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
      // use: ExtractTextPlugin.extract({}
        use: ['style-loader', 'css-loader', 'sass-loader'],
      // }),
      exclude: path.resolve(__dirname, 'node_modules')
    }, {
    　　test: /\.jsx$/,
    　　loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
    }]
  },
  devServer: {
    hot: true // dev server 的配置要启动 hot，或者在命令行中带参数开启
  },
  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'),
    new HtmlWebpackPlugin({
      title: 'table-tree',
      filename: 'index.html',
      template: './example/index.html'
    }),
    new VueLoaderPlugin(),
    // new UglifyJSPlugin(),
    new CleanWebpackPlugin('dist', {
      root: path.resolve(__dirname, '../'),
      verbose: true,
      dry: false
    }),
    new webpack.NamedModulesPlugin(), // 用于启动 HMR 时可以显示模块的相对路径
    new webpack.HotModuleReplacementPlugin(), // Hot Module Replacement 的插件
    // new ExtractTextPlugin({
    //   // 从 .js 文件中提取出来的 .css 文件的名称
    //   filename: '../dist/css/style.css',
    // }),
  ],
  optimization: {
    // minimizer: [
    //   new UglifyJSPlugin({
    //     test: /\.js(\?.*)?$/i
    //   })
    // ]
  },
  performance: {
    hints: false
  },
  mode: 'development'
  // mode: 'production'
}