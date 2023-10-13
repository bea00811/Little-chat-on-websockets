import { Modal, Button } from "react-bootstrap";
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { io } from 'socket.io-client';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
const socket = io();

const newChannelValid = Yup.object().shape({
  newChannelName: Yup.string()
    .min(2, 'Минимум 2 буквы')
    .max(20, 'Максимум 20 букв')
    .required('Обязательное поле'),
});


function AddChannelModal(props) {
  const { t } = useTranslation();
  return (
    <Modal show={props.showModal} onHide={props.handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Add new channel</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Formik
  initialValues={{
    newChannelName: '',

  }}
  validationSchema={newChannelValid}
  onSubmit={async (value) => {
     if (value.newChannelName !== '') {  
      const valueForSocket = {};
      valueForSocket.name =  value.newChannelName 
      socket.emit('newChannel', valueForSocket);
      toast(t('Added new Channel'));
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

export default AddChannelModal;