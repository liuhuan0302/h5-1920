import Vue from "vue";
import App from "./components/app.vue";

//组件控制器
const app = new Vue({
    data:{
        test:2222 
    },
    //前面四个生命周期函数(只创建一次)
    //在创建之前触发的回调(虚拟DOM节点创建之前)(可以设置加载之前的动作如load)
    beforeCreate(){
        console.log(this.$el,"beforeCreate")
    },
    //在创建完成常触发的回调(数据调用可以在这操作ajax)
    created(){
        console.log(this.$el,"created")
    }, 
    //在挂载之前触发的回调(虚拟DOM节点创建完成)(可以操作原生DOM节点)
    beforeMount(){
        console.log(this.$el,"beforeMount")
    },
    //在挂载完成触发的回调(挂载完成之后,会把原来的节点销毁)
    mounted(){
        console.log(this.$el,"mounted")
    },
    //只要数据发生变化就会触发(频繁触发)
    beforeUpdate(){
        console.log(this,"beforeUpdate") 
    },
    updated(){
        console.log(this,"updated")
    },
    //销毁之前触发
    beforeDestroy(){
        console.log(this,"beforeDestroy")
    },
    destroyed(){
        console.log(this,"debugger")
    },
    render (h){//创建真实的DOM元素 
        return h(App);
    }
}).$mount("#root")//等同于el:#root

// setTimeout(_=>{
//     app.$destroy();
// },2000)


/*
render(createElement){
    return createElement("div",{},"123")
}


Object defineProperty(obj,value,()=>{get(),set()})
*/