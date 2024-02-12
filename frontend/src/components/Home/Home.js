/* eslint-disable no-unused-vars */
import React from 'react'
import Navbar from "../Navbar/Navbar"
import Weather from "../Weather/Weather"

import Register from '../Rigester'
import LoginPage from '../Login'
import Post from '../Post/Post'
import WelcomePage from '../welcome page/welcomepage'

function Home() {
  return (
    <>
    <Navbar/>
   <Weather/>
   <Register/>
   <LoginPage/>
   <WelcomePage/>
   <div>Home</div>  
   <Post/>  
    </>
  
  )
}

export default Home