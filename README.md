## webpack 多页面配置方案

本项目使用 `webapck4.0` 实现多页面模块化开发。

### 项目目录

```
├─build ------------ webpack 配置目录
├─dist  ------------ 编译文件目录
├─src   ------------ 开发文件目录
  ├─ assets -------- 公共文件目录
  ├─ pages  -------- 页面所在目录
```

### 注意事项

1. 每增加一个页面，需要配置一下根目录的 `htmlarray.js`，增加页面相应的配置；
   - manifest 优化缓存（必填）
   - manifest 第三方库，比如jquery（根据需要填写）
   - index 当前js文件的名字（必填）
2. 请使用根目录的 `index.html` 模板；
3. 本项目已经引入 `@babel/polyfill`，如果需要兼容 IE8，仍然建议不使用 es6 语法；

### 开发

```bash
# 开发
npm run dev

# 编译
npm run build
```