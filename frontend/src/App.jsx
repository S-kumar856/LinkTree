import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './components/Register/Register'
import Login from './components/Login/Login'

const App = () => {
  return (
    <>
      <BrowserRouter> 
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path='/login' element={<Login />} />{}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
