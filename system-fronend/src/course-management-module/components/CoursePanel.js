import React from 'react';
import "../../static/style.css"
import { CourseNav } from './CourseNav';
import ExpItem from '../../experiment-management-module/components/ExpItem';
import AddTrigger from '../../experiment-management-module/components/AddTrigger';


export class CoursePanel extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div class="page-panel">
                <CourseNav/>
                {/* <CourseIntro/> */}

                <ExpItem/>
                <ExpItem/>
                <AddTrigger/>

            </div>
        );
    }
}