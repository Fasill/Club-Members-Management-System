import React from 'react'
import AddMemberForm from '../components/forms/AddMEmberForm2.js'
import csecLogo from '../assets/csecLogo.jpeg';
import adminlogo from '../assets/adminlogo.png';
import MemberTable from '../components/tabels/MemberTable.js';
import SideNavbar from '../components/navbar/SideNavbar.js';
import NavBar from '../components/navbar/navbar.js';
import { useNavigate } from 'react-router-dom';
const Members = () => {
  const navigate = useNavigate();
  
  return (

        <>        
        <div className='flex justify-between p-5  pr-20 max-md:pr-10 max-md:pl-10 items-center pl-[10rem]'>
          <h1 className='text-[1.6rem]'>Members</h1>
          <h1 className='text-[1.5rem] w-[160px] cursor-pointer p-2 rounded-md shadow-md hover:shadow-lg border' onClick={()=>navigate('/addmembers')}>Add Member</h1>

        </div>
       <MemberTable/>
      </>

  )
}

export default Members