
import React from 'react'
import { Modal, Button } from "react-bootstrap";

const LogoutConfirmation = ({ showModal, confirmModal, hideModal, message }) => {
  return (
    <Modal show={showModal} onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Logout Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body><div className="alert alert-danger">{message}</div></Modal.Body>
      <Modal.Footer>
        <Button variant="default" onClick={hideModal}>
          Cancel
        </Button>
        <Button variant="danger" onClick={confirmModal}>
          Logout
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default LogoutConfirmation;
