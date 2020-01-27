import React,{Component} from "react";
import {withRouter} from "react-router-dom"
class Button extends Component{
    handleClick(){
        console.log(this.props.history.push("/home"))
    }
    render(){
        return <button onClick={this.handleClick.bind(this)}>点击跳转Home页面</button>
    }
}

export default  withRouter(Button);