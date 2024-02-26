/* eslint-disable no-unused-vars */
import React from "react";
import "./Home.css";
import Post from "../Post/Post";
import Weather from "../Weather/Weather";
import NavBarPost from "../Navbar/NavBarPost";
import RecommendedFreind from "../recommendedFreind/recommendedFreind";
import Stories from "../Stories/Stories";
import { Container } from "react-bootstrap";

function Home() {
  return (
    <>
      <NavBarPost />

      <div id="Container-home">
        <div id="W-R">
          <Weather  />
          <RecommendedFreind />
        </div>
        <div>
          <Post />
        </div>
        <div>
          <Stories />
        </div>
      </div>
    </>
  );
}
export default Home;
