//header 组件
<template>
    <div class="header">
        <h1>父亲传过来的数据:{{son}}|{{sister}}</h1>
        <input type="text" @keyup.enter="addItem" class="input"> 
    </div>
</template>

 
<script>
export default {
    //可以是对象也可以数组
    // props:["son","sister"],
    props:{
        son:{
            //数据类型 type
            type:String,
            //required参数是否传递
            //required:true,
            //默认值
            //default:"爸爸没传我来顶",
            //判断当前的返回值是否正确
            // validator: function(value) {
            //     return value > 100;
            // }
        },
        sister:String
    },
    methods:{
        addItem(){

        },
    },
    //渲染以后调用该函数(修改数据 不推荐,不报错)(会报错:父元素传递过来的数据,不希望在子组件里面做修改)(子组件修改之后,父组件的值也会修改,会污染该数据)
    // mounted(){
    //     this.son = "哈哈哈";
    // },
}
</script>


<style lang="stylus" scoped>
    .input
        width 598px
        height 60px
        margin 10px 0
        border 1px solid red
    .header
        padding 10px 0     
</style>

/*
数据接收方式
    数组:
        props:["son","sister"]
    对象:(后面必须跟着数据类型)
        props:{
            son:String,
            sister:String

        }
mounted钩子函数一般是用来向后端发起请求拿到数据以后做一些业务处理。官方解释如下：

el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$el 也在文档内。

这意思是该钩子函数是在挂在完成以后也就是模板渲染完成以后才会被调用。

*/
