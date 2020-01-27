<template>
    <div class="my"  v-show="pageLoad" ref="my">
        <div>
         <down-load-app v-show="onOff"></down-load-app>
         <List :list="moviesList"/>
         </div>
    </div>
</template>

<script>
import bus from "../../../bus"
import List from "../public/list.vue"
import BScroll from "better-scroll"
import DownLoadApp from "../index/downloadApp.vue";
export default {
    //命名组件
    name:"my",
    data(){
        return {
            moviesList:[],
            pageLoad:false,
            pageIndex:0,//初始化是页数为 0
            onOff:false
        }
    }, 
    components:{
        List,
        DownLoadApp,
    },
    created(){//在create进入数据调用(真实dom还没创建,虚拟dom已经创建完成)(数据的请求,调用.在created进行)
        this.getMoviesList();
    },
    methods:{
        //uploading 下拉刷新
        getMoviesList(upLoading){
            //如果uploading存在, 则把数据库清零,放在多个数据组拼在一下,key值重复
            if(upLoading){
                this.moviesList = [];
            }
               
            //this.$axios请求两种方式
            //get 请求 参数1:请求的地址 参数2:请求的参数params
            //post请求(注意需要解决跨域问题)
            this.$axios("/api/moviesList",{
            params:{
                    //每一次调用pageIndex 都会进行 +1
                    //第一次请求的是 ++0 = 1
                    //判断,如果uploadin存在,则是1
                    pageIndex: upLoading ? 1 : ++this.pageIndex,
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
                    setTimeout(_=>{
                        //当数据加载过来时,需要重新计算高度
                        // this.scroll.refresh();
                    },500)
                }
            }).catch(res=>{
                console.log(err);
            })
        }
    },
    mounted(){
        bus.$emit("showBack",true)
        const my = this.$refs.my;
        //touchstart: 手指触摸事件
        // my.addEventListener("touchstart",(e)=>{
        //     alert(1);
        // })
        //touchmove 手指移动事件
        //touchend 手指离开事件
        // my.addEventListener("touchend",(e)=>{
        //     console.log(e);
        // })
        //判断scroll 是否存在
        if(!this.scroll){
            //参数1:绑定的父元素
            //参数2:配置项
            this.scroll = new BScroll(my,{
                scrollY:true,//默认为纵向滚动
                probeType:3,//实时派发滚动事件(任意地方触发滚动事件)
            });
        }else{
            //刷新,重新计算宽度(高度)
            this.scroll.refresh();
        }
        //on 订阅事件 obj:获取滚动时的位置坐标
        this.scroll.on("scroll",obj=>{
            //console.log(obj);
        })
        //touchEnd 手指离开手机屏幕
        this.scroll.on("touchEnd",obj=>{
            console.log(obj.y,this.scroll.maxScrollY)
            //上拉加载
            //thi.scroll.maxScrollY 获取纵向最大高度
            if(obj.y < this.scroll.maxScrollY){
                //当滚动高度 大于 纵向最大高度时,进行数据的加载 
                this.pageIndex < this.pageNum && this.getMoviesList();
            }
            //下拉刷新
            if(obj.y > 150){
                //当下拉的高度 大于 150时,实现刷新效果
                //upLoading = 1
                this.getMoviesList("upLoading")
                this.onOff= true;
            }
            if(obj.y < 0){
                this.onOff= false;
            }
        })
       
    }
}
</script>

<style lang="stylus" scoped>
.my
    flex 1
    overflow auto
    font-size .14rem
   
</style>