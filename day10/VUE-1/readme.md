## 组件化开发
    + 建立父组件 (app.vue)(组件集合;管理组件)
        - 引入组件 import Header from "./views/header.vue";
        - 挂载到根元素下 <Header/>
        - 注册组件 components
    + 建立子组件 
        - header.vue(头部)
        - main.vue(展示区)
        - footer.vue(底部)

## 全局组件和局部组件

    + 全局组件
    在 vue.js 中我们可以使用 Vue.component(tagName, options) 进行全局注册，例如
        Vue.component('my-component', {
        // 选项
        })
    + 局部组件
    Vue.js 也同样支持局部注册，我们可以在一个组件内部使用 components 选项做组件的局部注册，例如：
        import HelloWorld from './components/HelloWorld'

        export default {
        components: {
            HelloWorld
        }
        }
    + 区别:
         全局组件是挂载在 Vue.options.components 下，而局部组件是挂载在 vm.$options.components 下，这也是全局注册的组件能被任意使用的原因

## 组件开发的优势:
    + 可以重复运用组件 


## 组件通信
    + 父子组件通信
        父组件 => 子组件 (父组件传输数据,子组件接收数据并使用)
        方法:
            v-bind 数据绑定的形式 (父通过v-bind传给子)
            props 子通过props接收父传输的数据
            数组形式: props:["父元素传来的参数"]
            对象形式: props:{
                        父元素传来的参数:当前参数类型,
                        父元素传来的参数:{
                            type:当前参数类型
                            required:true/false当前参数是否必须传递
                            default:默认值
                        }

                    }
    + 子父通信
        - 子组件通过事件向父组件传递参数
            子组件: 设置一个订阅的事件this.$emit(事件名,数据)
                <button @click="sendFatherMsg">点我告诉爸爸悄悄话</button>
                sendFatherMsg(){
                    this.$emit("footer",this.hiFather)
                }
            父组件:发布一个事件 @事件名="fn"
                //调用childSay方法
                {{footerMsg}} : <Footer @footer="childSay"/>

                childSay(data){
                    //将子组件传过来的数据渲染到页面上
                    this.footerMsg = data;
                }
    + 兄弟通信
        + 第一种方法
        | 子父子通信 (子组件通过父组件(中介)进行通信)
            子组件:(传输信息)
                设置一个订阅的事件this.$emit(事件名,数据)
                <button @click="sendFatherMsg">点我告诉爸爸悄悄话</button>
                sendFatherMsg(){
                    this.$emit("footer",this.hiFather)
                }

            父组件:(中间层)
                接收子组件(footer)传递的信息
                <Footer @footer="childSay" />
                childSay(data){
                    //将子组件传过来的数据渲染到页面上
                    this.footerMsg = data;
                }

                data() {
                    return {
                    footerMsg: "",
                    };
                },
                将接收到的子组件传递的信息 在传给另一个子组件
                <Main :footer="footerMsg" />
            子组件:(接收信息)
                props:["footer"] 接收信息
                <li>村里通电了 : {{footer}}</li> 渲染数据
        + 第二种方法
        | EventBus
            + 新建一个文件 bus.js(实例化vue)
                import Vue from 'vue';
                //实例化一个vue 
                const bus = new Vue();

                export default bus
            + 子组件(main)(传递数据)
                - 引入 bus.js
                - 绑定订阅事件
                    <button @click="hello">点我跟main通信啦</button>
                    hello(){
                        bus.$emit("hiBrother",this.message)
                    }
            + 子组件(footer)(接收数据)
                - 引入 bus.js
                - 发布事件
                    //挂载完成之后,渲染的数据
                    mounted(){
                        //发布事件(实例化vue 上面包含着子组件传输的数据)
                        bus.$on("hiBrother",(data)=>{
                            console.log(data);
                        })
                    }                
    + 爷孙组件通信(子组件的组件要在子组件注册)
    通过依赖注入方式传输数据(但是父元素数据发生改变,不会改变接收数据的一方)
        - 父组件(爷)
            通过provide方法传输数据
             provide(){
                return {
                    grand:this,
                    message:this.grand,
                }
            },
        - 子子组件(孙)(接收数据)
            通过inject接收数据
            inject:["grand","message"],
            mounted(){
                console.log(this.grand,"main-child");
                console.log(this.message);
            }

## 自定义指令
    + 局部自定义指令
         directives:{
                "click":{
                    //第一次绑定时触发的方法(只能触发一次)
                    //el:真实的元素节点 binding:对象
                    bind(el,binding,vnode){
                        console.log(el,binding,vnode)
                        if(binding.expression){
                            el.addEventListener("click",function(){
                                alert(el.innerHTML)
                            })
                        }else{
                            el.addEventListener("click",function(){
                                alert("大家好我没有值")
                            })
                        }
                    },
                    //组件创建后触发的方法
                    inserted(){
                            console.log(el,binding,vnode)
                    },
                    update(){

                    },
                    componentUpdate(){

                    },
                    unbind(){

                    }
                }
            },
    + 全局自定义指令(挂载vue上)
        Vue.directives("click",{
            bind(){

            },
            inserted(){

            },
            update(){

            },
            componentUpdate(){

            },
            unbind(){

            }

        })


拓展:局部filter 全局filter (watch)


Vue2.0 中，代码复用和抽象的主要形式是组件。然而，有的情况下，你仍然需要对普通 DOM 元素进行底层操作，这时候就会用到自定义指令

一个指令定义对象可以提供如下几个钩子函数 (均为可选)：

bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。
componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
unbind：只调用一次，指令与元素解绑时调用。

指令钩子函数会被传入以下参数：


el：指令所绑定的元素，可以用来直接操作 DOM 。
binding：一个对象，包含以下属性：
        name：指令名，不包括 v- 前缀。
        value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
        oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
        expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
        arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
        modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
vnode：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。
oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。



## 插槽
Vue 实现了一套内容分发的 API，将 <slot> 元素作为承载分发内容的出口。
没有插槽的情况下在组件标签内些一些内容是不起任何作用的，当我在组件中声明了slot元素后，在组件元素内写的内容
app.vue
    <Footer>
        <span slot="header">我是header</span>
        <span slot="footer">我是footer</span>
        <div slot-scope="props">{{grand}} | {{props.grand}}</div>
    </Footer>

+ 默认插槽   在添加插槽的组件中添加
    <slot></slot>
+ 具名插槽
    给slot命名,属性对应的内容都会和组件中name一一对应
    <header>
        <slot name="header"></slot>
    </header>
    <footer>    
        <slot name="footer"></slot>
    </footer>
+ 作用域插槽(可以传参)(就近原则)
    <slot :grand="grand"></slot>