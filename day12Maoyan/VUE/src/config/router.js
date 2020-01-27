//router 组件

//引入vue-router 插件
import Router from "vue-router";
//引入routers 组件
import routes from "./routes";



//路由配置(路由地址,及路由地址显示的组件)
//注意此处routes,需要配置的路由地址及其组件
//并将这些组件渲染到router-view 标签上
//向实例化router;在将路由集合以数组的形式传入
//单页面开发:页面跳转不刷新页面
const router = new Router({
    //baseh(给路由请求加上路径)(做区分:是手动输入,还是点击进入)
    //base:"/hhl/",
    //saved 地址的保存(页面滚动到一定位置,切换到其他页,在回来该页面是,还是这个位置 )
    scrollBehavior(to,form,saved){
        //console.log(saved)//获取不到高度
    },
    //可以控制进入和点击元素的颜色
    // linkActiveClass:"",
    // linkExactActiveClass:"",
    //路由模式(切换)
    mode:"history",
    //路由地址及对应的显示组件
    routes
})

//暴露模块

export default router;