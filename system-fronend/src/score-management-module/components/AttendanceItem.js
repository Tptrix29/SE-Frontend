import dayjs from "dayjs";
import React from "react";
import { Button } from "react-bootstrap";
import { WebPathConfig } from "../../config/web-path";
import { Utils } from "../../js-library/func-chunk";
import '../../static/style.css';
import { message } from 'antd';

import { TokenApiClient } from "../../user-management-module/service/TokenApiClient";
import { AttendanceApiClient } from "../service/AttendanceApiCilent";

export default class AttendanceItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            token: Utils.getURLParam(window.location, 'token'),
            code: Utils.getURLParam(window.location, 'code'),
            nid: props.nid,
            isAccess: props.manage,

            endTime: Utils.timestamp2date(props.data.endTime),
            atid: props.data.atid,
            status: '', // GOING_ON, SUCCESS, LATE, ABSENT, NOT_START
        }
    }

    componentDidMount(){
        if(!this.state.isAccess)
            this.checkStatus()
    }


    checkStatus = async () => {
        var status = await AttendanceApiClient.getCheckStatus(this.state.atid, this.state.nid).then(resp => {
            // console.log(this.state.atid + resp.data)
            return resp.data;
        }).catch(err=>{
            console.log(err);
            return 'ERR';
        })
        this.setState({
            status: status,
        })
    }

    check = () => {
        TokenApiClient.verify(this.state.token).catch(err => {
            alert('登录过期，请重新登录');
        }).then(resp => {
            return AttendanceApiClient.checkIn(this.state.atid, resp.data.nid);
        }).then(resp => {
            if(resp.data == "SUCCESS"){
                message.success('签到成功');
                this.setState({
                    status: "SUCCESS",
                })
            }
            if(resp.data == "LATE"){
                message.success('补签成功');
                this.setState({
                    status: "LATE",
                })
            }
            if(resp.data == "FAILED"){
                message.error('签到失败');
            }
        }).catch(err => {
            message.error('签到失败');
        })
    }

    checkColor = (status) => {
        var color = "black";
        switch(status){
            case "SUCCESS": color = "link-success";break;
            case "LATE": color = "link-warning";break;
            case "ABSENT": color = "link-danger";break;
            case "GOING_ON": color = "link-primary";break;
            case "NOT_START": color = "link-secondary";break;
        }
        return color;
    }

    toEditPage = () => {
        WebPathConfig.toURL('/course/attendance/', {
            token: this.state.token,
            code: this.state.code,
            atid: this.state.atid,
        })
    }

    judgeCheckable = () => {
        if(this.state.status == "GOING_ON")
            return true;
        if(this.state.status == "ABSENT"){
            if((dayjs(new Date()).diff(dayjs(this.state.endTime), "minutes"))<60)
                return true;
        }
        return false;
    }

    
    // 学生显示签到状态，老师显示任务状态
    // 功能：签到、前往编辑
    render(){
        const checkable = this.judgeCheckable();
        return(
            <div className="item-bar">
                <div>{this.props.data.name}</div>
                <div className={this.checkColor(this.state.status)}>{
                    this.state.isAccess ? this.state.endTime : this.state.status
                }</div>
                <div>
                    {this.props.manage ? (
                        <Button variant="warning" onClick={this.toEditPage}>编辑</Button>
                    ):(
                        <Button variant="primary" disabled={!checkable} onClick={this.check}>签到</Button>
                    )}
                </div>
            </div>
        );
    }
}