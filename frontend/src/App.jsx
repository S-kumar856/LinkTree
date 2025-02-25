import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import LandingPage from './components/Landingpage/LandingPage'
import CategoryPage from './components/Categories/CategoryPage'
import HeroPage from './components/Hero/HeroPage'
import Appearance from './Pages/Appearance/Appearance'
import Settings from './Pages/Settings/Setting'
import Analytic from './Pages/Analytics/Analytic'
import LinkPage from './Pages/LinkPage/LinkPage'



const App = () => {
  return (
    <>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/categories' element={<CategoryPage />} />
        <Route path='/hero' element={<HeroPage />}>
          <Route path='links' element={<LinkPage />} />
          <Route path='analytics' element={<Analytic />} />
          <Route path='appearance' element={<Appearance />} />
          <Route path='settings' element={<Settings />} />
        </Route>
      </Routes>

    </>
  )
}

export default App
