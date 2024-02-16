/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
const Profile = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("prf") || "";
   
  const [profileInfo, setProfileInfo] = useState();
  console.log(profileInfo);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${searchQuery}`)
      .then((result) => { 
        setProfileInfo(result?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <div className="mainPage"></div>;
};

export default Profile;
