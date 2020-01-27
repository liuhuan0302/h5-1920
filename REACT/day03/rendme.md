### 将虚拟DOM 渲染成真实DOM
    import ReactDOM from 'react-dom'; //用于rende r 渲染(将虚拟dom 渲染成真实dom)

    //渲染 参数1:需要渲染的组件(渲染的组件必须大写)  参数2:需要插入的元素节点
    ReactDOM.render(<ToDoList />, document.getElementById('root'));
### redux基本知识
    + redux 是什么
        Redux 是 JavaScript 状态容器，提供可预测化的状态管理。可以让你构建一致化的应用，运行于不同的环境（客户端、服务器、原生应用），并且易于测试。Redux 除了和 React 一起用外，还支持其它界面库。 它体小精悍（只有2kB，包括依赖）。
    + redux 安装:
        安装: npm i redux -S

    + redux 的优点
        在应用中使用Redux有如下好处：
            预测 : 始终有一个准确的数据源，就是store, 对于如何将actions以及应用的其他部分和当前的状态同步可以做到绝不混乱。  
            维护 : 具备可预测结果的性质和严格的组织结构让代码更容易维护。  
            组织 : 对代码应该如何组织更加严苛，这使代码更加一致，对团队协作更加容易。
            测试 : 编写可测试代码的首要准则就是编写可以仅做一件事并且独立的小函数。Redux的代码几乎全部都是这样的函数：短小、纯粹、分离。 
            服务端渲染 : 可以带来更好的用户体验并且有助于搜索引擎优化，尤其是对于首次渲染。仅仅是把服务端创建的store传递给客户端就可以。
            开发者工具 : 开发者可以实时跟踪在应用中正在发生的一切，从actions到状态的改变。
        + 特性
            1.redux专注于状态管理
            2.单向数据流
            3.Store是唯一的
            4.Reducer必须是纯函数
            5.Reducer不能够直接修改state，可以修改state只有store
        + 基本使用

            1.通过reducer新建store，随时通过store.getState获取状态
            2.需要变更状态，通过store.dispatch(action)修改状态
            3.reducer函数接收state和action，返回新的state，在通过store.subscribe监听状态的变更
        + store里面的属性
            - dispatch
            - getState
            - replaceReducer
            - subscribe
            - Symbol

### redux的基本使用
    + 组件引入数据以及修改数据(index.js)
        - 引入store
            import store from "./store/store";
        - 引入store 中的数据
            this.state=store.getState();//将store里面的数据给到页面
        - 通过dipatch 将数据传给store => reducer 
             handleChange(e){
                const action = {
                    //用来区分是做什么的
                    type:"SET_STORE_VALUE",
                    //修改之后的值
                    value:e.target.value
                }
                //将修改之后的action派发到store里面
                store.dispatch(action)
            }  
        - 对数据进行监听(当store 中的数据发生变化,引起视图的变化)
            //监听数据变化
            store.subscribe(this.handleStoreChange)
            //修改数据
            handleStoreChange(){
                this.setState(store.getState())
            }
    + store
        //获取仓库
        import {createStore} from "redux";
        import reducer from "./reducer";//引入reducer 仓库知道存储什么样的数据
        const store = createStore(reducer)
        export default store;
    + reducer.js
        - 设置默认的数据
            const defaultState = {
                value:"",
                list:["a","b","c"]
            }
        - 设置改变的数据
            export default (state = defaultState,action)=>{
                //reducer不可以对数据进行修改,只有store才能够对数据进行修改
                let newState = JSON.parse(JSON.stringify(state));//深拷贝 
                switch(action.type){
                    case "SET_STORE_VALUE":
                        //将新的派发过来的value 赋值给newState
                        newState.value = action.value;
                        return newState //将深拷贝的值给到store
                    case "INSERT_STORE_DATA":
                        //当插入数据的时候,在新的list里面push一个新的value值
                        newState.list.push(newState.value)
                        return newState
                    case "REMOVE_STORE_DATA":
                        newState.list.splice(action.index,1)
                        return newState
                    default:
                        return state
                }
            
            } 

### 数据的流动
    redux 是单向数据流动,只能通过store修改数据
    dispatch ==>(action)--> store ==> reducer(对数据进行修改) ==> store ==> view(getState())
### export 和 export default 暴露的区别:
    + export 可以单独暴露,暴露的是一个方法
        - 引入
            import { getActionChange} from "./store/actionCreator"
        - 暴露
            export const getActionChange = (value)=>({
                type:"SET_STORE_VALUE",
                value,
            })
    + export default 暴露的是一个对象,一个文件只能暴露一个 
### redux的提取
    + store(文件夹)
        - store.js(仓库)
        - reducer.js(对数据进行处理)
        - actionCreator.js(action派发管理)
        - actionType.js(type类型管理)
    + APP.js(组件)

### redux的提取
    + index.js(组件)
        handleChange(e){
            const action = getActionChange(e.target.value)
            store.dispatch(action)
        }
    + actionCreator.js
        import {SET_STORE_VALUE} from "./actionType";//引入派发的事件类型(增加报错场景)
        export const getActionChange = (value)=>({
            type:SET_STORE_VALUE,
            value,//es6新增的
        })
    + actionType.js
        export const SET_STORE_VALUE = "SET_STORE_VALUE";
### UI容器 和 视图容器 
    + UI容器 (渲染视图)(html结构和css样式)
    + 视图容器 (业务逻辑)
### style样式的添加
    + 第一种(添加的标签内)
        style={{background:"red"}}
    + 第二种(store里面存储样式)
        -   styleSheet:{background:"red",fontSize:"16px"}
        -   style={styleSheet}>{item}
### Ant Design类库
    + 安装:npm install antd --save
    + 引入样式 import 'antd/dist/antd.css' 那需要在哪引入