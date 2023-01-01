import React from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import '../../static/style.css';
import { DatePicker, message } from "antd";
import dayjs from "dayjs";
import { CourseApiClient } from "../../course-management-module/service/CourseApiClient";
import { Utils } from "../../js-library/func-chunk";
import { WebPathConfig } from "../../config/web-path";



export default class CourseForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            addMode: props.addMode,
            code: Utils.getURLParam(window.location, "code"),

            name: props.courseInfo.name,
            description: props.courseInfo.description,
            startTime: dayjs(props.courseInfo.startTime),
            endTime: dayjs(props.courseInfo.endTime),
            attendanceWeight: props.courseInfo.attendanceWeight,
            assignmentWeight:props.courseInfo.assignmentWeight,

            isCodeValid: false,
            isAttPerValid: false,
            isAssPerValid: false,
        }

    }

    changeName = (event) => {
        this.setState({
            name: event.target.value,
        })
    }

    changeCode = (event) => {
        this.setState({
            code: event.target.value,
            isCodeValid: Utils.checkCode(event.target.value),
        })
    }

    changeDesp = (event) => {
        this.setState({
            description: event.target.value
        });
    }

    changeattendanceWeight = (event) => {
        this.setState({
            attendanceWeight: event.target.value,
            assignmentWeight: 100-event.target.value,
            isAttPerValid: Utils.checkPercent(event.target.value),
            isAssPerValid: Utils.checkPercent(100-event.target.value),
        })
    }

    changeassignmentWeight = (event) => {
        this.setState({
            attendanceWeight: 100-event.target.value,
            assignmentWeight: event.target.value,
            isAttPerValid: Utils.checkPercent(event.target.value),
            isAssPerValid: Utils.checkPercent(100-event.target.value),
        })
    }

    changeStartTime = (date, str) => {
        this.setState({
            startTime: date,
            endTime: date,
        })
    }

    changeEndTime = (date, str) => {
        this.setState({
            endTime: date,
        })
    }

    addCourse = () => {
        CourseApiClient.createCourse({
            code: this.state.code,
            attendanceWeight: this.state.attendanceWeight,
            description: this.state.description,
            startTime: this.state.startTime.format("YYYY-MM-DD"),
            endTime: this.state.endTime.format("YYYY-MM-DD"),
            name: this.state.name,
            status: this.convertStatus(this.state.startTime)
        }).then(resp => {
            WebPathConfig.toURL('/admin/manage_course', {
                token: Utils.getURLParam(window.location, 'token')
            })
        }).catch(err => {
            message.error("课程添加失败")
        })
    }

    convertStatus = (start)=>{
        var now = dayjs(new Date());
        if(dayjs(start).diff(now, 'day') > 0)
            return "NOT_STARTED";
        else 
            return "GOING_ON";
    }

    editCourse = () => {
        console.log({
            code: this.state.code,
            attendanceWeight: this.state.attendanceWeight,
            description: this.state.description,
            startTime: this.state.startTime.format("YYYY-MM-DD"),
            endTime: this.state.endTime.format("YYYY-MM-DD"),
            name: this.state.name,
            status: this.convertStatus(this.state.startTime)
        })
        CourseApiClient.modifyCourse({
            code: this.state.code,
            attendanceWeight: this.state.attendanceWeight,
            description: this.state.description,
            startTime: this.state.startTime.format("YYYY-MM-DD"),
            endTime: this.state.endTime.format("YYYY-MM-DD"),
            name: this.state.name,
            status: this.convertStatus(this.state.startTime)
        }).then(resp => {
            WebPathConfig.toURL("/admin/course", {
                token: Utils.getURLParam(window.location, "token"),
                code: Utils.getURLParam(window.location, "code"),
            })
            // message.success("修改成功")
        }).catch(err => {
            console.log(err)
            message.error("修改失败")
        })
    }

    

    render(){
        return(
            <div>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>课程代码</InputGroup.Text>
                        <Form.Control value={this.state.code} onChange={(event)=>this.changeCode(event)} isValid={this.state.isCodeValid}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>课程名</InputGroup.Text>
                        <Form.Control value={this.state.name} onChange={(event)=>this.changeName(event)}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                    <InputGroup.Text>开始时间</InputGroup.Text>
                        <DatePicker defaultValue={this.state.startTime} value={dayjs(this.state.startTime)} onChange={(date, str) => {this.changeStartTime(date, str)}} allowClear={false}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>结束时间</InputGroup.Text>
                        <DatePicker defaultValue={this.state.endTime} value={dayjs(this.state.endTime)} onChange={(date, str) => {this.changeEndTime(date, str)}} allowClear={false}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>考勤占比</InputGroup.Text>
                        <Form.Control value={this.state.attendanceWeight} onChange={(event)=>this.changeattendanceWeight(event)} isValid={this.state.isAttPerValid}/>
                        <InputGroup.Text>%</InputGroup.Text>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>作业占比</InputGroup.Text>
                        <Form.Control value={this.state.assignmentWeight} onChange={(event)=>this.changeassignmentWeight(event)} isValid={this.state.isAssPerValid}/>
                        <InputGroup.Text>%</InputGroup.Text>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>课程描述</InputGroup.Text>
                        <Form.Control value={this.state.description} onChange={(event)=>this.changeDesp(event)} as="textarea"/>
                    </InputGroup>
                    <Button variant="success" onClick={this.state.addMode ? this.addCourse : this.editCourse}>确认</Button>        
            </div>
        );
    }
}