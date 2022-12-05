import React from 'react';
import '../static/style.css';


export default class LoginWindow extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div class='login-box'>
                <div class='login-welcome'>统一身份认证</div>

                <div class='login-inputs'>
                    <div class="input-group mb-3">
                        <span class="input-group-text">用户名</span>
                        <input type="text" class="form-control" placeholder="请输入用户名"/>
                    </div>

                    <div class="input-group mb-3">
                        <span class="input-group-text">密码</span>
                        <input type="password" class="form-control" placeholder="请输入密码" />
                    </div>
                </div>
                

                <button type='button' className='btn btn-primary'>登录</button>
            </div>
        );
    }
}
