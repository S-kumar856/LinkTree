import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import LandingPage from './components/Landingpage/LandingPage'
import CategoryPage from './components/Categories/CategoryPage'
import HeroPage from './components/Hero/HeroPage'



const App = () => {
  return (
    <>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/categories' element={<CategoryPage />} />
        <Route path='/hero' element={<HeroPage />} />
      </Routes>

    </>
  )
}

export default App
