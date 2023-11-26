import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import {useLocation} from 'react-router-dom';

import gear_fill from '../../assets/side_navbar/gear_fill.svg';
import people_avatar from '../../assets/side_navbar/people-fill.svg';
import person_avatar from '../../assets/side_navbar/person-fill.svg';
import suitcase from '../../assets/side_navbar/suitcase-lg-fill.svg';
import pie_chart from '../../assets/side_navbar/pie-chart.svg';
import list_nested from '../../assets/side_navbar/list-nested.svg';
import {onlineBackendLink} from '../../utils/links.js'
// import {useSelector } from 'react-redux';

function SideNavbar() {
    const navigate = useNavigate()
    const location = useLocation();

    const [activeTab,setActiveTab] = useState('')

    const [isCollapse,setIsCollapse] =  useState(true)
    const [isCollapse1,setIsCollapse1] =  useState(true)

    const [haveAccess,setHaveAccess] = useState(false)
    // const collapseStatus = useSelector((state) => state.nav.value.collapse);
  
    // useEffect(() => {
    //   setIsCollapse1(collapseStatus)
    // }, [collapseStatus]);
  
   
  // useEffect(() => {
  //   // Check if a token exists in local storage
  //   const token = localStorage.getItem('token');
  //   console.timeLog(location.pathname)
  //   setActiveTab(location.pathname)
  //   // if (!token) {
  //   //   // If no token is found, navigate to the login page
  //   //   navigate('/login');
  //   // } else {
  //   //   try {
  //   //     // Create an array of promises for the two requests
  //   //     const requests = [
  //   //       axios.post(`${backEndLink}/verify`, { token: token }),
  //   //       axios.post(`${backEndLink}/allInfo?token=${token}`)
  //   //     ];

  //   //     // Execute both requests concurrently
  //   //     Promise.all(requests)
  //   //       .then(([verifyResponse, allInfoResponse]) => {
  //   //         // Handle both responses
          
  //   //         console.log('ffffffffffff',allInfoResponse.data)
            
  //   //         setHaveAccess(allInfoResponse.data.type === 'company' || allInfoResponse.data.info.role !== 'Recruiter');
      
  //   //                     // Check if the verification response is not as expected
  //   //         if (!verifyResponse.data || !verifyResponse.data.someProperty === 'expectedValue') {
  //   //           navigate('/');
  //   //         }
  //   //       })
  //   //       .catch((error) => {
  //   //         navigate('/');
  //   //         console.error('Error:', error);
  //   //       });
  //   //   } catch (e) {
  //   //     console.log(e);
  //   //     navigate('/login');
  //   //   }
  //   }
  // }, [navigate]);


  return (
       <nav className={`bg-[#155263] p-3 pl-1 h-full overflow-hidden transition-width duration-300 ease-in-out ${isCollapse ? 'w-[48px]' : 'w-[150px]'} ${isCollapse1?'':'max-md:ml-[-150px]'} `}>
        <ul className=' grid gap-3 justify-start items-center'>
            <li  onClick={() =>setIsCollapse(!isCollapse)} className={` cursor-pointer flex gap-2 items-center p-3  justify-start  hover:bg-[#323a55] rounded pr-2 transition-width duration-300 ease-in-out ${isCollapse?'w-[40px] gap-3':'w-[134px]'}`}>

                <img src={list_nested} />
                <p   className=' text-[rgb(148,163,184)] font-bold'>Collapse</p>

            </li>
            <li onClick={()=>navigate('/home')}className={`cursor-pointer flex gap-2 items-center p-3  justify-start  hover:bg-[#323a55] rounded pr-2 transition-width duration-300 ease-in-out ${isCollapse?'w-[40px] gap-3':'w-[134px]'} ${activeTab === '/home'?'bg-[#323a55]':''}`}>
                <img src = {pie_chart} className={` ${activeTab === '/home'?'filter brightness-200 grayscale-100':''}`}/>
                <p className=' text-[rgb(148,163,184)] font-bold'>Events</p>
            </li>
            <li onClick={()=>navigate('/jobs?tab=6')} className={`cursor-pointer flex gap-2 items-center p-3  justify-start  hover:bg-[#323a55] rounded pr-2 transition-width duration-300 ease-in-out ${isCollapse?'w-[40px] gap-3':'w-[134px]'} ${activeTab === '/jobs'?'bg-[#323a55]':''}`}>
                <img src = {suitcase} className={` ${activeTab === '/jobs'?'filter brightness-200 grayscale-100':''}`}/>
                <p className=' text-[rgb(148,163,184)] font-bold'>Members</p>

            </li>
            <li onClick={()=>navigate('/app/profile')}className={`cursor-pointer flex gap-2 items-center p-3  justify-start  hover:bg-[#323a55] rounded pr-2 transition-width duration-300 ease-in-out ${isCollapse?'w-[40px] gap-3':'w-[134px]'} ${activeTab === '/app/profile'?'bg-[#323a55]':''}`}>
                <img src = {person_avatar} className={` ${activeTab === '/app/profile'?'filter brightness-200 grayscale-100':''}`}/>
                <p className=' text-[rgb(148,163,184)] font-bold'>Profile</p>

            </li>
           
        </ul>
    </nav>
  )
}

export default SideNavbar