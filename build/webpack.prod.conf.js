const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const baseConfig = require('./webpack.base.conf.js')

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-source-map',
  optimization: {
    minimizer: [
      // 会导致 sourcemap 消失
      new UglifyJsPlugin({
        uglifyOptions: ({
          compress: false
        })
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: { // 抽离第三方插件
          test: /[\\/]node_modules[\\/]/, // 指定是node_modules下的第三方包
          name: 'vendors',
          priority: -10 // 抽取优先级
        },
        utilCommon: { // 抽离自定义
          name: 'common',
          minSize: 0, // 将引用模块分离成新代码文件的最小体积
          minChunks: 2, // 表示将引用模块如不同文件引用了多少次，才能分离生成新chunk
          priority: -20
        }
      }
    },
    // optimization.runtimeChunk 就是告诉 webpack 是否要把这部分单独打包出来，来优化缓存问题
    runtimeChunk: {
      name: 'manifest'
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFileName: '[id].[contenthash:8].css'
    }),
  ],
  // 关闭性能优化提示
  performance: false
}

module.exports = merge(baseConfig, prodConfig)
