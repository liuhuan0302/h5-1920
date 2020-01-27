import React ,{Component,Fragment} from "react";
import List from "./List";
// import axios from "axios"
class ToDoList extends Component{
    constructor(props){
        super(props)
        this.state = {
            value:"123",
            arrList:[]
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSend = this.handleSend.bind(this)
    }
    handleSend(){
        //将input输入的值输入到input里面
        const arrList = [...this.state.arrList,this.state.value]
        this.setState(()=>{
           return {
                arrList,
                value:"",//插入之后,删除input里面的值
           }
        })
    }
    handleChange(e){
        console.log(e.target.value)//获取input 输入的值
        const value = e.target.value;
        this.setState(()=>{
            return {
                value
            }
           
        },_=>{
            console.log(value)
        })
    }
    handleDelete(i){
        this.setState((prev)=>{
            //prev 是以前的数据
            console.log(prev)
            prev.arrList.splice(i,1) 
            return {
                arrList:prev.arrList
            }
        })
    }
    //组件将要挂载
    componentWillMount(){
        console.log(" componentWillMount")
    }
    //组件挂载完成
    componentDidMount(){
        console.log("componentDidMount ")
    }
    render(){
        console.log("render")
        return (
            <Fragment>
                {this.props.name}<input type='text' value={this.state.value} onChange={this.handleChange}></input>
                <button onClick={this.handleSend}> 插入数据</button>
                <ul>
                    {
                        this.state.arrList.map((item,index)=>{
                            //在向父组件传递方法时,一定要记住方法中的this 指向问题
                            return <List 
                                key={index} 
                                item={item} 
                                index={index} 
                                handleDelete ={this.handleDelete.bind(this)}/>
                        })
                    }
                </ul>
                <div>123</div>
            </Fragment>
        )
    }
    //state改变会进行询问,如果为true,则触发
    //状态发生改变,是否要更新组件?
    shouldComponentUpdate(props,state){
        console.log(props,state)
        console.log("shouldComponentUpdate")
        return true
        // if(state.value === '2'){
            // return true
        // }else{
        //     return false
        // }
        //console.log("shouldComponentUpdate")
        //return false //为false则不会进行下面的生命周期函数(也不会渲染)
         
    }
    // //组件将要更新
    // componentWillUpdate(){
    //     console.log("componentWillUpdate")
    // }
    // //组件更新完成
    // componentDidUpdate(){
    //     console.log("componentDidUpdate")
    // }
}

export default ToDoList;