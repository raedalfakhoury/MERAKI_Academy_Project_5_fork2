/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSuggestedFreinds } from "../redux/reducers/users/users";
import "../recommendedFreind/recommendedFreind.css";
import { GoPersonAdd } from "react-icons/go";
import { SiNike } from "react-icons/si";

const RecommendedFreind = () => {
  const [toggle, setToggle] = useState([]);
  const [counter, setCounter] = useState(0);
  const [follower_id, setFollower_id] = useState({});
  const [length, setLength] = useState();
  const dispatch = useDispatch();
  const { suggestedFreinds, token } = useSelector((state) => {
    return {
      suggestedFreinds: state.suggestedFreinds.suggestedFreinds,
      token: state.auth.token,
    };
  });
 console.log(length);
  const getSuggesterFreinds = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/followers/suggested`);
      shuffleProduct(result?.data?.result ?? []);
      setLength(result?.data?.result.length)
    } catch (error) {
      console.log("from getting users", error);
    }
  };

  function shuffleProduct(suggestedFreinds) {
    const usersCopy = [...suggestedFreinds];
    for (let i = usersCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [usersCopy[i], usersCopy[j]] = [usersCopy[j], usersCopy[i]];
    }
    const toggles = new Array(usersCopy.length).fill(true);
    dispatch(setSuggestedFreinds(usersCopy));
    setToggle(toggles);
  }

  useEffect(() => {
    getSuggesterFreinds();
  }, []);

  const handleToggle = (index) => {
    const newToggle = [...toggle];
    newToggle[index] = !newToggle[index];
    setToggle(newToggle);
  };

  return (
    <div className="mainRecommended">
      <h3 className="suggested-freinds">Suggested Friends {length}</h3>
      {suggestedFreinds?.map((item, i) => (
        <div key={item.id} className="panel">
          <div className="all-info">
            <img onClick={()=>{console.log(item);}}
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
                        
                        // لما تنتهي صفحة login
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  console.log(result.data);
                  getSuggesterFreinds()
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
