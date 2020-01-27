//引入组件
import Index from "../components/views/index/index.vue";
import Classify from "../components/views/classify/classify.vue";
import My from "../components/views/my/my.vue";
import router from "./router";

export default [{
    //根路径的配置
    path:"/",
    //重定向(将根路径重定向到index)
    redirect:"/index"
},{
    path:"/index",//路由地址(首页是跟路径)
    component:Index,//路由所对应的组件
    beforeEnter(to,from,next){//进入前触发(优先级仅低于beforeEach)
        console.log("routes.beforeEnter");
        next();
    }
   },
   {
     //让动态路由属性可以在当前路由下访问当前参数：id  在当前挂载的组件内可以通过props: ["id"]接收id
     props:true,//id的形参 
     path:"/classify/:id",//id为动态路由
     component:Classify  
   },{
       path:"/my",
       component:My,
       name:"zhaoqian",//命名路由
       meta:{//提供seo 的搜索
        //当切换到我的时候,header 变成我是my
           title:"我是my"//
       },
       children:[{//子路由(或继承父路由的属性)
            path:"haha",
            component:Index
       }]
   }]