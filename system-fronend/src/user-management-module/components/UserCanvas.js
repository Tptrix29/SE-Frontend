import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Signout from './Signout'

export default function UserCanvas(props) {
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
                            <Card.Body>
                                <Card.Title>{props.username}</Card.Title>
                                <Card.Text>您的角色是：
                                    <span style={{fontWeight: 'bold'}}>
                                        {props.isAdmin ? "系统管理员" : "普通用户"}
                                    </span>
                                </Card.Text><br/>
                                <Button variant="outline-primary">编辑个人信息</Button><br/><br/>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item></ListGroup.Item>
                                    <ListGroup.Item>ID: {props.nid}</ListGroup.Item>
                                    <ListGroup.Item>邮箱: {props.email}</ListGroup.Item>
                                    <ListGroup.Item>
                                        状态: {props.isActive ? "已激活":"未激活"}
                                    </ListGroup.Item>
                                    <ListGroup.Item></ListGroup.Item>
                                </ListGroup><br/>
                                <Signout func={props.signout}/>
                            </Card.Body>
                            <Card.Footer className="text-muted">实验教学管理系统 | SE</Card.Footer>
                        </Card>
                    </Offcanvas.Body>
                 </Offcanvas>
        </div>
        );

}
