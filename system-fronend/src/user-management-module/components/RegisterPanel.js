import React from 'react';
import "../../static/style.css"
import { InputGroup, Form, Button} from 'react-bootstrap';

export default class RegisterPanel extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="page-panel">
                <div className="page-info-center">
                    <div className="page-title">注册新用户</div>
                    <InputGroup className="mb-3">
                         <InputGroup.Text>学/工号</InputGroup.Text>
                        <Form.Control placeholder="请输入" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                         <InputGroup.Text >姓名</InputGroup.Text>
                        <Form.Control placeholder="请输入" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                         <InputGroup.Text >邮箱</InputGroup.Text>
                        <Form.Control placeholder="请输入" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                         <InputGroup.Text>密码</InputGroup.Text>
                        <Form.Control placeholder="请输入密码" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                         <InputGroup.Text >确认密码</InputGroup.Text>
                        <Form.Control placeholder="请确认密码" />
                    </InputGroup>
                    <Button variant='outline-dark'>确认</Button>
                </div>
            </div>
        );
    }
}
