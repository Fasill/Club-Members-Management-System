import React from 'react'
import AddMemberForm from '../components/forms/AddMEmberForm2.js'
import csecLogo from '../assets/csecLogo.jpeg';
import adminlogo from '../assets/adminlogo.png';
import MemberTable from '../components/tabels/MemberTable.js';
import SideNavbar from '../components/navbar/SideNavbar.js';
import NavBar from '../components/navbar/navbar.js';

const AddMember = () => {

  return (
    <div className='flex hi-screen overflow-hide '>
      <div className='h-screen max-xl:hidden '><SideNavbar/></div>
      <div className='grid bg-green-200 h-screen overflow-auto w-full'>
        <div ><NavBar/></div>
        
        <AddMemberForm/>
      </div>
    </div>
  )
}

export default AddMember