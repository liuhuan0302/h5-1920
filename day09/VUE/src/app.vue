//所有的页面结构放在template里面(view)(模板)
<template>
  <div id="main">
      {{a}}
  </div>
</template>


// 所有的逻辑放到script里面(moudel)(逻辑)
<script>
export default {
    data(){// 组件是相互嵌套的,防止污染
        return {
            a : "123",
        }
    },
    methods(){

    }
}
</script>  

//样式 scoped:当前样式只能在当前组件中生效(局部有效)(样式)
<style lang="stylus" scoped>

#main 
    background green
</style>