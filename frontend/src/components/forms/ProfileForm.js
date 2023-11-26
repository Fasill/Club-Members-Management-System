import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { onlineBackendLink,localBackendLink } from '../../utils/links.js';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    collegeId: yup.string(),
    department: yup.string(),
    email: yup.string().email('Invalid email'),
    fullName: yup.string(),
    phoneNo: yup.string(),
    role: yup.string(),
  });
  

const ProfileForm = () => {
    const navigate = useNavigate()
  const [isSubmited, setIsSubmitted] = useState(false);
    const [userInfo,setUserInfo] = useState({})
  const [formData, setFormData] = useState({
    collegeId: '',
    department: '',
    email: '',
    fullName: '',
    phoneNo: '',
    password: '', // Initialize the role field

  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use the effect to check if any of the form fields are empty
  useEffect(() => {
    const isFormEmpty = Object.values(formData).some((value) => value === '');
    setIsSubmitted(isFormEmpty);
  }, [formData]);

  const notify = () => {
    toast.success('Profile Updated Successfully', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData)
    try {
      await validationSchema.validate(formData, { abortEarly: false });

      formData.token = localStorage.getItem('token');
      setIsSubmitting(true);
      const response = await axios.put(`${localBackendLink}/editselfinfo`, formData);
      notify();
      console.log('Member added:', response.data);
      setIsSubmitted(true);
        setTimeout(() => {
            window.location.reload();
          },700);
      setFormData({
        collegeId: '',
        department: '',
        email: '',
        fullName: '',
        phoneNo: '',
        role: '',
      });

      // Handle success, e.g., show a success message or redirect to another page
    } catch (error) {
      console.error('Error adding member:', error);
      // Handle error, e.g., show an error message
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <form onSubmit={handleSubmit} className="bg-[#e7eaf6] w-full h-full flex items-center justify-center p-2">
      <ToastContainer />

      <div className="bg-white w-full max-w-[1100px] rounded-lg shadow-2xl grid pb-[3rem] justify-items-center relative ">
        <h1 className="text-[3rem] max-[500px]:text-[2rem] font-bold text-[#ff6f3c]">Profile</h1>
        <div className=" w-[100%]  flex justify-center rounded-lg items-center pb-[2rem] p-3 mt-[25px]">
          <div className="grid gap-5 w-full max-w-[40rem] self-center justify-self-center">
            <div className="text-black grid justify-items-start">
              <label className="font-bold text-[#113f67]">College ID</label>
              <input
                type="text"
                name="collegeId"
                placeholder={userInfo.collegeId}
                value={formData.collegeId}
                onChange={handleInputChange}
                
                className="p-3 border h-11 max-w-[40rem] w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
              />
            </div>

            <div className="text-black grid justify-items-start">
              <label className="font-bold text-[#113f67]">Department</label>
              <input
                type="text"
                name="department"
                placeholder={userInfo.department}

                value={formData.department}
                onChange={handleInputChange}
                
                className="p-3 border h-11 max-w-[40rem] w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
              />
            </div>

            <div className="text-black grid justify-items-start">
              <label className="font-bold text-[#113f67]">Email</label>
              <input
                type="text"
                name="email"
                placeholder={userInfo.email}

                value={formData.email}
                onChange={handleInputChange}
                
                className="p-3 border h-11 max-w-[40rem] w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
              />
            </div>

            <div className="text-black grid justify-items-start">
              <label className="font-bold text-[#113f67]">Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder={userInfo.fullName}

                value={formData.fullName}
                onChange={handleInputChange}
                
                className="p-3 border h-11 max-w-[40rem] w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
              />
            </div>

            <div className="text-black grid justify-items-start">
              <label className="font-bold text-[#113f67]">Phone Number</label>
              <input
                type="text"
                name="phoneNo"
                placeholder={userInfo.phoneNo}

                value={formData.phoneNo}
                onChange={handleInputChange}
                
                className="p-3 border h-11 max-w-[40rem] w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
              />
            </div>

            <div className="text-black grid justify-items-start">
              <label className="font-bold text-[#113f67]">Password</label>
              <input
                type="password"
                name="password"

                value={formData.password}
                onChange={handleInputChange}
                
                className="p-3 border h-11 max-w-[40rem] w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
              />
            </div>

            <button
              className="text-white bg-[#ff6f3c] hover:bg-[#b86648] max-w-[30rem] w-full justify-items-start rounded-md h-11 font-bold text-xl flex items-center justify-center justify-self-center mt-2"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? <span className="loading loading-spinner loading-md"></span> : <p>Save</p>}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
