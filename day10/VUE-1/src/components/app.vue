//组件化开发(如果整合其他组件)(所有需要渲染的组件的集合体)
//组件化开发(将app.vue 分成 header main footer 三个组件)
//利用v-bind的形式传输数据son(自定义的属性)(参数childHeader) : 是v-bind的语法糖
<template>
  <div class="app">
    <!-- <Header :son="childHeader" :sister="sister" />
    <Main :footer="footerMsg" />
    {{footerMsg}} :
    <Footer @footer="childSay" />
    <input type="text" v-module="grand" /> -->


    <!-- <div v-click>
        {{grand}}
    </div> -->

    <!-- <Footer>
        <span slot="header">我是header</span>
        <span slot="footer">我是footer</span>
        <div slot-scope="props">{{grand}} | {{props.grand}}</div>
    </Footer> -->

    
    <Drag/>
  </div>
</template>  


<script>
//引入依赖组件(文件名需大写)
import Header from "./views/header.vue";
import Main from "./views/main.vue";
import Footer from "./views/footer.vue";
import Drag from "./views/drag.vue";


export default {
  //往子组件的子组件传输数据 provide 是一个固定的方法
  provide() {
    return {
      grand: this,
      message: this.grand
    };
  },
  //自定义指令(参数:自定义名称;参数:对象)
  // directives:{
  //     "click":{
  //         //第一次绑定时触发的方法(只能触发一次)
  //         //el:真实的元素节点 binding:对象
  //         bind(el,binding,vnode){
  //             console.log(el,binding,vnode)
  //           if(binding.expression){
  //               el.addEventListener("click",function(){
  //                   alert(el.innerHTML)
  //               })
  //           }else{
  //               el.addEventListener("click",function(){
  //                   alert("大家好我没有值")
  //               })
  //           }
  //         },
  //         //组件创建后触发的方法
  //         inserted(){
  //               console.log(el,binding,vnode)
  //         },
  //         update(){

  //         },
  //         componentUpdate(){

  //         },
  //         unbind(){

  //         }
  //     }
  // },
  //注册组件 Header: Header 组件首字母大写
  components: {
    Header,
    Main,
    Footer,
    Drag
  },
  //返回的是函数,放在污染其他组件的data
  data() {
    return {
      arrItems: [],
      childHeader: "你离开我的那一刻我心都碎了", //传给子元素的数据
      sister: "你妹妹们也想你",
      footerMsg: "",
      grand: "爷爷想你了"
    };
  },
  methods: {
    //增加数据方法
    addItem(e) {
      this.arrItems.push(e.target.value);
    },
    //删除数据方法
    removeItem(i) {
      this.arrItems.splice(i, 1);
    },
    //接收子组件(footer)传过来的数据
    childSay(data) {
      //将子组件传过来的数据渲染到页面上
      this.footerMsg = data;
    }
  }
};
</script>


<style lang="stylus">
* {
  margin: 0;
  padding: 0;
}

// .app {
//   width: 600px;
//   border: 1px solid #bbb;
//   margin: 0 auto;
// }
</style>


/*
:key="item"
@keyup.enter="addItem"  键盘事件(敲回车调用addItem方法)
@click="removeItem(index) 点击移除
 @footer="childSay" 发布事件(事件名childSay)
*/