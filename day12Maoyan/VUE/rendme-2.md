## MintUI使用
    + 安装:
        npm i mint-ui -S
    + 引入css 和 模块
        import MintUI from 'mint-ui'
        import 'mint-ui/lib/style.css'
    + 注册第三方库
        Vue.use(MintUI)
    + 配置webapck 能解析 css 样式
        {
            test:/\.css$/,
            use:[
                "style-loader",
                "css-loader"
            ]
        }


## 引入模块
    + 引入模块
        import Banner from "../public/banner.vue"
    + 注册组件
        components : {
            Banner,
        }
    + 添加到标签中
         <div class="index">
            <Banner />
        </div>



## 布局
    + 轮播图
    + 选项卡
    + 列表页
    + 详情页
## 单行省略号
    .line-ellipsis
        text-overflow ellipsis
        overflow hidden 
        white-space nowrap

### 超出三行显示省略号
    .line-clamp-3
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        text-overflow: ellipsis;
        word-wrap: break-word;
        word-break: break-all;
        overflow: hidden;
## 如何实现跳转

    + 第一种
        - 跳转的标签绑定事件
            <li @click="jumpProduct">

        - 具体的事件($router实例中的push方法实现跳转)(可以携带参数)
            jumpProduct(){
                //this.$router为路由实例 
                //实现页面跳转 参数1:跳转的地址 参数2:携带的参数
                this.$router.push({path:"my",query:{a:4,b:5}});
            }
    +第二种(动态路由跳转)
        - 必须是命名路由
            {
                props:true,//id的形参 
                path:"/classify/:id",//id为动态路由
                name:"classify",//路由命名要加双引号
                component:Classify  
            }
        -  跳转的标签绑定事件(可以利用参数进行数据交互)
            <li @click="jumpProduct(1217041)">
        - 绑定跳转事件
            jumpProduct(id){
                    //this.$router为路由实例 
                    //实现页面跳转 参数1:跳转的地址 参数2:携带的参数
                    //this.$router.push({path:"my",query:{a:4,b:5}});
                    //也可以实现动态路由跳转(必须是命名路由才可以)(参数1:name)
                    this.$router.push({name:"classify",params:{id:id},query:{c:6,d:7}})
                }
            }

## 跳转页面不在具有首页的头部和底部
    + 把头部和底部放在(子组件里面哪一个需要 ) index.js里面
    + 父子组件通信的方式
        - 绑定v-if 做判断
             <div class="app">
                <Header v-if="headerBool"/>
                <router-view></router-view>
                <Footer v-if="footerBool"/>
            </div>
        - 设置数值
             data(){
                return {
                    headerBool:true,
                    footerBool:true,
                }
            }
        - 跳转子组件页面时(传值)
             jumpProduct(){
                //父子组件通信(当进到list页面是,会传回一个false);
                bus.$emit("header",false);
                bus.$emit("footer",false);
            }
        - 父组件接收子组件传的值,并进行渲染(只能监听到点进入)
             mounted(){
                //接收父组件传来的信息(list)
                bus.$on("header",data=>{
                    this.headerBool = data;
                })
                bus.$on("footer",data=>{
                    this.footerBool = data;
                })
            }
        - 当页面返回时(此时页面没有头部和底部),在跳转的页面绑定一个钩子函数(当页面里离开时改变headerBool)(路由守卫的作用)
            //触发钩子函数
            //当离开这个页面时
            beforeRouteLeave(to,from,next){
                    console.log(to)
                    if(to.fullPath == "/index"){
                        console.log(111)
                        bus.$emit("header",true);
                        bus.$emit("footer",true)
                    }
                    next();
                }
            }
    + watch 路由监听(只能监听到点进入)
         watch:{//路由监听
            //监听路由的变化($route 实例化)
            "$route"(nV,oV){
                //nV:跳到哪一个组件
                //oV: 从哪个组件跳
                console.log(nV,oV);
                if(nV.fullPath == "/index"){
                    this.headerBool = true;
                    this.footerBool = true;
                }
                if(nV.fullPath == "/asgard/moive"){
                    this.headerBool = false
                    this.footerBool = false
                }
            }

        }
    + 路由钩子(可以实现页面跳转)
        beforeRouteEnter(to,from,next){
            if( to.path == "/asgard/moive" && from.path == "/"){
                //如果不是从首页进入,就要先进入根路径
                next("/index")
            }else{
                bus.$emit("header",false)
                bus.$emit("footer",false)
                next()
            }
        },
        //触发钩子函数
        //当离开这个页面时
        beforeRouteLeave(to,from,next){
            console.log(to)
            if(to.fullPath == "/index"){
                console.log(111)
                bus.$emit("header",true);
                bus.$emit("footer",true)
            }
            next();
        },
    + 通过meta标签控制header 和 footer 的显示($route.meta.publicHeader)
        - 给需要显示(header 和 footer 的路由添加meta)
            {
                path:"/index",//路由地址(首页是跟路径)
                component:Index,//路由所对应的组件
                meta:{
                    //只要有这个属性,则具有header 和 footer
                    publicHeader:true,
                    publicFooter:true
                },
            },
            {
                props:true,//id的形参 
                path:"/classify/:id",//id为动态路由
                name:"classify",//路由命名要加双引号
                component:Classify,
                meta:{
                    //
                    publicHeader:true,
                    publicFooter:true
                },

            },{
                path:"/my",
                component:My,
                name:"zhaoqian",//命名路由
                meta:{//提供seo 的搜索
                    //当切换到我的时候,header 变成我是my
                    title:"我是my"//
                },
                meta:{
                    //
                    publicHeader:true,
                    },
            }
        + 找到对应组件(控制显示与否)
            <Header v-if="$route.meta.publicHeader"/>
            <router-view></router-view>
            <!-- <Footer v-if="footerBool"/> -->
            <Footer v-if="$route.meta.publicFooter"/>