import React from 'react';
import "../../static/style.css"
import { InputGroup, Form, Button} from 'react-bootstrap';
import { UserApiClient } from '../service/UserApiClient';
import { TokenApiClient } from '../service/TokenApiClient';
import { WebPathConfig } from "../../config/web-path";
import { Utils } from '../../js-library/func-chunk';
import AlertTip from '../components/AlertTip';
import { CourseApiClient } from '../../course-management-module/service/CourseApiClient';
import { message } from 'antd';

export default class AddStudent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            code: Utils.getURLParam(window.location, "code"),
            isNidValid: false,
            nid: "",
        }
    }

    updateNid = (event) => {
        this.setState({
            nid: event.target.value,
            isNidValid: Utils.checkNid(event.target.value)
        })
    }

    addStudent = async () => {
        var name = await UserApiClient.retrieve(this.state.nid).then(resp => {
            return resp.data.name;
        }).catch(err => {
            console.log(err);
        })
        
        var data = {
            name: name, 
            nid: this.state.nid,
            score: 0
        }

        await CourseApiClient.addStudent(this.state.code, data).then(resp=>{
            message.success(`${this.state.nid} 成功添加为学生`);
            this.props.addAction(data);
        }).catch(err => {
            console.log(err);
            message.error(`${this.state,nid} 添加失败`);
        })
    }
   

    render(){
        return(
            <div>
                <div>
                    <InputGroup className="mb-3">
                        请输入7位数字学号: 
                    </InputGroup>
                    <InputGroup className="mb-3">
                         <InputGroup.Text>学/工号</InputGroup.Text>
                        <Form.Control placeholder="请输入" required value={this.state.nid} onChange={this.updateNid} isValid={this.state.isNidValid}/>
                    </InputGroup>
                    <Button variant='outline-dark' onClick={this.addStudent}>确认</Button>
                    </div>
            </div>
        );
    }
}
