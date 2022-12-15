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
            <div className="page-panel">
                <div className="page-title">创建新作业</div>
                <div className="page-info-left">
                    <AssignmentForm assignmentInfo={this.state.assignmentInfo}/>
                </div>
            </div>
        );
    }
}