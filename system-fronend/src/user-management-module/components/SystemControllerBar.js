import React from "react";
import "../../static/style.css"
import UserCanvas from "./UserCanvas";
import { Button } from "react-bootstrap";
import logo from '../../../public/img/logo.png'
import { Utils } from "../../js-library/func-chunk";
import { TokenApiClient } from "../service/TokenApiClient";
import { WebPathConfig } from "../../config/web-path";
import { UserApiClient } from "../service/UserApiClient";


export class SystemControllerBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            token: Utils.getURLParam(window.location, 'token'),
            nid: '-',
            isAdmin: false,
            username: '-',
            email: '-',
            isActive: false,
        }
    }

    componentDidMount(){
        TokenApiClient.verify(this.state.token).then((resp) => {
            // console.log(resp.data)
            this.setState({
                nid: resp.data.nid,
                isAdmin: resp.data.admin,
            });
            return UserApiClient.retrieve(resp.data.nid);
        }).then((resp) => {
            // console.log(resp.data)
                this.setState({
                    username: resp.data.name,
                    email: resp.data.email,
                    isActive: resp.data.active,
                })
        }).catch((err)=>{
            alert("登录过期，请重新登录")
            console.log(err.response.status)
            WebPathConfig.redirectToLogin()
        })
    }

    signout = ()=>{
        WebPathConfig.redirectToLogin()
    }

    backHome = ()=>{
        WebPathConfig.toURL((this.state.isAdmin ? '/admin': '/user'), {token: this.state.token})
        
    }

    toLib = () =>{
        WebPathConfig.toURL('/lib', {
            token: this.state.token,
        });
    }


    render(){
        return(
            <div className="sys-bar">
                <img src={logo} alt="logo" width="5%" onClick={this.backHome}/>
                <span className="sys-title">
                    实验教学管理系统&nbsp;&nbsp;
                    <Button variant="outline-success" onClick={this.toLib}>资料库</Button>
                </span>
                
                <div className="user-control-box">
                  <UserCanvas className="user-control-box" nid={this.state.nid}
                    username={this.state.username} email={this.state.email}
                    isActive={this.state.isActive} isAdmin={this.state.isAdmin}
                    signout={this.signout}
                  />
                </div>
            </div>
        );
    }
}