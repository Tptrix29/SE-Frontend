import React from "react";
import { Button } from "react-bootstrap";

export default class CourseRow extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <tr>
                <td>{this.props.nRow}</td>
                <td>{this.props.data.name}</td>
                <td>{this.props.data.state}</td>
                <td>
                    <Button variant="outline-primary" >编辑</Button>&nbsp;&nbsp;
                    <Button variant="outline-primary" >添加老师</Button>&nbsp;&nbsp;
                    <Button variant="outline-primary" >添加学生</Button>
                </td>
            </tr>
        );
    }
}