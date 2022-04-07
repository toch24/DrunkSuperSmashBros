import React from 'react';
import "./style.css";
import Home from './views/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CharSelect from "./views/CharSelect";
import Betting from "./views/Betting";

function App() {
  return (
    <div className="app">
      <h1 className='header'>DRUNK SUPER SMASH BROS</h1>
        <div className="card">
      <Router>
        <Routes>
          <Route path = '/' element={<Home/>} />
          <Route path = '/selectchars' element={<CharSelect/>} />
          <Route path = '/betting' element={<Betting/>} />
        </Routes>
      </Router>
      </div>
    </div>
  );
}

export default App;
