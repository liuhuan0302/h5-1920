<template>
  <div class="main-child">
    mian-child
    <p>{{message}}</p>
  </div>
</template>

<script>
//引入bus.js
import bus from "../../bus";
export default {
  //接收父组件传入过来的数据
  inject: ["grand", "message"],
  mounted() {
    console.log(this.grand, "main-child");
    console.log(this.message);
  }
};
</script>

<style lang="stylus" scoped></style>