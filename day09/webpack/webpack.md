webpack是什么

    webpack 前端自动化工具 打包工具
        webpack 是一个模块打包机，将根据文件间的依赖关系对其进行静态分析，然后将这些模块按指定规则生成静态资源
        当 webpack 处理程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle

    webpack的功能:

        打包：将多个文件 打包成 一个文件，减少服务器压力和下载带宽

        转换：将预编译语言 转换成 浏览器识别的语言

        优化：性能优化

    webpack的特点:



webpack安装:
    全局安装:(不推荐)(会造成版本冲突)
        npm i webpack -g
        npm i webpack-cli -g   webpack管理工具
        webpack -v 查看webpack的版本号
    局部安装:(推荐)
        npm init -y
        npm i webpack -D
        npm i webpack-cli -D  webpack管理工具
        npx webpack -v 查看版本号
        npx webpack index.js 打包文件



    当前浏览器不允许以内commonJS模块,需要对commonJS进行打包,这是就需要webpack 

webpack配置文件
    webpack配置文件(webpack.config.js)

    webpack 只能打包js文件,如果需要对其他文件进行打包需要配置模块


packjson.json 可以简化语法
"scripts": {
   "bundle":"webpadk --config webpack.config.js " 简化语法  npm run bundle
   "bundle":"webpadk --config webpack.config.js --watch" 自动打包
   "mon":"nodemon app.js" 执行语法:npm run mon
   "dev":"webpack-dev-server"  执行语法:npm run dev (可以不用加文件名)
},


执行语句:npm run bundle


devtool 映射错误 在开发环境中使用,可以方便的定位到具体错误在哪
webpack-dev-server:开启服务
优点:反向代理,页面不刷新替换代码,起服