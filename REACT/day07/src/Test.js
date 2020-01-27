import React,{Component} from "react";
import advanced from "./Advanced";

class Test extends Component{
    
    render(){
        console.log(this.props.name)
        return(
            <div>
                Test!!!!
            </div>
        )
    }
}


//可以使该组件共享高级组件的功能
export default advanced(Test);