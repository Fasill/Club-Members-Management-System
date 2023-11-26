import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const logout = ()=>{
        localStorage.setItem('token','')
    }
  return (
    <div className='h-[61px] border-b bg-white flex justify-center'>
        <ul className='flex items-center justify-between w-[100%] pl-5 pr-5'>
            <li className='w-[33.3%] font-bold text-[25px] flex items-start'>
                <h1>CSEC</h1>
            </li>
            <li className='flex w-[33.3%] text-[20px] justify-between max-md:hidden'>
                <p className='cursor-pointer transition-all duration-300 hover:font-bold'>Events</p>
                <p className='cursor-pointer transition-all duration-300 hover:font-bold'>Profile</p>
                <p className='cursor-pointer transition-all duration-300 hover:font-bold'>Members</p>

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
                  <li onClick={() => navigate("/app/profile")}><p>Profile</p></li>
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