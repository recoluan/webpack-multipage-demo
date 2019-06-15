const HtmlWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob')
const htmlArray = require('../htmlarray.js')

exports.getHtmlArray = function (moduleExportsPlugins) {
  const getHtmlConfig = function (name, chunks, title) {
    return {
      template: `./src/pages/${name}/index.html`,
      filename: `./${name}.html`,
      favicon: './src/assets/images/public/favicon.ico',
      title,
      inject: true,
      hash: true, // 开启hash  ?[hash]
      chunks, // 页面要引入的包
      minify: process.env.NODE_ENV === 'development' ? false : {
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 折叠空白区域 也就是压缩代码
        removeAttributeQuotes: true, // 去除属性引用
      },
    };
  };
  htmlArray.forEach((element) => {
    const { _html, chunks, title } = element
    moduleExportsPlugins.push(new HtmlWebpackPlugin(getHtmlConfig(_html, chunks, title)))
  })
}

// 动态添加入口
// eslint-disable-next-line no-unused-vars
exports.getEntry = function () {
  const entry = {}
  // 读取src目录所有page入口
  // 不可以使用 './src/pages/**/*.js'
  glob.sync('./src/pages/*/*.js').forEach((name) => {
    const start = name.indexOf('src/') + 4;
    const end = name.length - 3;
    const eArr = [];
    const n = name.slice(start, end).split('/')[1];
    eArr.push(name);
    eArr.push('@babel/polyfill'); // 引入这个，是为了用async await，一些IE不支持的属性能够受支持，兼容IE浏览器用的
    entry[n] = eArr;
  })
  return entry;
}
