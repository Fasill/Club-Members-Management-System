import React,{useEffect,useState}from 'react'

import SideNavbar from '../components/navbar/SideNavbar.js';
import NavBar from '../components/navbar/navbar.js';
import { Outlet, useNavigate } from 'react-router-dom';
import { localBackendLink,onlineBackendLink } from '../utils/links.js';
import axios from 'axios';
const Layout = () => {
  const navigate = useNavigate();
  
  useState(()=>{
    const token = localStorage.getItem('token')
    try{
        axios.post(`${onlineBackendLink}/validateToken?token=${token}`)
        .then((r)=>{})
        .catch((e)=>{
            navigate('/login')
            
        })
    }catch(e){
        console.log(e)
        navigate('/login')
    }
  },[])

  return (
    <div className='flex hi-screen overflow-hide '>
      <div className='h-screen max-xl:hidden '><SideNavbar/></div>
      <div className='flex flex-col  h-screen overflow-auto w-full p'>
        <div ><NavBar/></div>
       <Outlet/>
      </div>
    </div>
  )
}

export default Layout