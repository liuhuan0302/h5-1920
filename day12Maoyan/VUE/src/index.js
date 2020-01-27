import Vue from "vue";
import Router from "vue-router";
import MintUI from "mint-ui";//引入mintui
import "mint-ui/lib/style.css";
import axios from "axios";
import Vuex from "vuex";//


import Rem from "./rem";
import "../assets/global.styl";
import router from "./config/router";
import App from "./components/app.vue";
import createStore from "./store/store.js";//引入store 的配置项



//axios 直接在vue原型上定义axios 属性
Vue.prototype.$axios = axios;
//路由注册(第三方库的配置)
Vue.use(Router)
Vue.use(MintUI);
Vue.use(Vuex);//注册状态管理

//执行createStore
const store = createStore();
//注册
const app =  new Vue({ 
    router,
    store,
    render(h){
        return h(App);
    }
}).$mount("#root")