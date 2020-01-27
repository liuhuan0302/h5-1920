<template>
    <div class="app">
        <Header/>
        <router-view></router-view>
        <Footer/>
        
    </div>
</template>

<script>
import Header from "./views/public/header.vue";
import Content from "./views/content.vue";
import Footer from "./views/public/footer.vue";
export default {
   
    components:{ 
        Header,
        Footer
    }
} 
</script>

<style lang="stylus" scoped>

</style>