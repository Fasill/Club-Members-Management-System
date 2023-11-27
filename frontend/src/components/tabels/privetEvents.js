import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { onlineBackendLink, localBackendLink } from '../../utils/links.js';

export const PrivetEvents = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  const [counter, setCounter] = useState(0);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    setIsLoading(true);
    const tabValue = searchParams.get('tab');
    const token = localStorage.getItem('token');

    setActiveTab(tabValue);

    axios
      .get(`${localBackendLink}/GetOrderedEvents?token=${token}`)
      .then((response) => {
        console.log(response);
        setInfo(response.data.events.reverse()); // Reverse the order here
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [activeTab]);

  const renderJobCards = () => {
    const eventsInRows = [];

    for (let i = 0; i < info.length; i += 3) {
      const row = info.slice(i, i + 3);
      eventsInRows.push(row);
    }

    return eventsInRows.map((row, rowIndex) => (
      <div key={rowIndex} className="flex gap-4 mb-8 max-md:grid max-md:justify-items-center  ">
        {row.map((event, index) => (
          <div key={index} className="transition-all duration-300 hover:scale-[1.01] shadow-2xl h-[14rem] w-[33.3%] max-md:w-[50%] rounded-xl flex flex-col gap-3 overflow-clip">
            <div className="border-b bg-slate-300">
              <h1 className="font-bold">{event.title}</h1>
            </div>
            <div className="p-4 h-full flex flex-col gap-3">
              <div className="text-left flex items-start h-[60%] w-full overflow-y-auto overflow-x-hidden">
                <p className="">{event.description}</p>
              </div>
              <div className="p-3 flex justify-between text-[12px]">
                <p>{event.location}</p>
                <p>|</p>
                <p>{event.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="job-list">
          {info.length === 0 ? (
            <p>No events found.</p>
          ) : (
            renderJobCards()
          )}
        </div>
      )}
    </div>
  );
};
