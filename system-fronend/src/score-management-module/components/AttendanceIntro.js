import React from "react";
import { Button } from "react-bootstrap";
import '../../static/style.css';
import AttendanceForm from "./AttendanceForm";

export default class AttendanceIntro extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isEditing: false,
            attendanceInfo:{
                name: 'Test',
                owner: 'zzz',
                startTime: 'start',
                endTime: 'start',
            }
        }

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
                    <div>课程名称 | {this.state.attendanceInfo.name}</div>
                    <div>
                        <Button variant="warning" onClick={this.toEdit}>{!editingState? "编辑":"取消编辑"}</Button>&nbsp;&nbsp;
                        <Button variant="danger">删除</Button>
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
                            <AttendanceForm attendanceInfo={this.state.attendanceInfo}/>
                        
                        </div>
                    )}
                </div>
            </div>
        );
    }

}