import React from 'react';
import "../static/style.css"

export default class AdminNav extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <ul class="nav flex-column admin-nav">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">控制面板</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link ">用户注册</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">用户查验</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">用户管理</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link ">课程管理</a>
                </li>
                
            </ul>
        );
    }
}