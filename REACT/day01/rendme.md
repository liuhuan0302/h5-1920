## react 安装与使用
   + 基本概念
        react是声明式的javascript库
        react专注于V层 react函数式开发

    + jsx
        JSX是一种JavaScript的语法扩展，运用于React架构中，其格式比较像是模版语言，但事实上完全是在JavaScript内部实现的。元素是构成React应用的最小单位，JSX就是用来声明React当中的元素，React使用JSX来描述用户界面。
    
    + 安装及搭建项目
        下载：
            npm i -g create-react-app
        使用脚手架构建项目：
            create-react-app 项目名
            cd 项目名
            npm run start        

### package.json 解析
"scripts": {
    "start": "react-scripts start",//开启服务
    "build": "react-scripts build",//打包
    "test": "react-scripts test",//测试
    "eject": "react-scripts eject"//展开webpack(一旦展开,不可逆)
  },

### manifest.json   PWA 框架 

### index.html 
    兼容提示
     <noscript>You need to enable JavaScript to run this app.</noscript>

### 目录结构
    + public
    + src
        index.js 入口文件
        App.js 组件入口文件 


### react 基本操作
    + 引入 React解析jsx语法
        + import React from "react";//解析jsx 语法
            - 注册组件
            class MyFirstReactComponent extends React.Component
        + import React,{Component} from 'react';
            - 注册组件
            class MyFirstReactComponent extends Component
    
    + 存储数据及渲染数据
        constructor(props){
            super(props)
            //react中的数据都要存储在state里面
            //react 也是响应式的,只有state发生变化,render就会重新渲染
            this.state ={
                test:"小明小明"
            }
        }
     渲染数据: <p>{this.state.test}</p>
    
    + 修改数据状态
        + 第一种(不推荐)
            handleClick(){
                //事件中this 指向是undefined
                // console.log(this);
                //专门修改状态的方法
                //参数1:修改的数据 参数2:数据修改完成操作的方法
                //setState 是异步的方法
                this.setState({
                test:"小红小红"
                },_=>{
                console.log('状态修改完成')
                })
            }
        + 第二种
            this.setState((prev)=>{
                console.log(prev);//拿到的是修改之前的数据
                return {
                    test : "hahahah"
                    }
                },_=>{
                console.log('状态修改完毕')
            })


    + 绑定事件(事件一定要首字母大写)(同时用{}把事件包起)(事件中的this 指向undefiend)
        <button onMouseMove={this.handleClick}>点击我改变数据</button>
    + 修改事件中的this 指向
        //解决绑定事件中this指向问题(官方推荐) 
        this.handleClick = this.handleClick.bind(this);
        <button onClick={this.handleClick.bind(this)}>点击我改变数据</button>

    + jxs添加样式 需要用className
        className='btn'


## 渲染组件
    + 在入口文件中引入组件
        import  ToDoList from "./toDoList";

    + 渲染组件(在入口文件)
        //渲染 参数1:需要渲染的组件(渲染的组件必须大写)  参数2:需要插入的元素节点
        ReactDOM.render(<ToDoList />, document.getElementById('root'));
    + 在组件内部进行暴露
        export defalut toDoList;

## 动态修改值
    //可以接受事件对象
    handleChange(e){
        //e.target 获取的事件事件对象(标签)
        //console.log(e.target.value);//获取最新的值,但是只是每一次更新一个值
        this.setState({
            //可以这样写,是同步的
            value :e.target.value
        })
    }
