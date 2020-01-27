<template>
  <div class="nav-bar" v-if="pageLoad">
    <mt-navbar v-model="selected"  :class="{'tab-bar':ceiling}">
      <mt-tab-item id="1">正在热映</mt-tab-item>
      <mt-tab-item id="2">即将上映</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <List :list="list"/>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <Scrollx :arrList="arrList" />
       <List :list="list"/>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import List from "../public/list.vue"
import Scrollx from "../public/scrollx.vue"
export default {
    props:["list","ceiling"],
    data(){//绑定数据(关联tab和内容)
        return {
            selected :"1",//注意此处为字符串(关联到1 就是tab1的内容)
            arrList:[],
            pageLoad:false
        }
    },
    components:{
        List,
        Scrollx
    },
    created(){
      //一般数据的请求都在created中
      this.getMovieList();
    },
    methods:{
      getMovieList(){
        this.$axios("/api/moviesScroll")
        .then(res=>{
          //如果后端返回数据
            if(res.data.success){
              //对返回的数据信息处理
              const data = res.data.data;
              this.arrList = data;
              //但数据结束成功后,需要让dom元素显示
              this.pageLoad = true;
            }
        })
        .catch(err=>{
          console.log(err)
        })
      }
    },
    mounted(){
      console.log(this.ceiling)
      console.log(this.arrList)
    }
};
</script>

<style lang="stylus" scoped>
  .tab-bar 
    width 100% 
    position fixed
    top .5rem
    left 0 
    z-index 10
</style>

/*
注:该模块在添加是要添加 :key="n"

*/