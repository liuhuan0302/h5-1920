<template>
    <div class="classify">
     classify<br/>
     classify<br/>
     classify<br/>
     classify<br/>
     classify<br/>
     classify<br/>
     classify<br/>
     classify<br/>
     classify<br/>
     classify<br/>
     classify<br/>
     classify<br/>
    </div>
</template>

<script>
export default {
    data(){
        return {
            ids :123,
        }
    },
    //路由进入前触发
    beforeRouteEnter(to,from,next){//路由守卫要比生命周期函数执行要快
        console.log("beforeRouterEnter");
        //可以拿到子路由的参数
        next(vm=>{//vm 是指new Vue 的实例化对象
        console.log("beforeRouterEnter",vm.ids)//可以拿ajax的请求
    });
    },
    //路由更新时触发(动态路由触发,且两次id值不一样)
    beforeRouteUpdate(to,from,next){
        console.log("beforeRouterUpdate");
        next();
    },
    //路由离开时触发
    beforeRouteLeave(to,from,next){
        console.log("beforeRouterLeave")
        next();
    },
    props:["id"],//接收动态路由的id
    mounted(){
       //this:实例vue $route是挂载到vue上的router 
       //console.log(this.$route.query)//{a: "1", b: "2"}
        //console.log(this.id);
   }
}
</script>

<style lang="stylus" scoped>
    .classify
        font-size .8rem
</style>