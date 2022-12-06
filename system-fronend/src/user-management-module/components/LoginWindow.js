import React from 'react';
import "../../static/style.css"
import { FloatingLabel, Form, InputGroup } from 'react-bootstrap';

export default class LoginWindow extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div class='login-box'>
                <div class='login-welcome'>统一身份认证</div>
                <div class="input-box">
                    <FloatingLabel controlId="floatingUid" label="学/工号" className='mt-3'>
                        <Form.Control type="text" placeholder="uid"/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="密码">
                        <Form.Control type="password" placeholder="Password" className='mt-3'/>
                    </FloatingLabel>
                </div>
                <button type='button' className='btn btn-primary'>登录</button>
            </div>
        );
    }
}
