import React from "react";
import { Button } from "react-bootstrap";
import '../../static/style.css';

export default class FileBar extends React.Component{
    constructor(props){
        super(props);
        

    }

    render(){
        return(
            <div class="item-bar">
                <div>{this.props.file.filename}</div>
                <div>{this.props.file.time}</div>
                <div>
                    <Button variant="primary">下载</Button>&nbsp;&nbsp;
                    {
                        this.props.isEditable ? (
                            <span>
                                <Button variant="warning">重传</Button>&nbsp;&nbsp;
                                <Button variant="danger">删除</Button>&nbsp;&nbsp;
                            </span>
                        ):null
                    }
                    
                </div>
                
            </div>
        );
    }
}