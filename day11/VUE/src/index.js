import Vue from "vue";
import App from "./components/app.vue";
import Rem from "./rem";

import router from "./config/router"
import Router from "vue-router";
import "../assets/global.styl"

//路由跳转前触发(比生命周期函数执行要快)(先触发)
router.beforeEach((to,from,next)=>{
    console.log("router.beforeEach");//form 从哪来 to 到哪去
    //next();//必须要有next,否则路由跳转不了
    //如果是my,点击跳转的index,否则正常跳转 
    // if(to.path == "/my"){
    //     next("/index")//跳转到哪一个页面
    // }else{
    //     next();
    // }
    next();
})
//路由跳转之前触发(优先级低于beforeEach)
router.beforeResolve((to,from,next)=>{
    console.log('router.beforeResolve')
    next();

})
//路由跳转后触发
router.afterEach((to,from)=>{
    console.log("router.afterEach")
  
})
//路由注册(第三方库的配置)
Vue.use(Router)

//注册
const app =  new Vue({
    
    router,
    render(h){
        return h(App);
    },
    
}).$mount("#root")