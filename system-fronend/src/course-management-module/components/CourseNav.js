import React from 'react';
import "../../static/style.css"
import Nav from 'react-bootstrap/Nav'
import { CourseApiClient } from '../service/CourseApiClient';
import { Utils } from '../../js-library/func-chunk';

export class CourseNav extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            code: Utils.getURLParam(window.location, 'code'),
            courseName: '--'
        }
    }

    componentDidMount(){
        this.getCourseName();
    }

    getCourseName = () => {
        CourseApiClient.getCourseInfo(this.state.code).then(resp => {
            console.log(resp.data.name)
            this.setState({
                courseName: resp.data.name,
            })
        }).catch(err => {
            console.log(err);
        })
    }

    render(){
        return(
            <div className="course-nav">
                <span className="course-title">{this.state.courseName}</span>

                <Nav className='nav-tab' variant="tabs" style={{justifyContent:"flex-end"}} defaultActiveKey={this.props.default} onSelect={(selectedKey) => {this.props.changeFunc(selectedKey)}}>
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