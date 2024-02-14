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
    const toggles = new Array(usersCopy.length).fill(false);
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
            <SiNike onClick={() => handleToggle(i)} className="nike" />
          ) : (
            <GoPersonAdd onClick={() => handleToggle(i)} className="person" />
          )}
        </div>
      ))}
    </div>
  );
};

export default RecommendedFreind;
