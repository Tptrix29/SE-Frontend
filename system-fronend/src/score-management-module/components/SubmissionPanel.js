import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import FilePanel from "../../experiment-management-module/components/FilePanel";
import '../../static/style.css';


export default class SubmissionPanel extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <div className="intro-panel">
                <hr />
                <div className="page-title">提交作业</div>
                <div>
                    <InputGroup>
                        <InputGroup.Text>说明信息</InputGroup.Text>
                        <Form.Control placeholder="请输入" as="textarea"></Form.Control>
                    </InputGroup>
                    <FilePanel isEditable={true}/>
                    <Button variant="success">确认提交</Button>
                </div>
            </div>
        );
    }
}