## 如何连接手机实时调试

1. 手机：打开USB调试
2. 电脑端chrome跳转到 chrome://inspect ，确认Discover USB devices已勾选
3. 手机连接到电脑，手机上会弹框提示是否信任电脑
4. 手机chrome浏览器打开 http://hellodigua.github.io/fe-demo/webrtc/
5. 电脑端刷新 chrome://inspect，设备应该已连接了，此时选择打开的网页：WebRTC，并选择inspect，开始调试

### chrome准备

-

https://wiki.jikexueyuan.com/project/chrome-devtools/remote-debugging-on-android.html

## 插件

- rollup-plugin-json 使rollup导入json里的数据

- rollup-plugin-node-resolve 帮助 Rollup 查找外部模块，然后安装

- rollup-plugin-commonjs 解决 ES6模块的查找导入，由于npm中的大多数包都是以CommonJS模块的形式出现的，所以需要使用这个插件将CommonJS模块转换为 ES2015 供 Rollup 处理

- rollup-plugin-babel 使用ES6

依赖以下插件：

  babel-plugin-external-helpers
  babel-preset-es2015-rollup


- rollup-plugin-uglify 压缩bundle文件

- rollup-plugin-eslint 代码检查

需要创建 .eslintrc 文件配置 eslint 规则

- rollup-plugin-replace
变量替换，可以将动态设置的变量提取出来在配置文件中设置

- rollup-plugin-postcss

> 注意如果要使用 .sass .scss 类型样式，需要先安装 node-sass

  如果使用postcss，需要安装 autoprefixer cssnano

- rollup-watch 监控文件变化

然后在 package.json 中设置 scripts属性即可

    "build": "rollup -c",
    "dev": "rollup -c -w"

- rollup-plugin-serve

类似 webpack-dev-server, 提供静态服务器能力

- rollup-plugin-livereload

> 实时刷新页面，配合 rollup-plugin-serve 使用

