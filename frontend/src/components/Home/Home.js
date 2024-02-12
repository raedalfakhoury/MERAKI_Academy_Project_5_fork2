import React from 'react'
import Navbar from "../Navbar/Navbar"
import Weather from "../Weather/Weather"
import Register from '../Rigester'
import LoginPage from '../Login'

function Home() {
  return (
    <>
   <Navbar/>
   <Weather/>
   <Register/>
   <LoginPage/>
   <div>Home</div>
    
    </>
  
  )
}

export default Home