import React from 'react'
import { useNavigate } from 'react-router';
import csecLogo from '../../assets/csecLogo.jpeg';

const HomeNavbar = () => {
    const navigate = useNavigate()

  return (
    <nav className='h-[83px] text-[24px] flex bg-white w-[100%] justify-between p-2 pl-[5rem] pr-[5rem] items-center shadow-md'>
        <div className='w-[33.3%] flex justify-items-start'>
            {/* <h1 className='cursor-pointer' }>CMMS</h1> */}
            <div className="avatar ">
                <div className="w-14 transition-all duration-300 hover:scale-[1.03]  rounded-full cursor-pointer" onClick={()=>navigate('/')}>
                    <img src={csecLogo} />
                </div>
            </div>

        </div>
        <ul className='flex justify-between  w-[33.3%] max-md:hidden'>
            <li className='hover:font-bold transition-all duration-300 cursor-pointer' onClick={()=>navigate('/')}>
                Home
            </li>
           
            <li className='hover:font-bold transition-all duration-300 cursor-pointer mr-1 ' onClick={()=>navigate('/home/events')}>
                Events
            </li>
          
        </ul>
        <div className=' w-[33.3%] flex justify-end'>
            <button onClick={()=>navigate('/login')} className='bg-[#ff6f3c] h-[47px]  w-full max-w-[144px] font-bold transition-all duration-300 text-white shadow-md hover:shadow-lg'>
                LOGIN
            </button>
        </div>
        </nav>
  )
}

export default HomeNavbar