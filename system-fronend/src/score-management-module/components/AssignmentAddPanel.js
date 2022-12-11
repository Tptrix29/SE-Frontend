import React from "react";
import '../../static/style.css';
import AssignmentForm from "./AssignmentForm";

export default class AssignmentAddPanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            assignmentInfo:{
                name: "None",
                owner: "xxx",
                ddl: new Date().toString(),
                desp: "None",
            }
        }
    }

    render(){
        return(
            <div class="page-panel">
                <div class="page-title">创建新作业</div>
                <div class="page-info-left">
                    <AssignmentForm assignmentInfo={this.state.assignmentInfo}/>
                </div>
            </div>
        );
    }
}