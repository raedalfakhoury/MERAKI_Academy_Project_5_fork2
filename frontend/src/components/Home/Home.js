/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Weather from "../Weather/Weather";
import RecommendedFreind from "../recommendedFreind/recommendedFreind";
import Register from "../Rigester/index";
import LoginPage from "../Login/index";
import Post from "../Post/Post";
import WelcomePage from "../welcome page/welcomepage";

function Home() {
  return (
    <>
      <Routes>
        // <Route path="/users/register" element={<Register />} />
        // <Route path="/users/login" element={<LoginPage />} />
        // <Route path="/" element={<WelcomePage/>} />

        {/* <Route path="/users/aboutUs" element={<AboutUs />} /> */}
        {/* <Route path="/users/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/users/admin" element={<Admin />} /> */}
      </Routes>
      {/* <WelcomePage/>  */}

      {/* <Navbar/> */}
      {/* <Weather/> */}
      {/* <RecommendedFreind/> */}
      {/* <LoginPage /> */}
 
      {/* <Post/>   */}
    </>
  );
}

export default Home;
