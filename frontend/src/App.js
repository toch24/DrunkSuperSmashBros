import React from 'react';
import "./style.css";
import Home from './views/Home';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import CharSelect from "./views/CharSelect";
import Betting from "./views/Betting";
import AfterLobby from './views/AfterLobby';
import WaitingRoom from './views/WaitingRoom'

function App() {

  return (
    <div className="app">
      <h1 className='header'>DRUNK SUPER SMASH BROS</h1>
        <div className="card">
      <Router>
        <Routes>
          <Route path = '/' element={<Home/>} />
          <Route path = '/afterlobby' element={<AfterLobby/>} />
          <Route path = '/selectchars' element={<CharSelect/>} />
          <Route path = '/betting' element={<Betting/>} />
          <Route path = '/waitingroom' element={<WaitingRoom/>} />
          
        </Routes>
      </Router>
      </div>
    </div>
  );
}

export default App;
