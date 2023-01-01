import React from "react";
import '../../static/style.css';
import {Table} from 'react-bootstrap';
import { Button } from "react-bootstrap";

export default class StudentTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            colNames: ["序号", "姓名", "学号","操作"],
        }

    }

    render(){
        var n_row = 0;
        return(
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>{
                            this.state.colNames.map((element) =>{
                                return <th key={element}>{element}</th>
                            })}</tr>
                    </thead>
                    <tbody>
                        {this.props.data.map((item)=>{
                            n_row += 1;
                            return(
                                <tr key={n_row}>
                                    <td>{n_row}</td>
                                    <td>{item.name}</td>
                                    <td>{item.nid}</td>
                                    <td>
                                        <Button variant="outline-primary" onClick={(event) => this.props.deleteAction(item.nid)}>删除</Button>
                                     </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                </div>
        );
    }
}