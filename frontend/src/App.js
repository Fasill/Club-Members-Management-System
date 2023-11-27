import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import {Home} from './pages/Home.js';
import {Login} from './pages/Login.js';
import Members from './pages/Members.js';
import Dashboard from './pages/Dashboard.js';
// import Members from './pages/Members.js';
import AddMember from './pages/AddMember.js'
import Layout from './pages/layout.js'
import Profile from './pages/Profile.js';
import MembersProfile from './pages/MembersProfile.js';
import AddEvent from './pages/AddEvent.js'
import Events from './pages/Events.js'
import {PublicEvents} from './pages/PublicEvents.js';
import {VerificationPage} from './pages/verifyLoginByEmail.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
         
          <Route path='' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/dashboard' element = {<Dashboard/>}/>
          <Route path='/home/events' element = {<PublicEvents/>}/>
          <Route path='/verify' element = {<VerificationPage/>}/>

          <Route path='/' element={<Layout/>}>
           <Route path='/addMembers' element = {<AddMember/>}/>
            <Route path='/Members' element = {<Members/>}/>
            <Route path='/Profile' element = {<Profile/>}/>
            
            <Route path='/MembersProfile' element = {<MembersProfile/>}/>
            <Route path='/AddEvent' element = {<AddEvent/>}/>
            <Route path='/Events' element = {<Events/>}/>

            
            
          </Route>


        </Routes>
      </Router>
    </div>
  );
}

export default App;
