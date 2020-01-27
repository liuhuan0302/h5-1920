
//路由表的设置

import {
    List,
    Edit,
    Login,
    NotFound,
    DashBorad,
    Setting,
} from "../pages/index"
//路由表的制作(一级路由)
export const mainRouter = [{
    pathname:"/login",
    component:Login
},{
    pathname:"/404",
    component:NotFound
}]