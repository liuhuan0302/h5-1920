<template>
  <div class="product" v-if="pageLoad">
    <down-load-app />
    <div class="movie-info">
      <div class="movie">
       <img class="poster" :src="moviesDes[0].movie.albumImg" alt="">
        <div class="movie-desc">
          <p class="movie-name">{{moviesDes[0].movie.nm}}</p>
          <p class="movie-english-name">{{moviesDes[0].movie.enm}}</p>
          <p class="movie-cat">{{moviesDes[0].movie.cat}}</p>
          <p class="actors">{{moviesDes[0].movie.star}}</p>
          <p class="movie-show-time">{{moviesDes[0].movie.pubDesc}}</p>
          <div class="look">
            <button class="likes">想看</button>
            <button class="no-likes">不想看</button>
          </div>
        </div>
      </div>
      <div class="mouth">
        <div class="top">实时口碑</div>
        <div class="middle">
          <span>{{moviesDes[0].movie.wish}}</span>
          <span>人想看</span>
        </div>
        <div class="bottom">{{moviesDes[0].reputation.reputation[0].right}}</div>
      </div>
      <div class="brief-introduction">
        <div>
          <span>简介</span>
          <span @click="onOff = !onOff">{{onOffText}}</span>
        </div>
        <div :class="{'line-clamp-3':!onOff}"> {{moviesDes[0].movie.dra}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "../../../bus";
import DownLoadApp from "../index/downloadApp.vue";
export default {
  //接收动态路由的参数
    props:["id"],
    created(){
     
      //调用向后端请求数据的方法
      this.getMovieDes();
    },
    methods:{
      //获取对应电影的详情页(跳转)
      getMovieDes(){
        //向后端请求数据
          this.$axios("/api/moviesDes",{ 
             params:{
            //向后端传参数(id)(也是后端建集合的名称)
                product:this.id
            }
          }).then(res=>{
            if(res.data.success){
              const data = res.data.data;
              this.moviesDes = data;
              //进入页面,并不能显示dom节点(由于数据还没有初始化)
              //当数据初始化后,开始显示Dom
              this.pageLoad = true;
              
            }
          }).catch(res=>{
            console.log(res);
          })
      }
    },
    beforeRouteEnter(to,from,next){
        if( to.path == "/asgard/moive" && from.path == "/"){
           next("/index")
        }else{
            bus.$emit("header",false)
            bus.$emit("footer",false)
             next()
        }
    },
    //触发钩子函数
    //当离开这个页面时
    beforeRouteLeave(to,from,next){
        if(to.fullPath == "/index"){
            console.log(111)
            bus.$emit("header",true);
            bus.$emit("footer",true)
        }
        next();
    },
  components: {
    DownLoadApp
  },
  data(){
      return {
          onOffText:"展开",
          onOff :false,
          moviesDes:null,
          pageLoad:false
      }
  }
};
</script>

<style lang="stylus" scoped>

    .product
        font-size .14rem
        line-height .2rem
        height 100%
        .movie-info
            background rgb(25,56,64,0.6)
            height 100%
            .movie
                display flex
                align-items center
                .poster
                    width 1.03rem
                    height 1.4rem
                    margin-right .12rem
                
            .mouth 
                width 3.3rem
                height 1.29rem
                background rgba(0,0,0,.8)
                border-radius .1rem 
                margin-top 0.2rem
                color #fff
                box-sizing border-box
                padding .15rem .15rem
                .middle 
                    width 100%
                    height .65rem
                    text-align center
                    line-height .65rem
                    span:nth-child(1)
                        color red
                    span:nth-child(2)
                        color green 
            
    
</style>

/*
{'line-clamp-3':!onOff}

*/