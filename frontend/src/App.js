import "./style.css";
import Home from './views/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CharSelect from "./views/CharSelect";

function App() {
  return (
    <div className="app">
      <h1 className='header'>DRUNK SUPER SMASH BROS</h1>
        <div className="card">
      <Router>
        <Routes>
          <Route path = '/' element={<Home/>} />
          <Route path = '/selectchars' element={<CharSelect/>} />
        </Routes>
      </Router>
      </div>
    </div>
  );
}

export default App;
