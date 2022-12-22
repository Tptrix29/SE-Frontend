import React from "react";
import '../../static/style.css';
import { InputGroup, Form, Button } from "react-bootstrap";
import FilePanel from "./FilePanel";
import { DatePicker, TimePicker } from 'antd';
import dayjs from "dayjs";
import { Utils } from "../../js-library/func-chunk";
import { ExpApiClient } from "../service/ExpApiClient";
import { message } from 'antd';
import { WebPathConfig } from "../../config/web-path";



export default class ExpForm extends React.Component{
    constructor(props){
        super(props);
        console.log(props.expInfo.owner)
        this.state = {
            addMode: props.addMode,
            name: props.expInfo.name,
            time: dayjs(props.expInfo.time),
            equipment: props.expInfo.equipment,
            desp: props.expInfo.desp,
        }
    }

    changeName = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    changeTime = (date, str) => {
        console.log(date, str);
        this.setState({
            time: date,
        })
    } 

    changeEquipment = (event) => {
        this.setState({
            equipment: event.target.value,
        })
    }

    changeDesp = (event) => {
        this.setState({
            desp: event.target.value,
        })
    }

    patchRequest = () => {
        var data = {
            courseCode: Utils.getURLParam(window.location, 'code'),
            description: this.state.desp,
            eid: Utils.getURLParam(window.location, 'eid'), 
            equipments: this.state.equipment,
            name: this.state.name,
            ownerNid: this.props.expInfo.ownerId,
            startTime: this.state.time.format("YYYY-MM-DDTHH:mm:ss"),
        }
        ExpApiClient.modifyExperiment(data).then(resp => {
            // console.log(resp.data)
            this.redirect2ExpPage(resp.data.eid);
        }).catch(err => {
            console.log(err);
        })
    }

    postRequest = () => {
        var data = {
            courseCode: Utils.getURLParam(window.location, 'code'),
            description: this.state.desp,
            eid: null, 
            equipments: this.state.equipment,
            name: this.state.name,
            ownerNid: this.props.expInfo.ownerId,
            startTime: this.state.time.format("YYYY-MM-DDTHH:mm:ss"),
        }
        ExpApiClient.addExperiment(data).then(resp => {
            // console.log(resp.data);
            this.redirect2ExpPage(resp.data.eid);
        }).catch(err => {
            message.error("创建失败")
            console.log(err)
        })
    }

    redirect2ExpPage = (eid) => {
        WebPathConfig.toURL("/course/exp", {
            token: Utils.getURLParam(window.location, "token"),
            code: Utils.getURLParam(window.location, "code"),
            eid: eid,
        })
    }

    render(){
        return(
            <div>
                <InputGroup className="mb-3">
                    <InputGroup.Text>创建者</InputGroup.Text>
                    <Form.Control placeholder={this.props.expInfo.owner} disabled/>
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text>实验名称</InputGroup.Text>
                    <Form.Control value={this.state.name} onChange={this.changeName}/>
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text>上课时间</InputGroup.Text>
                    <DatePicker defaultValue={this.state.time} value={dayjs(this.state.time)} onChange={(date, str) => {this.changeTime(date, str)}} allowClear={false}/>
                    <TimePicker defaultValue={this.state.time} value={dayjs(this.state.time)} onChange={(date, str) => {this.changeTime(date, str)}} allowClear={false} format="HH:mm:ss" minuteStep={5} hourStep={1}/>
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text>相关器材</InputGroup.Text>
                    <Form.Control value={this.state.equipment} as="textarea" onChange={(event) => this.changeEquipment(event)}/>
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text>实验描述</InputGroup.Text>
                    <Form.Control value={this.state.desp} as="textarea" onChange={(event) => this.changeDesp(event)}/>
                </InputGroup>
                                    
                <div>相关文件：</div>
                <FilePanel isEditable={true}/><br/>
                <Button variant="success" className="mt-3" onClick={this.state.addMode ? this.postRequest : this.patchRequest}>确认</Button>
            </div>
        );
    }
}