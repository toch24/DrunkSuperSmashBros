import "./style.css";
import Home from './views/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="app">
      <h1 className='header'>DRUNK SUPER SMASH BROS</h1>
        <div className="card">
      <Router>
        <Routes>
          <Route path = '/' element={<Home/>} />
        </Routes>
      </Router>
      
      </div>
    </div>
  );
}

export default App;
