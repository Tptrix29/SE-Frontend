import React from "react";
import { Button } from "react-bootstrap";
import "../../static/style.css";


export default class ExpItem extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <div class="item-bar">
                <div>实验名</div>
                <div>时间</div>
                <Button variant="primary">查看详情</Button>
            </div>
        );
    }
}