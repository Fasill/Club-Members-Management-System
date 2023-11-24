import React from 'react';
import arrow from '../assets/arrow.svg';
import { useNavigate } from 'react-router';
import HomeNavbar from '../components/navbar/homeNavbar';
import {coddingJif} from '../utils/links.js'

export const Home = () => {
    const navigate = useNavigate()
  return (
    <div className=' h-screen w-screen overflow-clip'>
     <HomeNavbar/>
     <main className='h-[100%]  p-16'>
        <div className=' flex    items-center'>
            <div className='grid h-[15rem]' >
            <div className='flex gap-2  text-[5rem]'>
                <h1>CSEC</h1>
                <h1>ASTU</h1>
            </div>
            <p className='justify-self-start text-[2rem]'>Computer science and Engineering student club </p>
            <div className=' w-[100%] flex max-md:max-w-[80%] items-center'>
                <p  className='text-left text-[1rem] '>Connecting Ideas, Building Futures: Within CSEC at Adama Science and Technology University, we are the crucible of innovation. Join us in nurturing creativity, where ideas resonate, and futures flourish. CSEC - Where Innovation Thrives </p>
                <img src={arrow} className='transition-all duration-300 mr-1 hover:mr-0 cursor-pointer'/>
            </div>
            </div>
                <img src={coddingJif} className='w-[30rem]'/>
        </div>
     </main>
    </div>
  )
}
