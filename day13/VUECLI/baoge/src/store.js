import Vue from "vue"
import Vuex from "./vuex-module";

Vue.use(Vuex)//安装store

//实例化
export default new Vuex.Store({
    state:{
        count:1000
    },
    getters:{
        newCount (state){
            return state.count + 100
        }
    },
    mutations:{
        change(state){
            console.log(state.count)
            state.count += 10
        }
    },
    actions:{
        change({commit}){
            //模拟异步
            setTimeout(()=>{
                commit('change')
            },1000)
        }
    }
})


/*

通过上面的，我们可以看出，其实mutations和actions都是把传入的参数，赋值到store实例上的this.mutations和this.actions对象里面。

当组件中this.$store.commit('change')的时候 其实是调用this.mutations.change(state)，就达到了改变数据的效果，actions同理。

getters是通过对Object.defineProperty(this.getters, getterName, {})
对this.getters进行包装当组件中this.$store.getters.newCount其实是调用getters对象里面的newCount(state)，然后返回计算结果。就可以显示到界面上了。

*/