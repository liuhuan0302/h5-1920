## 搭建项目框架
    + 项目部署
        | assets(静态资源)
            - css
                + gobal.styl(全局样式)
            - img
        | src 所有的组件,入口文件
            + components 组件
                + views
                    - classify
                        + classify.vue
                    - index
                        + index.vue(首页)
                        + downloadApp.vue(下载)
                        + navBar.vue(选项卡)
                    - my
                        + my.vue 
                    - movieProduct
                        + movieProduct.vue (商品详情页)
                    - public (公共组件)(全局都可以复原)
                        + footer.vue
                        + header.vue (头部)
                        + banner.vue (轮播图)
                        + list.vue (列表页)
                + app.vue  (父组件)(组件集合 管理全部组件)
            + config (路由的细化拆分)
                - router.js (router组件)
                - routes.js (route配置项)
            + bus.js (emitbus 信息传递)(可用于子子组件通信)
            + index.html (文件模板)
            + index.js (入口文件)
            + rem.js (控制全局的样式大小)
        | webpack.config.js(脚手架)
    
    + 安装插件
    
        npm init -y 
        npm i vue -S 
        npm i vue-template-compiler -D
        npm i vue-loader -D
        npm i vue-router -D
        npm i vue-style-loader -D
        npm i style-loader -D
        npm i css-loader -D
        npm i stylus-loader -D
        npm i stylus -D
        npm i webpack webpack-cli -D
        npm i html-webpack-plugin -D
        npm i clean-webpack-plugin -D
        npm i webpack-dev-server -D


## 组件化开发流程
    + 部署环境(搭框架,安环境)
    + 注册组件



## 移动端响应式方案:
    页面的宽度 / 设计图大小(750,640) * 200 +"px



## 路由
+ 路由的基本配置
    + 安装:npm i vue-router -D
    + 引入路由 import Router from "vue-router"
    + 注册路由 Vue.use(Router)(挂载在vue上)
    + 路由配置
         router : new Router({
            routes:[{
                //根路径的配置
                path:"/",
                //重定向(将根路径重定向到index)
                redirect:"/index"
            }{
                path:"/index",
                component:Index
            },
            {
                path:"/classify",
                component:Classify  
            },{
                path:"/my",
                component:My
            }]
         })
        注:<router-view></router-view>//在父组件上添加    router-view标签(路由组件在该标签下解析)
        注:<router-link> 就是定义页面中点击的部分，<router-view> 定义显示部分，就是点击后，区配的内容显示在什么地方，会被匹配到的组件替换掉
    + 路由切换
        + hash哈希切换(#/)
            <router-link to="/index"></router-link>
            类似与a标签
                <router-link to="/index">
                <div>首页</div>
                </router-link>
                <router-link to="/classify">
                <div>分类</div>
                </router-link>
                <router-link to="/my">
                <div>我的</div>
                </router-link>
        + history (html新增的路由切换方式)
            地址后面没有hash值
            弊端:回车会找不到路径(刷新会找后端路由)(刷新或者手动输入地址会出现)
        + abstract(后端路由切换)

    + 命名路由
        {
            path:"/my",
            component:My,
            name:"zhaoqian",//命名路由
        }]
        + 命名路由绑定
            命名路由:需要通过v-bind来绑定路由
            <router-link :to="{name:'zhaoqian'}">
                <div>我的</div>
            </router-link>
    + 路由传参
        + 普通路由传参:
            <router-link to="/classify?a=1&b=2">
                <div>分类</div>
            </router-link>
        + 读取参数
            路由指定的组件下面:
            mounted(){
                //this:实例vue $route是挂载到vue上的router 
                console.log(this.$route.query)//{a: "1", b: "2"}
            }
        + 命名路由传参
            <router-link :to="{name:'zhaoqian',query:{a:3,b :4}}">
                <div>我的</div>
            </router-link>
        + 读取参数
            路由指定的组件下面:
            mounted(){
                //this:实例vue $route是挂载到vue上的router 
                console.log(this.$route.query)//{a: "1", b: "2"}
            }
    + 动态路由(可以用作与后端交互的参数) 
        + 动态的设置与获取(第一种)
            + 设置(动态路由)
                <router-link to="/classify/123?a=1&b=2">
                    <div>分类</div>
                </router-link>
            + 在路由配置props
                {
                    props:true,//id的形参(传入跳转页面的形参)(目的为了获取动态路由参数)
                    path:"/classify/:id",//id为动态路由
                    component:Classify  
                }
        
        + 动态路由传参
            - 第一种
                props:{
                    id:456,//可以更改路由参数(或者是设置路由参数)
                },
            - 第二种
                props:(route=>{
                        console.log(route);
                        return {
                            id : 888
                        }
                    }),
        + 获取动态路由的id(第二种)(在跳转页面)
            props:["id"],//接收动态路由的id(实参)
            mounted(){
                //this:实例vue $route是挂载到vue上的router 
                console.log(this.$route.query)//{a: "1", b: "2"}
                console.log(this.id);
            }
        + 获取动态路由参数(第二种) 
            + 获取动态路由值(不推荐)
                this.$route.params.id
        + 路由基本配置
            routes : [
                {
                    path : "/"路由地址
                    component : 要渲染的组件
                    name : 给当前路由命名
                    props : true 在当前组件内过去动态路由的值
                    props : {
                        动态id : 123
                    },
                    props : (route)=>{
                        return{
                            动态id ： route.params.id
                        }
                    },
                    //当前组件信息配置
                    meta : {

                    },
                    //子路由定义
                    children : [{
    
                    }]
                }
            ]
    + 子路由
        <div class="my">
            my
            <router-view></router-view>
        </div>
        children:[{//子路由(或继承父路由的属性)
            path:"haha",
            component:Index
        }]
    + 组件通信(点击我的更改header标题)


