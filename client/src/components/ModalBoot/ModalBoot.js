import React from 'react';
import { Modal } from 'react-bootstrap';
import "./ModalBoot.css";

const ModalBoot = props => {
    return (
        <Modal show={props.show}>
            <Modal.Header>
                <Modal.Title className="modalTitle">{props.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body className="modal-body">
                {props.children}
            </Modal.Body>
            
            {/* ACTION - Determine what, if anything should go in modal footer */}
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    );
}

export default ModalBoot;