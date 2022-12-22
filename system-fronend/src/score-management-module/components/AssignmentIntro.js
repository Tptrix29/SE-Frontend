import React from "react";
import { Button } from "react-bootstrap";
import '../../static/style.css';
import FilePanel from '../../experiment-management-module/components/FilePanel';
import AssignmentForm from "./AssignmentForm";
import SubmissionPanel from "./SubmissionPanel";
import SubmittedView from "./SubmittedView";

import { AssignmentApiClient } from "../service/AssignmentApiClient";
import { UserApiClient } from "../../user-management-module/service/UserApiClient";
import { TokenApiClient } from "../../user-management-module/service/TokenApiClient";
import { CourseApiClient } from "../../course-management-module/service/CourseApiClient";
import { Utils } from "../../js-library/func-chunk";
import { message } from "antd";

export default class AssignmentIntro extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isEditable: false, 
            isEditing: false,
            isSubmitted: false,
            token: Utils.getURLParam(window.location, 'token'),
            code: Utils.getURLParam(window.location, 'code'),
            asid: Utils.getURLParam(window.location, 'asid'),
            courseName: "--",
            assignmentInfo:{
                name: "--",
                owner: "--",
                ddl: "--",
                desp: "--",
            }
        }
    }

    componentDidMount(){
        this.getRole();
        this.getCourseName();
        this.getAssignmentInfo();
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

    getAssignmentInfo = async ()=>{
        // 
        const ownerId = await AssignmentApiClient.getAssignmentInfoByAsid(this.state.asid).then(resp => {
            this.setState({
                assignmentInfo:{
                    name: resp.data.name,
                    desp: resp.data.description, 
                    ddl: Utils.timestamp2date(resp.data.endTime),
                    ownerId: resp.data.ownerNid,
                }
            })
            return resp.data.ownerNid;
        }).catch(err =>{
            console.log(err);
        })

        // owner name
        UserApiClient.retrieve(ownerId).then(resp => {
            this.setState({
                assignmentInfo: Object.assign(this.state.assignmentInfo, {owner: resp.data.name}),
            })
        })
    }

    getRole = async () => {
        var nid = await TokenApiClient.verify(this.state.token).catch(err => {
            alert('登录失效')
            WebPathConfig.redirectToLogin()
        }).then(resp => {
            return resp.data.nid;
        })

        var role = await CourseApiClient.getTeacher(this.state.code).then(resp => {
            var userRole = 'STUDENT';
            resp.data.map(teacher => {
                if(teacher.nid == nid)
                    return (userRole = teacher.role);
            })
            return userRole;
        })

        this.setState({
            role: role,
            isEditable: role != 'STUDENT',
        })
    }

    toEdit = ()=>{
        this.setState({
            isEditing: !this.state.isEditing,
        });
    }

    deleteRequest = () => {
        let asid = Utils.getURLParam(window.location, 'asid');
        AssignmentApiClient.deleteAssignment(asid).then(resp => {
            console.log(resp);
            this.redirect2AssMain();
        }).catch(err => {
            console.log(err);
            message.error("删除失败");
        })
    }

    redirect2AssMain = () => {
        WebPathConfig.toURL("/course", {
            token: Utils.getURLParam(window.location, 'token'),
            code: Utils.getURLParam(window.location, 'code'),
            loc: "assignment"
        })
    }

    render(){
        // console.log(this.state.assignmentInfo)
        const isEditable = this.state.isEditable;
        var editingState = this.state.isEditing;
        return(
            <div className="page-panel">
                <div className="page-title">
                    <div>{this.state.courseName} | {this.state.assignmentInfo.name}</div>
                    {isEditable ? (
                        <div>
                            <Button variant="warning" onClick={this.toEdit}>{
                                !editingState ? "编辑":"取消编辑"
                            }</Button>&nbsp;&nbsp;
                            <Button variant="danger" onClick={this.deleteRequest}>删除</Button>
                        </div>  
                    ):(
                        <div style={{fontSize: "1.2rem"}}>
                            {this.state.isSubmitted ? (
                                <a className="link-success">已提交</a>
                            ):(
                                <a className="link-warning">未提交</a>
                            )}
                        </div>
                    )}
                </div>
                <div className="intro-panel">
                    {!editingState ? (
                        <div>
                            <div>创建者：{this.state.assignmentInfo.owner}</div>
                            <div>截止日期：{this.state.assignmentInfo.ddl}</div>
                            <div>作业描述：{this.state.assignmentInfo.desp}</div>
                            <div>相关文件：</div>
                            <FilePanel isEditable={false}/>
                        </div>
                    ):(
                        <div>
                            <AssignmentForm assignmentInfo={this.state.assignmentInfo} addMode={false}/>
                        </div>
                    )}
                </div>
                {isEditable ? <SubmittedView/>:<SubmissionPanel/>}
                
            </div>
        );
    }
}