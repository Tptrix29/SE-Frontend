import React from "react";
import { Button } from "react-bootstrap";
import '../../static/style.css';
import AttendanceForm from "./AttendanceForm";

import { Utils } from "../../js-library/func-chunk";
import { AttendanceApiClient } from "../service/AttendanceApiCilent";
import { UserApiClient } from "../../user-management-module/service/UserApiClient";
import { CourseApiClient } from "../../course-management-module/service/CourseApiClient";
import { message } from "antd";
import { WebPathConfig } from "../../config/web-path";

export default class AttendanceIntro extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            // isEditable: true,
            isEditing: false,
            atid: Utils.getURLParam(window.location, 'atid'),
            token: Utils.getURLParam(window.location, 'token'),
            code: Utils.getURLParam(window.location, 'code'),
            courseName: '--',
            attendanceInfo:{
                name: '--',
                owner: '--',
                startTime: '--',
                endTime: '--',
            }
        }

    }
    componentDidMount(){
        this.getCourseName();
        this.getAttendanceInfo();
    }

    getCourseName = () => {
        CourseApiClient.getCourseInfo(this.state.code).then(resp => {
            this.setState({
                courseName: resp.data.name,
            })
        }).catch(err => {
            console.log(err);
        })
    }

    getAttendanceInfo = async () => {
        const ownerId = await AttendanceApiClient.getAttInfoByAtid(this.state.atid).then(resp => {
            console.log(resp.data);
            this.setState({
                attendanceInfo: {
                    name: resp.data.name,
                    startTime: Utils.timestamp2date(resp.data.startTime),
                    endTime: Utils.timestamp2date(resp.data.endTime),
                    ownerId: resp.data.ownerNid,
                }
            })
            return resp.data.ownerNid
        }).catch(err => {
            console.log(err)
        })

        // owner name
        UserApiClient.retrieve(ownerId).then(resp => {
            this.setState({
                attendanceInfo: Object.assign(this.state.attendanceInfo, {owner: resp.data.name}),
            })
        })
    }
    
    deleteRequest = () => {
        let atid = Utils.getURLParam(window.location, 'atid');
        AttendanceApiClient.deleteAttendance(atid).then(resp => {
            console.log(resp);
            this.redirect2AttMain();
        }).catch(err => {
            console.log(err);
            message.error("删除失败");
        })
    }

    redirect2AttMain = () => {
        WebPathConfig.toURL("/course", {
            token: Utils.getURLParam(window.location, 'token'),
            code: Utils.getURLParam(window.location, 'code'),
            loc: "attendance"
        })
    }
        

    toEdit = ()=>{
        this.setState({
            isEditing: !this.state.isEditing,
        });
    }
    

    render(){
        var editingState = this.state.isEditing;
        return(
            <div className="page-panel">
                <div className="page-title">
                    <div>{this.state.courseName} | {this.state.attendanceInfo.name}</div>
                    <div>
                        <Button variant="warning" onClick={this.toEdit}>{!editingState? "编辑":"取消编辑"}</Button>&nbsp;&nbsp;
                        <Button variant="danger" onClick={this.deleteRequest}>删除</Button>
                    </div>
                </div>
                
                <div className="intro-panel">
                    {!editingState ? (
                        <div>
                            <div>创建者：{this.state.attendanceInfo.owner}</div>
                            <div>开始时间：{this.state.attendanceInfo.startTime}</div>
                            <div>结束时间：{this.state.attendanceInfo.endTime}</div>
                        </div>
                    ):(
                        <div>
                            <AttendanceForm attendanceInfo={this.state.attendanceInfo} addMode={false}/>
                        
                        </div>
                    )}
                </div>
            </div>
        );
    }

}