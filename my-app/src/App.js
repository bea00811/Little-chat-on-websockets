import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { PageOne, PageTwo, ErrorPage } from './Components/Page.jsx';
import ValidationSchemaExample from './Components/Login.jsx';
import MainPage from './Components/MainPage.jsx';
import { useState } from 'react';
import AuthContext from './Components/CreateContext.jsx';
import { Provider } from 'react-redux';
import store from './slices/configureStore.js';
import { useSelector, useDispatch } from 'react-redux';
import { getAllMessages, sendMessages } from './slices/messagesSlice.js';
import { io } from 'socket.io-client';


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
  return (
     <AuthProvider>
        <div>
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<ErrorPage />} />
              <Route path="/" element={<MainPage name = 'Props Header' surname = 'Props SubHeader'/>} />
              <Route path="/login" element={<ValidationSchemaExample  />} />
              <Route path="one" element={<PageOne />} />
              <Route path="two" element={<PageTwo />} />
            </Routes>
          </BrowserRouter>
        </div>
      </AuthProvider>

  );
}

export default App;
