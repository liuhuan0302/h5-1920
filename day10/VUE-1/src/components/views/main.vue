//组件main

<template>
  <!-- <ul class="main">
    <li v-for="(item,index) in arrItems" :key="item">
      {{item}}
      <button @click="removeItem(index)">x</button>
    </li>
    <li>
        村里通电了:{{footer}}
        <button @click="hello">点我跟footer通信啦</button>
    </li>
  </ul>-->
  <div class="main">
    <MainChild />
  </div>
</template>

<script>
//引入bus文件(中间层)(实例化的vue)
import bus from "../../bus";
//引入子组件的子组件
import MainChild from "./mian-child.vue";
export default {
  //父组件传过来的数据(子组件以父组件为媒介传输子组件的信息)
  props: ["footer"],
  //注册组件
  components: {
    MainChild
  },
  data() {
    return {
      message: "你好,好久不见"
    };
  },
  methods: {
    hello() {
      //订阅事件(参数1:事件名称;参数2:传递的数据)
      //点击时,将数据挂载在vue实例上
      bus.$emit("hiBrother", this.message);
    }
  }
};
</script>

<style lang="stylus" scoped>
ul {
  width: 600px;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  list-style: none;
}

li {
  margin-bottom: 10px;
  padding-left: 5px;
}

button {
  height: 20px;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  margin-left: 10px;
}
</style>

/*
引入组件的两种写法:
    react:MainChild
    vue:mian-child

*/