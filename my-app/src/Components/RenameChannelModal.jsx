import { Modal, Button } from "react-bootstrap";
import { Formik, Form, Field } from 'formik';
import { io } from 'socket.io-client';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
const socket = io();

const newChannelValid = Yup.object().shape({
  newChannelName: Yup.string()
    .min(2, 'Минимум 2 буквы')
    .max(20, 'Максимум 20 букв')
    .required('Обязательное поле'),
});


function RenameChannelModal(props) {

  const currentChannelModal = useSelector((state) => state.modals.currentChannel);

  return (
    <Modal show={props.showModal} onHide={props.handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Rename this channel</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Formik
  initialValues={{
    newChannelName: '',

  }}
  validationSchema={newChannelValid}
  onSubmit={async (value) => {
    console.log(JSON.stringify(value, null, 2))
       if (value.newChannelName !== '') {  
      const valueForSocket = {};
      valueForSocket.id = currentChannelModal
      valueForSocket.name = value.newChannelName 
      socket.emit('renameChannel', valueForSocket);
      toast('Channel is Renamed');
    }
  }}
>
  {({ errors, touched }) => (
  <Form>
    <label htmlFor="newChannelName">First Name</label>
    <Field id="newChannelName" name="newChannelName" placeholder="newChannelName" />
    {errors.newChannelName && touched.newChannelName? (
          <div>{errors.newChannelName}</div>
        ) : null}
    <button type="submit"onClick={props.handleClose}>Submit</button>
  </Form>
       )}
   </Formik>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={props.handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={props.handleClose}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
  );
}

export default RenameChannelModal;