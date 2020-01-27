<template>
    <div class="my">
     my
     <router-view></router-view>
    </div>
</template>

<script>
import bus from "../../../bus"
export default {
    mounted(){
        //利用emitbus 向header 组件传参
        bus.$emit("metaTitle",this.$route.meta.title);
    }
}
</script>

<style lang="stylus" scoped>
   
</style>