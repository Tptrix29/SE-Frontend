import React from "react";
import '../../static/style.css';
import { InputGroup, Form, Button } from "react-bootstrap";
import FilePanel from '../../experiment-management-module/components/FilePanel';

export default class AssignmentForm extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <InputGroup className="mb-3">
                    <InputGroup.Text>创建者</InputGroup.Text>
                        <Form.Control value={this.props.assignmentInfo.owner} disabled/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                    <InputGroup.Text>名称</InputGroup.Text>
                        <Form.Control value={this.props.assignmentInfo.name}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>截止时间</InputGroup.Text>
                        <Form.Control value={this.props.assignmentInfo.ddl} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>作业描述</InputGroup.Text>
                        <Form.Control value={this.props.assignmentInfo.desp} as="textarea" />
                    </InputGroup>
                                    
                    <div>相关文件：</div>
                    <FilePanel isEditable={true}/><br/>
                    <Button variant="outline-success">确认修改</Button>
            </div>
        );
    }
}