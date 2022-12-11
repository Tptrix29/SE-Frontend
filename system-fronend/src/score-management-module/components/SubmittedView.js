import React from "react";
import '../../static/style.css';
import SubmittedRow from "./SubmittedRow";

export default class SubmittedView extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <div class="intro-panel">
                <hr />
                <div class="page-title">提交纪录</div>
                <SubmittedRow/>
            </div>
        );
    }
}