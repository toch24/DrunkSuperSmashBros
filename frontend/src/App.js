import React from 'react';
import "./style.css";
import Home from './views/Home';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import CharSelect from "./views/CharSelect";
import Betting from "./views/Betting";
import AfterLobbyHost from './views/AfterLobbyHost';
import AfterLobbyGuest from './views/AfterLobbyGuest';
import WaitingRoom from './views/WaitingRoom'
import WaitBetting from './views/BeforeBetting'

function App() {

  return (
    <div className="app">
      <h1 className='header'>DRUNK SUPER SMASH BROS</h1>
        <div className="card">
      <Router>
        <Routes>
          <Route path = '/' element={<Home/>} />
          <Route path = '/afterlobbyhost' element={<AfterLobbyHost/>} />
          <Route path = '/afterlobbyguest' element={<AfterLobbyGuest/>} />
          <Route path = '/selectchars' element={<CharSelect/>} />
          <Route path = '/betting' element={<Betting/>} />
          <Route path = '/waitingroom' element={<WaitingRoom/>} />
          <Route path = '/beforebetting' element={<WaitBetting/>} />
          
        </Routes>
      </Router>
      </div>
    </div>
  );
}

export default App;
