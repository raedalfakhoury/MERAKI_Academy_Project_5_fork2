/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../redux/reducers/users/users";
import "../recommendedFreind/recommendedFreind.css";
import { GoPersonAdd } from "react-icons/go";
import { SiNike } from "react-icons/si";

const RecommendedFreind = () => {
  const [toggle, setToggle] = useState([]);
  const [counter, setCounter] = useState(0);
  const [follower_id, setFollower_id] = useState({});
  const dispatch = useDispatch();
  const { users } = useSelector((state) => {
    return {
      users: state.users.users,
    };
  });

  const getAllUsers = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/users/`);
      shuffleProduct(result?.data?.result ?? []);
    } catch (error) {
      console.log("from getting users", error);
    }
  };

  function shuffleProduct(users) {
    const usersCopy = [...users];
    for (let i = usersCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [usersCopy[i], usersCopy[j]] = [usersCopy[j], usersCopy[i]];
    }
    const toggles = new Array(usersCopy.length).fill(true);
    dispatch(setUsers(usersCopy));
    setToggle(toggles);
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleToggle = (index) => {
    const newToggle = [...toggle];
    newToggle[index] = !newToggle[index];
    setToggle(newToggle);
  };

  return (
    <div className="mainRecommended">
      <h3 className="suggested-freinds">Suggested Friends</h3>
      {users?.slice(0, 5)?.map((item, i) => (
        <div key={item.id} className="panel">
          <div className="all-info">
            <img
              className="profileImg"
              alt=""
              src={item.profile_picture_url}
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
            <div className="name-bio">
              <p className="name">{item.username}</p>
              <p className="bio">{item.bio}</p>
            </div>
          </div>
          {toggle[i] ? (
            <GoPersonAdd
              onClick={async () => {
                handleToggle(i);
                try {
                  const result = await axios.post(
                    `http://localhost:5000/followers/add`,
                    { followed_id: item.id },
                    {
                      headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMiwibmFtZSI6ImphbWFsIiwiaW1hZ2UiOiJodHRwczovL2ltYWdlcy5jdGZhc3NldHMubmV0L2g2Z29vOWd3MWhoNi8yc05adEZBV09kUDFsbVEzM1Z3Uk4zLzI0ZTk1M2I5MjBhOWNkMGZmMmUxZDU4Nzc0MmEyNDcyLzEtaW50cm8tcGhvdG8tZmluYWwuanBnP3c9MTIwMCZoPTk5MiZxPTcwJmZtPXdlYnAiLCJyb2xlIjoxLCJpc19kZWxldGVkIjowLCJpYXQiOjE3MDc5MzUwODIsImV4cCI6MTcwNzk1NjY4Mn0.VaBvOzS8mx6fSzKX666JIxiNVi46igat5ki6WCmMXQk`,
                      },
                    }
                  )
                  console.log(result.data);
                } catch (error) {
                  console.log("from add followed", error);
                }
              }}
              className="person"
            />
          ) : (
            <SiNike onClick={() => handleToggle(i)} className="nike" />
          )}
        </div>
      ))}
    </div>
  );
};

export default RecommendedFreind;
