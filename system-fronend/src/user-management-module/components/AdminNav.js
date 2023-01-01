import React from 'react';
import { Utils } from '../../js-library/func-chunk';
import { WebPathConfig } from '../../config/web-path';
import "../../static/style.css"

export default class AdminNav extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            token: Utils.getURLParam(window.location, 'token'),
            links:{
                home: '/admin',
                register: '/admin/register',
                check: '/admin/check',
                manage: '/admin/user_manage',
                course: '/admin/manage_course'
            }
        }
    }

    toURL = (path) =>{
        WebPathConfig.toURL(path, {
            token: this.state.token
        })
    }

    render(){
        return(
            <ul className="nav flex-column side-nav">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" onClick={()=>this.toURL(this.state.links.home)}>控制面板</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={()=>this.toURL(this.state.links.register)}>用户注册</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={()=>this.toURL(this.state.links.check)}>用户查验</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={()=>this.toURL(this.state.links.manage)}>用户管理</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={()=>this.toURL(this.state.links.course)}>课程管理</a>
                </li>
                
            </ul>
        );
    }
}