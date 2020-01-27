<template>
    <div class="movie-scroll">
        <p class="title">最近最受期待</p>
        <div  class="out-div" ref="outPut">
        <ul class="lists" ref="lists">
            <li v-for="item in arrList" :key="item.id">
               <div class="movie-img">
                   <img src="https://p0.meituan.net/170.230/moviemachine/58ee13be6dc60bf5e636cf915bbbaaa55787785.jpg" alt="">
                   <div class="shadow"></div>
                   <div class="wish"><span>{{item.wish}}</span><span>人想看</span></div>
               </div>
               <p class="name line-ellipsis">{{item.nm}}</p>
                <p class="date">{{item.rt}}</p>        
            </li>
        </ul>
        </div>
    </div>
</template>

<script>
//引入better-scroll
import BScroll from "better-scroll";
export default {
    props:["arrList"],
    
    mounted(){
        console.log(this.arrList)
        //BScroll 需要操作DOM,所以要放在mounted里面执行
        const outDiv = this.$refs.outPut;
        //设置轮播图内部容器的宽度(替代line-flex)
        // const lists = this.$refs.lists;
        // lists.style.width = ((this.arrList.length * 85) + (this.arrList.length * 10)) / 100 + "rem";
        // console.log( lists.style.width)

        //参数1:需要操作的标签 参数2:配置项
        this.scroll = new BScroll(outDiv,{
            //当设置为 true 的时候，可以开启横向滚动。 
            scrollX:true,
        })
    }
}
</script>

<style lang="stylus" scoped>
.movie-scroll
    padding .12rem .15rem
    font-size .14rem
    .title  
        color #333
        margin-bottom .12rem
    .out-div   
        overflow hidden
        .lists  
            display inline-flex
            li
                display inline-block
                flex 0 0 auto 
                width .85rem
                overflow hidden
                margin-right .1rem
                .movie-img  
                    width 100%
                    position relative
                    img     
                        width 100%
                    .shadow
                        display inline-block
                        width 100%
                        height .35rem
                        position absolute
                        left 0
                        bottom 0rem 
                        background-image linear-gradient(-180deg,rgba(77,77,77,0),#000)  
                    .wish
                        position absolute
                        left .04rem
                        bottom .02rem
                        color #faaf00
                        font-size .11rem
                        font-weight 600
                .name 
                    font-size .13rem
                    color #222
                    margin .03rem
                .data   
                    font-size .12rem
                    color #999

</style>


/*
绑定唯一的值:key="item.id"

*/