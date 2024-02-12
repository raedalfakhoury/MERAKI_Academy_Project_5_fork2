import React from 'react'
import Navbar from "../Navbar/Navbar"
import Weather from "../Weather/Weather"

import Register from '../Rigester'
import LoginPage from '../Login'
import Post from '../Post/Post'

function Home() {
  return (
    <>
    <Navbar/>
   <Weather/>
   <Register/>
   <LoginPage/>
   <div>Home</div>  
   <Post/>  
    </>
  
  )
}

export default Home