import React from "react";
import {Button, Card, ListGroup} from 'react-bootstrap';
import SearchBar from './SerachBar';
import { UserApiClient } from "../service/UserApiClient";
import AlertTip from './AlertTip';
import { TokenApiClient } from "../service/TokenApiClient";
import { Utils } from "../../js-library/func-chunk";
import { UploadOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

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


export default class UserManagePanel extends React.Component{
    constructor(props){
        super(props);
        this.state={
            queryNid: '',
            queryFound: false,
            queryResult:{
                nid: '',
                username: '',
                email: '',
                isActive: false,
                isAdmin: false,
            },
            FailedResult:{
                nid: 'Not Found',
                username: 'None',
                email: 'None',
                isActive: false,
            },
            alertInfo:{
                visible: false,
                tip: '',
            },
            fileList: []
        }
    }

    uploadFile = (options) =>{
        [file, filename, data] = options;
        console.log("file: " + file)
        // console.log("filename: " + filename)
        // console.log("data: " + data)
    }

    changeQueryNid = (event) => {
        // console.log(event.target.value)
        this.setState({
            queryNid: event.target.value,
        })
    }

    resetResult = () => {
        this.setState({
            queryResult: this.state.FailedResult,
            queryFound: false,
            queryNid: '',
        })
    }

    retrieve = () => {
        if(this.state.queryNid){
            UserApiClient.retrieve(this.state.queryNid).then(resp=>{
                this.setState({
                    queryResult: {
                        nid: resp.data.nid,
                        username: resp.data.name,
                        email: resp.data.email,
                        isActive: resp.data.active,
                        isAdmin: resp.data.admin,
                    },
                    queryFound: true,
                });
            }).catch(err => {
                this.showAlertInfo("检索失败")
                console.log(err);
                this.resetResult();
            })
        }
    }

    deleteUser = () => {
        if(this.state.queryResult.isAdmin)
            return this.showAlertInfo('非法行为：不能注销管理员')
        TokenApiClient.verify(Utils.getURLParam(window.location, 'token')).catch(err => {
            console.log(err)
            this.showAlertInfo('登录失效，请重新登录后再试')
        // Submit Deletion
        }).then(resp => {
            return UserApiClient.deleteOne(this.state.queryResult.nid);
        }).then(resp => {
            this.resetResult();
            this.showAlertInfo('注销成功');
        })
    }

    

    showAlertInfo = (info) => {
        // console.log(info, this.state.alertInfo.visible)
        this.setState({
            alertInfo:{
                visible: true,
                tip: info,
            },
        })
    }

    setInvisible = () => {
        this.setState({
            alertInfo:{
                visible: false,
            },
        })
    }

    render(){
        const [type, text] = this.state.queryResult.isActive ? ["link-success", "已激活"]:["link-warning", "未激活"];
        return(
            <div className="page-panel">
                <div className="page-info-left">
                    <div className="page-title">用户管理</div>
                    <Card>
                        <Card.Body>
                            <Card.Title>查询用户信息：</Card.Title>

                            <SearchBar tip="学/工号" addDropdown={false} keywordBind={this.changeQueryNid} query={this.retrieve}/>
                            <ListGroup style={{width:"80%", textAlign:"center", marginBottom: "2%"}}>
                                <ListGroup.Item>学/工号：{this.state.queryResult.nid}</ListGroup.Item>
                                <ListGroup.Item style={{fontWeight:"bold"}}>用户名：{this.state.queryResult.username}</ListGroup.Item>
                                <ListGroup.Item>邮箱：
                                    <a className="link-primary">
                                        {this.state.queryResult.email}
                                    </a>
                                    </ListGroup.Item>
                                <ListGroup.Item>
                                    激活状态：
                                    <a className={type}>{text}</a>
                                </ListGroup.Item>
                                <ListGroup.Item variant="danger">
                                    <Button style={{textAlign: "right"}} variant="danger" onClick={this.deleteUser}>注销</Button>
                                </ListGroup.Item>
                            </ListGroup>
                            
                            <Upload {...props }>
                                <Button icon={<UploadOutlined/>}>批量添加新用户(.csv)</Button>
                            </Upload>
                        </Card.Body>
                    </Card>
                    <AlertTip visible={this.state.alertInfo.visible} 
                    info={this.state.alertInfo.tip} close={this.setInvisible}/>
                </div>
                
            </div>
        );
    }
}