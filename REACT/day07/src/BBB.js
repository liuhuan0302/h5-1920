import React,{Component} from "react";
import Buttom from "./component/btn"
class BBB extends Component{
    render(){
        return(
            <div>
                <div >BBBBBBB | {this.props.match.params.id}</div>
                <Buttom />
            </div>
        )
    }
  }

  export default  BBB;