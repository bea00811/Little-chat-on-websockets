import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Button, Navbar, Nav } from 'react-bootstrap';
import { PageOne, PageTwo, ErrorPage } from './Components/Page.jsx';
import ValidationSchemaExample from './Components/Login.jsx';
import MainPage from './Components//MainPage.jsx';
import { createContext, useLocation, useState } from 'react';
import AuthContext from './Components/CreateContext.jsx';
import useAuth from './Components/useAuthContext.jsx';

// let LoginContext = createContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  return auth.loggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

const AuthButton = () => {
  const auth = useAuth();
  const location = useLocation();

  return auth.loggedIn ? (
    <Button onClick={auth.logOut}>Log out</Button>
  ) : (
    <Button as={Link} to="/login" state={{ from: location }}>
      Log in
    </Button>
  );
};

function App() {
  return (
    <AuthProvider>
      <div>
        <BrowserRouter>
          <AuthButton />
          <Routes>
            <Route path="*" element={<ErrorPage />} />
            <Route path="/" element={<MainPage />} />
            <PrivateRoute>
              <Route path="/login" element={<ValidationSchemaExample />} />
            </PrivateRoute>
            <Route path="one" element={<PageOne />} />
            <Route path="two" element={<PageTwo />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
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
