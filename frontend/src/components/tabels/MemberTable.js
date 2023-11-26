import React, { useEffect, useState } from 'react';
import { localBackendLink, onlineBackendLink } from '../../utils/links.js';
import axios from 'axios';

const MemberTable = () => {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Members"); // Default selected role

  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    let apiUrl = `${onlineBackendLink}/retrieveAllMembers?token=${token}`;

    if (selectedRole === "Admin") {
      apiUrl = `${onlineBackendLink}/retrieveAdmins?token=${token}`;
    }

    axios.get(apiUrl)
      .then((response) => {
        console.log(response);
        setMembers(response.data.members); // Assuming the data is an array of members
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching members:', error);
        setIsLoading(false);
      });
  }, [selectedRole]);

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  return (
    <div className="overflow-x-auto h-[100%] p-10">
      <table className="table table-xs h-[100%] bg-[#f6f7fa] shadow-md">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th className='max-sm:hidden'>Email</th>
            <th className='max-md:hidden'>Department</th>
            <th>
              <select onChange={handleRoleChange} value={selectedRole}>
                <option value="Members">Members</option>
                <option value="Admin">Admin</option>
              </select>
            </th>
            <th className='max-md:hidden'>Phone No</th>
          </tr>
        </thead>
        {!isLoading ? (
          <tbody>
            {members.map((member, index) => (
              <tr className='hover:bg-[#eceff3] h-[89px] cursor-pointer' key={index}>
                <th>{index + 1}</th>
                <td>{member.fullName}</td>
                <td className='max-sm:hidden'>{member.email}</td>
                <td className='max-md:hidden'>{member.department}</td>
                <td>{member.role}</td>
                <td className='max-md:hidden'>{member.phoneNo}</td>
              </tr>
            ))}
          </tbody>
        ) : (
          <span className="loading loading-ring loading-lg"></span>
        )}
        <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th className='max-sm:hidden'>Email</th>
            <th className='max-md:hidden'>Department</th>
            <th>
              <select onChange={handleRoleChange} value={selectedRole}>
                <option value="Members">Members</option>
                <option value="Admin">Admin</option>
              </select>
            </th>
            <th className='max-md:hidden'>Phone No</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default MemberTable;
