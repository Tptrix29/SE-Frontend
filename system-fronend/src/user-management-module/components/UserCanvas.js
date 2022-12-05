import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default class UserCanvas extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        return(
            <div>
                <Button variant="primary" onClick={handleShow}>用户信息查看</Button>
                <Offcanvas show={show} onHide={handleClose} placement="end">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>您的用户信息</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Card className="text-center">
                            <Card.Header>欢迎使用</Card.Header>
                            <Card.Body><br/>
                                <Card.Title>Username</Card.Title>
                                <Card.Text>您的角色是：系统管理员</Card.Text><br/>
                                <Button variant="outline-primary">编辑个人信息</Button><br/><br/>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item></ListGroup.Item>
                                    <ListGroup.Item>uid</ListGroup.Item>
                                    <ListGroup.Item>email</ListGroup.Item>
                                    <ListGroup.Item>acitve</ListGroup.Item>
                                    <ListGroup.Item></ListGroup.Item>
                                </ListGroup><br/>
                                <Button variant='danger' >退出登录</Button>
                            </Card.Body>
                            <Card.Footer className="text-muted">实验教学管理系统 | SE</Card.Footer>
                        </Card>
                    </Offcanvas.Body>
                 </Offcanvas>
            </div>
        );
    }
  

}
