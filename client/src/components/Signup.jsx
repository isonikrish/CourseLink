import React, { useState } from 'react'
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useMainContext } from '../contexts/Context';

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const {handleSignup} = useMainContext();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignup(fullName, email, password, role);
  };
  return (
    <form className="w-full px-10" onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          type='text'
          placeholder='Full Name'
          className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8128D9]'
          onChange={(e) => setFullName(e.target.value)}
          value={fullName}
          required
        />
      </div>

      <div className="mb-4">
        <input
          type='email'
          placeholder='Email'
          className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8128D9]'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </div>
      <div className="mb-4 relative flex items-center">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder='Password'
          className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8128D9]'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 text-gray-600 focus:outline-none"
        >
          {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700">Select Role</label>
        <div className="flex items-center space-x-6 mt-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="role"
              value="student"
              checked={role === 'student'}
              onChange={(e) => setRole(e.target.value)}
              className="text-[#8128D9] focus:ring-[#8128D9] cursor-pointer"
            />
            <span className="text-gray-700">Student</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="role"
              value="tutor"
              checked={role === 'tutor'}
              onChange={(e) => setRole(e.target.value)}
              className="text-[#8128D9] focus:ring-[#8128D9] cursor-pointer"
            />
            <span className="text-gray-700">Tutor</span>
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-[#8128D9] text-white font-semibold py-4 rounded-full transition duration-200 text-xl"
      >
        Sign Up
      </button>
    </form>
  )
}

export default Signup;
