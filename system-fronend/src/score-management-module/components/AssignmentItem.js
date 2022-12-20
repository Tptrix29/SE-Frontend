import React from "react";
import { Button } from "react-bootstrap";
import { WebPathConfig } from "../../config/web-path";
import { Utils } from "../../js-library/func-chunk";
import '../../static/style.css';


export default class AssignmentItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            token: Utils.getURLParam(window.location, 'token'),
            code: Utils.getURLParam(window.location, 'code'),
            name: props.data.name,
            endTime: Utils.timestamp2date(props.data.endTime),
        }
    }

    toEditPage = () => {
        WebPathConfig.toURL('/course/assignment', {
            token: this.state.token, 
            code: this.state.code,
            asid: this.props.data.asid
        })
    }

    render(){
        return(
            <div className="item-bar">
                <div>{this.state.name}</div>
                <div>{this.state.endTime}</div>
                <div>
                    {this.props.manage ? (<Button variant="warning" onClick={this.toEditPage}>管理</Button>):(<Button onClick={this.toEditPage}>查看</Button>)}
                </div>
            </div>
        );
    }
}