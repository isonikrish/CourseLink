import React, { useState } from 'react'
import { IoEyeOutline, IoEyeOffOutline  } from "react-icons/io5";
import { useMainContext } from '../contexts/Context';
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {handleLogin} = useMainContext();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  function handleSubmit(e){
    e.preventDefault();
    handleLogin(email,password)
  }
  return (
    <form className="w-full px-10" onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          type='email'
          placeholder='Email'
          className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8128D9]'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div className="mb-4 relative flex items-center">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder='Password'
          className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8128D9]'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 text-gray-600 focus:outline-none"
        >
          {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
        </button>
      </div>
      <button
        type="submit"
        className="w-full bg-[#8128D9] text-white font-semibold py-4 rounded-full transition duration-200 text-xl"
      >
        Login
      </button>
    </form>
  )
}

export default Login