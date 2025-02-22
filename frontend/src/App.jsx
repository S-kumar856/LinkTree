import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import LandingPage from './components/Landingpage/LandingPage'

const App = () => {
  return (
    <>
     
        <Routes>
        <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path='/login' element={<Login />} />{}
        </Routes>
   
    </>
  )
}

export default App
