//引入组件
// import Index from "../components/views/index/index.vue";
// import Classify from "../components/views/classify/classify.vue";
// import My from "../components/views/my/my.vue";
// import moiveProduct from "../components/views/moiveProduct/moiveProduct.vue"
export default [{
    //根路径的配置
    path:"/",
    //重定向(将根路径重定向到index)
    redirect:"/index"
},{
    path:"/index",//路由地址(首页是跟路径)
    component:require("../components/views/index/index.vue").default,//路由所对应的组件
    meta:{
        //只要有这个属性,则具有header 和 footer
        publicHeader:true,
        publicFooter:true
    },
    //注意:子路由是一个数组

    // children:[{
    //     //以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
    //     path:"m-hot",
    //     component:Index 
    // }]
   },
   {
     props:true,//id的形参 
     path:"/classify/:id",//id为动态路由
     name:"classify",//路由命名要加双引号
     component:require("../components/views/classify/classify.vue").default,
     meta:{
        //
        publicHeader:true,
        publicFooter:true
    },

   },{
       path:"/my",
       component:require("../components/views/my/my.vue").default,
       name:"zhaoqian",//命名路由
       meta:{//提供seo 的搜索
        //当切换到我的时候,header 变成我是my
           title:"我是my",
           showBack:true
       },
       meta:{
        //
        publicHeader:true,
        },
   },{
       path:"/asgard/:id",
       name:"jump-moive",
       component:require("../components/views/moiveProduct/moiveProduct.vue").default,
       props:true
   }]