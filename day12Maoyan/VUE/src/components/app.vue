<template>
    <div class="app" ref="box">
        <!-- <Header v-if="headerBool"/> -->
        <Header v-if="$route.meta.publicHeader"/>
        <!-- <p> {{comTest}} | {{getUserInfo}}</p> -->
        <!-- <p>{{name}}</p> -->
        <div>{{$store.state.hotModuleReplace}} | {{b}}</div>
        <p>{{h5Name}} | {{classN}}</p>
        <keep-alive include="my">
        <router-view></router-view>
        </keep-alive>
        <!-- <Footer v-if="footerBool"/> -->
        <Footer v-if="$route.meta.publicFooter"/>
        <div ref="diva"></div>
    </div>
</template>

<script>
import Header from "./views/public/header.vue";
import Content from "./views/content.vue";
import Footer from "./views/public/footer.vue";

import bus from "../bus"

//vuex的工具函数
import {mapState, mapGetters,mapActions,mapMutations} from "vuex"
export default {
    // data(){
    //     return {
    //         headerBool:true,
    //         footerBool:true,
    //     }
    // },
    data(){
        return {
            a:1,
            b:444
        }
    },
    components:{ 
        Header,
        Footer
    },
    computed:{
        //对state的简写(相当于test() 的写法)
        //...mapState(["test","name"]),
        ...mapState({
            comTest:(state)=>{
                return state.test
            },
            h5Name:(state)=>{
                return state.h5.name
            },
            classN:(state)=>{
                return state.h5.class
            }
        }),

        // test(){
        //     return this.$store.state.test
        // },
        //对getters 语法的简写
        //...mapGetters(["getUserInfo"]),

        // getUserInfo(){
        //     return this.$store.getters.getUserInfo;
        // }
    },
    methods:{
        ...mapMutations(["updateTest","updateName","h5/updateClass"]),
        ...mapActions(["updateTestAsync","h5/updateClassAsync"])
    },
    mounted(){
        this["h5/updateClass"](12345);
        this["h5/updateClassAsync"]();//调用h5模块下面的方法
        //修改仓库中state的值,需要触发 commit
        //参数:修改的方法
        // this.$store.commit("updateTest",{
        //     data:"哈哈",
        //     data1:"嘿嘿"
        // })

        //简化写法
        //this 调用的是上面的updateTest = this.$store.commit
        // this.updateTest({
        //      data:"哈哈",
        //      data1:"嘿嘿"
        // })
        // setTimeout(_=>{
        //      this.updateName("黎明")
        // },3000)


        //mapactions 
        //this.updateTestAsync({data:"大家好",data1:"哈哈"})
        //可以在外部进行一步修改,但是不能在mutations里面进行异步操作
        // setTimeout(_=>{
        //      this.$store.commit("updateName","黎明")
        // },3000)
       
        //异步修改数据 (单向数据流)(异步的数据加载 )
        //vue-components => dispatch =>actions => commit => mutations(提交) => updateTestAsync(具体执行的方法)
        // this.$store.dispatch("updateTestAsync",{data:"大家好",data1:"哈哈"})
        //store(仓库里面的数据,可以在全局任何地方是使用)
        console.log(this.$store.state.hotModuleReplace)
        // //接收父组件传来的信息(list)
        // bus.$on("header",data=>{
        //     this.headerBool = data;
        // })
        //  bus.$on("footer",data=>{
        //     this.footerBool = data;
        // })
        // this.a = 2;
        //thi.$refs:用来获取当前组件中ref所绑定的关系,在节点渲染后可直接获取对应绑定关系的节点元素
        // //vue渲染数据是异步的
        // console.log(this.$refs)
        // console.log(this.$refs.diva.innerHTML);
        // //元素渲染完成后的结果
        // this.$nextTick(()=>{
        //     //元素渲染后的结果
        //     console.log(this.$refs.diva.innerHTML)
        // })

    },
    // watch:{//路由监听
    //     //监听路由的变化($route 实例化)
    //     "$route"(nV,oV){
    //         //nV:跳到哪一个组件
    //         //oV: 从哪个组件跳
    //         console.log(nV,oV);
    //         if(nV.fullPath == "/index"){
    //             this.headerBool = true;
    //             this.footerBool = true;
    //         }
    //         if(nV.fullPath == "/asgard/moive"){
    //             this.headerBool = false
    //             this.footerBool = false
    //         }
    //     }

    // }
} 
</script>

<style lang="stylus" scoped>
.app
    display flex
    flex-direction column
    width 100%    
    height 100%

</style>