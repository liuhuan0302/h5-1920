import React,{Component,useState,useEffect} from "react";
import {Route,Redirect,Switch,Link} from "react-router-dom"
// import advaned from "./Advanced"
// import Test from "./Test"
// import BBB from "./BBB"

//无状态组件(没有生命周期,不可获取参数)
//useState 给无状态组件添加状态
function NotState(props){
  console.log(props)
  //useState的参数:是给当前的无状态组件定义唯一的状态
  //userState 是一个数组(注:在解构赋值时,两个参数尽量保持一致,防止混乱)
  const [num,setNum] = useState(2);
  const [stringNum,setStringNum] = useState("123") ;
  //useEffectL类似与 生命周期componentWillMount 和 shouldComponentUpdate
  //可以在这操作真实的dom节点
  useEffect(()=>{
    console.log("state被更新了")
    document.title = num;
  })
  return(
    <div>
      <button onClick={()=>setNum(num-1)}>-</button>
      { num } | {stringNum }
      <button onClick={()=>setNum(num+1)}>+</button>
    </div>
  )
}

function A(){
  return(
    <div>AAAAAA</div>
  )
}

function B(props){
  return(
  <div>BBBBB | {props.match.params.id}
  <ul>
    <li>
      <Link to="/b/123">b123</Link>
    </li>
    <li>
      <Link to="/b/456">b456</Link>
    </li>
  </ul>
  {/* b的子路由在跳转时,会带着b组件的内容 */}
  {/* <Switch>
    <Route path="/b/:id" component={BBB}></Route>
  </Switch> */}
  </div>
  )
}
function NotFound(){
  return(
    <div>404</div>
  )
}
class App extends Component{
  constructor(props){
    super(props)
    this.state={
      isLogin:false
    }
  }
  render(){
    return(
      // <div>
      //   {/* 
      //   无状态组件
      //   <NotState/>
      //   App
      //   高级组件
      //   调用的Test并不是test.js组件,而是advanced高级组件,传参也会传递到高级组件
      //   <Test name={"APP"}></Test> */}



      //   <Link to="/home">home</Link>
      //   |
      //   <Link to="/a">aaaa</Link>
      //   |
      //   <Link to="/b">bbbb</Link>
        

      //   {/* 路由会顺序执行,直到走到最后一个,这时就需要switch(匹配到唯一的路由),匹配到合适的路由就会停止 */}
      //   <Switch>
      //     {/* <Route path="/home" component={NotState} ></Route> */}
      //     {/* render 后面可以跟一个组件,也可以直接写标签 */}
      //     {/* <Route path="/home" render={(routerProps)=><NotState {...routerProps}/>}/> */}
      //     <Route path="/home" render={(routerProps)=>!this.state.isLogin ? <NotState {...routerProps} x={1}/> : <div>请登录</div>}/>
      //     <Route path="/a" exact component={A}></Route>
      //     {/* 需要给a 添加 exact,否则路由跳转到a,就不会忘子路由跳转啦 */}
      //     <Route path="/b" component={B} exact></Route>
      //     <Route path="/b/:id" component={BBB}></Route>
      //     <Route path="/404" component={NotFound}></Route>
      //     <Redirect to="/home" from="/" exact />
      //     <Redirect to="/404" />
      //   </Switch>
      // </div>

      <div>
        App
      </div>
    )
  }
}

//暴露高级组件,并把当前组件当成参数传到高级组件里面去 (但是不会显示App,只会显示高级组件)(实现组件劫持,可以让使用的高级组件的组件都可以使用高级组件的功能 )
//export default advaned(App);

export default App;