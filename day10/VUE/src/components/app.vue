//组件化开发(如果整合其他组件)(所有需要渲染的组件的集合体)
<template>
    <div id="app">
        <span @click="alert">{{test}}</span>
        <span>{{setTest}}</span>
        <input type="text" v-model="test">
    </div>
</template>


<script>
export default {
    data(){//返回的是函数,放在污染其他组件的data
        return {
            test :123
        }   
    },
     //前面四个生命周期函数(只创建一次)
    //在创建之前触发的回调(虚拟DOM节点创建之前)(可以设置加载之前的动作如load)
    beforeCreate(){
        console.log("App-beforeCreate")
    },
    //在创建完成常触发的回调(数据调用可以在这操作ajax)
    created(){
        console.log("App-created")
    }, 
    //在挂载之前触发的回调(虚拟DOM节点创建完成)(可以操作原生DOM节点)
    beforeMount(){
        console.log("App-beforeMount")
    },
    //在挂载完成触发的回调(挂载完成之后,会把原来的节点销毁)
    mounted(){
        console.log("mounted")
    },
    //只要数据发生变化就会触发(频繁触发)
    beforeUpdate(){
        console.log(this,"beforeUpdate") 
    },
    updated(){
        console.log(this,"updated")
    },
    methods:{
        alert(){
            alert(111);
        }

    },
    computed:{
        setTest(){
            return this.test + "!!!!";
        }
    }
}
</script>


<style lang="stylus">
 #app
    background red
</style>