+ 路由守卫(可以用来设置白名单)
    + 全局守卫
        //路由跳转前触发(比生命周期函数执行要快)(先触发)
        router.beforeEach((to,from,next)=>{
            console.log("router.beforeEach");//form 从哪来 to 到哪去
            //next();//必须要有next,否则路由跳转不了
            //如果是my,点击跳转的index,否则正常跳转 
            if(to.path == "/my"){
                next("/index")//跳转到哪一个页面
            }else{
                next();
            }
        })

        router.beforeResolve((to,from,next)=>{
            console.log('router.beforeResolve')

        })
        router.afterEach((to,from)=>{
            console.log(to,from)
        })
    + 局部守卫
        {
            path:"/index",//路由地址(首页是跟路径)
            component:Index,//路由所对应的组件
            beforeEnter(to,from,next){//进入前触发(优先级仅低于beforeEach)
                console.log("beforeEnter");
                next();
            }
    + 路由组件内部的钩子函数
        + 全局的钩子函数(写在入口文件index.js)
            //跳转前触发的全局钩子
            router.beforeEach((to, from, next) => {
                console.log("beforeEach")
                next()
            })
            router.beforeResolve((to, from, next) => {
                    console.log("beforeResolve")
                    next()
                })
                //跳转后触发的全局钩子
            router.afterEach((to, from) => {
                console.log("afterEach")
            })
        + 局部的钩子函数
            {
                //路由路径
                path: "/index",
                //对应路由要注册使用的组件 router-view
                component: Index,
                //路由配置项的唯一钩子函数 三个参数 to:去哪 from : 哪来 next是函数 表示执行下一个路由
                beforeEnter(to, from, next) { //进入前触发的钩子函数
                    console.log("routes.beforeEnter")
                    next()
                }
        + 路由内部的钩子函数

            //路由进入前触发
            beforeRouteEnter(to,from,next){
                console.log("beforeRouterEnter");
                next();
            },
            //路由更新时触发(动态路由触发,且两次id值不一样)
            beforeRouteUpdate(to,from,next){
                console.log("beforeRouterUpdate");
                next();
            },
            //路由离开时触发
            beforeRouteLeave(to,from,next){
                console.log("beforeRouterLeave")
                next();
            },    




        + 钩子函数的执行顺序
            + 当进入页面时
                beforeEach  全局的
                beforeEnter 局部的
                beforeRouteEnter 路由(组件)内部的
                beforeResolve 全局的   
            + 当离开页面时
                beforeRouteLeave 组件内部的钩子函数(离开上个页面)
                beforeEach  全局的(进入当前页面)
                beforeEnter 局部的(如果该页面有局部的钩子函数会触发)
                beforeRouteEnter 路由(组件)内部的
                beforeResolve 全局的 





