import React from 'react';
import "./style.css";
import Home from './views/Home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path = '/' element={<Home/>} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
