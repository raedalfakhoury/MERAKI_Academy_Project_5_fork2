/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import usersSlice, { setUsers } from "../redux/reducers/users/users";
import "../recommendedFreind/recommendedFreind.css";
const RecommendedFreind = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => {
    return {
      users: state.users.users,
    };
  });

  const getAllUsers = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/users/`);
      dispatch(setUsers(result?.data?.result ?? []));
      /* console.log(result.data.result);
      console.log(users); */
    } catch (error) {
      console.log("from getting users", error);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="mainRecommended">
      {users?.slice(0,5)?.map((item, i) => {
        console.log(item);
        return <div key={item.i} className="panel">
          <img  key={i} className="profileImg" alt="" src={item.profile_picture_url}   style={{ width: '50px', height: '50px', borderRadius: '50%' }}></img>
        </div>
      })}
    </div>
  );
};

export default RecommendedFreind;
