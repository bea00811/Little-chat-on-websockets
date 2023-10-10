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
import { getCurrentChannel } from '../slices/modalSlice';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { io } from 'socket.io-client';
import MyHeader from './Header';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import Texts from './Texts';
import { toast } from 'react-toastify';
import  filter from 'leo-profanity';

filter.clean('I have boob, etc.');
filter.loadDictionary('ru');
const socket = io();


    i18n.use(initReactI18next) 
   .init({ 
    lng: "en",
    fallbackLng: "en",    
    resources: {
    en: Texts,   
    },
  interpolation: {
  escapeValue: false,
    }
    });


  export default function MainPage(props) {
    const { t } = useTranslation();
    const { loggedIn, setLoggedIn} = useAuth();
    const channelsData = useSelector((state) => state.channels.channels);
const currentChannel = useSelector((state) => state.channels.currentChannel);
const messagesData = useSelector((state) => state.messages.messages);
let currentChannelHere = channelsData.find(item=>item.id === currentChannel)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if(!loggedIn){
       navigate('/login');

    }else{
      setLoggedIn(true)
    }
  }, []);
  
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
        const token = JSON.parse(localStorage.user).userToken;
        alert('before responce')
        const serverDataLogUser = await axios.get('/api/v1/data', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert('wow responce done!')
        dispatch(getAllChannels(serverDataLogUser.data.channels));
        dispatch(getAllMessages(serverDataLogUser.data.messages));

      }
      getChannels();
    } catch (err) {
      toast.error(err.message);
    }

  }
  }, []);



let filtered =[];
if(typeof currentChannelHere === 'undefined'){
  filtered = messagesData.filter(item=>item.msgId===1)
  currentChannelHere = channelsData.find(item=>item.id === 1)
}else{
filtered = messagesData.filter(item=>item.msgId===currentChannelHere.id)
}



 const deleteCurrentChannel = (e)=>{
  const id = e.target.closest('.channelLi').dataset.id
  handleShowDeleteChannelModal()
  dispatch(getCurrentChannel(id))
}


const renameCurrentChannel = (e)=>{
  handleShowRenameChannelModal()
  const id = e.target.closest('.channelLi').dataset.id
  dispatch(getCurrentChannel(id))
}
  const SignupSchema = Yup.object().shape({
    message: Yup.string()
      .min(2, 'Минимум 2 буквы')
      .max(500, 'Максимум 50 букв')
      .required('Обязательное поле'),
  });

 
  return (
    <div className="container my-4 overflow-hidden h-100 shadow rounded">
      <MyHeader navigate = {navigate}/>
      
        
    <div className="row h-100 bg-white">
      <div className="col-4 col-md-2 border-end px-0 bg-light">
      <div className = 'channelsContainer p-2'>
      <Button className='addChannel' variant="primary" onClick={handleShow}>
      {t('Add new channel button')}
      </Button>
          <ul className='channelsList'>
            {channelsData &&
              channelsData.map((item) =>  {
                 return  item.removable ?  
                 <li className='channelLi' key={item.id} data-id = {item.id}><button onClick={()=>dispatch(changeChannel(item))} type = 'button' className ='w-100 rounded-0 text-start btn btn-secondary'>
                 <span>#{item.name}</span>
                 </button>
                 <div>
                      <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic"></Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick = {deleteCurrentChannel} >{t('Delete Channel')}</Dropdown.Item>
                        <Dropdown.Item onClick = {renameCurrentChannel } >{t('Rename Channel')}</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                 </li>:
                 <li key={item.id} data-id = {item.id}><button onClick={()=>dispatch(changeChannel(item))} type = 'button' className ='w-100 rounded-0 text-start btn btn-secondary'>
                  <span>#{item.name}</span>
                  </button> 
                </li>
            
              }
              )}
          </ul>
       </div>

     </div>

     <div className='title-container col border-end pl-4 bg-white'> 
     <div className='page-name-container bg-light shadow-sm'>
       <h5 className='text-secondary'>{t('MainPage')}</h5>
       <h6>#<strong>{currentChannelHere&&currentChannelHere.name}</strong></h6> 
       <p className='text-muted'>id:{currentChannelHere&&currentChannelHere.id}</p> 
      </div>
     <div className = 'messagesContainer'>
        <ul className='messagesList'>
        {filtered.map((item)=>
        <li key={item.id}>{item.message}<span>{item.msgId}</span></li>
       )}
       </ul>

       <div className="form-wrapper">
          <Formik
            initialValues={{
              message: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={async (value,  {setSubmitting}) => {
              setSubmitting(false)
                const newValueMsg = {                
                message:filter.clean(value.message),
                msgId:currentChannelHere?currentChannelHere.id:null
              }
           
            if (value.message !== '') {         
                socket.emit('newMessage', newValueMsg);
              }
              value.message = '';
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Field placeholder="Ваше сообщение" name="message" />
                {errors.message && touched.message ? (<div>{errors.message}</div>) : null}
                <button type="submit">{t('Submit')}</button>
              </Form>
            )}
          </Formik>
        <AddChannelModal showModal = {showModal} handleClose = {handleClose}/>
        <DeleteChannelModal showDeleteChannelModal = {showDeleteChannelModal} handleCloseDeleteChannelModal = {handleCloseDeleteChannelModal}/>
        <RenameChannelModal showModal = {showRenameChannelModal} handleClose = {handleCloseRenameChannelModal}/>
        </div>
      </div>
      </div>
     
    </div>
    </div>
  )}
