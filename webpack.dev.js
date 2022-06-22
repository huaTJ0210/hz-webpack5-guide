const { merge } = require('webpack-merge')
const base = require('./webpack.common')
const path = require('path')

// 检测出项目中不再使用的module
const UnusedWebpackPlugin = require('unused-webpack-plugin')

module.exports = merge(base, {
  mode: 'development',
  // webpack如何向磁盘写入文件
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    // 自定义输出文件名称
    assetModuleFilename: 'images/[name][ext]'
  },
  devtool: 'inline-source-map', // 配置sourceMap
  module: {
    rules: [
      {
        test: /\.css$/i,
        // loader仅仅限制处理src下的文件，可以优化webpack的构建性能
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    static: './dist'
  },
  plugins: [
    new UnusedWebpackPlugin({
      directories: [path.join(__dirname, 'src')],
      root: path.join(__dirname, '../')
    })
  ]
})
