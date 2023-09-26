import { useEffect, useState } from 'react';
 	
import { Modal, Button } from "react-bootstrap";
import useAuth from './useAuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { getAllChannels, changeChannel } from '../slices/channelSlice.js';
import { getAllMessages, sendMessages } from '../slices/messagesSlice.js';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { io } from 'socket.io-client';

export default function MainPage(props) {
  const { loggedIn } = useAuth();
  console.log(loggedIn);
  const dispatch = useDispatch();
  const socket = io();

     
  const [showModal, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



 useEffect(() => {
    try {
      async function getChannels() {
        const serverDataLogUser = await axios.get('/api/v1/data', {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        });
        console.log(serverDataLogUser.data);
        dispatch(getAllChannels(serverDataLogUser.data.channels));
        dispatch(getAllMessages(serverDataLogUser.data.messages));

      }
      getChannels();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const channelSwitcher = (id, channelData, dispatch)=>{
  console.log(id)
  const currentChannel = channelData.find(item =>item.id ===id)
  console.log(currentChannel)
   dispatch(changeChannel(currentChannel.id))
 }

 const channelsData = useSelector((state) => state.channels.channels);
 const currentChannel = useSelector((state) => state.channels.currentChannel);
 const messagesData = useSelector((state) => state.messages.messages);
 const currentChannelHere = channelsData.find(item=>item.id === currentChannel)

 console.log(channelsData)
 console.log(currentChannel)
 console.log(messagesData)
 console.log(currentChannelHere&&currentChannelHere.name)


  const SignupSchema = Yup.object().shape({
    message: Yup.string()
      .min(2, 'Минимум 2 буквы')
      .max(500, 'Максимум 50 букв')
      .required('Обязательное поле'),
  });

  return (
    <div>
      <h1 >MainPage</h1>
      <p>{props.name}</p>
      <h4>{props.surname}</h4>
      <div className = 'channelsContainer'>
      <Button className='addChannel' variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
          <ul className='channelsList'>
            {channelsData &&
              channelsData.map((item) => <li key={item.id}> <button onClick={()=>channelSwitcher(item.id, channelsData, dispatch)} type = 'button' className ='w-100 rounded-0 text-start btn btn-secondary'><span>#{item.name}</span></button></li>)}
          </ul>
      </div>
      <div className = 'messagesContainer'>
        { <h3>Channel Name is: <strong>{currentChannelHere&&currentChannelHere.name}</strong></h3> }
      <ul className='messagesList'>
      { messagesData && messagesData.map((item)=><li key={item.id}>{item.message}</li>)}
       </ul>
      </div>
     
    <h2>Type your message here</h2>
      <Formik
        initialValues={{
          message: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(value,  {setSubmitting}) => {
          setSubmitting(false)
          if (value.message !== '') {         
            socket.emit('newMessage', value);
          }
          value.message = '';
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field placeholder="Ваше сообщение" name="message" />
            {errors.message && touched.message ? (
              <div>{errors.message}</div>
            ) : null}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
