import React from "react";
import '../../static/style.css';

export default class MissionItemWithScore extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <div className="item-bar">
                <div>任务名</div>
                <div>得分</div>
            </div>
        );
    }
}