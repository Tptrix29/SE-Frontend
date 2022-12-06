import React from "react";
import { Button } from "react-bootstrap";

export default class CheckRow extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <tr>
                <td>{this.props.nRow}</td>
                <td>{this.props.data.uid}</td>
                <td>{this.props.data.username}</td>
                <td>{this.props.data.email}</td>
                <td>
                    <Button variant="outline-primary">通过</Button>&nbsp;&nbsp;
                    <Button variant="outline-danger">不通过</Button>
                </td>
            </tr>
        );
    }
}