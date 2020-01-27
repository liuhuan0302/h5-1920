const path = require("path");//node核心模块path 拼接join resolve
const webpack = require("webpack");//webpack 内置插件开启服务
const HtmlWebpackPlugin = require("html-webpack-plugin");//创建入口模板
const { CleanWebpackPlugin } = require("clean-webpack-plugin");//清除无用文件
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
    //配置开发环境
    mode:"development",
    devtool:"cheap-module-eval-source-map",
    //入口文件
    entry:{
        main:path.join(__dirname,"./src/index.js")
    },
    //出口文件
    output:{
        //打包之后文件的名称和路径
        filename:"bundle.js",
        path:path.join(__dirname,"dist"),
        publicPath:"/"//当前输出的文件是以根路径为存储的(设置公共路径)(以dist为根路径)
    },
    //解析文件
    module:{
        rules:[
            {//解析vue文件
                test:/\.vue$/,
                loader:"vue-loader",
            },{
                test:/\.css$/,
                use:[
                    "style-loader",
                    "css-loader"
                ]
            },{//对es7 语法的解析
                test:/\.js$/,
                loader:"babel-loader"
            },{//解析stylus文件
                test:/\.styl(us)?$/,
                use:[
                    "vue-style-loader",
                    {
                        loader:"css-loader",
                        options:{
                            importLoaders:1,
                        }
                    },
                    "stylus-loader",
                ]
            }
        ]
    },
    //开启服务
    devServer:{
        contentBase:path.resolve(__dirname,"dist"),
        host:"127.0.0.1",
        hot:true,
        historyApiFallback:{//解析history路由切换,找不到文件的问题
            index:"/index.html"//基于哪个页面做请求(文件输出的路径中的dist文件下面的index)
        },
        //代理
        proxy:{
            //代理地址
            "/api":{
                //代理的目标地址
                target:"http://127.0.0.1:3000/",
                //重写 用/api 代替http://127.0.0.1:3000/ 但是后端并不认识,这需要重写一下
                pathRewrite:{"^/api":""},
                //是否允许跨域
                changeOrigin:true,
                //接收运行在https上的服务(默认是false)
                secure:false,

            }
        }
    },
    plugins:[
        //webpack内置插件
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template:"./src/index.html"
        }),
        new CleanWebpackPlugin(),
        new VueLoaderPlugin()
    ]
}
