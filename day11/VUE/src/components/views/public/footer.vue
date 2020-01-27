<template>
  <div class="footer">
    <router-link to="/index">
      <div>首页</div>
    </router-link>
    <router-link to="/classify/123?a=1&b=2">
      <div>分类</div>
    </router-link>
    <router-link :to="{path:'/my'}">
      <div>我的</div>
    </router-link>
  </div>
</template>

<script>
export default {
   
};
</script>

<style lang="stylus" scoped>
.footer {
  width: 100%;
  height: 0.6rem;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  font-size: 0.18rem;
  border-top: 0.01rem solid #ccc;
  border-bottom : 0.01rem solid #ccc;
//   box-sizing: border-box;
  background: #fff;

  a:nth-child(1) {
    border-left: 0;
  }

  a {
    border-left: 0.01rem solid #ccc;
    flex: 1;
    text-align: center;
    line-height: 0.6rem;
    color: #666;

  }
  
  
}
</style>

/*
命名路由:需要通过v-bind来绑定路由
 <router-link :to="{name:'zhaoqian'}">
      <div>我的</div>
</router-link>

路由绑定参数:
<router-link to="/classify?a=1&b=2">
      <div>分类</div>
</router-link>

获取路由地址绑定的参数:
路由指定的组件下面:
mounted(){
       //this:实例vue $route是挂载到vue上的router 
       console.log(this.$route.query)//{a: "1", b: "2"}
   }
命名路由传参:
<router-link :to="{name:'zhaoqian',query:{a:3,b :4}}">
      <div>我的</div>
</router-link>

*/