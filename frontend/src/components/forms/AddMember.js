import React, { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { onlineBackendLink, localBackendLink } from '../../utils/links';
import { useNavigate } from 'react-router';

export const AddMember = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const validationSchema = yup.object({
    collegeId: yup.string().required('College ID is required'),
    department: yup.string().required('Department is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    fullName: yup.string().required('Full name is required'),
    phoneNo: yup.string().required('Phone number is required'),
    role: yup.string()
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    setIsLoading(true);

    console.log(data);
    try {
      axios.post(`${localBackendLink}/addMember`, data)
        .then((response) => {
          console.log(response);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e.response.data);
          setErrorMessage(e.response.data);
          setIsLoading(false);
        });
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='h-[100%] flex gap-[3rem] flex-col p-10'>
        <div className='flex gap-2 max-md:grid  w-[100%] relative'>
            <div className='grid  '>
                <input
                type='text'
                placeholder='College ID'
                {...register('collegeId')}
                className='h-[45px] w-[100%] border-b-black border-b-2 p-3 focus:outline-none bg-transparent'
                
                />
                <p className='h-[22px] text-red-500 justify-self-start text-[0.9rem]'>
                {errors.collegeId?.message}
                </p>
            </div>
            <div className='grid'>
                <input
                type='text'
                placeholder='Department'
                {...register('department')}
                className='h-[45px] border-b-black border-b-2 p-3 focus:outline-none bg-transparent'
                
                />
                <p className='h-[22px] text-red-500 justify-self-start text-[0.9rem]'>
                {errors.department?.message}
                </p>
            </div>
        </div>
        <div className='flex gap-2 max-md:grid'>

      <div className='grid'>
        <input
          type='text'
          placeholder='Full Name'
          className='h-[45px] border-b-black border-b-2 p-3 focus:outline-none bg-transparent'
          {...register('fullname')}
        />
        <p className='h-[22px] text-red-500 justify-self-start text-[0.9rem]'>
          {errors.fullname?.message}
        </p>
      </div>
      <div className='grid'>
        <input
          type='text'
          placeholder='Phone Number'
          className='h-[45px] border-b-black border-b-2 p-3 focus:outline-none bg-transparent'
          {...register('phoneno')}
        />
        <p className='h-[22px] text-red-500 justify-self-start text-[0.9rem]'>
          {errors.phoneno?.message}
        </p>
      </div>
      </div>
      <div className='flex gap-2 max-md:grid'>

      <div className='grid'>
        <input
          type='text'
          placeholder='Email'
          className='h-[45px] border-b-black border-b-2 p-3 focus:outline-none bg-transparent'
          {...register('email')}
        />
        <p className='h-[22px] text-red-500 justify-self-start text-[0.9rem]'>
          {errors.email?.message}
        </p>
      </div>
      <div className='grid  w-[100%] '>
        <select
          type='role'
          placeholder='role'
          className=' cursor-pointer h-[45px] border-b-black border-b-2 p-3 focus:outline-none bg-transparent'
          {...register('role')}
        >
            <option>Admin</option>
            <option>Member</option>

        </select>
        <p className='h-[22px] text-red-500 justify-self-start text-[0.9rem]'>
          {errors.password?.message}
        </p>
      </div>
      </div>
      <button
        // disabled={isLoading}
        type='submit'
        className='self-center bg-[#FFE500] w-[100%] max-w-[487px] h-[40px] text-[20px] font-bold text-white cursor-pointer shadow-md hover:shadow-lg flex items-center justify-center'
        >
        {isLoading ? (
            <span className='loading loading-spinner loading-lg'></span>
            ) : (
                'ADD MEMBER'
                )}
      </button>
    </form>
  );
};
