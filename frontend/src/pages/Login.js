import React, { useState,useEffect } from 'react'

import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {LoginByPassword} from '../components/forms/LoginByPassword.js'
import {LoginByEmail} from '../components/forms/LoginByEmail.js'

export const Login = () => {
    const [isByEmail,setIsByEmail] = useState(false)
  const validationSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const {register,handleSubmit, formState:{errors} } = useForm({
    resolver:yupResolver(validationSchema),
  });
  
  const onSubmit =(data) => {
    console.log(data)
  }

  

  useEffect(()=>{
    const currentUrl = window.location.href;

    // Extract the parameters from the URL
    const urlParams = new URLSearchParams(currentUrl);

    // Get the values of the parameters
    const email = urlParams.get('email');
    setIsByEmail(email ==='true'?true:false)
  },[])


  return (
    <div className='bg-[#cdcead] h-screen flex items-center justify-center p-3'>
        <div className={`w-[100%] max-w-[533px]  shadow-xl bg-white flex flex-col h-[100%] ${isByEmail?'max-h-[400px]':'max-h-[550px]'} rounded overflow-clip`}>
            <div className='bg-black h-[85px] w-[100%] flex items-center justify-center'>
                <h1 className='text-white font-bold text-[36px] '>CSEC ASTU</h1>
            </div>
            <div className='h-[65px] border-b flex items-center justify-center'>
              <h1 className='text-[26px]'>LOGIN</h1>  
            </div>
            {isByEmail?(<LoginByEmail/>):(<LoginByPassword/>)}
        </div>
    </div>
  )
}
