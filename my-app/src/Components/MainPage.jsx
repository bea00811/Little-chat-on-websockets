import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import AddChannelModal from './AddChannelModal';
import DeleteChannelModal from './DeleteChannelModal';
import RenameChannelModal from './RenameChannelModal';
import Dropdown from 'react-bootstrap/Dropdown';
import useAuth from './useAuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { getAllChannels, changeChannel} from '../slices/channelSlice.js';
import { getAllMessages } from '../slices/messagesSlice.js';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { io } from 'socket.io-client';
import MyHeader from './Header';


export default function MainPage(props) {


    const { loggedIn, setLoggedIn} = useAuth();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(loggedIn);
  console.log(localStorage)
  
  useEffect(() => {
  if(!localStorage.user){
     navigate('/login');
    console.log('not registerd')
    setLoggedIn(false)
  }else{
    setLoggedIn(true)
  }
}, []);


  const socket = io();

     
  const [showModal, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showDeleteChannelModal, setShowDeleteChannelModal] = useState(false);
  const handleCloseDeleteChannelModal = () => setShowDeleteChannelModal(false);
  const handleShowDeleteChannelModal = () => setShowDeleteChannelModal(true);

  const [showRenameChannelModal, setShowRenameChannelModal] = useState(false);
  const handleCloseRenameChannelModal = () => setShowRenameChannelModal(false);
  const handleShowRenameChannelModal = () => setShowRenameChannelModal(true);


 useEffect(() => {
  if(loggedIn){
    try {
      async function getChannels() {
        const token = localStorage.user?JSON.parse(localStorage.user).userToken:null
        const serverDataLogUser = await axios.get('/api/v1/data', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(getAllChannels(serverDataLogUser.data.channels));
        dispatch(getAllMessages(serverDataLogUser.data.messages));

      }
      getChannels();
    } catch (err) {
      console.log(err);
    }

  }

  }, []);


 const channelsData = useSelector((state) => state.channels.channels);
 const currentChannel = useSelector((state) => state.channels.currentChannel);
 const messagesData = useSelector((state) => state.messages.messages);
 const currentChannelHere = channelsData.find(item=>item.id === currentChannel)

 console.log(channelsData)
 console.log(currentChannel)
 console.log(messagesData)
 console.log(currentChannelHere&&currentChannelHere.name)

 const deleteCurrentChannel = (e)=>{
  const id = e.target.closest('.channelLi').dataset.id
  handleShowDeleteChannelModal()
  dispatch(changeChannel(id))
}


const renameCurrentChannel = (e)=>{
  handleShowRenameChannelModal()
  console.log(e.target.closest('.channelLi').dataset.id)
  const id = e.target.closest('.channelLi').dataset.id
  dispatch(changeChannel(id))
}
  const SignupSchema = Yup.object().shape({
    message: Yup.string()
      .min(2, 'Минимум 2 буквы')
      .max(500, 'Максимум 50 букв')
      .required('Обязательное поле'),
  });

 
  return (
    <div>
      <MyHeader/>
      <h1>MainPage</h1>
    
  
      <p>{props.name}</p>
      <h4>{props.surname}</h4>
      <div>
      <div className = 'channelsContainer'>
      <Button className='addChannel' variant="primary" onClick={handleShow}>
          Add new channel button
      </Button>
          <ul className='channelsList'>
            {channelsData &&
              channelsData.map((item) =>  {
                 return  item.removable ?  
                 <li className='channelLi' key={item.id} data-id = {item.id}><button onClick={()=>dispatch(changeChannel(item.id))} type = 'button' className ='w-100 rounded-0 text-start btn btn-secondary'>
                 <span>#{item.name}</span>
                 </button>
                 <div>
                      <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic"></Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick = {deleteCurrentChannel} >Delete Channel</Dropdown.Item>
                        <Dropdown.Item onClick = {renameCurrentChannel } >Rename Channel</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                 </li>:
                 <li key={item.id} data-id = {item.id}><button onClick={()=>dispatch(changeChannel(item.id))} type = 'button' className ='w-100 rounded-0 text-start btn btn-secondary'>
                  <span>#{item.name}</span>
                  </button> 
                </li>
            
              }
              )}
          </ul>
      </div>
      <div className = 'messagesContainer'>
        { <h3>Channel Name is: <strong>{currentChannelHere&&currentChannelHere.name}</strong></h3> }
      <ul className='messagesList'>
      { messagesData && messagesData.map((item)=><li key={item.id}>{item.message}</li>)}
       </ul>
      </div>
      </div>
    <h2>Type your message here</h2>
      <Formik
        initialValues={{
          message: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={async (value,  {setSubmitting}) => {
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
            {errors.message && touched.message ? (<div>{errors.message}</div>) : null}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
      <AddChannelModal showModal = {showModal} handleClose = {handleClose}/>
      <DeleteChannelModal showDeleteChannelModal = {showDeleteChannelModal} handleCloseDeleteChannelModal = {handleCloseDeleteChannelModal}/>
      <RenameChannelModal showModal = {showRenameChannelModal} handleClose = {handleCloseRenameChannelModal}/>
    </div>
  )}
