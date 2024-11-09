import React from 'react';
import logo from '../assets/cl-logo.png';
import placeholder from '../assets/placeholder.png';
import { IoIosSearch } from "react-icons/io";
import { FiPlus } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom';
import { useMainContext } from '../contexts/Context';

function Navbar() {
  const { user } = useMainContext();
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow-lg py-3 px-8 flex justify-between items-center">

      <Link className="flex items-center cursor-pointer" to={'/home'}>
        <img src={logo} alt="Logo" className="h-auto w-40" />
      </Link>

      <div className="flex items-center bg-gray-100 rounded-full px-6 py-2 w-2/5 max-w-[600px] border border-gray-300">
        <IoIosSearch className="text-gray-500 text-xl" />
        <input
          type="text"
          placeholder="Search courses..."
          className="ml-4 w-full bg-transparent border-none outline-none placeholder-gray-500 text-gray-700 p-2 text-sm"
        />
      </div>

      <div className="flex items-center space-x-6">

        {/* Show "Create Course" button only if the user is a tutor */}
        {user?.role === 'tutor' && (
          <Link to="/create-course">
            <button className="bg-[#8c52ff] text-white font-semibold py-2 px-8 rounded-lg hover:bg-[#7a40e1] transition duration-200 ease-in-out transform hover:scale-105 flex items-center space-x-2">
              <FiPlus className="text-lg" />
              <span>Create Course</span>
            </button>
          </Link>
        )}

        {user ? (
          <>

            <div className="border-l border-[#ddd] pl-4 flex items-center gap-3 hover:cursor-pointer transition-all duration-200 ease-in-out" onClick={()=>navigate(`/user/${user._id}`)}>
              <img
                src={user?.profilePicUrl || placeholder}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover transform hover:scale-110 transition-transform duration-200 ease-in-out"
              />
              <div className="flex items-center gap-2">
                <h3 className="font-semibold transform hover:scale-105 transition-transform duration-200 ease-in-out hover:underline">
                  {user?.fullName}
                  <div className='flex items-center gap-1'>
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                    <span className="text-gray-500 text-sm">
                      {user?.role}
                    </span>
                  </div>

                </h3>

              </div>

            </div>

          </>
        ) : (
          <Link className="flex items-center space-x-6" to={'/'}>
            <button className="bg-[#8c52ff] text-white font-semibold py-2 px-8 rounded-lg hover:bg-[#7a40e1] transition duration-200 ease-in-out transform hover:scale-105">
              Log In
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
