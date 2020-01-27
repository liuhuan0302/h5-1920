import React from "react";
import ReactDOM from "react-dom";
// 可以通过BrowserRouter as Router对路由进行重命名
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import App from "./App"
import {mainRouter} from "./router/index"

ReactDOM.render(
(
<Router>
{/* 当前组件以路由的形式进行渲染时,可以在当前组件内部获取到关于router的一些参数 */}
    {/* <Route path="/" component={App}/> */}
    <Switch>
        <Route path="/admin" render={(routerProps)=><App {...routerProps}/>} />
        {
            mainRouter.map(route=>{
                console.log(route)
                return <Route key={route.pathname} path={route.pathname} component={route.component} />
            })
        }
    </Switch>
</Router>
)
,document.getElementById("root"))
