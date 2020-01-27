import React,{Component} from "react";


//高级组件(函数里面嵌套组件)(返回是Advanced组件)(可以接收数据,可以传参数)
function advanced(Comp){
    return class Advanced extends Component{
        render(){
            return(
                <div>
                    {/* 将app传给test,可以实现属性共享 */}
                     <Comp {...this.props}/>
                     大家好
                </div>
            )
        }
    }
}

export default advanced;

