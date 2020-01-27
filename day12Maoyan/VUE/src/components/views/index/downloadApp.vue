<template>
    <aside class="download-app-bar">
        <img class="logo" src="//s0.meituan.net/bs/?f=myfe/canary:/asgard/images/avatar.png" alt="">
        <div class="app-name-desc">
            <p class="name">猫眼</p>
            <p class="describe">在线选座，热门影讯，爱上看电影</p>
        </div>
        <mt-button type="danger" class="open">立即打开</mt-button>
    </aside>
</template>

<script>
export default {
    
}
</script>

<style lang="stylus" scoped>
.download-app-bar
    display flex
    height .63rem
    padding 0 .12rem
    border-bottom .01rem solid #e6e6e6
    align-items center
    .logo   
        width .44rem
        height .44rem
        margin-right 0.05rem
    .app-name-desc
        flex 1
        .name
            font-size .17rem
            color #222
            line-height .23rem
        .describe
            font-size .12rem
            color #999
   

</style>