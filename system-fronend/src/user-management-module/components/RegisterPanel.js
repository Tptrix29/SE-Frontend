import React from 'react';
import "../../static/style.css"
import { InputGroup, Form, Button} from 'react-bootstrap';
import { UserApiClient } from '../service/UserApiClient';
import { TokenApiClient } from '../service/TokenApiClient';
import { WebPathConfig } from "../../config/web-path";
import { Utils } from '../../js-library/func-chunk';
import AlertTip from '../components/AlertTip';

export default class RegisterPanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isSamePwd: false,
            isEmailValid: false,
            isPwdValid: false,
            isNidValid: false,
            isUsernameValid: false,
            
            alertInfo:{
                visible: false,
                tip: "",
            },

            nid: "",
            username: "",
            password1: "",
            password2: "",
            email: "",
        }
    }

    updateNid = (event) => {
        this.setState({
            nid: event.target.value,
            isNidValid: Utils.checkNid(event.target.value)
        })
    }
    updateUsername = (event) => {
        this.setState({
            username: event.target.value,
            isUsernameValid: 0 < Utils._length(event.target.value) < 256
        })
    }
    updateEmail = (event) => {
        this.setState({
            email: event.target.value,
            isEmailValid: Utils.checkEmail(event.target.value)
        })
    }

    updatePassword1 = (event) => {
        this.setState({
            password1: event.target.value,
            isSamePwd: (this.state.password2 == event.target.value) && event.target.value,
            isPwdValid: Utils.checkPwd(event.target.value),
        })
    }

    updatePassword2 = (event) => {
        this.setState({
            password2: event.target.value,
            isSamePwd: (this.state.password1 == event.target.value) && event.target.value
        })
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

    register = () => {
        if(!this.state.nid)
            this.showAlertInfo('学/工号不能为空')
        else if(!this.state.username)
            this.showAlertInfo('用户名不能为空')
        else if(!this.state.email)
            this.showAlertInfo('邮箱不能为空')
        else if(!this.state.password1)
            this.showAlertInfo('密码不能为空')
        else if(!(this.state.isNidValid && this.state.isUsernameValid && this.state.isEmailValid && this.state.isPwdValid && this.state.isSamePwd))
            this.showAlertInfo('请按提示输入符合要求的数据！')
        else
            TokenApiClient.verify(Utils.getURLParam(window.location, 'token')).catch(err => {
                console.log(err);
                this.showAlertInfo("登录失效，请重新登录后再试")
                WebPathConfig.redirectToLogin();
            }).then(resp => {
                return UserApiClient.registerOne({
                    nid: this.state.nid,
                    name: this.state.username,
                    email: this.state.email,
                    password: Utils.encrypt(this.state.password1),
                })
            }).then(resp => {
                // console.log(resp)
                this.showAlertInfo('用户创建成功！')
                this.setState({
                    isSamePwd: true,
                    nid: "",
                    username: "",
                    password1: "",
                    password2: "",
                    email: "",

                    isSamePwd: false,
                    isEmailValid: false,
                    isPwdValid: false,
                    isNidValid: false,
                    isUsernameValid: false,
                })
            }).catch(err => {
                console.log(err);
                if(err.response.status == '400'){
                    this.showAlertInfo("学/工号已被占用")
                    this.setState({
                        nid: "",
                        isNidValid: false,
                    })
                }
                else
                    this.showAlertInfo("其它错误\n" + err.response.status + ': '+err.code)
            })
    }

    render(){
        return(
            <div className="page-panel">
                <div className="page-info-center">
                    <div className="page-title">注册新用户</div>
                    <InputGroup className="mb-3">
                        请输入7位数字学号: 
                    </InputGroup>
                    <InputGroup className="mb-3">
                         <InputGroup.Text>学/工号</InputGroup.Text>
                        <Form.Control placeholder="请输入" required value={this.state.nid} onChange={this.updateNid} isValid={this.state.isNidValid}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        请输入用户名:
                    </InputGroup>
                    <InputGroup className="mb-3">
                         <InputGroup.Text >用户名</InputGroup.Text>
                        <Form.Control placeholder="请输入" required value={this.state.username} onChange={this.updateUsername} isValid={this.state.isUsernameValid}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        请输入邮箱: 
                    </InputGroup>
                    <InputGroup className="mb-3">
                         <InputGroup.Text >邮箱</InputGroup.Text>
                        <Form.Control placeholder="请输入" required value={this.state.email} onChange={this.updateEmail} isValid={this.state.isEmailValid}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        请输入密码: 8位, 包含数字、字母、特殊字符
                    </InputGroup>
                    <InputGroup className="mb-3">
                         <InputGroup.Text>密码</InputGroup.Text>
                        <Form.Control placeholder="请输入密码" value={this.state.password1} type='password' required onChange={this.updatePassword1} isValid={this.state.isPwdValid}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        请再次输入密码: 
                    </InputGroup>
                    <InputGroup className="mb-3">
                         <InputGroup.Text >确认密码</InputGroup.Text>
                        <Form.Control placeholder="请确认密码" value={this.state.password2} type='password' required onChange={this.updatePassword2} isValid={this.state.isSamePwd && this.state.isPwdValid} />
                    </InputGroup>
                    <Button variant='outline-dark' onClick={this.register}>确认</Button>
                </div>
                <AlertTip visible={this.state.alertInfo.visible} 
                info={this.state.alertInfo.tip} close={this.setInvisible}/>
            </div>
        );
    }
}
