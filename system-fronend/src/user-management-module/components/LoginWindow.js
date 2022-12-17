import React from 'react';
import "../../static/style.css"
import { FloatingLabel, Form} from 'react-bootstrap';
import LoginApiClient from '../service/LoginApiClient.js';
import { WebPathConfig } from '../../config/web-path';
import AlertTip from '../components/AlertTip';

export default class LoginWindow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            nid: "",
            password: "",
            alertInfo:{
                visible: false,
                tip: '',
            }
        }
    }
    componentDidMount(){
        // console.log(window.location)
        
    }

    updateNid = (event)=>{
        // console.log(event.target.value);
        this.setState({
            nid: event.target.value,
        })
    }

    updatePassword = (event)=>{
        // console.log(event.target.value);
        this.setState({
            password: event.target.value,
        });
    }

    handleNidKeyDown = (event) => {

    }

    handlePasswordKeyDown = (event) => {
        if(event.keyCode == 13){
            this.execLogin()
        }
    }

    showAlertInfo = (info) => {
        // console.log(info, this.state.alertInfo.visible)
        this.setState({
            alertInfo:{
                visible: true,
                tip: info,
            },
        })
    }

    setInvisible = () => {
        this.setState({
            alertInfo:{
                visible: false,
            },
        })
    }

    execLogin = () => {
        return LoginApiClient.login(this.state.nid, this.state.password).then((resp) => {
            WebPathConfig.toURL((resp.data.isAdmin ? '/admin':'/user'), {
                token: resp.data.token
            })
        }).catch((err) => {
            console.log(err)
            if(err.response.status == '403')
                this.showAlertInfo("用户信息错误，请重新输入")
            else
                this.showAlertInfo("其它错误\n" + err.response.status + ': '+err.code)
            this.setState({
                password: ''
            })
        })
    }

    render(){
        return(
            <div className='login-box'>
                <div className='login-welcome'>统一身份认证</div>
                <div className="input-box">
                    <FloatingLabel controlId="floatingNid" label="学/工号" className='mt-3' >
                        <Form.Control type="text" placeholder="uid"  value={this.state.nid} onChange={(event) => this.updateNid(event)} />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="密码" >
                        <Form.Control type="password" placeholder="Password" className='mt-3' value={this.state.password} onChange={(event) => this.updatePassword(event)} onKeyDown={(event) => this.handlePasswordKeyDown(event)} />
                    </FloatingLabel>
                </div>
                <button type='button' className='btn btn-primary' onClick={this.execLogin}>登录</button>

                <AlertTip visible={this.state.alertInfo.visible} info={this.state.alertInfo.tip} close={this.setInvisible}/>
            </div>
        );
    }
}
