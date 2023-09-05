import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageOne, PageTwo, ErrorPage } from './Components/Page.jsx';
import ValidationSchemaExample from './Components/Login.jsx';
import MainPage from './Components//MainPage.jsx';
import { createContext } from 'react';
import React from 'react';

function App() {
  const LoginContext = createContext({});
  // const ThemeContext = createContext({});

  const user = localStorage.getItem('username');
  const user1 = { key: 'value' };
  console.log(user);
  console.log(localStorage);

  // const ThemeProvider = ({ children }) => {
  //   return (
  //     <ThemeContext.Provider value={{ user1 }}>
  //       {children}
  //     </ThemeContext.Provider>
  //   );
  //   // END
  // };

  return (
    <LoginContext.Provider value={user1}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<ValidationSchemaExample />} />
          <Route path="one" element={<PageOne />} />
          <Route path="two" element={<PageTwo />} />
        </Routes>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}

export default App;
