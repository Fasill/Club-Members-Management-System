import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { onlineBackendLink,localBackendLink } from '../../utils/links.js';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  collegeId: yup.string().required('College ID is required'),
  department: yup.string().required('Department is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  fullName: yup.string().required('Full name is required'),
  phoneNo: yup.string().required('Phone number is required'),
  role: yup.string().required('Role is required'),
});

const AddMemberForm = () => {
  const [isSubmited, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    collegeId: '',
    department: '',
    email: '',
    fullName: '',
    phoneNo: '',
    role: '', // Initialize the role field
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use the effect to check if any of the form fields are empty
  useEffect(() => {
    const isFormEmpty = Object.values(formData).some((value) => value === '');
    setIsSubmitted(isFormEmpty);
  }, [formData]);

  const notify = () => {
    toast.success('Member Added Successfully', {
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
      const response = await axios.post(`${onlineBackendLink}/addMember`, formData);
      console.log('Member added:', response.data);
      setIsSubmitted(true);

      notify();

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

  return (
    <form onSubmit={handleSubmit} className="bg-[#e7eaf6] w-full h-full flex items-center justify-center p-2">
      <ToastContainer />

      <div className="bg-white w-full max-w-[1100px] rounded-lg shadow-2xl grid pb-[3rem] justify-items-center relative ">
        <h1 className="text-[3rem] max-[500px]:text-[2rem] font-bold text-[#ff6f3c]">Member Addition Form</h1>
        <div className=" w-[100%]  flex justify-center rounded-lg items-center pb-[2rem] p-3 mt-[25px]">
          <div className="grid gap-5 w-full max-w-[40rem] self-center justify-self-center">
            <div className="text-black grid justify-items-start">
              <label className="font-bold text-[#113f67]">College ID</label>
              <input
                type="text"
                name="collegeId"
                value={formData.collegeId}
                onChange={handleInputChange}
                required
                className="p-3 border h-11 max-w-[40rem] w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
              />
            </div>

            <div className="text-black grid justify-items-start">
              <label className="font-bold text-[#113f67]">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                required
                className="p-3 border h-11 max-w-[40rem] w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
              />
            </div>

            <div className="text-black grid justify-items-start">
              <label className="font-bold text-[#113f67]">Email</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="p-3 border h-11 max-w-[40rem] w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
              />
            </div>

            <div className="text-black grid justify-items-start">
              <label className="font-bold text-[#113f67]">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="p-3 border h-11 max-w-[40rem] w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
              />
            </div>

            <div className="text-black grid justify-items-start">
              <label className="font-bold text-[#113f67]">Phone Number</label>
              <input
                type="text"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleInputChange}
                required
                className="p-3 border h-11 max-w-[40rem] w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
              />
            </div>

            <div className="text-black grid justify-items-start  w-[100%]">
              <label className="font-bold text-[#113f67]">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="cursor-pointer p-3 border h-11  w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              className="text-white bg-[#ff6f3c] hover:bg-[#b86648] max-w-[30rem] w-full justify-items-start rounded-md h-11 font-bold text-xl flex items-center justify-center justify-self-center mt-2"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? <span className="loading loading-spinner loading-md"></span> : <p>Add Member</p>}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddMemberForm;
