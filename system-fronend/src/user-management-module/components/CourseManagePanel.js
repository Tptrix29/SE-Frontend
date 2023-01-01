import React from 'react';
import '../../static/style.css';
import {Table, Pagination, Spinner} from 'react-bootstrap';
import { Button } from "react-bootstrap";
import AddTrigger from "../../experiment-management-module/components/AddTrigger.js";
import { WebPathConfig } from '../../config/web-path';
import "../../static/style.css";
import { Utils } from '../../js-library/func-chunk';
import { CourseApiClient } from '../../course-management-module/service/CourseApiClient';


export default class CourseManagePanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            token: Utils.getURLParam(window.location, 'token'),
            links:{
                course_modify:'/admin/course',
                add_student:'/admin/add_student',
                add_teacher:'/admin/add_teacher',
                add_course: '/admin/add_course',
            },
            row_Max: 10,
            colNames: ["序号", "课程名称", "状态", "操作"],
            data:[]


        }
    }

    componentDidMount(){
        this.getCourseInPage(0);
    }

    getCourseInPage = (page) =>{
        CourseApiClient.getCoursesInPage(page, this.state.row_Max).then(resp =>{
            console.log(resp.data)
            this.setState({
                data: resp.data.content
            })
        }).catch(err => {
            console.log(err)
        })
    }

    toURL = (path, code) =>{
        WebPathConfig.toURL(path, {
            token: this.state.token,
            code: code
        })
    }


    render(){
        var n_row = 0;
        return (
            <div className="page-panel">
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>{
                                    this.state.colNames.map((element) =>{
                                        return <th key={element}>{element}</th>
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map((item)=>{
                                    n_row += 1;
                                    return(
                                    <tr key={item.code}>
                                    <td>{n_row}</td>
                                    <td>{item.name}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <Button variant="outline-primary" onClick={()=>this.toURL(this.state.links.course_modify, item.code)} >查看</Button>&nbsp;&nbsp;
                                        <Button variant="outline-primary" onClick={()=>this.toURL(this.state.links.add_teacher, item.code)}>添加老师</Button>&nbsp;&nbsp;
                                        <Button variant="outline-primary" onClick={()=>this.toURL(this.state.links.add_student, item.code)}>添加学生</Button>
                                     </td>
                                    </tr>
                                        );
                                })}
                            </tbody>
                        </Table>
                        <AddTrigger trigger={() => this.toURL(this.state.links.add_course, "")}/>
            </div>
        );
    }
}
