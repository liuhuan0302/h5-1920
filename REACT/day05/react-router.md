### react-router
    + 安装:npm i react-router-dom -S
    + 关键API(路由组件)
        - 引入
            import {BrowserRouter,Route,Link,Redirect,Switch} from "react-router-dom"
        - BrowserRouter:history路由跳转方式
        - Route : 匹配路径加载的组件 path="/lujing" path="/:id" component={App}(渲染相对应的组件)
        - Link : 手动跳转的 to="/lujing"(跳转到对应的组件)
        - Redirect : 重定向 to="/lujing"(重新定向到哪)(刷新页面就会重定向到这个路径)
        - Switch : 只匹配当前唯一的路由地址匹配成功不继续执行
    + Link (路由跳转)
        <li>
            <Link to="/">首页</Link>
        </li>
    + Route : 匹配路径加载的组件 path="/lujing" path="/:id" component={App}
        <Route path="/classify" component={Classify}/>
    + react路由是不完全匹配,都是基于根路径(其他路由会有跟路由的内容)
        解决方法:在根路由加上:exact 完全匹配(不在会受根路径的影响)
    + 路由重定向(重新定向到哪)(刷新页面就会重定向)
        <Redirect to="/"/>
    + 动态路由(弊端:会匹配到根路径下的其他路径 )
        <Route path="/:id" component={NotFound}></Route>
    + Switch : 只匹配当前唯一的路由地址匹配成功不继续执行
        <Switch>
            <Route path="/" exact component={App}/>
            <Route path="/classify" component={Classify}/>
            <Route path="/my" component={My}/>
            {/* <Redirect to="/"/> */}
            <Route path="/:id" component={NotFound}></Route>
        </Switch>


### 案例:利用react-router redux 和 react-redux 判断是否登录(免登陆)
    + 登录页面
    + other页面
        - 根路径
        - classify
        - my





    1.redux
    combineReducers : 合并多个reducer
    applyMiddleware : 绑定中间件
        1.1
            redux-thunk 他是一个redux中间件用action内部可以返回一个方法在该方法内可以执行异步操作，没有的他的
            话action内只能返回 object
2.react-redux
        帮助我们简化语法，并且把所需要的状态及action当成属性返回 
        就可以在对应的组件内使用this.props获取

        {Provider,connect}     

        帮助关联store      


        connect("需要返回成props的属性","所需要的action，他会帮我们自动dispatch")(App) : 接受一个组件并且返回一个新组件


PM 
    react-router4
    下载方式 : npm i react-router-dom -S

    
