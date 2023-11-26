import React ,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {onlineBackendLink} from '../../utils/links.js';

const Navbar = () => {
    const navigate = useNavigate();
    const logout = ()=>{
        localStorage.setItem('token','')
        navigate('/login')
    }
    const [userInfo,setUserInfo] = useState({})

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');

        // Validate the token on the online backend

        // If token is valid, retrieve user information from the local backend
        const userInfoResponse = await axios.get(`${onlineBackendLink}/retrieveLoggedInUserInfo?token=${token}`);

        // Set user information in state
        console.log("dwdfw",userInfoResponse.data)
        setUserInfo(userInfoResponse.data);
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
    <div className='h-[61px] border-b bg-white flex justify-center'>
        <ul className='flex items-center justify-between w-[100%] pl-5 pr-5'>
            <li className='w-[33.3%] font-bold text-[25px] flex items-start'>
                <h1>CSEC</h1>
            </li>
            <li className='flex w-[33.3%] text-[20px] justify-between max-md:hidden'>
                <p onClick={()=>{navigate('/Events')}} className='cursor-pointer transition-all duration-300 hover:font-bold'>Events</p>
                <p onClick={()=>{navigate('/profile')}} className='cursor-pointer transition-all duration-300 hover:font-bold'>Profile</p>
                <p onClick={()=>{navigate('/members')}} className={`${userInfo.role !== 'president'?'hidden':''} cursor-pointer transition-all duration-300 hover:font-bold`}>Members</p>

            </li>
            <li className='flex  justify-end bg  w-[33.3%] '>

            <div className="avatar placeholder dropdown dropdown-end">
              <div
                tabIndex={0}
                className="bg-[rgb(27,106,218)] cursor-pointer text-neutral-content rounded-full w-10 border-[rgb(27,106,218)] border-2 hover:border-[#FF9D56]"
              >
                <span className="text-xs">xy</span>
                <ul
                  tabIndex={0}
                  className="mt-[10rem] absolute dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 text-black"
                >
                  <li onClick={() => navigate("/profile")}><p>Profile</p></li>
                  <li onClick={() => navigate("/Members")}><p>Members</p></li>

                  <li onClick={logout}><p>Sign Out</p></li>
                </ul>
              </div>
            </div>
            </li>
        </ul>
    </div>
  )
}

export default Navbar