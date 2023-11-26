import React, { useEffect,useState } from 'react'
import AddMemberForm from '../components/forms/AddMEmberForm2.js'
import csecLogo from '../assets/csecLogo.jpeg';
import adminlogo from '../assets/adminlogo.png';
import MemberTable from '../components/tabels/MemberTable.js';
import SideNavbar from '../components/navbar/SideNavbar.js';
import NavBar from '../components/navbar/navbar.js';
import axios from 'axios';
import { localBackendLink,onlineBackendLink } from '../utils/links.js';
import { useNavigate } from 'react-router-dom';
const Members = (props) => {
  const navigate = useNavigate();
  const [userInfo,setUserInfo] = useState({})
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');

        // Validate the token on the online backend

        // If token is valid, retrieve user information from the local backend
        const userInfoResponse = await axios.get(`http://localhost:8080/retrieveLoggedInUserInfo?token=${token}`);

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