import React from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import '../../static/style.css';


export default class AttendanceForm extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <div>
                <InputGroup className="mb-3">
                    <InputGroup.Text>创建者</InputGroup.Text>
                        <Form.Control placeholder={this.props.attendanceInfo.owner} disabled/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                    <InputGroup.Text>名称</InputGroup.Text>
                        <Form.Control placeholder={this.props.attendanceInfo.name}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>开始时间</InputGroup.Text>
                        <Form.Control placeholder={this.props.attendanceInfo.startTime} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>结束时间</InputGroup.Text>
                        <Form.Control placeholder={this.props.attendanceInfo.endTime}/>
                    </InputGroup>
                    <Button variant="success">确认修改</Button>        
            </div>
        );
    }
}