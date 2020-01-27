class Router{
    //传入一个配置项options 是注册路由之后,对路由的配置
    constructor(options){
        //切换模式(没有传.默认是hash)
        this.mode = options.mode || "hash";
        //routes 是传入的routes 没传入默认是空 
        this.routes = options.routes || [];
        //console.log(this.routes);
        //出入的[{path:"index",component:Index},{path:"classify",component:classify}]
        //将传入的配置项改成路由表{路径:组件}{"index":Index,"classify",classify}
        //配置路由表
        this.routesTable = this.createTable(this.routes)
        this.pathname = {path:null};//存储路径(根据路径,在路由表里面找到对应的组件,进行渲染)
        this.init();
    }
    //初始化
    init(){
        //进入的方式 
        if(this.mode === "hash"){
            //console.log(location.hash) 
            //判断hash 是否存在,如果存在就用,如果不存在就拼接一个
            location.hash ? "" : location.hash = "#/"
            console.log(location.hash)
            //当页面加载完成
            addEventListener("load",_=>{
                //将路径换成 hash (通过路径,拿到需要渲染的组件,进行渲染)
                this.pathname.path = location.hash.slice(1);
                console.log(this.pathname.path)
                //console.log(location.hash.slice(1))
            })
            addEventListener("hashchange",_=>{
                //将页面切换(.slice(1) 将#裁减出去)
                this.pathname.path = location.hash.slice(1);
            })
        }else{
            //history模式
            location.pathname ? "" : location.pathname = "/"
            console.log(location.pathname)
            //当页面加载完成
            addEventListener("load",_=>{
                //将路径换成 pathname
                this.pathname.path = location.pathname;
            })
            //当页面回退时
            addEventListener("popstate",_=>{
                //将路径换成 pathname
                this.pathname.path = location.pathname;
            })
        }
    }
    //配置路由表//将传入的配置项改成路由表{路径:组件}{"index":Index,"classify",classify}
    createTable(routes){
        //console.log(routes)
        //对传入的路由进行循环.配置成路由表形式
       return  routes.reduce((prev,next)=>{
                //相当于 把prev创建一一个属性名是path,属性值是component的对象
                    prev[next.path] = next.component;
                    return prev
        },{})//默认最开始为空
    }  
}

//要想在vue当中注册router 必须要有install方法
Router.install = Vue =>{
    //拿到到vue 的实例
    // console.log(Vue);
    //混入(可以把router,route 插入vue当中)
    Vue.mixin({
        //只要组件执行beforeCreate,就将router,route插到vue中
        beforeCreate(){
            console.log(this.$options.name);
            //判断router 配置项是是否传入,并且写入了router
            //this.$options.router判断是否写入router 在入口文件里面(this.$options 是指全局的配置项是否传入)
            if(this.$options && this.$options.router){
                //如果存在将vue 实例保存放到$root变量里面
                this.$root = this;
                //将配置中传入的router赋值给this.$router
                //拿到根路由(所有的表都在根路由)
                this._router = this.$options.router;
                // console.log(this._router.pathname)
                //深度监听,(只要pathname发生变化时,就会发现)
                //参数1:监听的实例, 名字 监听的对象
                Vue.util.defineReactive(this,"123",this._router.pathname)
            }else{
                //查找子组件是否
                //如果没有配置项,或者是配置项中没有router 
                //$parent 子组件可以通过$parent拿到父组件的相关信息
                //让所有的子组件都可以拿到vue的实例
                this.$root = this.$parent.$root;
                // console.log(this.$parent)

            }
            // console.log(this.$options.name);
        
            //在组件创建之前将$router 和 $routes 混入的vue中
            // Object.defineProperties数据劫持,对数据变化进行监听 ES6 的对象 vue3 proxy 代替
            //参数1:劫持的对象, 参数2:添加的对象
            Object.defineProperty(this,"$router",{
                // value:"123",//劫持数据的默认值
                // writable:true,//是否支持写入 ,如果有该参数,getter 和setter用不了
                get(){
                    //返回$router
                    return this.$root._router
                }
            })
            Object.defineProperty(this,"$route",{
                get(){
                    return {
                        //返回路由的路径
                        path:this.$root._router.pathname.path
                    }
                }
            })
        }
    })
    //全局注册router-view:全局注册 参数1:组件名 参数2:需要执行的代码
    Vue.component('router-view',{
        render(h){
            //this._self拿到当前的组件(this指向proxy)
            //this._self.$root 当前组件的实vue例
            //this._self.$root._router 拿到的是路由实例
            console.log(this._self.$root._router.pathname.path);//拿到的是路由的路径(注意:最开始拿到的是null,因为在页面加载完成之前,才给pathname赋值的,所有最开始是null,需要见一个神度监听)
            //拿到当前需要渲染组件的路径
            const path = this._self.$root._router.pathname.path;
            //拿到当前的路由表
            const routesTable = this._self.$root._router.routesTable;
            console.log(routesTable[path])
            //根据路径渲染相应的组件
            return h(routesTable[path]);
        }
    })
    //全局注册router-link
    Vue.component('router-link',{
        props:["to"],//接收跳转的路径
       render(h){
           //找到当前路由切换的模式 history || hash
        const mode = this._self.$root._router.mode;
        //判断路由模式是hash || history hash直接在#/路径 history直接解释this.to
       console.log(this.to);
       
        return <a href={mode==="hash" ? `#${this.to}` : this.to} >{this.$slots.default}</a>
       //通过插槽获取内容{this.$solts.default}通过插槽获取组件的内容
       }
    })
}
export default Router;


