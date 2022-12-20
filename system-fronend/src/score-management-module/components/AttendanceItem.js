import React from "react";
import { Button } from "react-bootstrap";
import { WebPathConfig } from "../../config/web-path";
import { Utils } from "../../js-library/func-chunk";
import '../../static/style.css';

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
            status: '', // GOING_ON, SUCCESS, LATE, ABSENT, 
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
            return 'GOING_ON';
        })
        this.setState({
            status: status,
        })
    }

    check = () => {
        // console.log('ll')
        // TokenApiClient.verify(this.state.token).catch(err => {
        //     alert('登录过期，请重新登录');
        // }).then(resp => {
        //     return AttendanceApiClient.checkIn(this.state.atid, resp.data.nid);
        // }).then(resp => {
        //     alert('签到成功');
        // }).catch(err => {
        //     alert('签到失败');
        // })
    }

    checkColor = (status) => {
        var color = "black";
        switch(status){
            case "SUCCESS": color = "link-success";break;
            case "LATE": color = "link-warning";break;
            case "ABSENT": color = "link-danger";break;
            case "GOING_ON": color = "link-primary";break;
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

    
    // 学生显示签到状态，老师显示任务状态
    // 功能：签到、前往编辑
    render(){
        const checkable = (this.state.status == 'GOING_ON');
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