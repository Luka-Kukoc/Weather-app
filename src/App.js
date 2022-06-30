import './App.css';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import Settings from './pages/Settings';

function App() {
  return(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="details" element={<Details/>} />
      <Route path="settings" element={<Settings/>} />
    </Routes>
  </BrowserRouter>
  )
}

export default App;
