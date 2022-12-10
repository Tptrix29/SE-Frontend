import React from "react";
import "../../static/style.css"
import FunctionCard from "./FunctionCard";

export default class AdminPanel extends React.Component{
    constructor(props){
        super(props);
        
    }

    render(){
        return(
            <div class="home-panel">
                <FunctionCard 
                imgSource="img/library.jpeg"
                title="用户注册"
                textContent="添加新的系统用户" />
                <FunctionCard 
                imgSource="img/library.jpeg"
                title="用户查验"
                textContent="查看未查验用户信息" />
                <FunctionCard 
                imgSource="img/library.jpeg"
                title="用户管理"
                textContent="管理用户信息" />
                <FunctionCard 
                imgSource="img/library.jpeg"
                title="课程管理"
                textContent="管理课程信息" />
            </div>
        );
    }
}