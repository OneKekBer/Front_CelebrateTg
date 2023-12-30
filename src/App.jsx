// import { useEffect, useState } from 'react'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import { Route, Routes } from "react-router-dom"

function App() {


  return (
    <div>
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      {/* <Login /> */}
    </div>
  )
}

export default App
