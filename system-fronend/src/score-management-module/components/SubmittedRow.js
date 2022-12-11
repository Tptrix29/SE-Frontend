import React from "react";
import '../../static/style.css';

export default class SubmittedRow extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <div className="item-bar">
                <div>学生名</div>
                <div>提交时间</div>
                <div>附件</div>
                <div>得分</div>
            </div>
        );
    }
}