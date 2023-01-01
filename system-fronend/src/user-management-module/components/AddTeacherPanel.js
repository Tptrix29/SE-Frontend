import React from "react";
import { Button } from 'react-bootstrap';
import { UserApiClient } from "../service/UserApiClient";
import { TokenApiClient } from "../service/TokenApiClient";
import { Utils } from "../../js-library/func-chunk";
import { UploadOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import TeacherTable from "./TeacherTable";
import AddTeacher from "./AddTeacher";
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
            // else{
            //     message.error(`${info.file.name} 中存在非法数据, 非法NID: ${resp.data.fail.join(',')}`);
            //     info.onError();
            // }
        }).catch(err => {
            message.error(`${info.file.name} 文件上传失败`);
            info.onError(err);
        })
    }
};


export default class AddTeacherPanel extends React.Component{
    constructor(props){
        super(props);
        this.state={
            code: Utils.getURLParam(window.location, 'code'),
            teacherData: [],
            fileList: [], 
        }
    }

    componentDidMount(){
        this.getTeacher();
    }

    getTeacher = () => {
        CourseApiClient.getTeacher(this.state.code).then(resp => {
            // console.log(resp.data);
            this.setState({
                teacherData: resp.data
            })
        }).catch(err => {
            console.log(err);
            this.setState({
                teacherData: []
            })
        })
    }

    deleteTeacher = async (nid) => {
        await CourseApiClient.deleteTeacher(this.state.code, nid).then(resp => {
            message.success(`${nid} 移除成功`);
        }).catch(err => {
            message.error(`${nid} 移除失败`);
        })
        this.getTeacher();
    }

    addLocalTeacherArr = (data) => {
        var arr = this.state.teacherData;
        arr.push(data);
        this.setState({
            teacherData: arr,
        })
    }


    uploadFile = (options) =>{
        [file, filename, data] = options;
        console.log("file: " + file)
        // console.log("filename: " + filename)
        // console.log("data: " + data)
    }
    

    render(){
        return(
            <div className="page-panel">
            <div className="page-info-left">
                <div className="page-title">添加教师</div>

                <AddTeacher addAction={this.addLocalTeacherArr}/>
                <hr/>
                <div className="page-title">教师列表</div>
                <TeacherTable data={this.state.teacherData} deleteAction={this.deleteTeacher}/>

                <Upload {...props }>
                <Button icon={<UploadOutlined/>}>批量添加教师(.csv)</Button>
                </Upload>
          
            </div>
            </div>
        );
    }
}