import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import {Home} from './pages/Home.js';
import {Login} from './pages/Login.js'
import Dashboard from './pages/Dashboard.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
         
          <Route path='' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/dashboard' element = {<Dashboard/>}/>
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
