import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { Provider, ErrorBoundary } from '@rollbar/react'; // Provider imports 'rollbar'
import { PageOne, PageTwo, ErrorPage } from './Components/Page.jsx';
import Login from './Components/Login.jsx';
import MainPage from './Components/MainPage.jsx';
import SighnUpPage from './Components/SighnUp.jsx';
import AuthContext from './Components/CreateContext.jsx';
import { sendMessages, removeChannelMessages } from './slices/messagesSlice.js';
import { addChannel, deleteChannel, renameChannel } from './slices/channelSlice.js';
import ToastContainer from './Components/ToastContainer.jsx';

const socket = io();

const rollbarConfig = {
  accessToken: '205a775704114435b4f6033ae34594a5',
  environment: 'testenv',
};

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const logIn = (token, username) => {
    const userData = { userToken: token, user: username };
    localStorage.setItem('user', JSON.stringify(userData));
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  const providedValue = {
    logIn, logOut, loggedIn, setLoggedIn,
  };

  return (
    <AuthContext.Provider value={providedValue}>
      {children}
    </AuthContext.Provider>
  );
};

const App = () => {
  const dispatch = useDispatch();

  socket.on('newMessage', (msg) => {
    dispatch(sendMessages(msg));
  });

  socket.on('newChannel', (channel) => {
    dispatch(addChannel(channel));
  });

  socket.on('removeChannel', (channel) => {
    dispatch(deleteChannel(channel));
    dispatch(removeChannelMessages(channel));
  });

  socket.on('renameChannel', (channel) => {
    dispatch(renameChannel(channel));
  });

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <AuthProvider>
          {/* <TestError /> */}
          <div>
            <BrowserRouter>
              <Routes>
                <Route path="*" element={<ErrorPage />} />
                <Route
                  path="/"
                  element={
                    <MainPage name="Props Header" surname="Props SubHeader" />
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SighnUpPage />} />
                <Route path="one" element={<PageOne />} />
                <Route path="two" element={<PageTwo />} />
              </Routes>
            </BrowserRouter>
            <ToastContainer />
          </div>
        </AuthProvider>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
