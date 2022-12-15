import React from 'react';
import "../../static/style.css"
import Nav from 'react-bootstrap/Nav'

export class CourseNav extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="course-nav">
                <span className="course-title">课程名</span>

                <Nav className='nav-tab' variant="tabs" style={{justifyContent:"flex-end"}} defaultActiveKey="main" onSelect={(selectedKey) => {this.props.changeFunc(selectedKey)}}>
                    <Nav.Item>
                        <Nav.Link eventKey="main">主页</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="exp">实验</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="attendance">考勤</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="assignment">作业</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="score">成绩</Nav.Link>
                    </Nav.Item>
                </Nav>
                
            </div>
        );
    }
}