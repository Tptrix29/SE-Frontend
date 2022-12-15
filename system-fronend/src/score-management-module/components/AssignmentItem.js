import React from "react";
import { Button } from "react-bootstrap";
import '../../static/style.css';


export default class AssignmentItem extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="item-bar">
                <div>作业名称</div>
                <div>截止时间</div>
                <div>
                    {this.props.manage ? (<Button variant="warning">管理</Button>):(<Button>查看</Button>)}
                </div>
            </div>
        );
    }
}