### 高级组件
    高级组件可以对普通组件进行劫持
    共享高级组件的属性
    + 高级组件和普通组件嵌套的执行顺序
        + 入口文件(index.js)
            import React from "react";
            import ReactDOM from "react-dom";
            import App from "./App"
            ReactDOM.render(<App />,document.getElementById("root"))
        + App.js
            import React,{Component} from "react";
            import advaned from "./Advanced"
            import Test from "./Test"
            class App extends Component{
            render(){
                return(
                <div>
                    App
                   {/* 调用的Test并不是test.js组件,而是advanced高级组件,传参也会传递到高级组件 */}
                    <Test name={"APP"}></Test>
                </div>
                )
            }
            }
            //暴露高级组件,并把当前组件当成参数传到高级组件里面去 (但是不会显示App,只会显示高级组件)(实现组件劫持,可以让使用的高级组件的组件都可以使用高级组件的功能 )
            export default advaned(App);
        + Advance.js
            import React,{Component} from "react";
            //高级组件(函数里面嵌套组件)(返回是Advanced组件)(可以接收数据,可以传参数)
            function advanced(Comp){
                return class Advanced extends Component{
                    render(){
                        return(
                            <div>
                                {/* 将app传给test,可以实现属性共享 */}
                                <Comp {...this.props}/>
                                大家好
                            </div>
                        )
                    }
                }
            }

            export default advanced;
        + test.js
            import React,{Component} from "react";
            import advanced from "./Advanced";
            class Test extends Component{
                render(){
                    return(
                        <div>
                            Test!!!!
                        </div>
                    )
                }
            }

            //可以使该组件共享高级组件的功能
            export default advanced(Test);
        注:执行顺序:    
            App
            Test!!!!
            大家好
            大家好

#### 无状态组件添加状态(useState)(react hooks - useState 使用)
    + hooks
        Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。
        hooks概念在React Conf 2018被提出来，并将在未来的版本中被引入，hooks遵循函数式编程的理念，主旨是在函数组件中引入类组件中的状态和生命周期，并且这些状态和生命周期函数也可以被抽离，实现复用的同时，减少函数组件的复杂性和易用性。函数组件 (functional component) 内部能够”钩住“ React 内部的 state 和 life-cycles。
        真正功能强大的地方是使我们能够更轻松地复用组件逻辑（custom hooks）
        让FunctionalComponent具有ClassComponent的功能

    + 设计Hooks主要是解决ClassComponent的几个问题
        很难复用逻辑（只能用HOC，或者render props），会导致组件树层级很深
        会产生巨大的组件（指很多代码必须写在类里面）
        类组件很难理解，比如方法需要bind，this指向不明确
    
    +  Hooks API Reference
        ** Basic Hooks **
            useState
            useEffect
            useContext

        ** Additional Hooks **
            useReducer
            useCallback
            useMemo
            useRef
            useImperativeMethods
            useMutationEffect
            useLayoutEffect

    + hooks-useState
        ustate hook的主要作用就是获取需要的 state 和 更新state的方法
        const [state, setState] = useState(initialState);

        参数： initialState 可以直接是当前state的初始值，也可以是一个函数，函数的返回值将作为state的值，参数只会在组件的初始渲染中起作用

        返回值：返回的是一个数组，一个是当前state的值，另一个是更新state的方法，这里面setState方法与class中的setState不同在于，此setState 不会合并state 中的值

        如果需要定义多个state 只需要多次调用useState 方法就行。

        + 引入useState
            import React,{Component,useState} from "react";
        + 给无状态组件注册状态

    + Effect Hook

        实现生命周期 （life-cycles）

        类似 redux 中的 subscribe，每当 React 因为 state 或是 props 而重新 render 的之后，就会触发 useEffect 里的这个 callback listener（在第一次 render 和每次 update 后触发）
        在生命周期内做的操作很多都会产生一些 side-effect（副作用）的操作，比如更新 DOM，fetch 数据，等等。

        参数：function，在每次渲染之后执行，在函数里可以编写更新dom ，添加订阅 等。

        参数返回值： function(可以不返回) 如果 didUpdate函数中返回了一个函数，这个函数会在组件卸载前执行(每次渲染都会执行)需要清除上次订阅的内容可以再这里面写。

        执行条件： useEffect 的第二个参数是一个数组，只有当数组中的的值发生改变的时候才会调用effect，如果执行在第一次挂载和卸载的时候调用，只需要传一个[]空数组

注:高级函数=>函数的柯里化
    function fn1(a){
        return function fn2(b){
            return a+b
        }
    }