import React from "react";
import '../../static/style.css';
import AttendanceForm from "./AttendanceForm";

export default class AttendanceAddPanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            attendanceInfo:{
                name: 'Test',
                owner: 'zzz',
                startTime: 'start',
                endTime: 'start',
            }
        }
    }

    render(){
        return(
            <div className="page-panel">
                <div className="page-title">创建考勤任务</div>
                <div className="page-info-left">
                   <AttendanceForm attendanceInfo={this.state.attendanceInfo}/>
                </div>
            </div>
        );
    }
}