//this.$route  配置项
//this.$router 行为

//在render里面的


/*
vue-router 实现的原理
第一步:路由注册(vue.use(vueRouter))需要具有install方法(vue调用函数是具有install方法)(vue调用对象需要具有一个install方法)
    + VueRouter.install = vue=>{}
        + 
        + 注册全局组件(router-view router-link)
            - 插入$router-view(全局组件)vue.component("router-view")
                - path = this._self.$root._router.pathname.path 找到对应的组件路径
                - 在根据路径,找到对应的组件,在对组件进行渲染
            - 插入$router-link(全局组件)vue.component("router-link")
        + 利用mixin(混入)在beforecreated注册方法(router routes) (全局的组件都有这两个方法)Vue.mixin
            - 利用Object.defineProperties,修改vue实例的属性
                - Object.defineProperty(this,"$router",()=>{})
                - Object.defineProperty(this,"$routes",()=>{})

第二步:class VueRouter{}
    +  constructor
        - 判断路由的模式(history || hash) 
        - createTable()
            将路由转换成路由表createTable()将传入的路由  routes 转成路由表
    +  初始化操作init()
        - 判读进入方式(hash || history)
            + loaction.hash ? "" : loaction.hash = "#/"
            + loaction.pathname ? "" : loaction.pathname = "/"
    + createTable()
        - reduce 将路由转成路由表
            传入的路由:
            [{path:"index",component:Index},{path:"classify",component:classify}]
            //将传入的配置项改成路由表{路径:组件}{"index":Index,"classify",classify}



混入 (mixins)： 是一种分发 Vue 组件中可复用功能的非常灵活的方式。混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项。

与vuex的区别

    vuex：用来做状态管理的，里面定义的变量在每个组件中均可以使用和修改，在任一组件中修改此变量的值之后，其他组件中此变量的值也会随之修改。

    Mixins：可以定义共用的变量，在每个组件中使用，引入组件中之后，各个变量是相互独立的，值的修改在组件中不会相互影响。

与公共组件的区别


    组件：在父组件中引入组件，相当于在父组件中给出一片独立的空间供子组件使用，然后根据props来传值，但本质上两者是相对独立的。

    Mixins：则是在引入组件之后与组件中的对象和方法进行合并，相当于扩展了父组件的对象与方法，可以理解为形成了一个新的组件



    + class Router
        + contructor (配置项)
        + createTable(创建路由表)
    + install()
        + 注册两个组件
            - router-link
            - router-view
        + 注册方法(mixin)
            + beforeCreate(在每一个组件都可以包含混入的方法)


*/
