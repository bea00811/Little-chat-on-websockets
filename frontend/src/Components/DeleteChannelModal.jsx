import { Modal, Button } from "react-bootstrap";
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const socket = io();



function DeleteChannelModal(props) {
    const { t } = useTranslation();
    const currentChannelModal = useSelector((state) => state.modals.currentChannel);
    
    const deleteChannelHere = (id)=>{ 
        const valueForSocket = {};
        valueForSocket.id = id;
        socket.emit('removeChannel', valueForSocket); 
        toast(t('Deleted Channel'));
        props.handleCloseDeleteChannelModal()  
    } 


  return (
    <Modal show={props.showDeleteChannelModal} onHide={props.handleCloseDeleteChannelModal}>
    <Modal.Header closeButton>
      <Modal.Title>{t('Delete channel')} </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    {t('Are you shure you want delete?')} 
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={props.handleCloseDeleteChannelModal}>
      {t('Cancel')}
      </Button>
      <Button variant="primary" onClick={()=>deleteChannelHere(currentChannelModal)}>
      {t('Delete')}
      </Button>
    </Modal.Footer>
  </Modal>
  );
}

export default DeleteChannelModal;