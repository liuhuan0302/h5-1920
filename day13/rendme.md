## vue-cli的使用:
安装vue-cli:
    ① 使用npm（需要安装node环境）全局安装webpack，打开命令行工具输入：npm install webpack -g或者（npm install -g webpack），安装完成之后输入 webpack -v，如下图，如果出现相应的版本号，则说明安装成功。
    ② 全局安装vue-cli，在cmd中输入命令:
        npm install --global vue-cli
        安装完成之后输入 vue -V（注意这里是大写的“V”），如下图，如果出现相应的版本号，则说明安装成功。
2.用vue-cli来构建项目

① 我首先在D盘新建一个文件夹（dxl_vue）作为项目存放地，然后使用命令行cd进入到项目目录输入：vue init webpack baoge
    baoge是自定义的项目名称，命令执行之后，会在当前目录生成一个以该名称命名的项目文件夹。
    输入命令后，会跳出几个选项让你回答：

Project name (baoge)： -----项目名称，直接回车，按照括号中默认名字（注意这里的名字不能有大写字母，如果有会报错Sorry, name can no longer contain capital letters），阮一峰老师博客为什么文件名要小写 ，可以参考一下。
Project description (A Vue.js project)： ----项目描述，也可直接点击回车，使用默认名字
Author ()： ----作者，输入dongxili
接下来会让用户选择：
Runtime + Compiler: recommended for most users 运行加编译，既然已经说了推荐，就选它了
Runtime-only: about 6KB lighter min+gzip, but templates (or any Vue-specificHTML) are ONLY allowed in .vue files - render functions are required elsewhere 仅运行时，已经有推荐了就选择第一个了
Install vue-router? (Y/n) 是否安装vue-router，这是官方的路由，大多数情况下都使用，这里就输入“y”后回车即可。
Use ESLint to lint your code? (Y/n) 是否使用ESLint管理代码，ESLint是个代码风格管理工具，是用来统一代码风格的，一般项目中都会使用。
接下来也是选择题Pick an ESLint preset (Use arrow keys) 选择一个ESLint预设，编写vue项目时的代码风格，直接y回车
Setup unit tests with Karma + Mocha? (Y/n) 是否安装单元测试，我选择安装y回车
Setup e2e tests with Nightwatch(Y/n)? 是否安装e2e测试 ，我选择安装y回车
回答完毕后上图就开始构建项目了。

② 配置完成后，可以看到目录下多出了一个项目文件夹baoge，然后cd进入这个文件夹：
安装依赖：
    npm install
    npm install ：安装所有的模块，如果是安装具体的哪个个模块，在install 后面输入模块的名字即可。而只输入install就会按照项目的根目录下的package.json文件中依赖的模块安装（这个文件里面是不允许有任何注释的），每个使用npm管理的项目都有这个文件，是npm操作的入口文件。因为是初始项目，还没有任何模块，所以我用npm install 安装所有的模块。安装完成后，目录中会多出来一个node_modules文件夹，这里放的就是所有依赖的模块。
3.启动项目
    npm run dev 


history 实现跳转
参数1:参数 参数2:标题 参数3:跳转的路径
history.pushState({},null,跳转的路径)
弊端:回退的时候路径变化了,但是内容没有变化

监控网页前进后退
history.popstate 是一个事件
addEventListener("popstate",()=>{
    
})


Vue性能操作

computed计算属性的缓存和methods,watch
v-if和v-show
:key 解决唯一性，循环遍历的时候最好用数据的id，而不是下标
使用v-once来提高动态组件之间的切换，是组件第一次渲染之后放在内存中，后面操作直接调用，提高性能
函数节流
使用keep-alive结合钩子函数activated进行页面性能优化
Vue的数据传递

父传子 通过v-bind:传递，子组件通过props接收
子传父 子组件通过$emit发送事件，父组件通过v-on监听事件
非父子 通过bus/发布订阅/总线机制来传递，或者使用vuex传递
父传子可以通过slot插槽传递数据
MVVM和MVC

MVVM：M表示数据model，是获取到的数据。V表示视图view,是展示的界面。VM表示视图模型，用来连接model和view，是vue底层自动实现，不需要认为操作。MVVM是数据驱动的。
MVC: M表示数据model,是从后台用ajax获取到的数据。V表示视图层view，是前端渲染的页面。C表示控制器controler,用来将获取到的数据使用dom操作来更新页面，VMMC中数据和操作dom是混合的，controler控制器部分比较庞大，比如原始的jquery就是MVC模式。
————————————————
版权声明：本文为CSDN博主「yw00yw」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/yw00yw/article/details/84245625