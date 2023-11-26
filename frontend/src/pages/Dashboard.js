import React from 'react';
import csecLogo from '../assets/csecLogo.jpeg';
import adminlogo from '../assets/adminlogo.png';
import MemberTable from '../components/tabels/MemberTable.js';
import SideNavbar from '../components/navbar/SideNavbar.js';
import NavBar from '../components/navbar/navbar.js';
const Dashboard = () => {

  return (
    <div className='flex'>
      <div className='h-screen max-xl:hidden '><SideNavbar/></div>
      <div className='grid bg-green-200 w-full'>
        <div ><NavBar/></div>
        <MemberTable/>
      </div>
    </div>
  )
}

export default Dashboard