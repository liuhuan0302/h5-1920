//组件footer
<template>
    <div class="footer">
        欢迎大家~
        <button @click="sendFatherMsg">点我告诉爸爸悄悄话</button>

        <header>
            <slot name="header"></slot>
        </header>
        <footer>    
            <slot name="footer"></slot>
        </footer>
        <slot :grand="grand"></slot>
    </div>
</template>

<script>
//引入bus(实例化的vue)(挂载着子组件传输的数据)
import bus from "../../bus";
export default {
    data(){
        return {
            hiFather : "你好爸爸",
            grand:"我是footer"
        }
    },
    methods:{
        sendFatherMsg(){
            //发布订阅模式(参数1:事件名,参数2:发布的数据)
            //emit订阅事件
            this.$emit("footer",this.hiFather)
        }  
    },
    //挂载完成之后,渲染的数据
    mounted(){
        //发布事件(实例化vue 上面包含着子组件传输的数据)
        bus.$on("hiBrother",(data)=>{
            console.log(data);
        })
    }
}
</script>

<style lang="stylus" scoped>
    .footer
        height 80px
        width 600px
        text-align center
        line-height 80px
</style>