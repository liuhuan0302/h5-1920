### redux 高级
    + reducer 合并(combineReducers)
        - num.redux
            const ADD_STATE_NUM = "ADD_STATE_NUM";
            const MINUS_STATE_NUM = "MINUS_STATE_NUM";

            export default (state = 0,action)=>{
                let newState = state;
                switch(action.type){
                    case ADD_STATE_NUM:
                    return newState+1
                    case MINUS_STATE_NUM:
                    return newState-1
                    default:
                        return state;
                }
            }

            //派发事件(actionCreator)
            export const addStateNum = ()=>(
                {
                    type : ADD_STATE_NUM
                }
            )
            export const minusStateNum = ()=>(
                {
                    type : MINUS_STATE_NUM
                }
            )
        - toDoList.redux
            const defaultState = {value:'123',list:['234','456']}
            export default (state=defaultState,action)=>{
                    return state
            }
        - store.js(合并)
            import {createStore, combineReducers} from "redux";
            import num from "./num.redux";
            import toDoList from "./toDoList.redux"
            const reducers = combineReducers({
                num,
                toDoList
            })
            const store = createStore(reducers);
            export default store;
    
    + 中间件redux-thunk(可以派发函数或者是异步操作)(ajax请求)
        - 安装: npm i redux-thunk -D
        - 引入 (store.js里面引入)
            import thunk from "react-thunk";
        - 绑定中间件(store.js)
            - import {createStore, combineReducers, applyMiddleware} from "redux";
            - const store = createStore(reducers,applyMiddleware(thunk));
        - 在actionCreatore.js 异步操作(ajax请求)
            //函数必须使用中间件才可以使用,(可用于调用ajax)
            export const minusStateNumAsync = ()=>(
                (dispatch)=>{
                    setTimeout(() => {
                            dispatch(minusStateNum())
                    }, 3000);
                }
            )
        - 组件派发方法
            - 引入
                import {minusStateNumAsync,addStateNumAsync} from "./store/num.redux"
            - 触发
                <button  onClick={()=>{store.dispatch(minusStateNumAsync())}}>minusStateNumAsync</button>


### react-redux
    + react-redux 和 redux 的区别
        1.基于redux,简化语法
        2.不用定义state,进行手动引入getState()
        2.不需要手动触发dipatch 
        3.不需要手动监听subscribe
   

### react-redux的基本使用
    + 安装:npm i react-redux -S
    + react-redux的引入 (入口文件)
        import {Provider} from "react-redux";//引入react-redux
        import store from "./store/store" //引入store
    + 包裹需要关联store的组件
        //渲染 参数1:需要渲染的组件(渲染的组件必须大写)  参数2:需要插入的元素节点
        ReactDOM.render((
            // 多个组件使用; <Provider>包裹的组件都可以之间关联store
            <Provider store={store}>
                < App/>
            </Provider>
        ), document.getElementById('root'));
    + 在组件内部引入connect组件,共享store里面的数据
       - import {connect} from "react-redux";//用来关联store
       - 

        import React,{Component} from "react"
        import {connect} from "react-redux";//用来关联store
        import {addStateNum,minusStateNum,minusStateNumAsync,addStateNumAsync} from "./store/num.redux"
        class App extends Component{
            render(){
                const {state,addStateNum,minusStateNum,minusStateNumAsync,addStateNumAsync} = this.props;
                console.log(this.props);
                return(
                    <div>
                        {/* onClick={()=>{store.dispatch(addStateNum())}} 简化写法,被动触发 */}
                        <button onClick={addStateNum}>+</button>
                        <span>{state.num}</span>
                        <button  onClick={minusStateNum}>-</button>

                        <button onClick={minusStateNumAsync}>minusStateNumAsync</button>
                        <button onClick={addStateNumAsync}>addStateNumAsync</button>
                    </div>
                )
            }
        }

        const mapStateToProps = (state)=>{
            console.log(state)
            return {
                //state是指store 里面的reducers,也就是num 和 toDoList的集合
                state
            }
        }
        //接收一个组件,返还一个新组件,返回的新组件就可以连接store
        //先执行connect,在执行(APP),返回的组件挂载了store里面的state
        //参数有两个,映射成App的属性:mapStateToProps(reducers) == this.props
        //参数2:dispatch派发的方法,并且自动添加到props里面
        //把需要的状态和方法映射成属性
        export default connect(mapStateToProps,{addStateNum,minusStateNum,minusStateNumAsync,addStateNumAsync})(App);


### react-redux装饰器
    @connect((state)=>(state),{addStateNum,minusStateNum,minusStateNumAsync,addStateNumAsync})


    Connect可以用装饰器的方式来写

        修饰器（Decorator）是一个函数，用来修改类的行为。这是ES7的一个提案，目前Babel转码器已经支持我们在游戏大型项目种经常会用到的方法，现在es6直接支持想要使用Decorator的话需要我们配置一下文件夹，配置一下环境。

    1.安装插件babel-plugin-transform-decorators-legacy
        ①npm run eject 弹出react插件
        ②安装 npm install  babel-plugin-transform-decorators-legacy --save-dev
    2.package.json中babel上加入"plugins": ["transform-decorators-legacy"]
        "babel": {
            "presets": [
            "react-app"
            ],
            "plugins": [
            "transform-decorators-legacy"
        ]



### redux 利用ajax请求数据
    + 安装:npm i axios -D
    + 引入axios
        import axios from "axios"
    + 异步方法的执行需要依靠redux - thunk
        export const addStateNumAsync = ()=>(
            (dispatch)=>{
                axios("/api/json").then(res=>{
                    console.log(res)
                    dispatch(replaceStateNum(res.data.num))
                })
            }
        )
