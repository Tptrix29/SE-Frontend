import React from "react";
import '../../static/style.css';
import { InputGroup, Form, Button } from "react-bootstrap";
import FilePanel from "./FilePanel";

export default class ExpForm extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>创建者</InputGroup.Text>
                                        <Form.Control placeholder={this.props.expInfo.owner} disabled/>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>上课时间</InputGroup.Text>
                                        <Form.Control placeholder={this.props.expInfo.time} />
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>相关器材</InputGroup.Text>
                                        <Form.Control placeholder={this.props.expInfo.time} />
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>实验描述</InputGroup.Text>
                                        <Form.Control placeholder={this.props.expInfo.desp} as="textarea" />
                                    </InputGroup>
                                    
                                    <div>相关文件：</div>
                                    <FilePanel isEditable={true}/><br/>
                                    <Button variant="success" class="mt-3">确认修改</Button>
                                </div>
        );
    }
}