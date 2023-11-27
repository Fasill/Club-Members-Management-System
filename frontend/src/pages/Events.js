import React,{useEffect,useState}from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios';
import { onlineBackendLink } from '../utils/links';
import {PrivetEvents} from '../components/tabels/privetEvents.js'
const Events = () => {
  const [userInfo,setUserInfo] = useState({})
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');


        const userInfoResponse = await axios.get(`${onlineBackendLink}/retrieveLoggedInUserInfo?token=${token}`);

        setUserInfo(userInfoResponse.data);
      } catch (error) {
        console.error(error);

        navigate('/login');
      }
    };

    fetchUserData();
  }, []); // Empty dependency array to mimic componentDidMount


  return (
    <div>
      <div className='w-full flex justify-between items-center mt-3 '>
        <div>{' '}</div>
      <h1 className={` ${userInfo.role === 'member'?'hidden':''} text-[1.5rem] w-[160px] cursor-pointer p-2 rounded-md shadow-md hover:shadow-lg border`} onClick={()=>navigate('/addevent')}>Add Event</h1>
        
      </div>
      <div className='p-10'><PrivetEvents/></div>
      
    </div>
  )
}

export default Events