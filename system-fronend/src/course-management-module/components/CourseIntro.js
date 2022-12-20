import React from 'react';
import "../../static/style.css"

export default class CourseIntro extends React.Component{
    constructor(props){
        super(props);
    }

    // {name, nid}
    getTeacherNameArr = (teachers) => {
        var arr = []
        teachers.map((t) => {
            arr.push(t.name)
        })
        return arr;
    }

    render(){
        var charge = this.props.teacherData.chargeTeacher;
        var common = this.props.teacherData.commonTeacher;
        var assisant = this.props.teacherData.assisant;
        return(
            <div className="mt-3">
                课程状态：{
                    this.props.courseData.status
                }<br/>
                责任教师：{
                    charge.length ?
                        this.getTeacherNameArr(charge).join(', '):'无'
                }<br/>
                任课教师：{
                    common.length ? 
                    this.getTeacherNameArr(common).join(', '):'无'
                }<br/>
                助教：{
                    assisant.length ? 
                    this.getTeacherNameArr(assisant).join(', '):'无'
                }<br/>
                上课时间：{this.props.courseData.startTime} -- {this.props.courseData.endTime}<br/>
            </div>
        );
    }
}