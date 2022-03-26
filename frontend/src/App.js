import "./style.css";
import Home from './views/Home/Home';
import Test from './views/Home/Test'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path = '/' element={<Home/>} />
          <Route path = '/test' element={<Test />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
