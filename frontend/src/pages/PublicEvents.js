import React,{useEffect,useState}from 'react';
import arrow from '../assets/arrow.svg';
import { useNavigate } from 'react-router';
import HomeNavbar from '../components/navbar/homeNavbar';
import {coddingJif} from '../utils/links.js'
import axios from 'axios';
import { localBackendLink } from '../utils/links.js';
import {EventsTable} from '../components/tabels/EventsTable.js'
export const PublicEvents = () => {
    const navigate = useNavigate()
    const [events,setEvents] = useState([])
    useEffect(()=>{
        console.log('efd')
        axios.get(`${localBackendLink}/publicGetOrderedEvents`)
        .then((res)=>{
            console.log(res)
            setEvents(res)
        }
            
        )
    },[])
  return (
    <div className=' h-screen w-screen overflow-clip'>
     <HomeNavbar/>
     <main className='h-[100%]  p-16'>
      
        <EventsTable/>
     </main>
    </div>
  )
}
