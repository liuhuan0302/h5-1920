<template>
<ul class="list">
    <li @click="jumpProduct(item.id)" v-for="item in list" :key="item.id">
        <p class="list-data" v-if="item.time">11月14日 周四</p>
        <div class="list-views">
        <img  class="poster" :src="item.img" alt="">
        <div class="direction">
            <p class="movie-title line-ellipsis">
                {{item.nm}}
            </p>
            <p class="score" v-if="item.sc">
                <span class="font-13 color-666">观众评</span>
                <span>{{item.sc}}</span>
            </p>
            <p class="score" v-else>
                <span class="font-13 color-666">暂无评分</span>
            </p>
            <p class="performer font-13 color-666 line-ellipsis">
                {{item.star}}
            </p>
            <p class="show-type font-13 color line-ellipsis">
               {{item.showInfo}}
            </p>
        </div>
         <div class="btn btn-showst1" v-if="item.showst == 1">想看</div>
        <div class="btn btn-showst3" v-if="item.showst == 3">购票</div>
         <div class="btn btn-showst4" v-if="item.showst == 4">预售</div>
         <!-- 1 想看  3 购票 4 预售 -->
        </div>
    </li>
    <div v-if="true" class="text " >暂无数据~</div>
</ul>
</template>

<script>
import bus from "../../../bus"
export default {
    props:{
        "list":{
            type:Array,
        }
    },
    methods:{
        jumpProduct(id){
            //父子组件通信(当进到list页面是,会传回一个false);
            bus.$emit("header",false);
            bus.$emit("footer",false);
            //this.$router为路由实例 
            //实现页面跳转 参数1:跳转的地址 参数2:携带的参数
            //this.$router.push({path:"my",query:{a:4,b:5}});
            //也可以实现动态路由跳转(必须是命名路由才可以)(参数1:name)
         
            //params:{id} 设置动态路由
            this.$router.push({name:"jump-moive",params:{id}})
            
    
        }
        
    }
}
</script>

<style lang="stylus" scoped>
 .btn
    width .47rem
    height .27rem
    line-height .27rem
    text-align center
    box-sizing border-box
    color #ffffff
    border-radius 0.04rem
    white-space nowrap
    font-size .12rem
.list   
    padding-bottom .65rem
    li
        padding .12rem .15rem
        font-size 0
       .list-data    
            padding .12rem 0
            font-size .14rem
            color #333
        .list-views
            display flex
            align-items center
            .poster
                width .64rem
                height .9rem
                margin-right .1rem
            .direction
                flex 1
                max-width 2.1rem
                margin-right .1rem
                .movie-title    
                    line-height .24rem
                    font-size .17rem
                    color #333
                    font-weight 700
                    margin-bottom .08rem
                .score
                    margin-bottom .06rem
                    font-size 0
                    span:nth-child(2)
                        font-weight 700
                        color #faaf00
                        font-size .15rem
                        margin-left .08rem
                .performer
                    display block
                    margin-bottom .03rem
            .btn-showst3
                background-color:red
            .btn-showst1
                background-color:blue
            .btn-showst4
                background-color:yellow
    .text
            text-align center
            font-size .16rem
            
</style>