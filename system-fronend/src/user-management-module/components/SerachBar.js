import React from "react";
import {Button, InputGroup, Form, DropdownButton, Dropdown} from 'react-bootstrap';

export default class UserManagePanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dropTitle:".*",
            dropItems:[".doc/.docx", ".pdf", ".ppt/.pptx"],
        }
    }

    handleKeyDown = (event) => {
        if(event.keyCode == 13){
            this.props.query();
        }
    }

    render(){
        return(
            <div className="search-bar">
                <InputGroup style={{width: '60%'}}>
                    <InputGroup.Text>{this.props.tip}</InputGroup.Text>
                    <Form.Control placeholder="请输入" onChange={(event) => this.props.keywordBind(event)} onKeyDown={this.handleKeyDown}/>
                    {this.props.addDropdown ? (
                        <DropdownButton variant="outline-secondary" title={this.state.dropTitle}>
                            {
                                this.state.dropItems.map((element)=>{
                                    return <Dropdown.Item>{element}</Dropdown.Item>
                                })
                            }
                        </DropdownButton>
                    ) : null}
                </InputGroup>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button variant="success" onClick={this.props.query}>查询</Button>
            </div>
        );
    }
}