import React from 'react';
// import FilePanel from '../../experiment-management-module/components/FilePanel';
import { Utils } from '../../js-library/func-chunk';
import "../../static/style.css"
import { CourseApiClient } from '../service/CourseApiClient';

export default class CourseIntro extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            token: Utils.getURLParam(window.location, 'token'),
            cid: Utils.getURLParam(window.location, 'cid'),
            courseData: {
                status: null,
                startTime: null,
                endTime: null,
            },
        }
    }

    convertStatus = (str) => {
        if(str == 'GOING_ON')
            return '进行中';
        else if(str == 'NOT_STARTED')
            return '未开始';
        else if(str == 'TERMINATED')
            return '已结束';
        else
            return '错误状态';
    }

    componentDidMount(){
        CourseApiClient.getCourseInfo(this.state.cid).then(resp=>{
            console.log(resp)
            this.setState({courseData: {
                status: this.convertStatus(resp.data.status),
                startTime: resp.data.startTime,
                endTime: Date.parse(resp.data.endTime).toLocaleString()
            }});
        })
    }

    render(){
        return(
            <div className="mt-3">
                课程状态：{this.state.courseData.status}<br/>
                责任教师：zhang XX<br/>
                任课教师：<br/>
                助教：<br/>
                上课时间：{this.state.courseData.startTime} - {this.state.courseData.endTime}<br/>
            </div>
        );
    }
}