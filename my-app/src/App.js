import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { PageOne, PageTwo, ErrorPage } from './Components/Page.jsx';
import ValidationSchemaExample from './Components/Login.jsx';
import MainPage from './Components/MainPage.jsx';
import { useState } from 'react';
import AuthContext from './Components/CreateContext.jsx';
import { Provider } from 'react-redux';
import store from './slices/index.js';

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
    <AuthContext.Provider value={{ logIn, logOut, loggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <div>
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<ErrorPage />} />
              <Route path="/" element={<MainPage />} />

              <Route path="/login" element={<ValidationSchemaExample />} />

              <Route path="one" element={<PageOne />} />
              <Route path="two" element={<PageTwo />} />
            </Routes>
          </BrowserRouter>
        </div>
      </AuthProvider>
    </Provider>
  );
}

export default App;
// const ThemeContext = createContext({});
// const user = localStorage.getItem('username');

// const ThemeProvider = ({ children }) => {
//   return (
//     <ThemeContext.Provider value={{ user1 }}>
//       {children}
//     </ThemeContext.Provider>
//   );
//   // END
// };

// const AuthProvider = ({ children }) => {
//   const [loggedIn, setLoggedIn] = useState(false);

//   const logIn = () => setLoggedIn(true);
//   const logOut = () => {
//     localStorage.removeItem('userId');
//     setLoggedIn(false);
//   };

//   return (
//     <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
