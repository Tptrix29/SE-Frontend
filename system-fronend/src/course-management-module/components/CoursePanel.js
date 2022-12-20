import React from 'react';
import "../../static/style.css"
import { CourseNav } from './CourseNav';
import CourseIntro from './CourseIntro';
import ScoreView from '../../score-management-module/components/ScoreView';
import ExpSubPanel from './ExpSubPanel';


import { Utils } from '../../js-library/func-chunk';
import { CourseApiClient } from '../service/CourseApiClient';
import { TokenApiClient } from '../../user-management-module/service/TokenApiClient';
import AttendanceSubPanel from './AttendanceSubPanel';
import AssignmentSubPanel from './AssignmentSubPanel';

export class CoursePanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            contentId: "main",

            token: Utils.getURLParam(window.location, 'token'),
            nid: '',
            code: Utils.getURLParam(window.location, 'code'),
            role: '-',
            courseData: {
                status: null,
                startTime: null,
                endTime: null,
                
            },
            teacherData: {
                chargeTeacher: [],
                commonTeacher: [],
                assisant: [],
            },
        }
    }

    componentDidMount(){
        this.getCourseData();
    }



    getCourseData = async () => {
        // get nid
        var nid = await TokenApiClient.verify(this.state.token).then(resp => {
            this.setState({nid: resp.data.nid});
            return resp.data.nid;
        })

        // Course Basic Info
        CourseApiClient.getCourseInfo(this.state.code).then(resp=>{
            // console.log(resp.data)
            this.setState({courseData: {
                status: this.convertStatus(resp.data.status),
                startTime: Utils.timestamp2date(resp.data.startTime),
                endTime: Utils.timestamp2date(resp.data.endTime),
            }});
        })

        // Course Teacher Info
        CourseApiClient.getTeacher(this.state.code).then(resp => {
            var role = 'STUDENT';
            var chargeTeacher = [];
            var commonTeacher = [];
            var assisant = [];
            // console.log('teacher:', resp.data)
            resp.data.map((teacher) =>{
                if(teacher.nid == nid)
                    role = teacher.role;
                switch(teacher.role){
                    case 'CHARGING_TEACHER': {
                        chargeTeacher.push(
                            {
                                name: teacher.name, 
                                nid: teacher.nid
                            }
                        );break;
                    }
                    case 'TEACHER': {
                        commonTeacher.push(
                            {
                                name: teacher.name, 
                                nid: teacher.nid
                            }
                        );break;
                    }
                    case 'ASSISTANT': {
                        assisant.push(
                            {
                                name: teacher.name, 
                                nid: teacher.nid
                            }
                        );break;
                    }
                    default: break;
                }
            })
            this.setState({
                role: role,
                teacherData:{
                    chargeTeacher: chargeTeacher,
                    commonTeacher: commonTeacher,
                    assisant: assisant,
                }
            })
            // console.log(role);
        })
    }

    convertStatus = (str) => {
        if(str == 'GOING_ON')
            return '进行中';
        else if(str == 'NOT_STARTED')
            return '未开始';
        else if(str == 'TERMINATED')
            return '已结束';
        else
            return '--';
    }

    changeContentId = (newId)=>{
        this.setState({
            contentId: newId,
        });
    }

    render(){
        // console.log('TeacherData: ', this.state.teacherData)
        return(
            <div className="page-panel">
                <CourseNav changeFunc={(newId)=>this.changeContentId(newId)}/>
                {(()=>{
                    switch(this.state.contentId){
                        case "main": return (
                            <div id="main" className="intro-panel">
                                <CourseIntro courseData={this.state.courseData} teacherData={this.state.teacherData}/>
                            </div>
                        );
                        case "exp": return(
                            <div id="exp" className="intro-panel">
                                <ExpSubPanel role={this.state.role}/>
                            </div>
                        );
                        case "attendance": return(
                            <div id="attendance" className="intro-panel">
                                <AttendanceSubPanel role={this.state.role} nid={this.state.nid}/>
                            </div>
                        );
                        case "assignment": return(
                            <div id="assignment" className="intro-panel">
                                <AssignmentSubPanel role={this.state.role} nid={this.state.nid}/>
                            </div>
                
                        );
                        case "score": return (
                            <div id="score" className="intro-panel">
                                <ScoreView role={this.state.role}/>
                            </div>
                        );
                        default: return null;
                    }
                })()}
                
                
                
                
            </div>
        );
    }
}