export default {//store 为全局的store,  data 修改的值
    updateTestAsync(store,obj){
        setTimeout(_=>{
            //通过全局的commit触发mutations里面的updateTest的方法
            //可以直接修改data
            store.commit("updateTest",obj)
        },2000)
    }
}