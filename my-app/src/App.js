
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageOne, PageTwo, ErrorPage } from './Components/Page.jsx';
import ValidationSchemaExample from './Components/Login.jsx';
import MainPage from './Components//MainPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<MainPage  />} />
        <Route path="/login" element={<ValidationSchemaExample/>} />
        <Route path="one" element={<PageOne />} />
        <Route path="two" element={<PageTwo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
