<template>
    <div class="classify">
      clasify
    </div>
</template>

<script>
import bus from "../../../bus"
export default {
  mounted(){
    bus.$emit("showBack",true)
   
  }  
}
</script>

<style lang="stylus" scoped>
    .classify
        font-size .8rem
</style>