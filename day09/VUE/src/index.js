//es modules 组件式开发的方法
//commonJS 组件开发的规范

import Vue from "vue";
import App from "./app.vue";//引入组件的集合App(所有路由的集合体 )

new Vue({
    el :"#app",
    render: h => h(App)//将引入的组件渲染到页面 app之内
})




/*
//引入元素的两种写法:
new Vue({
    el :"#app",

}).$mount("#app")


*/