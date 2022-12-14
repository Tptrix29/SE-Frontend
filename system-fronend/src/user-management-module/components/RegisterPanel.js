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
            // registeration info
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
            this.showAlertInfo('???/??????????????????')
        else if(!this.state.username)
            this.showAlertInfo('?????????????????????')
        else if(!this.state.email)
            this.showAlertInfo('??????????????????')
        else if(!this.state.password1)
            this.showAlertInfo('??????????????????')
        else if(!(this.state.isNidValid && this.state.isUsernameValid && this.state.isEmailValid && this.state.isPwdValid && this.state.isSamePwd))
            this.showAlertInfo('??????????????????????????????????????????')
        else
            TokenApiClient.verify(Utils.getURLParam(window.location, 'token')).catch(err => {
                console.log(err);
                this.showAlertInfo("???????????????????????????????????????")
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
                this.showAlertInfo('?????????????????????')
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
                    this.showAlertInfo("???/??????????????????")
                    this.setState({
                        nid: "",
                        isNidValid: false,
                    })
                }
                else
                    this.showAlertInfo("????????????\n" + err.response.status + ': '+err.code)
            })
    }

    render(){
        return(
            <div className="page-panel">
                <div className="page-info-center">
                    <div className="page-title">???????????????</div>
                    <InputGroup className="mb-3">
                        ?????????7???????????????: 
                    </InputGroup>
                    <InputGroup className="mb-3">
                         <InputGroup.Text>???/??????</InputGroup.Text>
                        <Form.Control placeholder="?????????" required value={this.state.nid} onChange={this.updateNid} isValid={this.state.isNidValid}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        ??????????????????:
                    </InputGroup>
                    <InputGroup className="mb-3">
                         <InputGroup.Text >?????????</InputGroup.Text>
                        <Form.Control placeholder="?????????" required value={this.state.username} onChange={this.updateUsername} isValid={this.state.isUsernameValid}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        ???????????????: 
                    </InputGroup>
                    <InputGroup className="mb-3">
                         <InputGroup.Text >??????</InputGroup.Text>
                        <Form.Control placeholder="?????????" required value={this.state.email} onChange={this.updateEmail} isValid={this.state.isEmailValid}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        ???????????????: 8???, ????????????????????????????????????
                    </InputGroup>
                    <InputGroup className="mb-3">
                         <InputGroup.Text>??????</InputGroup.Text>
                        <Form.Control placeholder="???????????????" value={this.state.password1} type='password' required onChange={this.updatePassword1} isValid={this.state.isPwdValid}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        ?????????????????????: 
                    </InputGroup>
                    <InputGroup className="mb-3">
                         <InputGroup.Text >????????????</InputGroup.Text>
                        <Form.Control placeholder="???????????????" value={this.state.password2} type='password' required onChange={this.updatePassword2} isValid={this.state.isSamePwd && this.state.isPwdValid} />
                    </InputGroup>
                    <Button variant='outline-dark' onClick={this.register}>??????</Button>
                </div>
                <AlertTip visible={this.state.alertInfo.visible} 
                info={this.state.alertInfo.tip} close={this.setInvisible}/>
            </div>
        );
    }
}
