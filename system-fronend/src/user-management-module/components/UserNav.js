import React from 'react';
import "../../static/style.css"

export default class UserNav extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <ul class="nav flex-column side-nav">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">控制面板</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link ">高等数学</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">大学英语</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">线性代数</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link ">面向对象编程</a>
                </li>
            </ul>
        );
    }
}