import React,{useState} from 'react'

import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { onlineBackendLink,localBackendLink } from '../../utils/links';
import { useNavigate } from 'react-router';

export const LoginByPassword = () => {

  const [isLoading,setIsLoading] = useState(false);
  const [errorMessage,setErrorMessage] = useState('');

  const navigate = useNavigate() 
  const validationSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const {register,handleSubmit, formState:{errors} } = useForm({
    resolver:yupResolver(validationSchema),
  });
  
  const onSubmit =(data) => {
    setIsLoading(true)

    console.log(data)
    try{
      axios.post(`${onlineBackendLink}/login`,data)
      .then((response)=>{
        console.log(response)
        const token = response.data.token
        localStorage.setItem("token",token)
        navigate('/events')
        // console.log(re)
        setIsLoading(false)
      }).catch((e)=>{
          console.log(e.response.data)
          setErrorMessage(e.response.data)
        setIsLoading(false)

      })
    }catch(e){
      console.log(e)
      setIsLoading(false)

    }
  }

  
  return (
  
            <form onSubmit= {handleSubmit(onSubmit)} className=' h-[100%] flex gap-[3rem] flex-col p-10'>
            <div className='grid'>
                
                <input
                    type='text'
                    placeholder='Email'
                    className='h-[45px]  border-b-black border-b-2 p-3 focus:outline-none bg-transparent'
                    {...register("email")}
                />
                  <p className=' h-[22px] text-red-500 justify-self-start text-[0.9rem]'>{errorMessage.message == 'User not found'?'User not found':errors.email?.message }</p>
            </div>
                <div className='grid'>
                <input
                    type='password'
                    placeholder='Password'
                    className='h-[45px]  border-b-black border-b-2 p-3 focus:outline-none bg-transparent'
                    {...register("password")}
                />    
                <div className="flex justify-between ">
                  <p className=' h-[22px] text-red-500 justify-self-start text-[0.9rem]'>{errorMessage.message == 'Invalid password'?'Wrong Password':errors.password?.message }</p>

                  <a href='login?&email=true' className='justify-self-end text-blue-400 text-[0.9rem]'>Continue With Email</a>
                </div>
                </div>
                <button
                  disabled={isLoading}
                    type='submit'
                    className='bg-[#ff6f3c] w-[100%] max-w-[487px] h-[60px] text-[26px] font-bold text-white cursor-pointer shadow-md hover:shadow-lg  flex items-center justify-center'
                >{isLoading?(<span className="loading loading-spinner loading-lg"></span>):"LOGIN"}</button>
            </form>
        

  )
}
