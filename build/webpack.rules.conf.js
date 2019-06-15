const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = [
  {
    test: /\.html$/,
    use: [
      {
        loader: 'html-loader', // 如果img标签的src为空的话，就报错 xxxHTMLLINKxxx0.
      }
    ]
  },
  {
    test: /\.(png|jpg|gif|ico)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          name: '[name].[hash:8].[ext]',
          limit: 30000,
          outputPath: './images'
        }
      }
    ]
  },
  {
    test: /\.scss$/i,
    use: [
      Object.assign(
        // 生产环境需要使用 MiniCssExtractPlugin.loader 代替 style-loader
        { loader: process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader' },
        // 解决编译后css图片不能正常显示的问题
        process.env.NODE_ENV === 'production' ? { options: { publicPath: '../' } } : {}
      ),
      'css-loader',
      'sass-loader',
      'postcss-loader'
    ]
  },
  {
    test: /\.(js|ts)$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              useBuiltIns: 'usage',
              targets: {
                chrome: '58',
                ie: '8'
              },
              corejs: 2
            }]
          ]
        }
      },
      {
        loader: 'ts-loader'
      },
      {
        loader: 'eslint-loader',
        options: {
          cache: true // 优化打包速度
        },
        // force: 'pre' // 虽然在 babel-loader 前面，但是可以提前执行
      }
    ]
  }
]
