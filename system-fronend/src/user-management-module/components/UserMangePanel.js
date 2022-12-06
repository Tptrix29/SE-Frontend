import React from "react";
import {Button, Card, ListGroup} from 'react-bootstrap';
import SearchBar from './SerachBar';

export default class UserManagePanel extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user:{
                uid: '3232222',
                username: 'test',
                email: 'test@tongji.edu.cn',
                isActive: false,
            }
        }
    }

    render(){
        const [type, text] = this.state.user.isActive ? ["link-success", "已激活"]:["link-warning", "未激活"];
        return(
            <div class="page-panel">
                <div class="page-info-left">
                    <div class="page-title">用户管理</div>
                    <Card>
                        <Card.Body>
                            <Card.Title>查询用户信息：</Card.Title>

                            <SearchBar tip="学/工号"/>
                            <ListGroup style={{width:"80%", textAlign:"center", marginBottom: "2%"}}>
                                <ListGroup.Item>学/工号：{this.state.user.uid}</ListGroup.Item>
                                <ListGroup.Item style={{fontWeight:"bold"}}>用户名：{this.state.user.username}</ListGroup.Item>
                                <ListGroup.Item>邮箱：
                                    <a class="link-primary">
                                        {this.state.user.email}
                                    </a>
                                    </ListGroup.Item>
                                <ListGroup.Item>
                                    激活状态：
                                    <a className={type}>{text}</a>
                                    </ListGroup.Item>
                                <ListGroup.Item variant="danger">
                                    <Button style={{textAlign: "right"}} variant="danger" >注销</Button>
                                </ListGroup.Item>
                            </ListGroup>
                            <a className="link-info" style={{marginTop: "10%"}}>批量添加新用户...</a>

                        </Card.Body>
                    </Card>
                </div>
                
            </div>
        );
    }
}