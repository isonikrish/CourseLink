import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Profile from './pages/Profile.jsx'
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/user/:userId' element={<Profile />}/>
      </Routes>
      <Toaster />
    </>
  )
}

export default App