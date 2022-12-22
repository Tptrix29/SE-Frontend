import React from "react";
import '../../static/style.css';
import AttendanceForm from "./AttendanceForm";
import { TokenApiClient } from "../../user-management-module/service/TokenApiClient";
import { UserApiClient } from "../../user-management-module/service/UserApiClient";
import { Utils } from "../../js-library/func-chunk";

export default class AttendanceAddPanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            token: Utils.getURLParam(window.location, 'token'),
            attendanceInfo:{
                name: '',
                owner: '',
                startTime: new Date(),
                endTime: new Date(),
            }
        }
    }

    componentDidMount(){
        this.getOwner();
    }

    getOwner = () => {
        TokenApiClient.verify(this.state.token).catch(err => {
            console.log(err);
        }).then(resp => {
            this.setState({
                attendanceInfo: Object.assign(this.state.attendanceInfo, {ownerId: resp.data.nid})
            })
            return UserApiClient.retrieve(resp.data.nid);
        }).then(resp => {
            this.setState({
                attendanceInfo: Object.assign(this.state.attendanceInfo, {owner: resp.data.name})
            })
        })
    }

    render(){
        return(
            <div className="page-panel">
                <div className="page-title">创建考勤任务</div>
                <div className="page-info-left">
                   <AttendanceForm attendanceInfo={this.state.attendanceInfo} addMode={true}/>
                </div>
            </div>
        );
    }
}