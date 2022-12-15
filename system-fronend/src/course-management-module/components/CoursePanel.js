import React from 'react';
import "../../static/style.css"
import { CourseNav } from './CourseNav';
import CourseIntro from './CourseIntro';
import ExpItem from '../../experiment-management-module/components/ExpItem';
import AddTrigger from '../../experiment-management-module/components/AddTrigger';
import AssignmentItem from '../../score-management-module/components/AssignmentItem';
import AttendanceItem from '../../score-management-module/components/AttendanceItem';
import ScoreView from '../../score-management-module/components/ScoreView';


export class CoursePanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            contentId: "main",
        }
    }

    changeContentId = (newId)=>{
        this.setState({
            contentId: newId,
        });
    }

    render(){
        return(
            <div className="page-panel">
                <CourseNav changeFunc={(newId)=>this.changeContentId(newId)}/>
                {(()=>{
                    switch(this.state.contentId){
                        case "main": return (
                            <div id="main" className="intro-panel">
                                <CourseIntro/>
                            </div>
                        );
                        case "exp": return(
                            <div id="exp" className="intro-panel">
                                <AddTrigger/>
                                <ExpItem />
                                <ExpItem/>
                            </div>
                        );
                        case "attendance": return(
                            <div id="attendance" className="intro-panel">
                                <AttendanceItem manage={true}/>
                                <AttendanceItem manage={false}/>
                            </div>
                        );
                        case "assignment": return(
                            <div id="assignment" className="intro-panel">
                                <AssignmentItem manage={true}/>
                                <AssignmentItem manage={false}/>
                            </div>
                
                        );
                        case "score": return (
                            <div id="score" className="intro-panel">
                                <ScoreView/>
                            </div>
                        );
                        default: return null;
                    }
                })()}
                
                
                
                
            </div>
        );
    }
}