import React from "react";
import '../static/style.css'
import UserCanvas from "./UserCanvas";
var bootstrap = require("bootstrap");


export default class UserControllerBar extends React.Component{
    constructor(props){
        super(props);
        
    }
    

    render(){
        return(
            <div class="sys-bar">
                <span class="sys-title">实验教学管理系统</span>
                <div class="user-control-box">
                  <UserCanvas class="user-control-box"/>
                </div>
                
            </div>
        );
    }
}