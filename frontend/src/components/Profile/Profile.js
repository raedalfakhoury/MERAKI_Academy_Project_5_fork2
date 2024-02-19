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
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const Profile = () => {
  const Navigate = useNavigate();
  const arr = useRef([]);

  const { token } = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });
  console.log(token);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("prf") || "";

  const [profileInfo, setProfileInfo] = useState();
  const [loader, setLoader] = useState(true);
  const [showPost, setShowPost] = useState(false);
  const [countFollowers, setCountFollowers] = useState(0);
  const [countFollowing, setCountFollowing] = useState(0);
  const [myPosts, setMyPosts] = useState();
  const [myPostsLength, setMyPostsLength] = useState(0);
  const [modalShow, setModalShow] = React.useState(false);
  const [followers, setFollowers] = useState();
  const [following, setFollowing] = useState();
  console.log(following);
  window.scrollTo(0, 0);
  const getFollowing = () => {
    axios
      .get(`http://localhost:5000/followers/Following/${searchQuery}`)
      .then((result) => {
        setCountFollowing(result.data.length);
        setLoader(false);
        setFollowing(result?.data?.result);
        console.log(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getMyFollowing = () => {
    axios
      .get(
        `http://localhost:5000/followers/Following/${localStorage.getItem(
          "userId"
        )}`
      )
      .then((result) => {
        console.log(result.data.result);
        arr.current = [];
        result.data.result.forEach((element) => {
          console.log(element.id);

          arr.current.push(element.id);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getFollowers = () => {
    axios
      .get(`http://localhost:5000/followers/Followers/${searchQuery}`)
      .then((result) => {
        setCountFollowers(result.data.length);
        setLoader(false);
        setFollowers(result?.data?.result);
        console.log(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMyFollowing();
    getFollowers();
    getFollowing();
    axios
      .get(`http://localhost:5000/post/mypost/${searchQuery}`)
      .then((result) => {
        console.log("raed", result.data.result.length);
        setMyPosts(result?.data?.result);
        setMyPostsLength(result?.data?.result?.length);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`http://localhost:5000/users/${searchQuery}`)
      .then((result) => {
        setProfileInfo(result?.data?.result);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchQuery]);

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton style={{ borderBottom: "0px" }}>
          <Modal.Title id="contained-modal-title-vcenter">
            <h3>Followers</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body id="Modal.Body">
          {followers?.map((item, i) => {
            console.log(item);
            return (
              <div key={i} className="pop-main">
                <div
                  onClick={() => {
                    Navigate({
                      pathname: "/profile",
                      search: `?prf=${item.id}`,
                    });
                    setProfileInfo(null);
                    window.location.reload();
                    props.onHide();
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

                {localStorage.getItem("userId") == searchQuery ? (
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
                        getMyFollowing();
                        getFollowers();
                        getFollowing();
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
                        console.log("unfollow", res.data);
                        getMyFollowing();
                        getFollowers();
                        getFollowing();
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
                      console.log(item.id);
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
                          console.log("raed", res.data);

                          getMyFollowing();
                          getFollowers();
                          getFollowing();
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
        <Modal.Footer style={{ borderBottom: "0px" }}>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  console.log(arr.current);
  return (
    <div id="mainPage">
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
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
                  <p className="followers" onClick={() => setModalShow(true)}>
                    {countFollowers} followers
                  </p>
                  <p className="followers" onClick={() => setModalShow(true)}>
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
                setShowPost(!showPost);
              }}
            >
              posts ({myPostsLength})
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
