import React,{useState} from 'react'

import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { onlineBackendLink,localBackendLink } from '../../utils/links';
import { useNavigate } from 'react-router';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const LoginByEmail = () => {

  const [isLoading,setIsLoading] = useState(false);
  const [errorMessage,setErrorMessage] = useState('');

  const navigate = useNavigate() 
  const validationSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
  });

  const notify = () =>  toast.success('🚀 Invitation Link Sent!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

    const notify2 = () =>  toast.success(' ✉️ Check your email for further instructions.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
  const {register,handleSubmit, formState:{errors} } = useForm({
    resolver:yupResolver(validationSchema),
  });
  
  const onSubmit =(data) => {
    setIsLoading(true)

    console.log(data.email)
    try{
      axios.post(`${onlineBackendLink}/loginByEmail`,data)
      .then((response)=>{
          notify()
        console.log(response)
        // console.log(re)
        setIsLoading(false)
        notify2()
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

  
  return (<>
  
            <form onSubmit= {handleSubmit(onSubmit)} className=' h-[100%] flex gap-[3rem] flex-col p-10'>
                <div className='grid'>
                <input
                    type='email'
                    placeholder='Email'
                    className='h-[45px]  border-b-black border-b-2 p-3 focus:outline-none bg-transparent'
                    {...register("email")}
                />    
                <div className="flex justify-between ">
                  <p className=' h-[22px] text-red-500 justify-self-start text-[0.9rem]'>{errorMessage.message == 'User not found'?'User not found':errors.email?.message }</p>

                  <a href='login?&email=false' className='justify-self-end text-blue-400 text-[0.9rem]'>Continue With Password</a>
                </div>
                </div>
                <button
                  disabled={isLoading}
                    type='submit'
                    className='bg-[#FFE500] w-[100%] max-w-[487px] h-[60px] text-[26px] font-bold text-white cursor-pointer shadow-md hover:shadow-lg  flex items-center justify-center'
                >{isLoading?(<span className="loading loading-spinner loading-lg"></span>):"Send"}</button>
            </form>
        <ToastContainer /></>
        
        
  )
}
