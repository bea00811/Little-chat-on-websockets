
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageOne, PageTwo, ErrorPage } from './Components/Page.jsx';
import ValidationSchemaExample from './Components/Login.jsx';
import MainPage from './Components//MainPage.jsx';
import { createContext } from 'react';

function App() {
  const LoginContext = createContext({});
  return (
    <LoginContext.Provider value={'somethingIdontKnow'}>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<MainPage  />} />
        <Route path="/login" element={<ValidationSchemaExample/>} />
        <Route path="one" element={<PageOne />} />
        <Route path="two" element={<PageTwo />} />
      </Routes>
    </BrowserRouter>
    </LoginContext.Provider>
   
  );
}

export default App;
