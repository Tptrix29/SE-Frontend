import React from 'react';
import { WebPathConfig } from '../../config/web-path';
import { Utils } from '../../js-library/func-chunk';
import { TokenApiClient } from "../service/TokenApiClient";
import { CourseApiClient } from "../../course-management-module/service/CourseApiClient";
import "../../static/style.css"

export default class UserNav extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            token: Utils.getURLParam(window.location, 'token'),
            courseAsStudent: [],
            courseAsTeacher: [],
            courseLinkPrefix: '/course',
        }
    }

    componentDidMount(){
        TokenApiClient.verify(this.state.token).catch(err => {
            console.log(err);
        }).then(resp => {
            return CourseApiClient.loadCourseAsStudent(resp.data.nid);
        }).then(resp => {
            this.setState({
                courseAsStudent: resp.data,
            })
        }).catch(err => {
            console.log(err)
        })

        TokenApiClient.verify(this.state.token).catch(err => {
            console.log(err);
        }).then(resp => {
            return CourseApiClient.loadCourseAsTeacher(resp.data.nid);
        }).then(resp => {
            this.setState({
                courseAsTeacher: resp.data,
            })
        }).catch(err => {
            console.log(err)
        })
    }
    
    getCourses = () => {
        var courseArr = this.state.courseAsStudent;
        this.state.courseAsTeacher.map((course) => {
            courseArr.push(course)
        })
        return courseArr;
    }

    backHome = () => {
        WebPathConfig.toURL('/user', {token: this.state.token})
    }

    toCourse = (code) => {
        WebPathConfig.toURL(this.state.courseLinkPrefix, {
            token: this.state.token,
            code: code,
        })
    }

    render(){
        return(
            <ul className="nav flex-column side-nav">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" onClick={this.backHome}>控制面板</a>
                </li>
                {
                    this.getCourses().map((course) => {
                        return (
                            <li key={course.code} className="nav-item">
                                <a className="nav-link" onClick={() => this.toCourse(course.code)}>{course.name}</a>
                            </li>
                        );
                    })
                }
                {/* <li className="nav-item">
                    <a className="nav-link">高等数学</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">大学英语</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">线性代数</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link ">面向对象编程</a>
                </li> */}
            </ul>
        );
    }
}