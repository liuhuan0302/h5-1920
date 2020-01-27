let Vue = null

/*
传进来的state对象，通过new Vue({data: {state}})的方式，让数据变成响应式的。当访问state对象时候，就直接返回响应式的数据，这样子在App.vue中就可以通过this.$store.state.count拿到state的数据啦，并且是响应式的呢。

*/

//循环对象的工具函数 循环obj中的key中,并把对象传入到回调中
// 作用：
// 例如{a: '123'}， 把对象的key和value作为参数
// 然后就是函数运行callback(a, '123')
const  myforEach = (obj,callback) => Object.keys(obj).forEach(key=> callback(key,obj[key]))

//实例化store
class Store{
    constructor(options){
        //拿到传进来的参数
        let {state,getters,actions,mutations} = options
        this.getters = {}
        this.mutations ={}
        this.actions = {}
        //vuex 的核心就是借用vue的实例,因为vuex的数据更改回更新视图
        this._vm = new Vue({
            data:{
                state
            }
        })
         //循环getters的对象
        myforEach(getters,(getterName,getterFn)=>{
            //console.log(getters)//getters 对象
            //console.log(getterName) newCount
            //console.log(getterFn) 后面跟的函数
            //对this.getters对象进行包装,和vue的computed的差不多
            // 例如 this.getters['newCount'] = fn(state)(newCount 是getters里面传入的方法)(将this.getters转化为fn(state))
            // 执行 this.getters['newCount']()就会返回计算的数据啦
            Object.defineProperty(this.getters,getterName,{
                get:()=>getterFn(state)
            })
        })
        //这里是mutations各个key和值都写到,this.mutations对象上面
        // 执行的时候就是例如：this.mutations['change']()
        myforEach(mutations,(mutationName,mutationsFn)=>{
            //console.log(mutations);{change: ƒ}
            //console.log(mutationName)change
            //console.log(mutationsFn)
            // this.mutations.change = () => { change(state) }
            
            this.mutations[mutationName] = ()=>{
                //更改this指向,将this值到当前
                mutationsFn.call(this,state)
            }
            //console.log(this.mutations[mutationName])
        })
        //原理同上
        myforEach(actions,(actionName,actionFn)=>{
            // this.mutations.change = () => { change(state) }
            this.actions[actionName] = ()=>{
                actionFn.call(this,this)
            }
        })
        const {commit,dispatch} = this //先存一份，避免this.commit会覆盖原型上的this.commit
        //console.log(this)
        // 解构 把this绑定好
        // 通过结构的方式也要先调用这类，然后在下面在调用原型的对应函数
        this.commit = type =>{
            //console.log(type)//type 是事件类型change
            commit.call(this,type)
        }
        this.dipatch = type => {
            dispatch.call(this,type)
        }
    }
    //访问state 对象时候,直接返回响应式的数据
    get state(){
        //Object.defineProperty get同理
        return this._vm.state
    }
    //commit调用(commit方法中包含了mutations 方法)
    commit (type){
        this.mutations[type]()
    }
    //dispatch调用
    dispatch(type){
        this.actions[type]()
    }
}

//Vue.use(Vuex)
const install = _Vue =>{
     //_Vue是vue的实例
    //避免vuex的重复安装
    if(Vue === _Vue) return
    Vue = _Vue
    Vue.mixin({
        //通过mixins让每一个组件实例化的时候都会执行下面的beforeCreate
        beforeCreate(){
            //只有根节点才有store配置,所以这里只有一次
            if(this.$options && this.$options.store){
                //将根节点的store实例赋给this.$store
                this.$store = this.$options.store
            }else if(this.$parent && this.$parent.$store){
                //子组件深度优先 父 - 子 - 孙
                // console.log(this.$parent) vue 实例
                this.$store = this.$parent.$store
            }
        }
    })
}

export default {install,Store}


/*
在我们的代码中export default { install, Store }导出了一个对象，分别是install和Store

install的作用是，当Vue.use(Vuex)就会自动调用install方法，在install方法里面，我们用mixin混入了一个beforeCreate的生命周期的钩子函数，使得当每个组件实例化的时候都会调用这个函数。

在beforeCreate中，第一次根组件通过store属性挂载$store，后面子组件调用beforeCreate挂载的$store都会向上找到父级的$store，这样子通过层层向上寻找，让每个组件都挂上了一个$store属性，而这个属性的值就是我们的new Store({...})的实例。如下图

*/ 


/*
    主要实现步骤:
        1.install
            + 主要通过mixin(混入),在每一个组件都要混入了store,并通过this.$parent在每一个组件上都混入了$store
        2.store(实例)
            + 将传入的options(配置项)进行初始haul
            + 将state 注入到vue实例中,实现state的响应式
                this._vm = new Vue({
                    data:{
                        state
                    }
                })
            + 对getters进行循环遍历(并对每一进行数据劫持)(通过get,当每一次触发getters时,都会返回一个newCount(State),进行计算)
                getters是通过对Object.defineProperty(this.getters, getterName, {})
                对this.getters进行包装当组件中this.$store.getters.newCount其实是调用getters对象里面的ncwCount(state)，然后返回计算结果。就可以显示到界面上了。
            + 对mutations 和 actiocs 进行遍历
                其实mutations和actcons都是把传入的参数，赋值到store实例上的this.mutations和this.actions对象c里面。

                当组件中this.$store.commit('change')的时候 其实是调用this.mutations.change(state)，就达到了改变数据的效果，actions同理。






*/