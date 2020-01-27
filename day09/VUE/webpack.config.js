const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");//创建模板
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");//开启热启动
module.exports = {
    mode:"development",
    devtool:"cheap-module-evel-source-map",
    //入口文件
    entry : {
        main: path.join(__dirname ,'./src/index.js'),
    },
    //出口文件
    output : {
        filename : "bundle.js", //存放压缩代码的文件
        path : path.join(__dirname ,"dist")//压缩文件的存放路径
    },
    //解析文件
    module : {
        rules :[
            {
                test:/\.vue$/,//正则匹配所有的vue 文件
                use:[
                    "vue-loader"
                ]
            },
            {
                test:/\.styl(us)?$/,//注意补全styl(us),存在就要不存在就不用
                use:[
                    "vue-style-loader",//将文件插入html中
                    "css-loader", //解决文件依赖
                    "stylus-loader"//将styus 语法转义成css语法
                ]
            }
        ]
    },
    devServer:{//热启动 开启服务
        contentBase:path.join(__dirname , "dist"),//服务开启的根节点  端口号默认是8080
        hot :true,
    },
    plugins:[//插件
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),//开启服务
        new HtmlWebpackPlugin({
            template : "./src/index.html"// 以该文件为创建的html文件模板
        }),
        new CleanWebpackPlugin(),
        //注意执行顺序:先清空 在创建 在开启服务 最后在压缩
    ]
}

/*
需要安装:   
    npm i html-webpack-plugin -D //创建模板
    npm i clean-webpack-plugin -D //删除文件
    npm i stylus-loader stylus -D  //解析stylus文件(css样式)
    npm i css-loader style-loader -D 
    npm i vue-loader -D
    npm i webpack-dev-server -D
    npm i webpack -D
    npm i webpack-cli -D
  
    npm i vue-style-loader -D
    npm i vue-template-compiler -D
    npm

*/