import React from "react";
import "../../static/style.css"
import UserCanvas from "./UserCanvas";


export class SystemControllerBar extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div class="sys-bar">
                <img src="img/logo.png" alt="logo" width="5%"/>
                <span class="sys-title">实验教学管理系统</span>
                <div class="user-control-box">
                  <UserCanvas class="user-control-box"/>
                </div>
                
            </div>
        );
    }
}