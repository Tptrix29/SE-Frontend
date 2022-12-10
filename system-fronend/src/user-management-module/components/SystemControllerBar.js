import React from "react";
import "../../static/style.css"
import UserCanvas from "./UserCanvas";
import { Button } from "react-bootstrap";
import logo from '../../../public/img/logo.png'


export class SystemControllerBar extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div class="sys-bar">
                <img src={logo} alt="logo" width="5%"/>
                <span class="sys-title">实验教学管理系统</span>&nbsp;
                <Button variant="outline-success">资料库</Button>
                <div class="user-control-box">
                  <UserCanvas class="user-control-box"/>
                </div>
            </div>
        );
    }
}