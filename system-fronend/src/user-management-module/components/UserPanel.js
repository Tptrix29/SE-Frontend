import React from "react";
import { Utils } from "../../js-library/func-chunk";
import "../../static/style.css"
import FunctionCard from "./FunctionCard";
import { TokenApiClient } from "../service/TokenApiClient";
import { CourseApiClient } from "../../course-management-module/service/CourseApiClient";

import libImg from '../../../public/img/library.jpeg';

export default class CrousePanel extends React.Component{
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

    // viewCourse = (code) => {
    //     WebPathConfig.toURL('/course/' + code, {token: this.state.token})
    // }



    render(){
        return(
            <div className="home-panel">
                {   
                    this.getCourses().map((course) => {
                        // console.log(course);
                        return <FunctionCard key={course.code} imgSource={libImg} title={course.name} textContent={course.description} link={this.state.courseLinkPrefix} linkParams={{token: this.state.token, code: course.code}}/>
                    })
                }
                {/* <FunctionCard 
                imgSource="img/library.jpeg"
                title="高等数学"
                textContent="王XX"/>
                <FunctionCard 
                imgSource="img/library.jpeg"
                title="大学英语"
                textContent="李XX" />
                <FunctionCard 
                imgSource="img/library.jpeg"
                title="线性代数"
                textContent="邓XX" />
                <FunctionCard 
                imgSource="img/library.jpeg"
                title="面向对象编程"
                textContent="杨XX" /> */}
                
            </div>
        );
    }
}