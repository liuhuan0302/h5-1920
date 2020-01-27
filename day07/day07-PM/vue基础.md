vue是一种渐进式的javaScript 框架
渐进式:即有一个核心库,在需要的时候在逐渐添加插件的一种概念

特点:
    易用:
        已经会了 HTML、CSS、JavaScript？即刻阅读指南开始构建应用！
    灵活:
        不断繁荣的生态系统，可以在一个库和一套完整框架之间自如伸缩。
    高效:
        20kB min+gzip 运行大小
        超快(虚拟 DOM) 
        最省心的优化

前端三大框架：
angular (mvc m数据层 v视图层 c控制器)
react ( v视图层 虚拟dom diff )
vue (MVVM m数据层 v视图层 vm视图数据层)

vue的安装: 
    npm init -y
    npm init vue -S

{{}} : 差值表达式 在vue内他可以解析任意数据 并且解析表达式

vue 常用指令:v-

v-for : 循环 (key,index) in attr

v-bind:绑定 就是让原生属性支持vue语法 
语法糖 v-bind: | :

v-on: 事件绑定v-on:click 绑定点击事件  v-on:keyup   

事件的修饰符 prevent：阻止浏览器默认行为 stop：阻止事件冒泡 

语法糖 v-on: | @

事件如何传参(123,$event)
$event当实参传递 在形参内就可以获取到事件对象 并且实参无参数那么形参的第一个参数就表示是事件对象


v-if
v-else-if
v-else

v-show
v-hide

mvvm :
v-model : input