## refs  获取当前组件的中真是的DOM元素
    + 元素绑定
        <div ref="diva">{{a}}</div>
    + 获取ref绑定的元素
        //thi.$refs:用来获取当前组件中ref所绑定的关系,在节点渲染后可直接获取对应绑定关系的节点元素
        //vue渲染数据是异步的
        console.log(this.$refs)
        console.log(this.$refs.diva.innerHTML);
    + 获取子组件的信息
        - 子组件
            <template>
                <div>
                    {{ msg }}
                </div>
            </template>

            <script>
                export default {
                data() {
                    return {
                    msg: "hello world"
                    }
                }
        - 父组件
            <HelloWorld ref="hello"/>
            <button @click="getHello">获取helloworld组件中的值</button>
            getHello() {
                console.log(this.$refs.hello.msg)
            }
    + 调用子组件的方法
        getHello() {
            this.$refs.hello.open();
        }
            
## $nextTick
    + 在Vue生命周期的created()钩子函数进行的DOM操作一定要放在Vue.nextTick()的回调函数中
        在created()钩子函数执行的时候DOM 其实并未进行任何渲染，而此时进行DOM操作无异于徒劳，所以此处一定要将DOM操作的js代码放进Vue.nextTick()的回调函数中。与之对应的就是mounted()钩子函数，因为该钩子函数执行时所有的DOM挂载和渲染都已完成，此时在该钩子函数中进行任何DOM操作都不会有问题 
    + 在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的DOM结构的时候，这个   操作都应该放进Vue.nextTick()的回调函数中。
        Vue 异步执行 DOM 更新。只要观察到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作上非常重要。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部尝试对异步队列使用原生的 Promise.then 和MessageChannel，如果执行环境不支持，会采用 setTimeout(fn, 0)代替。

    //元素渲染完成后的结果
    this.$nextTick(()=>{
        //元素渲染后的结果
        console.log(this.$refs.diva.innerHTML)
    })

## vue中如何实现前后端数据的交互(分页效果)

    + 开启数据库mongodb
        - 命令:mongod   mongo
        - 查数据库 show dbs
        - 创建并查看数据库 use cateye
        - 创建并查看集合 db.getCollectionNames()
        - 插入数据 db.movie.save(数据)
        - 查看数据 db.movie.find()
        - 查看当前集合中的数据总数 db.movie.count()

    + 后端获取数据()
        + 连接数据库 db.js
        
        + 设置后端路由 app.js(根据前端请求返回相应数据)(如何返回数据,返回几条数据)
            - 根据前端请求路径后面的参数,返回相应的数据(解析前端请求的url)
                console.log(ctx.query);//{ pageindex: '1', pagenum: '10' }
                console.log(ctx.querystring)//pageindex=1&pagenum=10
            - 设置数据库查找方式 limit 查找的条目数  skip:跳过的条目数
                const result = db.collection(cName).find(obj).limit(size).skip((index-1)*size);
            - 根据请求后端返回前端数据
                /后端返回前端的数据
                //判断如果有查数据的要求
                if(pageIndex&&pageSize){
                //连接数据库,并查找相应的数据 参数1:查找的集合 参数2:返回的数据 参数3:页数 参数4:查找的条目数
                    const moviesList = await db.find("movie",{},pageIndex,pageSize);
                    //返回前端的信息
                    ctx.body = {
                        success:1,
                        data:{
                            moviesList
                        },
                        error:null
                    }
                }else{
                    ctx.status = 400;
                    ctx.body = {
                        success:0,
                        data:null,
                        error:{
                            errorCode:27373,
                            message:"参数错误"
                        }
                    }    
            + 前端接收数据(使用axios)(请求前端数据时,要开启服务器,要注意前后端的请求方式相一致)
                + 安装axios
                    - npm i axios -S
                    - 引入axios(入口文件 index.js)
                        import axios from "axios";
                    - 注册axios
                        //axios 直接在vue原型上定义axios 属性
                        Vue.prototype.$axios = axios;
                + 利用axios 向后端请求数据,并对返回的数据进行处理(请求数据尽量放在created 周期里面)
                        //this.$axios请求两种方式
                        //get 请求 参数1:请求的地址 参数2:请求的参数params
                        //post请求(注意需要解决跨域问题)
                        this.$axios("/api/moviesList",{
                                params:{
                                        pageIndex:1,
                                        pageSize:10
                                }
                                }).then(res=>{
                                    //拿到数据后对数据进行处理
                                    console.log(res);
                                    //判断是否返回数据,如果返回则执行
                                    // console.log(res.data.success);?为什么data下面可以拿到success值
                                    if(res.data.success){
                                        //拿到返回的数据,并将其赋值给moviesList
                                        const data = res.data.data;
                                        this.moviesList = data.moviesList;
                                    }
                                }).catch(res=>{
                                    console.log(err);
                                })
                            }
                + 利用父子组件通信,将父组件接收到的数据串给子组件
                    + 父组件传参(v-bind)
                        <NavBar :List="moviesList"/>
                    + 子组件接收参数(props)
                        props:["List"]
                    + 并把数据在发个其子组件
                        <List :List="List"/>
                    + 子子组件在进行接收
                        props:{
                            "List":{
                            type:Array,
                            }
                        },

                + 子组件获取数组,利用循环进行渲染(注:id不能用index替换,index是可变的,id是唯一的 )
                    <li @click="jumpProduct" v-for="item in list" :key="item.id">

## 下拉加载
    实现触底:外部容器高度(可视区的高度) + 滚动的高度(内容区滚动高度) >= 内部容器的高度(内容区) + header高度
    1.需要获取的高度:
        外部容器的高度:const appHeight = document.querySelector(".app").clientHeight;
        内部容器的高度:const indexHeight = this.$refs.content.offsetHeight;
        当前滚动条的高度:const scrollTop = this.$refs.indexViews.scrollTop;
        头部的高度:const headerH = document.querySelector(".header").offsetHeight;
    2.判断触底是否触底,当每一次触底都会重新调取数据,直到数据调取完成,显示暂无数据(注意:pageIndex)
         if(appHeight + scrollTop >= indexHeight + headerH){
                //判断如果当前页数大于等于总页数
                if(this.pageIndex >= this.pageNum){
                    //但没有数据时,显示暂无数据
                    this.onOff = true;
                     return;
                }else{
                     //否则需要重新调用getMovieList()
                    this.getMoviesList();
                }
            }


## 实现页面跳转
    + 设置动态路由
        list.vue(跳转页)
            this.$router.push({name:"jump-moive",params:{id})
        routes
            {
                path:"/asgard/:id",
                name:"jump-moive",
                component:moiveProduct
                props:true //可以直接接收参数
            }
    + 接收动态路由的参数
        - this.$route.parmas.id
        -   props:["id"]
            this.id
    + 根据动态路由的参数请求数据库($axios)
         getMovieDes(){
        //向后端请求数据
          this.$axios("/api/moviesDes",{ 
             params:{
            //向后端传参数(id)(也是后端建集合的名称)
                product:this.id
            }
          }).then(res=>{
            if(res.data.success){
              const data = res.data.data;
              this.moviesDes = data;
              //进入页面,并不能显示dom节点(由于数据还没有初始化)
              //当数据初始化后,开始显示Dom
              this.pageLoad = true;
            
              
            }
          }).catch(res=>{
            console.log(res);
          })
    + 后端设置路由向数据库请求数据
        //获取电影对应的详情页(跳转)
        router.get("/moviesDes",async ctx=>{
            //获取前端传过来的参数
            console.log(ctx.query.product);
            //向数据库中插入数据
            //await db.insert("a" + ctx.query.product,)
            //查询数据库中的数据
            if(ctx.query.product){
                const data = await db.find("a"+ ctx.query.product,{});
                ctx.body = {
                    success:1,
                    data,
                    error:null
                }
            }else{
                ctx.status = 400;
                ctx.body = { 
                    success:0,
                    data:null,
                    error:{
                        errCode:273273,
                        message:"后端参数错误"
                    }
                }
            }
        
        })


## 滚动轮播图
    + 搭建页面结构
    + 设置后端路由,向数据库请求数据
        //电影滚动列表的后端路由
        router.get("/moviesScroll", async ctx=>{
            try{
                const moviesList = await db.find("coming",{})
                ctx.body = {
                    success:1,
                    data:moviesList,
                    error:null
                }
            }catch(err){
                ctx.body={
                    success:0,
                    data:null,
                    error:{
                        errCode :123456,
                        message:"服务器异常"
                    }
                }
            }
        })
    + 前端请求数据,并渲染页面(公共组件一般在父组件中请求)
         getMovieList(){
            this.$axios("/api/moviesScroll")
            .then(res=>{
            //如果后端返回数据
                if(res.data.success){
                //对返回的数据信息处理
                const data = res.data.data;
                this.arrList = data;
                }
            })
            .catch(err=>{
            console.log(err)
            })
        }
    + 将父组件获取的数据传到子组件v-bind(注意数据传输时 有时需要加 v-if)
        传输: <Scrollx :arrList="arrList" />
        接收:props:["arrList"],
    + 利用better-scroll 设置滚动
        - 设置外层容器宽度 大于 内部容器宽度
            const lists = this.$refs.lists;
            lists.style.width = ((this.arrList.length * 85) + (this.arrList.length * 10)) / 100 + "rem";
           
        - 第二种:lists:display inline-flex
    注:refresh 重新获取元素的高度(宽度)

## better-scroll 实现上拉刷新,下拉加载
    + 安装 npm install better-scroll --save
    + 引入better-scroll
        import BScroll from "better-scroll"
    + 设置下拉加载
        注意:在加载数据后,高度会发生变化,这是就需要重新计算高度
        mounted(){
            const my = this.$refs.my;
            //判断scroll 是否存在
            if(!this.scroll){
                //参数1:绑定的父元素
                //参数2:配置项
                this.scroll = new BScroll(my,{
                    scrollY:true,//默认为纵向滚动
                    probeType:3,//实时派发滚动事件(任意地方触发滚动事件)
                });
            }else{
                //刷新,重新计算宽度(高度)
                this.scroll.refresh();
            }
            //on 订阅事件 obj:获取滚动时的位置坐标
            this.scroll.on("scroll",obj=>{
                //console.log(obj);
            })
            //touchEnd 手指离开手机屏幕
            this.scroll.on("touchEnd",obj=>{
                console.log(obj,this.scroll.maxScrollY)
                //thi.scroll.maxScrollY 获取纵向最大高度
                if(obj.y > this.scroll.maxScrollY){
                    //当滚动高度 大于 纵向最大高度时,进行数据的加载 
                    this.pageIndex < this.pageNum && this.getMoviesList();
                }
            })
        
        }
    }
    + 下拉刷新功能的实现
        //下拉刷新
        if(obj.y > 150){
            //当下拉的高度 大于 150时,实现刷新效果
            //upLoading = 1
            this.getMoviesList("upLoading")
            this.onOff= true;
        }
        if(obj.y < 0){
            this.onOff= false;
        }

 ## 回退功能的实现
    + 按钮绑定事件
        //回退的方法
        goBack(){
            //通过router的go方法实现回退 -1 回退到上一级 -2返回上上一页
            //route 配置项(path,meta)
            //router 行为

            this.$router.go(-1);
        } 
    + 去掉首页的回退按钮
        "$route"(nV,oV){
            //nv.path 表示路由跳到那个页面
            if(nV.path == "/index"){
                this.showBack = false;
            }
        }
                     


## axios请求的两种方法:
    + 第一种 get请求
        //this.$axios请求两种方式
        //get 请求 参数1:请求的地址 参数2:请求的参数params
        this.$axios("",{
            pamars:{
                pageIndex:1,
                pageSize:10
            }
        })
    + 第二种 post请求
        this.$axios("",{
            pageIndex:1,
            pageSize:10
        }) 

## webpack解决跨域问题
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

## 利用koa2-cors解决跨域问题
    + 安装 
        npm i koa2-cors -D
    + 在后端(app.js)引入koa2-cors
        const cors = require("koa2-cors");//cors解决跨域问题
    + 注册组件
        app.use(cors())

## better-scroll的使用
    + 安装:npm i better-scroll -D
    + 使用better-scroll的基本条件

        必须包含两个大的div，外层和内层div
        外层div设置可视的大小(宽或者高)-有限制宽或高
        内层div，包裹整个可以滚动的部分
        内层div高度一定大于外层div的宽或高，才能滚动


注:给当前元素绑定滚动事件,需要给元素加上 overflow : scroll 原因:可能是受其他元素的影响:overflow:auto 



## 父子传输时,如果数据传输不成功,看是否是v-if的问题(涉及到数据接收和dom 挂载的顺序问题)



## vuex
    vuex 状态管理器(数据管理器)
        单向数据流向(数据更统一,更可控)
        不可以通过其他的方式修改stats,只能通过Mutations
        所有的数据,状态都存储在 store(仓库)
    配置项:
        state 状态
        action 行为 通过事件触发行为
        mutations 唯一修改状态的方式
        getters 相当于vue中的computed
        modules 分模块开发
    安装:
        npm i vuex -S
    如何使用:
        + 引入vuex模块
            import Vuex from "vuex";//
        + 注册状态管理
            Vue.use(Vuex);//注册状态管理
        + 配置配置项(在new vue 实例里面)(注:过多的配置项.需要分模块,保证入口文件的整洁,清晰)
            const app =  new Vue({ 
                router,
                store,
                render(h){
                    return h(App);
                }
            }).$mount("#root")
        + 新建store文件,store.js 文件(在根路径下),进行配置
            //引入 vuex
            import Vuex from "vuex";
            const createStore = ()=>{
                //new Vuex.store 实例化的仓库
                return new Vuex.store({
                    //state 状态
                    state:"我是vuex的测试数据",
                })
            }
            //注:暴露回去的是一个方法,解决在该模块中没有对vuex 进行注册的问题
            export default createStore;
        + store(仓库里面的数据,可以在全局任何地方是使用)
         console.log(this.$store.state)

## vue的配置项
    + state 状态
        state:{
            test:"我是vuex的测试数据",
        },
    + mutations 唯一修改数据的方式(修改数据需要触发commit)
       + 唯一修改状态的方法
            mutations:{
                //参数:当前的state状态 data:修改的数据
                updateTest(state,data){
                    //修改状态中的值
                    state.test = data;
                }
            },
        + 在父组件中进行修改(需要触发方法)
            //修改仓库中state的值,需要触发 commit
            //参数:修改的方法
            this.$store.commit("updateTest","哈哈哈哈")
    + strict
        //配置后可以在开发人员在不是正确规范时,进行报错提醒(适合开发者)
        strict:true





