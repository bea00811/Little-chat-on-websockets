
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageOne, PageTwo } from './Components/page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<PageOne />} />
        <Route path="one" element={<PageOne />} />
        <Route path="two" element={<PageTwo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
