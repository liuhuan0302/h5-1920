export default {
    //参数:当前的state状态 data:修改的数据
    updateTest(state,obj){
        //修改状态中的值
        console.log(obj.data)
        state.test = obj.data1;
    },
    //对getter里面的值进行修改
    updateName(state,data){
        state.name = data;
    }
}