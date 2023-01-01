import React from "react";
import {Button, Card, ListGroup} from 'react-bootstrap';
import { UserApiClient } from "../service/UserApiClient";
import AlertTip from './AlertTip';
import { TokenApiClient } from "../service/TokenApiClient";
import { Utils } from "../../js-library/func-chunk";
import { UploadOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import StudentTable from "./StudentTable";
import AddStudent from "./AddStudent";
import { CourseApiClient } from "../../course-management-module/service/CourseApiClient";


const props = {
    name: 'csv',
    multiple: false,
    accept: 'text/csv',
    directory: false,
    customRequest: info => {
        UserApiClient.batchAddUsers(info).then(resp => {
            if(!resp.data.fail.length){
                message.success(`${info.file.name} 文件上传成功`);
                info.onSuccess(resp);
            }
            else{
                message.error(`${info.file.name} 中存在非法数据, 非法NID: ${resp.data.fail.join(',')}`);
                info.onError();
            }
        }).catch(err => {
            message.error(`${info.file.name} 文件上传失败`);
            info.onError(err);
        })
    }
};


export default class AddStudentPanel extends React.Component{
    constructor(props){
        super(props);
        this.state={
            code: Utils.getURLParam(window.location, "code"),
            studentData: [],
            fileList: []
        }
    }

    uploadFile = (options) =>{
        [file, filename, data] = options;
        console.log("file: " + file)
        // console.log("filename: " + filename)
        // console.log("data: " + data)
    }

    componentDidMount(){
        this.getStudent();
    }

    getStudent = () => {
        CourseApiClient.getStudent(this.state.code).then(resp => {
            this.setState({
                studentData: resp.data
            })
        }).catch(err => {
            console.log(err);
            this.setState({
                studentData: []
            })
        })
    }

    addLocalStudentArr = (data) => {
        var studentArr = this.state.studentData;
        studentArr.push(data)
        this.setState({
            studentData: studentArr,
        })
    }

    deleteStudent = async (nid) => {
        await CourseApiClient.deleteStudent(this.state.code, nid).then(resp => {
            message.success(`${nid} 移除成功`)
        }).catch(err => {
            console.log(err);
            message.error(`${nid} 移除失败`);
        })
        this.getStudent();
    }

    render(){
        return(
            <div className="page-panel">
            <div className="page-info-left">
                <div className="page-title">添加学生</div>

                <div><AddStudent addAction={this.addLocalStudentArr}/></div>
                <hr/>
                <div><StudentTable data={this.state.studentData} deleteAction={this.deleteStudent}/></div>
               
                
                <div>
                <Upload {...props }>
                <Button icon={<UploadOutlined/>}>批量添加学生(.csv)</Button>
                </Upload>
                </div>

          
            </div>
            </div>
        );
    }
}