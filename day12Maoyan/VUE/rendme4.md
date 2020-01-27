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

## vuex的配置项(全局的配置项)(可以在全局任意地方使用)
    + state 状态
        state:{
            test:"我是vuex的测试数据",
        },
    + mutations 唯一修改数据的方式(修改数据需要触发commit)(所有的数据都是通过mutations进行提交的)
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
        + 修改多个参数
            - mutations 提交时以对象的形式进行提交
                mutations:{
                    //参数:当前的state状态 data:修改的数据
                    updateTest(state,obj){
                        //修改状态中的值
                        console.log(obj.data)
                        state.test = obj.data1;
                    },
                },
            - 父组件在修改值
                this.$store.commit("updateTest",{
                    data:"哈哈",
                    data1:"嘿嘿"
                })

    + action 异步修改数据的方法
        + 行为 异步行为(ajax)
            actions:{//store 为全局的store,  data 修改的值
                updateTestAsync(store,data){
                    setTimeout(_=>{
                        //通过全局的commit触发mutations里面的updateTest的方法
                        //可以直接修改data
                        store.commit("updateTest",data)
                    },2000)
                }
            },
        + 父组件进行数据修改
            - 在mounted里面进行修改
                //异步修改数据 (单向数据流)(异步的数据加载 )
                //vue-components => dispatch =>actions => commit => mutations(提交) => updateTestAsync(具体执行的方法)=>updateTest(调用了这个方法)
                this.$store.dispatch("updateTestAsync","大家好")
            

    + getters 相当于vuex中的computed
            //vuex的computed
            getters:{
                getUserInfo(state){
                    //state 是全局状态 
                    return state.name + "|" + state.sex;
                }
            },
        - 可以直接在页面中渲染
              <p> {{$store.state.test}} | {{$store.getters.getUserInfo}}</p>
        - 也可以在computed 中进行渲染
        - 对接收的值进行修改
             mutations:{
                //参数:当前的state状态 data:修改的数据
                updateTest(state,data){
                    //修改状态中的值
                    state.test = data;
                },
                //对getter里面的值进行修改
                updateName(state,data){
                    state.name = data;
                }
            },
    + strict
        //配置后可以在开发人员在不是正确规范时,进行报错提醒(适合开发者)
        strict:true
    + modules 分模块化开发
        + state
            modules:{
                //h5模块 (可以继承父模块的属性)(可以在任何地方使用)
                h5:{
                    state:{
                        name:"我是h5-1920"
                    }
                }
            }
            - 直接使用
                <p>{{this.$store.state.h5.name}}</p>
            - 简化使用
                <p>{{h5name}}</p>
                ...mapState({
                    h5Name:(state)=>{
                        return state.h5.name
                    }
                }),
        + 开启局部作用域
             namespaced:true,
        + mutations
            + 配置参数 同步唯一修改数据
                //默认挂载在全局的mutations下面
                //mutations 和 actions 默认是挂载在全局下面的
                mutations:{
                    updateClass(state,data){
                        state.class = data;
                    }
                }
            +  ...mapMutations(["h5/updateClass"]),
            + 传参并调用
                 this["h5/updateClass"](12345);
            + 渲染到页面
                 <p>{{h5Name}}</p>
        + actions
            - 配置项 (异步数据的调用)
            注:通过dispatch 触发actions 在触发commit
                actions:{
                    updateClassAsync({commit,rootState}){
                        //store 上下文(包括全局和模块内部的方法和属性)
                        //rootState 全局的状态
                        commit ("updateClass",rootState.sex)
                    }
                }
            - 挂载
                ...mapActions(["h5/updateClassAsync"])
            - 调用并执行(渲染到页面中)
                this["h5/updateClassAsync"]();//调用h5模块下面的方法

               
    
    + 模块化
    h5:{
            //开启一个局部的作用域 
            namespaced:true,
            state:{
                name:"我是h5-1920",
                class:"1920"
            },
            //默认挂载在全局的mutations下面
            //mutations 和 actions 默认是挂载在全局下面的
            mutations:{
                updateClass(state,data){
                    state.class = data;
                }
            }


## store配置项拆分
    + store(仓库)
        + store.js (配置项)
        + state
            - state.js
        + mutations
            - mutatiosn.js
        + actions
            - actions.js
        + getters
            - getters.js


## vuex提供的四种辅助函数(用来简化语法)
import {mapState, mapGetters,mapActions,mapMutations} from "vuex"
数据写在computed 方法写在methods
1.state 
    + state的简化(在使用vuex的组件内)   
        - 如何使用
            + import {mapState} from "vuex"
            + 在computed里面进行接收
                - 原始写法
                    computed:{
                        test(){
                            return this.$store.state.test
                        },
                        getUserInfo(){
                            return this.$store.getters.getUserInfo;
                        }
                    },
                - 简化写法
                    //对state的简写(相当于test() 的写法)(注意需要配置webpack 解析es7 语法)
                    ...mapState(["test"]),
                    - webpack 配置
                        安装插件:
                            npm i babel-core babel-loader -D
                            npm i babel-preset-env -D 将es6 转成es5
                            npm i babel-preset-stage-1 -D 解析es7 的体验语法
                            npx babel-upgrade --write --install 更新低版本的babelrc 和 webpack中的其他插件(不需要配置)
                            {//对es7 语法的解析
                                test:/\.js$/,
                                loader:"babel-loader"
                            },
                - 计算属性名和state中的名不一样时(test)(comTest != state)
                    ...mapState({
                            comTest:(state)=>{
                                return state.test
                            }
                        }),
2.getters 语法的简写
    //对getters 语法的简写
        ...mapGetters(["getUserInfo"]),
    
+ 渲染到页面上
        <p> {{test}} | {{getUserInfo}}</p>

3.Mutations  简化语法
     methods:{
        ...mapMutations(["updateTest","updateName"])
    },

    mounted:{
        this.updateTest({
             data:"哈哈",
             data1:"嘿嘿"
        })
        setTimeout(_=>{
             this.updateName("黎明")
        },3000)   
    }

4.action => Mapactions
     ...mapActions(["updateTestAsync"])
     this.updateTestAsync({data:"大家好",data1:"哈哈"})



## keep-alive (可以给组件使用,也可以给路由使用)
    keep-alive是Vue提供的一个抽象组件，用来对组件进行缓存，从而节省性能，由于是一个抽象组件，所以在v页面渲染完毕后不会被渲染成一个DOM元素
    当组件在keep-alive内被切换时组件的activated、deactivated这两个生命周期钩子函数会被执行
    被包裹在keep-alive中的组件的状态将会被保留，例如我们将某个列表类组件内容滑动到第100条位置，那么我们在切换到一个组件后再次切换回到该组件，该组件的位置状态依旧会保持在第100条列表处

    被包裹在keep-alive中的组件的状态将会被保留，例如我们将某个列表类组件内容滑动到第100条位置，那么我们在切换到一个组件后再次切换回到该组件，该组件的位置状态依旧会保持在第100条列表处

    + 利用include、exclude属性
        <keep-alive include="bookLists,bookLists">
            <router-view></router-view>
        </keep-alive>
        <keep-alive exclude="indexLists">
            <router-view></router-view>
        </keep-alive>
        include属性表示只有name属性为bookLists，bookLists的组件会被缓存，（注意是组件的名字，不是路由的名字）其它组件不会被缓存exclude属性表示除了name属性为indexLists的组件不会被缓存，其它组件都会被缓存
    + 利用meta属性
        export default[
            {
            path:'/',
            name:'home',
            components:Home,
            meta:{
                keepAlive:true //需要被缓存的组件
            },
            {
            path:'/book',
            name:'book',
            components:Book,
            meta:{
                keepAlive:false //不需要被缓存的组件
            } 
        ]

        <keep-alive>
            <router-view v-if="this.$route.meat.keepAlive"></router-view>
            <!--这里是会被缓存的组件-->
        </keep-alive>
            <keep-alive v-if="!this.$router.meta.keepAlive"></keep-alive>
            <!--这里是不会被缓存的组件-->

## keep-alive的声明周期函数
只有添加keep-alive的组件才会有这两个生命周期函数
activated 组件被缓存了
deactivated   离开组件或组件被销毁了

路由的钩子函数在所有的生命周期之前
(前四个生命周期只执行一次)
beforecreate
created
beforemounte
mounted
activated 组件被缓存了

## vuex的热替换功能(页面不刷新情况下,加载数据)
    //当数据发生变化了,会触发module.hot
    if(module.hot){
        console.log(222);
        module.hot.accept([
            //对下面的数据进行监控
            "./state/state",
            "./mutations/mutations",
            "./getters/getters",
            "./actions/actions"
        ],()=>{
            //当数据发生变化是,重新做一次引入
            let newState = require("./state/state").default,
                newGetters = require("./getters/getters").default,
                newActions = require("./actions/actions").default,
                newMutations = require("./mutations/mutations").default;
            //当更新
            store.hotUpdate({
                state: newState,
                getters: newGetters,
                actions: newActions,
                mutations: newMutations
            })
        })
    }
    return store
}

## 动态加载路由
现在路由加载方式是一起加载的,容易造成阻塞

修改vue当中data的数据,不会刷新页面

+ 原始引入路由
    import Index from "../components/views/index/index.vue";

+ 动态路由
    require 引入的模块 必须是module.export暴露的,否则需要加上.default
    {
        path:"/index",//路由地址(首页是跟路径)
        component:require("../components/views/index/index.vue").default,//路由所对应的组件
    }
