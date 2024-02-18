/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import "../Profile/Profile.css";
import { CiBookmark } from "react-icons/ci";
import { BsPostcard } from "react-icons/bs";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
const Profile = () => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("prf") || "";
  console.log(searchQuery);
  const [profileInfo, setProfileInfo] = useState();
  const [loader, setLoader] = useState(true);
  const [countFollowers, setCountFollowers] = useState(0);
  const [countFollowing, setCountFollowing] = useState(0);
  const [myPosts, setMyPosts] = useState();
  console.log(profileInfo);
  window.scrollTo(0, 0);
  useEffect(() => {
    
    axios
      .get(`http://localhost:5000/users/${searchQuery}`)
      .then((result) => {
        setProfileInfo(result?.data?.result);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/followers/Followers/${searchQuery}`)
      .then((result) => {
        console.log(result.data);
        setCountFollowers(result.data.length);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/followers/Following/${searchQuery}`)
      .then((result) => {
        console.log(result.data);
        setCountFollowing(result.data.length);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div id="mainPage">
      {loader ? (
        <Loader />
      ) : (
        profileInfo?.map((elm, i) => {
          console.log(elm);
          return (
            <div key={elm.id} className="panel2">
              <div className="edit">
                <img
                  className="ProfilePicture"
                  alt=""
                  src={elm.profile_picture_url}
                />
              </div>
              <div className="colum">
                <div className="follower">
                  <p className="username">{elm.username}</p>
                  <p className="followers"> Edit profile</p>
                  <p> </p>
                  <h4>
                    <span></span>
                  </h4>
                </div>
                <div className="followerr">
                  <p className="bio">{elm.bio}</p>
                  <p className="followers">{countFollowers} followers</p>
                  <p className="followers">{countFollowing} following</p>
                </div>
              </div>
            </div>
          );
        })
      )}
      <div className="level2">
        <div className="p-s">
          <BsPostcard />
          <p
            className="posts-saved"
            onClick={async () => {
          try {
            const result = await axios.get(
              `http://localhost:5000/post/mypost/${searchQuery}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setMyPosts(result.data.result)
            console.log(result.data.result);
          } catch (error) {
            console.log("from post by user id",error);
          }
            }}
          >
            posts
          </p>
        </div>
        <div className="p-s">
          <CiBookmark />
          <p className="posts-saved">saves</p>
        </div>
      </div>
      <div className="grid-media">
        {myPosts?.map((ele,i)=>{
          console.log(ele);
          return (
            <img className="img-post" alt="" src={ele.media_url}></img>
          )
        })}
      </div>
    </div>
  );
};

export default Profile;
