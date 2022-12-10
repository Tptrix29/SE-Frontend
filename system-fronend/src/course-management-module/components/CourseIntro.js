import React from 'react';
import "../../static/style.css"

export class CourseIntro extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <div class="mt-3 intro-panel">
                    <div>
                        课程状态：<br/>
                        责任教师：zhang XX<br/>
                        任课教师：<br/>
                        助教：<br/>
                        上课时间：<br/>
                        课程简介：<br/>
                    </div>
                    

                </div>
            </div>
        );
    }
}