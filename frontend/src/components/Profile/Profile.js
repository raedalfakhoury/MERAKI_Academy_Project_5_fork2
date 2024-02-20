/* eslint-disable no-lone-blocks */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import "../Profile/Profile.css";
import { CiBookmark } from "react-icons/ci";
import { BsPostcard } from "react-icons/bs";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
const Profile = () => {
  const Navigate = useNavigate();
  const arr = useRef([]);
  const [remove, setRemove] = useState(false);
  const { token } = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // const searchQuery = queryParams.get("prf") || "";
  const [searchQuery2, setSearchQuery2] = useState(
    queryParams.get("prf") || ""
  );
  const [profileInfo, setProfileInfo] = useState();
  const [loader, setLoader] = useState(true);
  const [showPost, setShowPost] = useState(false);
  const [myPosts, setMyPosts] = useState();
  const [followers, setFollowers] = useState();
  const [following, setFollowing] = useState();
  const [countFollowers, serCountFollowers] = useState(0);
  const [countFollowing, serCountFollowing] = useState(0);
  const [countPosts, serCountPosts] = useState(0);
  const [innerText, setInnerText] = useState("");
  console.log(innerText);
  const [showFollowers, setShow] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const handleShowFollowers = () => setShow(true);
  const handleShowFollowing = () => setShowFollowing(true);
  console.log(following);
  const handleClose = () => setShow(false);
  const handleClose2 = () => setShowFollowing(false);

  window.scrollTo(0, 0);

  const getMyFollowing = () => {
    axios
      .get(
        `http://localhost:5000/followers/Following/${localStorage.getItem(
          "userId"
        )}`
      )
      .then((result) => {
        arr.current = [];
        result.data.result.forEach((element) => {
          arr.current.push(element.id);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMyFollowing();

    axios
      .get(`http://localhost:5000/users/${searchQuery2}`)
      .then((result) => {
        setProfileInfo(result?.data?.result);
        setLoader(false);
      })
      .then((res) => {
        axios
          .get(`http://localhost:5000/post/countFAndDAndPo/${searchQuery2}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((result) => {
            console.log(result);
            result?.data?.result.forEach((ele) => {
              if (ele.relationship_type == "following") {
                serCountFollowing(ele.count);
              } else if (ele.relationship_type == "followers") {
                serCountFollowers(ele.count);
              } else if (ele.relationship_type == "Posts") {
                serCountPosts(ele.count);
              }
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchQuery2]);

  function Followers() {
    return (
      <>
        <Modal
          show={showFollowers}
          onHide={handleClose}
          animation={false}
          centered
        >
          <Modal.Header closeButton style={{ borderBottom: "none" }}>
            <Modal.Title
              style={{
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              {followers?.length} Followers
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            id="Modal.Body"
            style={{ padding: "10px", height: "525px", overflowY: "scroll" }}
          >
            {followers?.map((item, i) => {
              return (
                <div key={i} className="pop-main">
                  <div
                    onClick={() => {
                      setMyPosts([]);
                      handleClose();
                      setSearchQuery2(item.id);
                      Navigate({
                        pathname: "/profile",
                        search: `?prf=${item.id}`,
                      });
                    }}
                    style={{ display: "flex", cursor: "pointer" }}
                  >
                    <img
                      className="pop-img"
                      alt=""
                      src={item.profile_picture_url}
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                      }}
                    />

                    <div className="name-bio-pop">
                      <p className="name-pop">{item.username}</p>

                      <p className="bio-pop">{item.bio}</p>
                    </div>
                  </div>

                  {localStorage.getItem("userId") == searchQuery2 ? (
                    <button
                      className="button-pop"
                      onClick={async () => {
                        try {
                          const res = await axios.delete(
                            `http://localhost:5000/followers/delete/follower/`,
                            {
                              data: { follower_id: item.id },
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            }
                          );
                          setFollowers(
                            followers.filter((ele) => {
                              return ele.id !== item.id;
                            })
                          );
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                    >
                      Remove
                    </button>
                  ) : localStorage.getItem("userId") ==
                    item.id ? null : arr.current?.includes(item.id) ? (
                    <button
                      className="button-pop"
                      onClick={async () => {
                        try {
                          const res = await axios.delete(
                            `http://localhost:5000/followers/delete`,
                            {
                              data: { followed_id: item.id },
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            }
                          );
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                    >
                      UnFollow
                    </button>
                  ) : (
                    <button
                      className="button-pop"
                      onClick={async () => {
                        if (arr.current.includes(item.id)) {
                        } else {
                          try {
                            const res = await axios.post(
                              `http://localhost:5000/followers/add`,
                              { followed_id: item.id },
                              {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              }
                            );
                          } catch (error) {
                            console.log(error);
                          }
                        }
                      }}
                    >
                      Follow
                    </button>
                  )}
                </div>
              );
            })}
          </Modal.Body>
        </Modal>
      </>
    );
  }
  console.log("out", arr.current);
  function Following() {
    return (
      <>
        <Modal
          show={showFollowing}
          onHide={handleClose2}
          animation={false}
          centered
        >
          <Modal.Header
            closeButton
            style={{ borderBottom: "none", padding: "10px 10px" }}
          >
            <Modal.Title
              style={{
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              {following?.length} Following
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            id="Modal.Body"
            style={{
              padding: "10px",
              height: following?.length == 0 ? "100px" : "525px",
              overflowY: "scroll",
            }}
          >
            {following?.map((item, i) => {
              return (
                <div key={i} className="pop-main">
                  <div
                    onClick={() => {
                      handleClose2();
                      setSearchQuery2(item.id);
                      Navigate({
                        pathname: "/profile",
                        search: `?prf=${item.id}`,
                      });
                    }}
                    style={{ display: "flex", cursor: "pointer" }}
                  >
                    <img
                      className="pop-img"
                      alt=""
                      src={item.profile_picture_url}
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                      }}
                    />

                    <div className="name-bio-pop">
                      <p className="name-pop">{item.username}</p>

                      <p className="bio-pop">{item.bio}</p>
                    </div>
                  </div>

                  {localStorage.getItem("userId") == searchQuery2 &&
                  innerText == "followers" ? (
                    <button
                      className="button-pop"
                      onClick={async () => {
                        try {
                          const res = await axios.delete(
                            `http://localhost:5000/followers/delete/follower/`,
                            {
                              data: { follower_id: item.id },
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            }
                          );
                          console.log("Remove", res.data);
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                    >
                      Remove
                    </button>
                  ) : localStorage.getItem("userId") ==
                    item.id ? null : arr.current?.includes(item.id) ? (
                    <button
                      className="button-pop"
                      onClick={async () => {
                        try {
                          const res = await axios.delete(
                            `http://localhost:5000/followers/delete`,
                            {
                              data: { followed_id: item.id },
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            }
                          );

                          arr.current = arr.current.filter((ele) => {
                            return ele !== item.id * 1;
                          });
                          setRemove(!remove);
                          {
                            localStorage.getItem("userId") == searchQuery2 &&
                              serCountFollowing(countFollowing - 1);
                          }
                          console.log("in", arr.current);
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                    >
                      UnFollow
                    </button>
                  ) : (
                    <button
                      className="button-pop"
                      onClick={async () => {
                        if (arr.current.includes(item.id)) {
                        } else {
                          try {
                            const res = await axios.post(
                              `http://localhost:5000/followers/add`,
                              { followed_id: item.id },
                              {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              }
                            );
                            arr.current.push(item.id);
                            setRemove(!remove);
                            {
                              localStorage.getItem("userId") == searchQuery2 &&
                                serCountFollowing(countFollowing - 1);
                            }
                          } catch (error) {
                            console.log(error);
                          }
                        }
                      }}
                    >
                      Follow
                    </button>
                  )}
                </div>
              );
            })}
          </Modal.Body>
        </Modal>
      </>
    );
  }
  return (
    <div id="mainPage">
      <Followers />
      <Following />

      {loader ? (
        <Loader />
      ) : (
        profileInfo?.map((elm, i) => {
          return (
            <div key={elm.id} className="panel2">
              <div className="edit">
                <img
                  className="ProfilePicture"
                  alt="filed image"
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
                  <p
                    className="followers"
                    onClick={(e) => {
                      setInnerText(e.target.innerText);
                      // !===============================
                      axios
                        .get(
                          `http://localhost:5000/followers/Followers/${searchQuery2}`
                        )
                        .then((result) => {
                          setFollowers(result?.data?.result);
                        })
                        .catch((err) => {
                          console.log(err);
                        });

                      // !===============================
                      setShow(true);
                      handleShowFollowers();
                    }}
                  >
                    {countFollowers} followers
                  </p>
                  <p
                    className="followers"
                    onClick={
                      (e) => {
                        setInnerText(e.target.innerText);
                        // !-------------------------------

                        axios
                          .get(
                            `http://localhost:5000/followers/Following/${searchQuery2}`
                          )
                          .then((result) => {
                            setFollowing(result?.data?.result);
                          })
                          .catch((err) => {
                            console.log(err);
                          });

                        handleShowFollowing();
                      }

                      // !-------------------------------
                    }
                  >
                    {countFollowing} following
                  </p>
                </div>
              </div>
            </div>
          );
        })
      )}
      <div className="wrapping">
        <div className="level2">
          <div className="p-s">
            <BsPostcard />
            <p
              className="posts-saved"
              onClick={() => {
                setMyPosts([]);
                axios
                  .get(`http://localhost:5000/post/mypost/${searchQuery2}`)
                  .then((result) => {
                    setMyPosts(result?.data?.result);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                setShowPost(!showPost);
              }}
            >
              {countPosts} posts
            </p>
          </div>
          <div className="p-s">
            <CiBookmark />
            <p className="posts-saved">saves</p>
          </div>
        </div>
        <div className={showPost ? "grid-media" : "none"}>
          {myPosts?.map((ele, i) => {
            return (
              <img
                key={ele.id}
                className="img-post"
                alt=""
                src={ele.media_url}
              ></img>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
