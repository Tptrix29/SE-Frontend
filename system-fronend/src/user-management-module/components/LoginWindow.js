import React from 'react';
import "../../static/style.css"
import { FloatingLabel, Form} from 'react-bootstrap';
import LoginApiClient from '../service/LoginApiClient.js';

export default class LoginWindow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            nid: "",
            password: "",
        }
    }
    componentDidMount(){
        document.getElementById('floatingPassword').click()
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
        window.focus()
    }

    handlePasswordKeyDown = (event) => {
        if(event.keyCode == 13){
            this.execLogin()
        }
    }

    execLogin = ()=>{
        var res = LoginApiClient.login(this.state.nid, this.state.password);
        console.log(res);
    }

    render(){
        return(
            <div className='login-box'>
                <div className='login-welcome'>统一身份认证</div>
                <div className="input-box">
                    <FloatingLabel controlId="floatingNid" label="学/工号" className='mt-3' onChange={(event) => this.updateNid(event)}>
                        <Form.Control type="text" placeholder="uid"/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="密码" onChange={(event) => this.updatePassword(event)} onKeyDown={(event) => this.handlePasswordKeyDown(event)} >
                        <Form.Control type="password" placeholder="Password" className='mt-3' />
                    </FloatingLabel>
                </div>
                <button id="btn" type='button' className='btn btn-primary' onClick={this.execLogin}>登录</button>
            </div>
        );
    }
}
