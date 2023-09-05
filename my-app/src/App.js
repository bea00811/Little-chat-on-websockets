
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageOne, PageTwo, ErrorPage } from './Components/Page.jsx';
import ValidationSchemaExample from './Components/Login.jsx';
import MainPage from './Components//MainPage.jsx';
import { createContext } from 'react';

function App() {
  
  const LoginContext = createContext({});
  const ThemeContext = createContext({});
 
  const user = localStorage.getItem('username')
  const user1 = {key:'value'}
  console.log(user)
  console.log(user1)

  const ThemeProvider = ({ children }) => {

    return (
      <ThemeContext.Provider value={{user1}}>
        {children}
      </ThemeContext.Provider>
    ); 
    // END
  };

  return (
    <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<MainPage  />} />
        <Route path="/login" element={<ValidationSchemaExample/>} />
        <Route path="one" element={<PageOne />} />
        <Route path="two" element={<PageTwo />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
   
  );
}

export default App;
