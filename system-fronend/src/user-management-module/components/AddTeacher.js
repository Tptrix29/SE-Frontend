import React from 'react';
import "../../static/style.css"
import { InputGroup, Form, Button} from 'react-bootstrap';
import { UserApiClient } from '../service/UserApiClient';
import { TokenApiClient } from '../service/TokenApiClient';
import { WebPathConfig } from "../../config/web-path";
import { Utils } from '../../js-library/func-chunk';
import { CourseApiClient } from "../../course-management-module/service/CourseApiClient";
import { message } from 'antd';

export default class AddTeacher extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            code: Utils.getURLParam(window.location, "code"),

            isNidValid: false,
            nid: "",
            roleSelection: "0",
        }
    }


    updateNid = (event) => {
        this.setState({
            nid: event.target.value,
            isNidValid: Utils.checkNid(event.target.value)
        })
    }

    updateRole = (event) => {
        this.setState({
            roleSelection: event.target.value
        })
    }
    
    addTeacher = async () => {
        var name = await UserApiClient.retrieve(this.state.nid).then(resp => {
            return resp.data.name;
        }).catch(err => {
            console.log(err)
            message.error("用户不存在");
        })

        var addtionData = {
            name: name,
            nid: this.state.nid,
            role: this.state.roleSelection,
        }
        await CourseApiClient.addTeacher(this.state.code, addtionData).then(resp => {
            message.success(`${this.state.nid} 成功添加为 ${this.state.roleSelection}`);
            this.props.addAction(addtionData);
        }).catch(err => {
            console.log(err);
        })
    }

    
    render(){
        return(
            <div>
                    <InputGroup className="mb-3">
                        请输入教师编号: 
                    </InputGroup>
                    <InputGroup className="mb-3">
                         <InputGroup.Text>教师编号</InputGroup.Text>
                        <Form.Control placeholder="请输入" required value={this.state.nid} onChange={this.updateNid} isValid={this.state.isNidValid}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        请选择教师身份: 
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text>身份</InputGroup.Text>
                        <select className="form-select" id="inputGroupSelect01" value={this.state.roleSelection} onChange={this.updateRole}>
                            <option value="0">Choose...</option>
                            <option value="CHARGING_TEACHER">责任教师</option>
                            <option value="TEACHER">教师</option>
                            <option value="ASSISTANT">助教</option>
                        </select>
                    </InputGroup>
                    <br/>
                    <Button variant='outline-dark' onClick={(event) => {this.addTeacher()}}>确认</Button>
            </div>
        );
    }
}
