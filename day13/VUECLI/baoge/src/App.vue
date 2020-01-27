<template>
  <div id="app">
    这里是store的state------->{{this.$store.state.count}}
    <br />
    这里是store的getter------->{{this.$store.getters.newCount}}
    <br />
    <button @click="change">点击触发dispach--> actions</button>
    <button @click="change1">点击触发commit---> mutations</button>
    
  </div>
  
</template>
 
<script>
export default {
  name: "app",
  methods: {
    change() {
      this.$store.dispatch("change"); // 触发actions对应的change
    },
    change1() {
      this.$store.commit("change"); // 触发mutations对应的change
    }
  },
  mounted() {
    console.log(this.$store);
  }
};
</script>