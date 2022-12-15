import React from 'react';
import "../../static/style.css";
import {Form} from 'react-bootstrap';

export default class FileRow extends React.Component{
    constructor(props){
        super(props);
        
    }

    render(){
        return(
             <tr>
                <td>{this.props.nFile}</td>
                <td>
                    <a className="link-primary">{this.props.file.filename}</a>
                </td>
                <td>{this.props.file.ofCourse}</td>
                <td>
                    <Form.Check id={this.props.file.id}/>
                </td>
            </tr>
        );
    }
}