import React from 'react';
import "../../static/style.css"

export default class AdminNav extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <ul className="nav flex-column side-nav">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">控制面板</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link ">用户注册</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">用户查验</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">用户管理</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link ">课程管理</a>
                </li>
                
            </ul>
        );
    }
}