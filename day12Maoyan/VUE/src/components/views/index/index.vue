<template>
    <div class="index" ref="indexViews" v-show="pageLoad">
        <div ref="content" class="content">
            
            <!-- <input type="text"> -->
            <Banner/> 
            <down-load-app></down-load-app>
            <NavBar :list="moviesList" :ceiling="ceiling" />
        </div>
    </div>
</template>   

<script>
import Banner from "../public/banner.vue";//引入模块
import DownLoadApp from "./downloadApp.vue";
import NavBar from "./navBar.vue";
export default {
    data(){
        return {
            moviesList:[],
            pageLoad:false,
            pageIndex:0,//初始化是页数为 0
            pageNum:0,
            ceiling:false
        }
    }, 
    components:{
        Banner,
        DownLoadApp,
        NavBar
    },
    created(){//在create进入数据调用(真实dom还没创建,虚拟dom已经创建完成)(数据的请求,调用.在created进行)
        this.getMoviesList();
    },
    methods:{
        
        getMoviesList(){
               
            //this.$axios请求两种方式
            //get 请求 参数1:请求的地址 参数2:请求的参数params
            //post请求(注意需要解决跨域问题)
            this.$axios("/api/moviesList",{
            params:{
                    //每一次调用pageIndex 都会进行 +1
                    //第一次请求的是 ++0 = 1
                    pageIndex: ++this.pageIndex,
                    pageSize:10
            }
            }).then(res=>{
                //拿到数据后对数据进行处理
                //判断是否返回数据,如果返回则执行
                // console.log(res.data.success);?为什么data下面可以拿到success值
                if(res.data.success){
                    //拿到返回的数据,并将其赋值给moviesList
                    const data = res.data.data;
                    //对返回数据中的图片地址进行处理
                    const moviesList = data.moviesList.map(item=>{
                        //利用字符串中replace方法 替换网址中的w.h
                        item.img = item.img.replace(/\/w\.h\//,"/128.180/")
                        return item
                    })
                    //防止数据之间替换 将当前页面的数据 和 下一次 调用时的数据 进行拼接
                    this.moviesList = this.moviesList.concat(moviesList);
                    //接收后端返回的数据
                    //当前的页数(将返回的页数赋值给 this.pageIndex = 1,)(当下一次调用时,pageIndex = 1)
                    this.pageIndex = data.pageIndex;
                    //总页数
                    this.pageNum = data.pageNum;
                    //当数据加载完,在让页面显示
                    this.pageLoad = true;
                }
            }).catch(res=>{
                console.log(err);
            })
           
        },
        handleScroll(){
            //想要实现上拉加载的思路：
            //1.内部容器要不外部容器高
            //2.外部元素高度 + 滚动高度 >= 内部容器高度 触底
            //获取外部容器的高度
             const appHeight = document.querySelector(".app").clientHeight;
            //获取内部容器的高度(可视区的高度 = 外部容器高度 - header -footer)
            const indexHeight = this.$refs.content.offsetHeight;
            //获取当前元素滚动的高度
            const scrollTop = this.$refs.indexViews.scrollTop;
            //获取header 高度
            const headerH = document.querySelector(".header").offsetHeight;
            // const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            //console.log(appHeight,indexHeight,scrollTop)
            //获取吸顶元素的距离顶部的高度
            const navBar = document.querySelector(".mint-navbar").offsetTop;
            
           
            //吸顶效果
            if(scrollTop >= navBar){
                this.ceiling = true;
            }else{
                this.ceiling = false;
            }


            //如果 外部容器的高度 + 滚动条的高度 >= 内部容器的高度 则说明触底了,跳出
            if(appHeight + scrollTop >= indexHeight + headerH){
                //判断如果当前页数大于等于总页数
                if(this.pageIndex >= this.pageNum){
                    //但没有数据时,显示暂无数据
                    this.onOff = true;
                     return;
                }else{
                     //否则需要重新调用getMovieList()
                    this.getMoviesList();
                }
                
            }
        }
    },
    mounted(){//mounted表示渲染已经完成,实例已经注入,可以操作真实DOM节点 (真实DOM 操作,事件绑定可以在这个周期执行) 
       //监听内部容器的滚动
        
      this.$refs.indexViews.addEventListener("scroll",this.handleScroll)
      
    }
}
</script>

<style lang="stylus" scoped>
    .index
        flex 1
        overflow scroll
        height 10rem
        .input
            height .4rem
            width 1rem
            border .02rem solid red 
        
</style>