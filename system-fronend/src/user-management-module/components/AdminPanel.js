import React from "react";
import { Utils } from "../../js-library/func-chunk";
import "../../static/style.css"
import FunctionCard from "./FunctionCard";

import libImg from '../../../public/img/library.jpeg';

export default class AdminPanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            token: Utils.getURLParam(window.location, 'token')
        }
    }

    render(){
        return(
            <div className="home-panel">
                <FunctionCard 
                imgSource={libImg}
                title="用户注册"
                textContent="添加新的系统用户" link='/admin/register' linkParams={{token: this.state.token}}/>
                <FunctionCard 
                imgSource={libImg}
                title="用户查验"
                textContent="查看未查验用户信息" link='/admin/check'  linkParams={{token: this.state.token}}/>
                <FunctionCard 
                imgSource={libImg}
                title="用户管理"
                textContent="管理用户信息" link='/admin/user_manage' linkParams={{token: this.state.token}}/>
                <FunctionCard 
                imgSource={libImg}
                title="课程管理"
                textContent="管理课程信息" link='/admin' linkParams={{token: this.state.token}}/>
            </div>
        );
    }
}