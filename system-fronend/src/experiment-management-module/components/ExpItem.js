import React from "react";
import { Button } from "react-bootstrap";
import { WebPathConfig } from "../../config/web-path";
import { Utils } from "../../js-library/func-chunk";
import "../../static/style.css";


export default class ExpItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: props.expData,
        }
    }

    toExpPage = () => {
        const token = Utils.getURLParam(window.location, 'token');
        const code = Utils.getURLParam(window.location, 'code');
        const eid = this.props.expData.eid;
        WebPathConfig.toURL('/course/exp', {
            token: token, 
            code: code, 
            eid: eid
        })
    }

    render(){
        return(
            <div className="item-bar">
                <div>{this.state.data.name}</div>
                <div>{Utils.timestamp2date(this.state.data.startTime)}</div>
                <Button variant="primary" onClick={this.toExpPage}>查看详情</Button>
            </div>
        );
    }
}