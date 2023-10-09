import { Modal, Button } from "react-bootstrap";
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';

const socket = io();



function DeleteChannelModal(props) {
    const currentChannelModal = useSelector((state) => state.modals.currentChannel);
    console.log(currentChannelModal)
   
    
    const deleteChannelHere = (id)=>{ 
        const valueForSocket = {};
        valueForSocket.id = id;
        socket.emit('removeChannel', valueForSocket); 
        props.handleCloseDeleteChannelModal()  
    } 


  return (
    <Modal show={props.showDeleteChannelModal} onHide={props.handleCloseDeleteChannelModal}>
    <Modal.Header closeButton>
      <Modal.Title>Add new channel</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        Are you shure you want delete?
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={props.handleCloseDeleteChannelModal}>
        Close
      </Button>
      <Button variant="primary" onClick={()=>deleteChannelHere(currentChannelModal)}>
        Delete
      </Button>
    </Modal.Footer>
  </Modal>
  );
}

export default DeleteChannelModal;