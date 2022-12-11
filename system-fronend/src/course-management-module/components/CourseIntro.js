import React from 'react';
import FilePanel from '../../experiment-management-module/components/FilePanel';
import "../../static/style.css"

export default class CourseIntro extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div class="mt-3">
                课程状态：<br/>
                责任教师：zhang XX<br/>
                任课教师：<br/>
                助教：<br/>
                上课时间：<br/>
            </div>
        );
    }
}