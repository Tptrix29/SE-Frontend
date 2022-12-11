import React from "react";
import { Button } from "react-bootstrap";
import '../../static/style.css';
import FilePanel from '../../experiment-management-module/components/FilePanel';
import AssignmentForm from "./AssignmentForm";
import SubmissionPanel from "./SubmissionPanel";
import SubmittedView from "./SubmittedView";

export default class AssignmentIntro extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isEditable: true, 
            isEditing: false,
            isSubmitted: false,
            assignmentInfo:{
                name: "hello",
                owner: "xxx",
                ddl: new Date().toString(),
                desp: "None",
            }
        }
    }

    toEdit = ()=>{
        this.setState({
            isEditing: !this.state.isEditing,
        });
    }

    render(){
        const isEditable = this.state.isEditable;
        var editingState = this.state.isEditing;
        return(
            <div class="page-panel">
                <div class="page-title">
                    <div>课程名称 | 作业名称</div>
                    {isEditable ? (
                        <div>
                            <Button variant="warning" onClick={this.toEdit}>{
                                !editingState ? "编辑":"取消编辑"
                            }</Button>&nbsp;&nbsp;
                            <Button variant="danger">删除</Button>
                        </div>  
                    ):(
                        <div style={{fontSize: "1.2rem"}}>
                            {this.state.isSubmitted ? (
                                <a class="link-success">已提交</a>
                            ):(
                                <a class="link-warning">未提交</a>
                            )}
                        </div>
                    )}
                </div>
                <div class="intro-panel">
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
                            <AssignmentForm assignmentInfo={this.state.assignmentInfo}/>
                        </div>
                    )}
                </div>
                {isEditable ? <SubmittedView/>:<SubmissionPanel/>}
                
            </div>
        );
    }
}