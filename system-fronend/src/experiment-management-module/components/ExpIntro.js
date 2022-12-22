import React from "react";
import { Button } from "react-bootstrap";
import '../../static/style.css';
// import { Form, InputGroup } from "react-bootstrap";

import ExpForm from "./ExpForm";
import FilePanel from "./FilePanel";
import { Utils } from "../../js-library/func-chunk";
import { TokenApiClient } from "../../user-management-module/service/TokenApiClient";
import { CourseApiClient } from "../../course-management-module/service/CourseApiClient";
import { ExpApiClient } from "../service/ExpApiClient";
import { UserApiClient } from '../../user-management-module/service/UserApiClient';
import { message } from "antd";
import { WebPathConfig } from "../../config/web-path";

export default class ExpIntro extends React.Component{
    constructor(props){
        super(props);
        this.state={
            token: Utils.getURLParam(window.location, 'token'),
            code: Utils.getURLParam(window.location, 'code'),
            eid: Utils.getURLParam(window.location, 'eid'),

            isEditing: false,
            isEditable: false,
            
            courseName: '--',
            expInfo:{
                name: "--",
                owner: "--", 
                time: "--",
                equipment: "--",
                desp: "--",
            }
        }
    }

    componentDidMount(){
        this.getRole();
        this.getCourseName();
        this.getExpInfo();
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

    getExpInfo = async ()=>{
        // 
        const ownerId = await ExpApiClient.getExpInfo(this.state.eid).then(resp => {
            this.setState({
                expInfo:{
                    name: resp.data.name,
                    desp: resp.data.description, 
                    equipment: resp.data.equipments,
                    time: Utils.timestamp2date(resp.data.startTime),
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
                expInfo: Object.assign(this.state.expInfo, {owner: resp.data.name}),
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

    toEdit = ()=> {
        this.setState({
            isEditing: !this.state.isEditing,
        });
    }

    deleteRequest = () => {
        let eid = Utils.getURLParam(window.location, 'eid');
        ExpApiClient.deleteExperiment(eid).then(resp => {
            console.log(resp);
            this.redirect2ExpMain();
        }).catch(err => {
            console.log(err);
            message.error("删除失败");
        })
    }

    redirect2ExpMain = () => {
        WebPathConfig.toURL("/course", {
            token: Utils.getURLParam(window.location, 'token'),
            code: Utils.getURLParam(window.location, 'code'),
            loc: "exp"
        })
    }
    
    render(){
        const editable = this.state.isEditable;
        var editingState = this.state.isEditing;
        return(
            <div className="page-panel">
                <div className="page-title">
                    <div>{this.state.courseName} | {this.state.expInfo.name}</div>
                    { editable ?
                    <div id="manage-exp">
                        <Button variant="warning" onClick={this.toEdit}>{
                            editingState ? "取消编辑":"编辑"
                        }</Button>&nbsp;&nbsp;
                        <Button variant="danger" onClick={this.deleteRequest}>删除</Button>
                    </div>:null}
                </div>
                
                <div className="intro-panel">
                    {
                        !editingState ? (
                            <div>
                                <div>创建者：{this.state.expInfo.owner}</div>
                                <div>上课时间：{this.state.expInfo.time}</div>
                                <div>相关器材：{this.state.expInfo.equipment}</div>
                                <div>实验描述：{this.state.expInfo.desp}</div>
                                <div>相关文件：</div>
                                <FilePanel/>
                            </div>
                            ):(
                                <ExpForm expInfo={this.state.expInfo} addMode={false} closeEdit={this.closeEdit}/>
                            )
                    }
                    
                </div>
            </div>
        );
    }
}