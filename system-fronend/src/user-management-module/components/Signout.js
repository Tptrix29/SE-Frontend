import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { propTypes } from 'react-bootstrap/esm/Image';
import Modal from 'react-bootstrap/Modal';

export default function Signout(props) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="danger" onClick={handleShow}>
          退出登录
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>提示</Modal.Title>
          </Modal.Header>
          <Modal.Body>确定退出系统？</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={props.func}>
              退出
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              取消
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }