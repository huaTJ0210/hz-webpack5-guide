const { merge } = require('webpack-merge')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// css的treeShaking
const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob')

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const base = require('./webpack.common')

module.exports = merge(base, {
  mode: 'production',
  output: {
    filename: 'js/[name].[contenthash:8].js',
    path: path.resolve(__dirname, 'dist'),
    // 自定义输出文件名称
    assetModuleFilename: 'images/[name].[contenthash:8][ext]',
    clean: true
  },
  devtool: false, // 配置sourceMap
  module: {
    rules: [
      {
        test: /\.css$/i,
        // loader仅仅限制处理src下的文件，可以优化webpack的构建性能
        include: path.resolve(__dirname, 'src'),
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css'
    }),
    // 开启css的tree-shaking
    new PurgecssPlugin({
      paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`, { nodir: true })
    })
  ],
  optimization: {
    // usedExports 依赖于 terser 去检测语句中的副作用
    usedExports: true,
    // 代码的压缩
    minimize: true,
    //js的压缩、css的压缩
    minimizer: [
      new TerserPlugin({
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/,
        safe: true,
        cache: true,
        parallel: true,
        discardComments: {
          removeAll: true
        }
      })
    ]
  }
})
