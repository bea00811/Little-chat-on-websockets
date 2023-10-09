import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { PageOne, PageTwo, ErrorPage } from './Components/Page.jsx';
import Login from './Components/Login.jsx';
import MainPage from './Components/MainPage.jsx';
import SighnUpPage from './Components/SighnUp.jsx';
import { useState } from 'react';
import AuthContext from './Components/CreateContext.jsx';
import { useDispatch } from 'react-redux';
import { sendMessages, removeChannelMessages } from './slices/messagesSlice.js';
import { io } from 'socket.io-client';
import { addChannel} from './slices/channelSlice.js';
import { deleteChannel } from './slices/channelSlice.js';
import { renameChannel } from './slices/channelSlice.js';

const socket = io()

const AuthProvider = ({ children }) => {

  const [loggedIn, setLoggedIn] = useState(false);
  const logIn = (token, username) => {
    const userData = {userToken:token, user:username}
    localStorage.setItem('user', JSON.stringify(userData))
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
   };



  return (
    <AuthContext.Provider value={{ logIn, logOut, loggedIn, setLoggedIn}}>
      {children}
    </AuthContext.Provider>
  );
};



function App() {

  const dispatch = useDispatch()

  socket.on('newMessage', (msg) => {
  dispatch(sendMessages(msg));
})

socket.on('newChannel', (channel) => {
  dispatch(addChannel(channel));
})

socket.on('removeChannel', (channel) => {
  dispatch(deleteChannel(channel));
  dispatch(removeChannelMessages(channel));
})

socket.on('renameChannel', (channel) => {
  dispatch(renameChannel(channel));
})

  return (
     <AuthProvider>
        <div>
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<ErrorPage />} />
              <Route path="/" element={<MainPage name = 'Props Header' surname = 'Props SubHeader'/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/sighnup" element={<SighnUpPage/>} />              
              <Route path="one" element={<PageOne />} />
              <Route path="two" element={<PageTwo />} />
            </Routes>
          </BrowserRouter>
        </div>
      </AuthProvider>

  );
}

export default App;
