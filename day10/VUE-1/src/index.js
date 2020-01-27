import Vue from "vue";
import App from "./app.html";

//注意directive 没有s
//全局指令,将directive 挂载在vue下面
//参数1:指令的名称 参数2:相关的钩子函数
Vue.directive("drag", {
    //bind声明周期, 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置
    bind(el, bind, vnode, oldvnode) {
        console.log(el);
    },
    //被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)
    inserted(el, bind, vnode, oldVnode) {
        el.onmousedown = function (e) {
            console.log("down" + e);
            //当鼠标按下时,获取鼠标距离元素左侧和上侧的距离
            let x = e.offsetX,
                y = e.offsetY;
            document.onmousemove = function (e) {
                console.log("mouve" + e);
                //获取鼠标的位置
                let l = e.clientX - x,
                    t = e.clientY - y,
                    W = document.documentElement.clientWidth,
                    H = document.documentElement.clientHeight;
                console.log(W, H)

                //对边界进行限定
                l = l < 0 ? 0 : (l > W - 100 ? W - 100 : l);
                t = t < 0 ? 0 : (t > H - 100 ? H - 100 : t);
                //el移动的位置
                el.style.left = l + "px";
                el.style.top = t + "px";
                //当鼠标抬起时
                document.onmouseup = function () {
                    document.onmousemove = null;
                }
            }
        }

    },
    update() {

    },
    componentUpdate() {

    },
    unbind() {

    }

})
//组件控制器
const app = new Vue({
    data: {
        test: 2222
    },
    render(h) {//创建真实的DOM元素 
        return h(App);
    }
}).$mount("#root")//等同于el:#root


/*
大部分场景 bind 钩子里绑定一些事件，在unbind 里用解绑事件，inserted操作dom



钩子函数的参数 (即 el、binding、vnode 和 oldVnode)
1、el：指令所绑定的元素，可以用来直接操作 DOM 。
2、binding：一个对象，包含以下属性：
            2-1、name：指令名，不包括 v- 前缀。
            2-2、value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
            2-3、oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
            2-4、expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
            2-5、arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
            2-6、modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
3、vnode：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。
4、oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。


*/

