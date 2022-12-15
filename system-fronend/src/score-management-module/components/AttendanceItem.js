import React from "react";
import { Button } from "react-bootstrap";
import '../../static/style.css';

export default class AttendanceItem extends React.Component{
    constructor(props){
        super(props);
        
    }

    render(){
        return(
            <div className="item-bar">
                <div>任务名称</div>
                <div>状态</div>
                <div>
                    {this.props.manage ? (
                        <Button variant="warning">编辑</Button>
                    ):(
                        <Button variant="primary">签到</Button>
                    )}
                </div>
            </div>
        );
    }
}