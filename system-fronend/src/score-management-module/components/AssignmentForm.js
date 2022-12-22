import React from "react";
import '../../static/style.css';
import { InputGroup, Form, Button } from "react-bootstrap";
import { DatePicker, message, TimePicker } from "antd";
import FilePanel from '../../experiment-management-module/components/FilePanel';
import dayjs from "dayjs";
import { Utils } from "../../js-library/func-chunk";
import { AssignmentApiClient } from "../service/AssignmentApiClient";
import { WebPathConfig } from "../../config/web-path";

export default class AssignmentForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            addMode: props.addMode,
            name: props.assignmentInfo.name,
            ddl: dayjs(props.assignmentInfo.ddl),
            desp: props.assignmentInfo.desp,
        }
    }

    changeName = (event) => {
        this.setState({
            name: event.target.value,
        })
    }

    changeDesp = (event) => {
        this.setState({
            desp: event.target.value,
        })
    }

    changeDDL = (date, str) => {
        this.setState({
            ddl: date,
        })
    }

    patchRequest = () => {
        var data = {
            asid: Utils.getURLParam(window.location, "asid"),
            courseCode: Utils.getURLParam(window.location, "code"),
            description: this.state.desp,
            endTime: this.state.ddl.format('YYYY-MM-DDTHH:mm:ss'),
            name: this.state.name,
            ownerNid: this.props.assignmentInfo.ownerId,
        }

        AssignmentApiClient.modifyAssignment(data.asid, data).then(resp => {
            // console.log(resp.data);
            this.redirect2AssPage(resp.data.asid);
        }).catch(err => {
            console.log(err);
            message.error("修改失败")
        })
    }

    postRequest = () => {
        var data = {
            name: this.state.name,
            description: this.state.desp,
            end: this.state.ddl.format('YYYY-MM-DDTHH:mm:ss'),
            courseCode: Utils.getURLParam(window.location, 'code'),
            owner: this.props.assignmentInfo.ownerId,
        }

        AssignmentApiClient.addAssignment(data).then(resp => {
            this.redirect2AssPage(resp.data.asid);
            // console.log(resp.data);
        }).catch(err => {
            console.log(err);
            message.error("创建失败");
        })
    }

    redirect2AssPage = (asid) => {
        WebPathConfig.toURL("/course/assignment", {
            token: Utils.getURLParam(window.location, 'token'),
            code: Utils.getURLParam(window.location, 'code'),
            asid: asid,
        })
    }

    

    render(){
        // console.log(this.state.ddl.valueOf());
        return(
            <div>
                <InputGroup className="mb-3">
                    <InputGroup.Text>创建者</InputGroup.Text>
                        <Form.Control value={this.props.assignmentInfo.owner} disabled/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                    <InputGroup.Text>名称</InputGroup.Text>
                        <Form.Control value={this.state.name} onChange={(event) => this.changeName(event)}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>截止时间</InputGroup.Text>
                        <DatePicker defaultValue={this.state.ddl} value={dayjs(this.state.ddl)} onChange={(date, str) => {this.changeDDL(date, str)}} allowClear={false}/>
                        <TimePicker defaultValue={this.state.ddl} value={dayjs(this.state.ddl)} onChange={(date, str) => {this.changeDDL(date, str)}} allowClear={false} minuteStep={5} format="HH:mm:ss" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>作业描述</InputGroup.Text>
                        <Form.Control value={this.state.desp} as="textarea"onChange={(event) => this.changeDesp(event)}/>
                    </InputGroup>
                                    
                    <div>相关文件：</div>
                    <FilePanel isEditable={true}/><br/>
                    <Button variant="outline-success" onClick={this.state.addMode ? this.postRequest : this.patchRequest}>确认</Button>
            </div>
        );
    }
}