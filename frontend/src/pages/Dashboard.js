import React from 'react';
import SideNavbar from '../components/navbar/SideNavbar.js';
import NavBar from '../components/navbar/navbar.js';

const Dashboard = () => {

  return (
    <div className='flex'>
      <div className='h-screen max-xl:hidden '><SideNavbar/></div>
      <div className='grid bg-green-200 w-full'>
        <div ><NavBar/></div>
      </div>
    </div>
  )
}

export default Dashboard