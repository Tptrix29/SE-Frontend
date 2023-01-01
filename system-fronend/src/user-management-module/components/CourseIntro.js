import React from "react";
import { Button } from "react-bootstrap";
import { CourseApiClient } from "../../course-management-module/service/CourseApiClient";
import { Utils } from "../../js-library/func-chunk";
import '../../static/style.css';
import CourseAddForm from "./CourseForm";
import { message } from "antd";
import { WebPathConfig } from "../../config/web-path";

export default class CourseIntro extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isEditable: true, 
            isEditing: false,

            code: Utils.getURLParam(window.location, "code"),
            token: Utils.getURLParam(window.location, "token"),
            courseInfo:{
                name: '--',
                startTime: '--',
                endTime: '--',
                description: '--',
                attendanceWeight: '--',
                assignmentWeight: '--',
            }
        }

    }

    componentDidMount(){
        this.getCourseInfo();
    }

    getCourseInfo = ()=>{
        CourseApiClient.getCourseInfo(this.state.code).then(resp => {
            // console.log(resp.data)
            this.setState({
                courseInfo:{
                    name: resp.data.name,
                    status: resp.data.status,
                    description: resp.data.description,
                    startTime: new Date(resp.data.startTime).toLocaleDateString(),
                    endTime: new Date(resp.data.endTime).toLocaleDateString(),
                    attendanceWeight: resp.data.attendanceWeight,
                    assignmentWeight: 100-resp.data.attendanceWeight
                }
            })
        }).catch(err => {
            console.log(err)
        })
    }


    toEdit = ()=>{
        this.setState({
            isEditing: !this.state.isEditing,
        });
    }

    deleteCourse = ()=>{
        CourseApiClient.deleteCourse(this.state.code).then(resp => {
            WebPathConfig.toURL('/admin/manage_course', {
                token: Utils.getURLParam(window.location, 'token')
            })
        }).catch(err => {
            console.log(err)
            message.error("删除课程失败")
        })
    }


    render(){
        var editingState = this.state.isEditing;
        return(
            <div className="page-panel">
                <div className="page-title">
                    <div>{this.state.courseInfo.name}</div>
                    <div>
                        <Button variant="warning" onClick={this.toEdit}>{!editingState? "编辑":"取消编辑"}</Button>&nbsp;&nbsp;
                        <Button variant="danger" onClick={this.deleteCourse}>删除</Button>
                    </div>
                </div>
                
                <div className="intro-panel">
                    {!editingState ? (
                        <div>
                            <div>开始时间：{this.state.courseInfo.startTime}</div>
                            <div>结束时间：{this.state.courseInfo.endTime}</div>
                            <div>考勤占比：{this.state.courseInfo.attendanceWeight}%</div>
                            <div>作业占比：{this.state.courseInfo.assignmentWeight}%</div>
                            <div>课程描述：{this.state.courseInfo.description}</div>
                        </div>
                    ):(
                        <div>
                            <CourseAddForm courseInfo={this.state.courseInfo} addMode={false}/>
                        </div>
                    )}
                </div>
            </div>
        );
    }

}