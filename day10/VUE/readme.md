## 搭建框架
   + assets(静态资源)
        - img
        - css
   + src (组件和入口文件)
        - components(组件)
        - index.html (入口模板)
        - index.js()
   + webpack.config.js


## 安装的插件
    npm init -y 
    npm i vue -S 
    npm i vue-template-compiler -D
    npm i vue-loader -D
    npm i vue-style-loader -D
    npm i style-loader -D
    npm i css-loader -D
    npm i stylus-loader -D
    npm i stylus -D
    npm i webpack webpack-cli -D
    npm i html-webpack-plugin -D
    npm i clean-webpack-plugin -D
    npm i webpack-dev-server -D

vue 声明周期函数:
    //前面四个生命周期函数(只创建一次)
    //在创建之前触发的回调(虚拟DOM节点创建之前)(可以设置加载之前的动作如load)
    beforeCreate(){
        console.log(this.$el,"beforeCreate")
    },
    //在创建完成常触发的回调(数据调用可以在这操作ajax)
    created(){
        console.log(this.$el,"created")
    }, 
    //在挂载之前触发的回调(虚拟DOM节点创建完成)(可以操作原生DOM节点)
    beforeMount(){
        console.log(this.$el,"beforeMount")
    },
    //在挂载完成触发的回调(挂载完成之后,会把原来的节点销毁)
    mounted(){
        console.log(this.$el,"mounted")
    },
    //只要数据发生变化就会触发(频繁触发)
    beforeUpdate(){
        console.log(this,"beforeUpdate") 
    },
    updated(){
        console.log(this,"updated")
    },
    //销毁之前触发
    beforeDestroy(){
        console.log(this,"beforeDestroy")
    },
    destroyed(){
        console.log(this,"debugger")
    },

父子组件的生命周期函数的执行顺序:父组件要等待子组件挂载完成之后再去挂载
    父组件(创建): 
        undefined "beforeCreate"
        undefined "created"
        <div id=​"root">​</div>​ "beforeMount"
    子组件(创建,挂载):       
        App-beforeCreate
        App-created
        App-beforeMount
        App-mounted
    父组件(挂载完成)
    <div id=​"app">​…​</div>​ "mounted"

父子组件嵌套执行顺序:
    - 父组件的生命周期
        + beforeCreate
        + create
        + beforeMount
    - 开始执行子组件的生命周期
        + app-beforeCreate
        + app-create
        + app-beforeMount
        + app-mounted
    + 最后完成父组件挂载
        + mounted

父组件销毁执行的顺序:
    + beforeDestory(父组件开始销毁)
    + app- beforeDestory(子组件开始销毁)
    + app-destory(子)    

    注:数据改变,就会触发beforeupdate  update
响应式:Object defineProperty(obj,value,()=>{get(),set()})

