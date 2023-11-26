import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import {Home} from './pages/Home.js';
import {Login} from './pages/Login.js';
import Members from './pages/Members.js';
import Dashboard from './pages/Dashboard.js';
// import Members from './pages/Members.js';
import AddMember from './pages/AddMember.js'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
         
          <Route path='' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/dashboard' element = {<Dashboard/>}/>
          {/* <Route path='/Members' element={<Members/>}/> */}
          <Route path='/addMembers' element = {<AddMember/>}/>
          <Route path='/Members' element = {<Members/>}/>


        </Routes>
      </Router>
    </div>
  );
}

export default App;
