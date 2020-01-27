<template>
    <div class="banner">
        <mt-swipe :show-indicators="false">
            <mt-swipe-item><img src="http://img5.mtime.cn/mg/2019/11/13/174210.77609015.jpg" alt=""></mt-swipe-item>
            <mt-swipe-item><img src="http://img5.mtime.cn/mg/2019/11/07/171918.60356885.jpg" alt=""></mt-swipe-item>
            <mt-swipe-item><img src="http://img5.mtime.cn/mg/2019/11/14/094812.30990209.jpg" alt=""></mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
   
}
</script>

<style lang="stylus" scoped>
    .banner
        height 1.5rem
        background red
        img 
            height 100%
            width 100%
   
</style>