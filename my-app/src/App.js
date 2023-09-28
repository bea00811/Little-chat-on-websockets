import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { PageOne, PageTwo, ErrorPage } from './Components/Page.jsx';
import Login from './Components/Login.jsx';
import MainPage from './Components/MainPage.jsx';
import { useState } from 'react';
import AuthContext from './Components/CreateContext.jsx';
import { useDispatch } from 'react-redux';
import { sendMessages } from './slices/messagesSlice.js';
import { io } from 'socket.io-client';
import { addChannel} from './slices/channelSlice.js';
import { deleteChannel } from './slices/channelSlice.js';
import { renameChannel } from './slices/channelSlice.js';


const AuthProvider = ({ children }) => {

  const [loggedIn, setLoggedIn] = useState(false);
  const logIn = () => {
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };



  return (
    <AuthContext.Provider value={{ logIn, logOut, loggedIn}}>
      {children}
    </AuthContext.Provider>
  );
};



function App() {
  const socket = io()
  const dispatch = useDispatch()
  socket.on('newMessage', (msg) => {
  dispatch(sendMessages(msg));
})

socket.on('newChannel', (channel) => {
  dispatch(addChannel(channel));
})

socket.on('removeChannel', (channel) => {
  dispatch(deleteChannel(channel));
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
              <Route path="/login" element={<Login  />} />
              <Route path="one" element={<PageOne />} />
              <Route path="two" element={<PageTwo />} />
            </Routes>
          </BrowserRouter>
        </div>
      </AuthProvider>

  );
}

export default App;
