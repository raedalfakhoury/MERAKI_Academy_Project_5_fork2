/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Weather from "../Weather/Weather";
import RecommendedFreind from "../recommendedFreind/recommendedFreind";
import Register from "../Rigester/index";
import LoginPage from "../Login/index";
import Post from "../Post/Post";
import WelcomePage from "../welcome page/welcomepage";

import NavBarPost from "../Navbar/NavBarPost"
import Stories from "../Stories/Stories" 





import Loader from "../Loader/Loader";
import Profile from "../Profile/Profile";


function Home() {
  
  return (

    <>
   

      <Routes>
         <Route path="/users/register" element={<Register />} />
         <Route path="/users/login" element={<LoginPage />} />
        <Route path="/profile" element={<Profile />} />



        <Route path="/" element={<WelcomePage/>} />
        <Route path="/home/Posts" element={<Post/>} />

        
      </Routes>

<Stories/>
      {/* <WelcomePage/>  */}
      {/* <NavBar/> */}
      {/* <Weather/> */}
      {/* <Profile/> */}
      {/* <RecommendedFreind/> */}
      {/* <LoginPage /> */}

      {/* <Post/>   */}
    </>
  );
}

export default Home;
