import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuth from './useAuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { getAllChannels } from '../slices/channelSlice.js';
import { getAllMessages, sendMessages } from '../slices/messagesSlice.js';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { io } from 'socket.io-client';

export default function MainPage() {
  const { loggedIn } = useAuth();
  console.log(loggedIn);
  const dispatch = useDispatch();
  const socket = io();

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

  const channelsData = useSelector((state) => state.channels.channels);
  const messagesData = useSelector((state) => state.messages.messages);
  console.log(channelsData);
  console.log(messagesData);
  // channelsData.map((item) => console.log(item));

  console.log(messagesData);
  console.log(localStorage);

  const SignupSchema = Yup.object().shape({
    message: Yup.string()
      .min(2, 'Минимум 2 буквы')
      .max(500, 'Максимум 50 букв')
      .required('Обязательное поле'),
  });
  socket.on('chatMessage', (msg) => {
    console.log('msg from socket.on')
    console.log('message: ' + msg);
    dispatch(sendMessages(msg));
  });
  return (
    <div>
      <h1>MainPage</h1>
      <ul>
        {channelsData &&
          channelsData.map((item) => <li key={item.id}>{item.name}</li>)}
      </ul>
      <h2>Type your message here</h2>
      <Formik
        initialValues={{
          message: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(value) => {
          if (value) {
            socket.emit('chatMessage', value.message);
            
            console.log('msg from socket.emit');
              console.log(value);
              value = '';
          }
        
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

     
     
  
    </div>
  );
}
