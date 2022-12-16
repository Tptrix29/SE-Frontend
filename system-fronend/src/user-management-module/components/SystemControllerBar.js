import React from "react";
import "../../static/style.css"
import UserCanvas from "./UserCanvas";
import { Button } from "react-bootstrap";
import logo from '../../../public/img/logo.png'
import { Utils } from "../../js-library/func-chunk";
import { TokenApiClient } from "../service/TokenApiClient";
import { WebPathConfig } from "../../config/web-path";


export class SystemControllerBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            token: Utils.getURLParam(window.location, 'token'),
            nid: null,
            isAdmin: null,
        }
    }

    componentDidMount(){
        TokenApiClient.verify(this.state.token).then((resp) => {
            console.log(resp.data)
            this.setState({
                nid: resp.data.nid,
                isAdmin: resp.data.isAdmin,
            })
            console.log(this.state.nid);
        }).catch((err)=>{
            console.log(err.response.status)
            WebPathConfig.redirectToLogin()
        });
    }

    toLib = () =>{
        WebPathConfig.toURL('/lib', {
            token: this.state.token,
        });
    }

    render(){
        return(
            <div className="sys-bar">
                <img src={logo} alt="logo" width="5%"/>
                <span className="sys-title">
                    实验教学管理系统&nbsp;&nbsp;
                    <Button variant="outline-success" onClick={this.toLib}>资料库</Button>
                </span>
                
                <div className="user-control-box">
                  <UserCanvas className="user-control-box"/>
                </div>
            </div>
        );
    }
}