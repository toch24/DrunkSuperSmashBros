import React from 'react';
import "./style.css";
import Home from './views/Home';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import CharSelectHost from "./views/CharSelectHost";
import CharSelectGuest from "./views/CharSelectGuest";
import Betting from "./views/Betting";
import AfterLobbyHost from './views/AfterLobbyHost';
import AfterLobbyGuest from './views/AfterLobbyGuest';
import WaitingRoomHost from './views/WaitingRoomHost'
import WaitingRoomGuest from './views/WaitingRoomGuest'
import WaitBetting from './views/BeforeBetting'
import WaitPlaying from './views/WaitPlaying'

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
          <Route path = '/selectcharshost' element={<CharSelectHost/>} />
          <Route path = '/selectcharsguest' element={<CharSelectGuest/>} />
          <Route path = '/betting' element={<Betting/>} />
          <Route path = '/waitingroomhost' element={<WaitingRoomHost/>} />
          <Route path = '/waitingroomguest' element={<WaitingRoomGuest/>} />
          <Route path = '/beforebetting' element={<WaitBetting/>} />
          <Route path = '/waitplaying' element={<WaitPlaying/>} />
          
        </Routes>
      </Router>
      </div>
    </div>
  );
}

export default App;
