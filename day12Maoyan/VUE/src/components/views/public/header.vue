<template>
  <div class="header">
    <!-- <header>{{title}}</header> -->
    <mt-header :title="title">
      
        <mt-button icon="back" v-if="showBack" slot="left" @click="goBack"></mt-button>
        <!-- <mt-button @click="handleClose">关闭</mt-button> -->
      
      <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>
  </div>
</template>

<script>
import bus from "../../../bus";
export default {
  data() {
    return {
      title: "猫眼电影",
      showBack:false
    };
  },
  methods:{
      //回退的方法
      goBack(){
          //通过router的go方法实现回退 -1 回退到上一级 -2返回上上一页
          //route 配置项(path,meta)
          //router 行为

          this.$router.go(-1);
      }
  },
  mounted() {
    console.log(this.showBack)
    //接收my组件传的参数
    bus.$on("metaTitle", data => {
      //this.title = data;
    });
    bus.$on("showBack",data=>{
        this.showBack = data;
    })
  },
  watch:{
      "$route"(nV,oV){
        //nv.path 表示路由跳到那个页面
          if(nV.path == "/index"){
             this.showBack = false;
          }
      }
  }
};
</script>

<style lang="stylus" scoped>
.header {
  width: 100%;
  height: 0.6rem;

  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.6rem;
    background: #abcdef;
    text-align: center;
    line-height: 0.6rem;
    color: #fff;
    font-size: 0.18rem;
    z-index: 10;
  }
}
</style>