### react 动画库(react-transition-group)
    + 安装:npm install react-transition-group --save
    + 引入:import {CSSTransition} from "react-transition-group";//引入transition库
    + 用CSSTrasnition 标签包裹需要添加动画的标签
         <div>
            <CSSTransition>
                <div>我是div</div>
            </CSSTransition>               
            <button onClick={this.handleClick}>点我切换</button>
        </div>
    + 
    + 组件:
        Transition
        CSSTransition
        SwitchTransition
        TransitionGroup

### 动画钩子函数(利用钩子函数对元素进行操作)
    + 入场动画的钩子函数
        onEnter
        onEntering
        onEntered
    + 出场动画的钩子函数
        onExit
        onExiting
        onExited
### 多个标签加上动画
    + 第一种(不推荐)
        <div>
            <CSSTransition
                in={this.state.mark}//入场动画,还是出场动画
                timeout={1000}//过渡时间
                classNames="fade"//定义class类名
                appear={true} //只有一进入页面或者是刷新页面,就会有动画
                onEntered={(el)=>{el.style.background="red"}}//el 是指下面绑定的div元素(当入场动画执行完成之后)(可以获取真实的DOM节点)
            >
                <div>
                    <div>我是div</div>
                    <div>我是div</div>
                </div>
            </CSSTransition>               
                <button onClick={this.handleClick}>点我切换</button>
        </div>
    + 第二种
        <div>
                {/* 给多个组件添加动画 */}
                <TransitionGroup>
                {
                    this.state.arr.map((item,index)=>{
                        return (<CSSTransition
                                    timeout={1000}//过渡时间
                                    classNames="fade"//定义class类名
                                >
                                <div>{item}</div>
                                </CSSTransition>) 
                    })
                }
                </TransitionGroup>               
                 <button onClick={this.handleClick}>点我切换</button>
            </div>



### 基础的react 组件定义
    + index.js(入口文件)
        import React from "react";//引入react,解析jsx语法
        import ReactDom from "react-dom";//引入react-dom,将虚拟的dom转成真实的dom
        import App from "./App";//引入组件

        //渲染相对应的组件,并将组件挂载到root 下面
        ReactDom.render(<App/>,document.getElementById("root"))
    + App.js(组件)
        import React,{Component} from "react";

        class App extends Component{
            render(){
                return(
                    <div>
                        App Component
                    </div>
                )
            }
        }

        export default App;


### immutable
    immutable对象是不可直接赋值的对象，它可以有效的避免错误赋值的问题;在react中，immutable主要是防止state对象被错误赋值。
    + 基本使用
        - 安装: npm i immutable -S
        - 引入(在reducer.js中)
            import {fromJS} from "immutable";//引入immutable语法
        - 将js对象转成immutable对象,数据不可被修改
            const defaultstate = fromJS({//将js对象转成immutable 对象(state不可修改)
                mark:true
            })
        - 同时修改返回值
             case TAB_SWITCH_TRUE:
                return state.set("mark",true)
        - 获取的时候也需要通过get进行获取
            const mapStateToProps = state =>{
                return {
                    mark:state.get("mark")//由于mark 是一个immutable对象,需要通过get来取值
                }
            }
            export default connect(mapStateToProps,{tabSwitchTrue,tabSwitchFalse})(Num);
    + immutable
        Immutable Data 就是一旦创建，就不能再被更改的数据。对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象。Immutable 实现的原理是 Persistent Data Structure（持久化数据结构），也就是使用旧数据创建新数据时，要保证旧数据同时可用且不变。同时为了避免 deepCopy 把所有节点都复制一遍带来的性能损耗，Immutable 使用了Structural Sharing（结构共享），即如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享。

    + Immutable.js 的几种数据类型

        List: 有序索引集，类似JavaScript中的Array。
        Map: 无序索引集，类似JavaScript中的Object。
        OrderedMap: 有序的Map，根据数据的set()进行排序。
        Set: 没有重复值的集合。
        OrderedSet: 有序的Set，根据数据的add进行排序。
        Stack: 有序集合，支持使用unshift()和shift()添加和删除。
        Record: 一个用于生成Record实例的类。类似于JavaScript的Object，但是只接收特定字符串为key，具有默认值。
        Seq: 序列，但是可能不能由具体的数据结构支持。
        Collection: 是构建所有数据结构的基类，不可以直接构建。

    +  Immutable.js 的常用API

        fromJS()

        作用：将一个js数据转换为Immutable类型的数据
        用法：fromJS(value, converter)
        简介：value是要转变的数据，converter是要做的操作。第二个参数可不填，默认情况会将数组准换为List类型，将对象转换为Map类型，其余不做操作




    + 将js对象转成immutable对象
        import { fromJS } from 'immutable';
        const defaultState = fromJS({
            todoList: []
            });

    + 获取属性
        state.get('todoList'); // 获取store中的todoList
        statae.get(['Main', 'todoList']); // 获取Main组件中store的todoList
    + 改变属性
        state.set('todoList', action.value);  // 设置单个属性值
        // 设置多个属性
        state.merge({
        todoList: fromJS(action.value), // 由于action.value是js对象所以要转成immutable对象
        });

    + 将immutable对象转成js对象
        state.get('todoList').toJS(); // 把todoList转成js数组


### redux-immutable的使用(使合并的对象也是immutable的对象即state)
    + 安装:
        npm i redux-immutable -S
    + 引入:
        import {combineReducers} from "redux-immutable"


### mock 使用
    + 注册:http://rap2.taobao.org/
    + 注册仓库
    + 新建接口
    + 编辑接口 header 设置 authToken(验证用户的某些行为)




