import React from "react";
import {Button, InputGroup, Form} from 'react-bootstrap';

export default class UserManagePanel extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div class="search-bar">
                <InputGroup style={{width: '60%'}}>
                    <InputGroup.Text>{this.props.tip}</InputGroup.Text>
                    <Form.Control placeholder="请输入" />
                </InputGroup>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button variant="success">查询</Button>
            </div>
        );
    }
}