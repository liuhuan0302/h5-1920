const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
    //配置开发环境
    mode:"development",
    devtool:"cheap-module-eval-source-map",
    //入口文件
    entry :{
        main: path.join(__dirname,"src/index.js")
    },
    output:{
        //打包文件之后的文件名
        filename:"bundle.js",
        //压缩文件存放的路径
        path:path.join(__dirname,"dist"),
    },
    module :{
        rules:[{//app.vue 组件的解析
            test:/\.vue$/,//正则解析vue文件
            loader:"vue-loader",//依赖的插件(需要引入插件vue-loader/lib/plugin)
        },{//样式解析
            test:/\.styl(us)?$/,//正则解析stylus语法的文件
            use:[
                //执行顺序:从下到上
                "vue-style-loader",//将解析的文件出入html
                {
                    loader:"css-loader",//解决css 文件的文件依赖
                    options:{
                        importLoaders:1//在 css-loader 前应用的 loader 的数量(当stylus 文件中还依赖其他的stylus文件,这是就需要配置options,可以实现依次解析)(当解析完当前文件,可以在解析其他引入的依赖)
                    }
                },
                "stylus-loader"//将stylus文件解析成css
                //"postcss-loader"//厂商前缀(浏览器前缀)(需要配合浏览器使用)
            ]
        }]
    },
    //开启服务
    devServer:{
        contentBase:path.resolve(__dirname,"dist"),
        host:"127.0.0.1",
        hot:true,
    },
    //插件(注意加s)
    plugins:[
        new webpack.HotModuleReplacementPlugin(),//开启服务(依赖插件 webpack)
        new HtmlWebpackPlugin({//创建入口模板
            template:"./src/index.html"//以index.html为模板
        }),
        new CleanWebpackPlugin(),//清除文件
        new VueLoaderPlugin()
    ]
    
}