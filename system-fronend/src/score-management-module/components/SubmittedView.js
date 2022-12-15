import React from "react";
import '../../static/style.css';
import SubmittedRow from "./SubmittedRow";

export default class SubmittedView extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <div className="intro-panel">
                <hr />
                <div className="page-title">提交纪录</div>
                <SubmittedRow/>
            </div>
        );
    }
}