import React from 'react';
import "../../static/style.css"
import Nav from 'react-bootstrap/Nav'
import Card from 'react-bootstrap/Card'
import { CourseNav } from './CourseNav';

export class CoursePanel extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div class="page-panel">
                <CourseNav/>
            </div>
        );
    }
}