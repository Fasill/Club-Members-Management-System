import React,{useEffect,useState}from 'react'

import SideNavbar from '../components/navbar/SideNavbar.js';
import NavBar from '../components/navbar/navbar.js';
import { Outlet, useNavigate } from 'react-router-dom';
import { localBackendLink,onlineBackendLink } from '../utils/links.js';
import axios from 'axios';
const Layout = () => {
  const navigate = useNavigate();
  const [userinfo,setUserInfo] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');

        // Validate the token on the online backend
        const validateResponse = await axios.get(`${localBackendLink}/validateToken?token=${token}`);

        // If token is valid, retrieve user information from the local backend
        const userInfoResponse = await axios.get(`http://localhost:8080/retrieveLoggedInUserInfo?token=${token}`);

        // Set user information in state
        setUserInfo(userInfoResponse.data);
        console.log(userInfoResponse.data)
      } catch (error) {
        console.error(error);

        // Handle errors by redirecting to the login page
        navigate('/login');
      }
    };

    // Call the function when the component mounts
    fetchUserData();
  }, []); // Empty dependency array to mimic componentDidMount


  return (
    <div className='flex hi-screen overflow-hide '>
      <div className='h-screen max-xl:hidden '><SideNavbar/></div>
      <div className='flex flex-col  h-screen overflow-auto w-full p'>
        <div ><NavBar/></div>
       <Outlet userinfo = {userinfo}/>
      </div>
    </div>
  )
}

export default Layout