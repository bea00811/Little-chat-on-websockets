import { Modal, Button } from "react-bootstrap";
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { io } from 'socket.io-client';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
const socket = io();




function AddChannelModal(props) {
  const { t } = useTranslation();
  const channelsData = useSelector((state) => state.channels.channels);
  const channelsNames = channelsData.map((item)=>item.name)

  const newChannelValid =(channelsData)=> Yup.object().shape({
    newChannelName: Yup.string()
      .min(2, t('maximum 20 symb min 3'))
      .max(20, t('maximum 20 symb min 3'))
      .required(t('required field'))
      .notOneOf(channelsData, t('Duplicate'))
  });

  return (
    <Modal show={props.showModal} onHide={props.handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{t('Add new channel')}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Formik
  initialValues={{
    newChannelName: '',

  }}
  validationSchema={newChannelValid(channelsNames)}
  onSubmit={async (value, errors, touched) => {
    console.log(errors)
     if (value.newChannelName !== '') {  
      const valueForSocket = {};
      valueForSocket.name =  value.newChannelName 
      socket.emit('newChannel', valueForSocket);
      toast(t('Added new Channel'));
      props.handleClose();
     
      // errors.newChannelName && touched.newChannelName? props.handleShow: props.handleClose
    }
  }}
>
  {({ errors, touched }) => (
  <Form className="d-flex">
    <label className="visually-hidden" htmlFor="newChannelName">{t('Channel name')}</label>
    <Field className={errors.newChannelName && touched.newChannelName?('form-control is-invalid'):('form-control')} id="newChannelName" name="newChannelName" placeholder={t('Channel name')} />
    {errors.newChannelName && touched.newChannelName? (<div className="invalid-tooltip">{errors.newChannelName}</div>) : null}
    <button className="btn btn-primary" type="submit">{t('Send msg')}</button>
  </Form>
       )}
   </Formik>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={props.handleClose}>
      {t('Cancel')}
      </Button>
     </Modal.Footer>
  </Modal>
  );
}

export default AddChannelModal;