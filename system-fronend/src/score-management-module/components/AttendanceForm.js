import React from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import '../../static/style.css';
import { DatePicker, TimePicker, message } from "antd";
import dayjs from "dayjs";
import { Utils } from "../../js-library/func-chunk";
import { AttendanceApiClient } from "../service/AttendanceApiCilent";
import { WebPathConfig } from "../../config/web-path";

export default class AttendanceForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            addMode: props.addMode,
            name: props.attendanceInfo.name,
            startTime: dayjs(props.attendanceInfo.startTime),
            endTime: dayjs(props.attendanceInfo.endTime),
        }
    }

    changeStartTime = (date, str) => {
        this.setState({
            startTime: date,
            endTime:date,
        })
    }

    changeEndTime = (date, str) => {
        this.setState({
            endTime: date,
        })
    }

    changeName = (event) =>{
        this.setState({
            name: event.target.value
        })
    }

    // modify
    patchRequest = () => {
        var data = {
            atid: Utils.getURLParam(window.location, "atid"),
            courseCode: Utils.getURLParam(window.location, 'code'),
            name: this.state.name,
            startTime: this.state.startTime.format('YYYY-MM-DDTHH:mm:ss'),
            endTime: this.state.endTime.format('YYYY-MM-DDTHH:mm:ss'),
            ownerNid: this.props.attendanceInfo.ownerId,
        }
        AttendanceApiClient.modifyAttendance(data.atid, data).then(resp=>{
            console.log(resp.data)
            this.redirect2AttPage(resp.data.atid);
        }).then(err => {
            console.log(err);
            message.error("修改失败");
        })
    }

    // add 
    postRequest = () => {
        var data = {
            atid: null,
            courseCode: Utils.getURLParam(window.location, 'code'),
            name: this.state.name,
            startTime: this.state.startTime.format('YYYY-MM-DDTHH:mm:ss'),
            endTime: this.state.endTime.format('YYYY-MM-DDTHH:mm:ss'),
            ownerNid: this.props.attendanceInfo.ownerId,
        }
        

        AttendanceApiClient.addAttendance(data).then(resp => {
            console.log(resp)
            this.redirect2AttPage(resp.data.atid);
        }).catch(err => {
            console.log(err);
            message.error("创建失败");
        })
    }

    redirect2AttPage = (atid) => {
        WebPathConfig.toURL("/course/attendance", {
            token: Utils.getURLParam(window.location, 'token'),
            code: Utils.getURLParam(window.location, 'code'),
            atid: atid,
        })
    }


    render(){
        return(
            <div>
                <InputGroup className="mb-3">
                    <InputGroup.Text>创建者</InputGroup.Text>
                        <Form.Control placeholder={this.props.attendanceInfo.owner} disabled/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                    <InputGroup.Text>名称</InputGroup.Text>
                        <Form.Control value={this.state.name} onChange={(event) => this.changeName(event)}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>开始时间</InputGroup.Text>
                        <DatePicker defaultValue={this.state.startTime} value={this.state.startTime} onChange={(date, str) => {this.changeStartTime(date, str)}} allowClear={false}/>
                        <TimePicker defaultValue={this.state.startTime} value={this.state.startTime} onChange={(date, str) => {this.changeStartTime(date, str)}} allowClear={false} minuteStep={1} format="HH:mm:ss" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>结束时间</InputGroup.Text>
                        <DatePicker defaultValue={this.state.endTime} value={dayjs(this.state.endTime)} onChange={(date, str) => {this.changeEndTime(date, str)}} allowClear={false}/>
                        <TimePicker defaultValue={this.state.endTime} value={dayjs(this.state.endTime)} onChange={(date, str) => {this.changeEndTime(date, str)}} allowClear={false} minuteStep={1} format="HH:mm:ss" />
                    </InputGroup>
                    <Button variant="success" onClick={this.state.addMode ? this.postRequest : this.patchRequest}>确认</Button>        
            </div>
        );
    }
}