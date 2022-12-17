import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function AlertTip(props) {
  
    const handleClose = () => {
        props.close()
    };
    // const handleShow = () => setShow(true);
  
    return (
      <>
        <Modal show={props.visible} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>提示</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{textAlign: 'center'}}>{props.info}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              确认
            </Button>
            {/* <Button variant="secondary" onClick={handleClose}>
              取消
            </Button> */}
          </Modal.Footer>
        </Modal>
      </>
    );
  }