import './App.css';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import Settings from './pages/Settings';
import {AppProvider} from './AppContext'

function App() {
  return(
  <AppProvider>
  <BrowserRouter>
    <Routes>
      <Route path="/Weather-app" element={<Home/>} />
      <Route path="/Weather-app/details" element={<Details/>} />
      <Route path="/Weather-app/settings" element={<Settings/>} />
    </Routes>
  </BrowserRouter>
  </AppProvider>
  )
}

export default App;
