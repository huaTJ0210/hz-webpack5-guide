const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/*
增加环境变量
npx webpack --env goal=local --env production --progress
  module.exports = (env) => { 
  const goal = env.goal
  return {

  }
}
*/


/*
  预编译资源模块 DLLPlugin

  将项目中基础模块（不发生变动的）通过DLLPlugin进行配置
*/

module.exports = {
  entry: {
    index: './src/index.js'
    // main: './src/main.js'
  },
  resolve: {
    // 主要配置webpack的一些解析规则
    alias: {
      '@': path.resolve('src') // 使用别名缩短引用模块路径，降低文件解析成本
    },
    // 只采用 main 字段作为入口文件描述字段，以减少搜索步骤
    mainFields: ['main'],
    // 源码中的导入语句尽可能的写上文件后缀
    extensions: ['.js']
    // externals（推荐）：对第三方包进行公共包CDN引用[不是公司CDN谨慎使用]，降低包大小
    // externals: {
    //   react: 'React',
    //   jquery: 'jQuery'
    // }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults', modules: false }]]
          }
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 // 4kb 通过修改此选项决定资源是否通过base64的方式引入（asset/inline）
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack',
      template: 'index.html'
    })
  ],
  optimization: {
    // 避免模块改动导致不相关的模块hash值发生改变
    moduleIds: 'deterministic',
    // 代码分割，提取公共模块，避免同一个包被打入到多个bundle中
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: 'single'
  }
}

// 如何提高webpack的构建性能
