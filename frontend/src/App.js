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
import BetChallenge from './views/BetChallenge'
import BetWin from './views/BetWin'
import BeforePlayingHost from './views/BeforePlayingHost';
import BeforePlayingGuest from './views/BeforePlayingGuest';
import ChallengeGuest from './views/ChallengeGuest';
import ChallengeHost from './views/ChallengeHost';

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
          <Route path = '/betting/:name' element={<Betting/>} />
          <Route path = '/waitingroomhost' element={<WaitingRoomHost/>} />
          <Route path = '/waitingroomguest' element={<WaitingRoomGuest/>} />
          <Route path = '/beforebetting/:name' element={<WaitBetting/>} />
          <Route path = '/beforeplayinghost/:name' element={<BeforePlayingHost/>} />
          <Route path = '/beforeplayingguest/:name' element={<BeforePlayingGuest/>} />
          <Route path = '/waitplaying/:name' element={<WaitPlaying/>} />
          <Route path = '/betchallenge/:name' element={<BetChallenge/>} />
          <Route path = '/betwin/:name' element={<BetWin/>} />
          <Route path = '/challengeguest' element={<ChallengeGuest/>} />
          <Route path = '/challengehost' element={<ChallengeHost/>} />

        </Routes>
      </Router>
      </div>
    </div>
  );
}

export default App;
