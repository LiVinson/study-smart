import React from 'react';
import { Modal } from 'react-bootstrap';
// import { Button } from 'react-bootstrap';
import "./ModalBoot.css";

const ModalBoot = (props) => {
    return (
        <Modal show={props.show}>
            <Modal.Header>
                <Modal.Title className="modalTitle">{props.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body className="modal-body">
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                {/* <Button>Close</Button> */}
                {/* <Button bsStyle="primary">Save Profile</Button> */}
            </Modal.Footer>
        </Modal>
    );
}

export default ModalBoot;