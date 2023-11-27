import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import {useLocation} from 'react-router-dom';


import list_nested from '../../assets/side_navbar/list-nested.svg';
// import {useSelector } from 'react-redux';

function SideNavbar() {
    const navigate = useNavigate()
    const location = useLocation();

    const [activeTab,setActiveTab] = useState('')

    const [isCollapse,setIsCollapse] =  useState(true)
    const [isCollapse1,setIsCollapse1] =  useState(true)

    const [haveAccess,setHaveAccess] = useState(false)
  

  return (
       <nav className={`bg-[#155263] p-3 pl-1 h-full overflow-hidden transition-width duration-300 ease-in-out ${isCollapse ? 'w-[48px]' : 'w-[150px]'} ${isCollapse1?'':'max-md:ml-[-150px]'} `}>
        <ul className=' grid gap-3 justify-start items-center'>
            <li  onClick={() =>setIsCollapse(!isCollapse)} className={` cursor-pointer flex gap-2 items-center p-3  justify-start  hover:bg-[#323a55] rounded pr-2 transition-width duration-300 ease-in-out ${isCollapse?'w-[40px] gap-3':'w-[134px]'}`}>

                <img src={list_nested} />
                <p   className=' text-[rgb(148,163,184)] font-bold'>Collapse</p>

            </li>
            <li onClick={()=>navigate('/events')}className={`cursor-pointer flex gap-2 items-center p-3  justify-start  hover:bg-[#323a55] rounded pr-2 transition-width duration-300 ease-in-out ${isCollapse?'w-[40px] gap-3':'w-[134px]'} ${activeTab === '/home'?'bg-[#323a55]':''}`}>
                {/* <img src = {pie_chart} className={` ${activeTab === '/home'?'filter brightness-200 grayscale-100':''}`}/> */}
                <p>📅</p>
                <p className=' text-[rgb(148,163,184)] font-bold'>Events</p>
            </li>
           
            <li onClick={()=>navigate('/profile')}className={`cursor-pointer flex gap-2 items-center p-3  justify-start  hover:bg-[#323a55] rounded pr-2 transition-width duration-300 ease-in-out ${isCollapse?'w-[40px] gap-3':'w-[134px]'} ${activeTab === '/app/profile'?'bg-[#323a55]':''}`}>
                <p>📋</p>
                <p className=' text-[rgb(148,163,184)] font-bold'>Profile</p>

            </li>
           
        </ul>
    </nav>
  )
}

export default SideNavbar