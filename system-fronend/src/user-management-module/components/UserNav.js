import React from 'react';
import { WebPathConfig } from '../../config/web-path';
import { Utils } from '../../js-library/func-chunk';
import "../../static/style.css"

export default class UserNav extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            token: Utils.getURLParam(window.location, 'token'),
        }
    }

    backHome = () => {
        WebPathConfig.toURL('/user', {token: this.state.token})
    }

    render(){
        return(
            <ul className="nav flex-column side-nav">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">控制面板</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link ">高等数学</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">大学英语</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">线性代数</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link ">面向对象编程</a>
                </li>
            </ul>
        );
    }
}