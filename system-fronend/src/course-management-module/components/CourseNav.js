import React from 'react';
import "../../static/style.css"
import Nav from 'react-bootstrap/Nav'
import Card from 'react-bootstrap/Card'

export class CourseNav extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div class="course-nav">
                    <Nav className='nav-tab' variant="tabs" defaultActiveKey="#main" onSelect={(selectedKey) => (`selected ${selectedKey}`)}>
                    <Nav.Item>
                        <Nav.Link href="#main">主页</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#exp">实验</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link>资料</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="disabled" >考勤</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="disabled" >作业</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="disabled" >成绩</Nav.Link>
                    </Nav.Item>
                </Nav>
                <span class="course-title">课程名</span>
                
            </div>
        );
    }
}