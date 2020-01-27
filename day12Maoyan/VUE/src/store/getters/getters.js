export default {
    getUserInfo(state){
        //state 是全局状态 
         return state.name + "|" + state.sex;
    }
}