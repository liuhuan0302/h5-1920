<template>
    <div class="header">
        <header>
            {{title}}
        </header>
    </div>
</template>

<script>
import bus from "../../../bus"
export default {
    data(){
        return {
            title:"猫眼电影"
        }
    },
    mounted(){
        //接收my组件传的参数
        bus.$on("metaTitle",data=>{
            //this.title = data;
        })
       
    }
}
</script>

<style lang="stylus" scoped>
    .header
        width 100%
        height .6rem
        header 
            position fixed
            top 0
            left 0 
            width 100%
            height .6rem
            background #abcdef
            text-align center
            line-height .6rem
            color #fff
            font-size .18rem
</style>