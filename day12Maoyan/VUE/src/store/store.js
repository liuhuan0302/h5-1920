//引入 vuex
import Vuex from "vuex";
import state from "./state/state.js";
import mutations from "./mutations/mutations.js";
import actions from "./actions/actions.js";
import getters from "./getters/getters.js";
const createStore = ()=>{
    //new Vuex.store 实例化的仓库(注意Store 需要大写)
    const store =  new Vuex.Store({
        //state 状态
        state,
        //唯一修改状态的方法(里面的方法都是同步的)
        mutations,
        //行为 异步行为(ajax)
        actions,
        //vuex的computed
        getters,
        //配置后可以在开发人员在不是正确规范时,进行报错提醒(适合开发者)
        strict:true,
        //分模块化开发
        modules:{
            //h5模块 (可以继承父模块的属性)(可以在任何地方使用)
            h5:{
                //开启一个局部的作用域(只能通过h5进行使用) 
                namespaced:true,
                state:{
                    name:"我是h5-1920",
                    class:"1920"
                },
                //默认挂载在全局的mutations下面
                //mutations 和 actions 默认是挂载在全局下面的
                mutations:{
                    updateClass(state,data){
                        state.class = data;
                    }
                },
                actions:{
                    updateClassAsync({commit,rootState}){
                        //store 上下文(包括全局和模块内部的方法和属性)
                        //rootState 全局的状态
                        //commit 触发 mutations
                        commit ("updateClass",rootState.sex)
                    }
                }
            }
        }
    })
    //当数据发生变化了,会触发module.hot
    if(module.hot){
        console.log(222);
        module.hot.accept([
            //对下面的数据进行监控
            "./state/state",
            "./mutations/mutations",
            "./getters/getters",
            "./actions/actions"
        ],()=>{
            //当数据发生变化是,重新做一次引入
            let newState = require("./state/state").default,
                newGetters = require("./getters/getters").default,
                newActions = require("./actions/actions").default,
                newMutations = require("./mutations/mutations").default;
            //当更新
            store.hotUpdate({
                state: newState,
                getters: newGetters,
                actions: newActions,
                mutations: newMutations
            })
        })
    }
    return store
}
//注:暴露回去的是一个方法,解决在该模块中没有对vuex 进行注册的问题
export default createStore;


