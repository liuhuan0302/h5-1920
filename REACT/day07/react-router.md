React Router 和 React、Redux：React Router 用来实现 前端路由 ，和 React 、Redux 称之为 React全家桶，是 React生态圈 非常重要的一部分。

### 路由组件(渲染的组件中props中有关于路由的信息)
    import React from "react";
    import ReactDOM from "react-dom";
    // 可以通过BrowserRouter as Router对路由进行重命名
    import {BrowserRouter as Router,Route} from "react-router-dom";
    import App from "./App"

    ReactDOM.render(
    (
    <Router>
    {/* 当前组件以路由的形式进行渲染时,可以在当前组件内部获取到关于router的一些参数 */}
        <Route path="/" component={App}/>
    </Router>
    )
    ,document.getElementById("root"))


### 路由渲染方式:
    + component
        <Route path="/home" component={NotState} ></Route>
    + render
        <Route path="/home" render={(routerProps)=><NotState {...routerProps}/>}/>
    + 两者之间的区别:
        1. render 渲染的组件,必须传一个props,才可以接受到关于路由的信息
           component 渲染的组件自行携带关于路由的信息
        2. render 渲染的组件可以进行登录权限的校验(写逻辑条件进行判断)(同时还可以手动进行传参)
            <Route path="/home" render={(routerProps)=>!this.state.isLogin ? <NotState {...routerProps} x={1}/> : <div>请登录</div>}/>

### 动态路由传递参数
    | 第一种
        + 设置动态路由
            {/* 需要给a 添加 exact,否则路由跳转到a,就不会忘子路由跳转啦 */}
            <Route path="/a/:id" component={B}></Route>
        + 动态路由跳转
            <Link to="/a/123">aaa</Link>
        + 获取动态路由的参数(通过match获取动态id)
        function B(props){
            console.log(props.match.params.id)
                return(
                    <div>BBBBB | {props.match.params.id}</div>
                )
            })
    | 第二种(不推荐)
        + 设置动态路由参数(直接在路径拼接参数)
              <Link to="/a/456?b=666">a456</Link>
        + 获取动态路由的参数
             console.log(props.location.search.slice(3))
    | 第三种(多用于埋点,统计用户行为)
        + 动态路由传递参数
            <Link to= {{
                pathname:"/a/456",
                state:{
                    b:555,
                    c:666
                }
            }} >a456</Link>
        + 获取参数
            console.log(props.location.state)

### 动态子路由的设置
    + 路由的设置
        <Route path="/b" component={B} exact></Route>
        <Route path="/b/:id" component={BBB}></Route>
    + 组件的设置
        function B(props){
            return(
                <div>BBBBB | {props.match.params.id}
                <ul>
                    <li>
                    <Link to="/b/123">b123</Link>
                    </li>
                    <li>
                    <Link to="/b/456">b456</Link>
                    </li>
                </ul>
                {/* b的子路由在跳转时,会带着b组件的内容 */}
                {/* <Switch>
                    <Route path="/b/:id" component={BBB}></Route>
                </Switch> */}
                </div>
            )
        }

### 页面跳转
    | 第一种
    + history.push(跳转到home页面)
        this.props.history.push("/home")
        - 子组件
        import React,{Component} from "react";
        class BBB extends Component{
            handleClick(){
                console.log(this.props.history.push("/home"))
            }
            render(){
                return(
                    <div>
                        <div >BBBBBBB | {this.props.match.params.id}</div>
                        <button onClick={this.handleClick.bind(this)}>点击跳转Home页面</button>
                    </div>
                )
            }
        }

        export default  BBB;
    + 父组件 引入子组件
        + import BBB from "./BBB"
        + <Route path="/b/:id" component={BBB}></Route>

    ! 第二种(withRouter)
### 利用路由的高级组件(withRouter)实现跳转
withRouter 可以将一个非路由组件包裹为路由组件，使这个非路由组件也能访问到当前路由的match, location, history对象。
注:由于button组件不是路由渲染的组件,所以props中不包含路由的相关信息,此时可以使用withRouter高级组件
    此时暴露的是withRouter组件,在withRouter组件在包含了button组件,可以将props中的路由信息传递到buttom
    + 父组件
        import React,{Component} from "react";
        import Buttom from "./component/btn"
        class BBB extends Component{
            render(){
                return(
                    <div>
                        <div >BBBBBBB | {this.props.match.params.id}</div>
                        <Buttom />
                    </div>
                )
            }
        }
        export default  BBB;
    + 跳转按钮组件(利用withRouter 将props中的来路由信息传递到该页面)
        import React,{Component} from "react";
        import {withRouter} from "react-router-dom"
        class Button extends Component{
            handleClick(){
                console.log(this.props.history.push("/home"))
            }
            render(){
                return <button onClick={this.handleClick.bind(this)}>点击跳转Home页面</button>
            }
        }
        export default  withRouter(Button);

注:只有经过路由渲染的组件(Route)props里面才会具有路由的相关信息



### 文章后台管理系统的项目搭建
    | src
        + index.js(入口文件)
        + App.js(组件入口)
        + axios
        + store
        + component
        + pages/view
            - login
            - admin
            - Dashboard
            - article
                -articleList
                -articleEdit
            - seting
            - index.js(归纳所有页面的入口,统一export)
        + router (路由表)
        + assets(静态资源)
            - img
            - css 


### react

    + 安装:npm i react-loadable -D