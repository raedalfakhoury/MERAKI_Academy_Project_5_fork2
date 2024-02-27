/* eslint-disable array-callback-return */
/* eslint-disable no-unreachable */
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
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { setsavePost } from "../redux/reducers/savePost/index";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const Profile = () => {
  const [data_user, set_data_user] = useState({
    bio: "",
    image: "",
  });

  const pr_key = "rllytlm7";
  const cloud_name = "dmmo3zzyc";

  const handleImageJamal = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", pr_key);

    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      )
      .then((result) => {
        console.log(result.data.url);
        set_data_user({ ...data_user, image: result.data.url });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const dispatch = useDispatch();

  const Navigate = useNavigate();
  const arr = useRef([]);
  const [remove, setRemove] = useState(false);
  const [test, setTest] = useState(true);
  const [image, setImage] = useState();
  const [report, setReport] = useState({
    reporting: "",
  });
  // let bio = useRef("");
  const { token, savePost } = useSelector((state) => {
    return {
      token: state.auth.token,
      savePost: state.savePost.savePost,
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
  const [showSave, setShowSave] = useState(false);
  const [myPosts, setMyPosts] = useState();
  const [followers, setFollowers] = useState();
  const [following, setFollowing] = useState();
  const [countFollowers, serCountFollowers] = useState(0);
  const [countFollowing, serCountFollowing] = useState(0);
  const [countPosts, serCountPosts] = useState(0);
  const [innerText, setInnerText] = useState("");
  const [showFollowers, setShow] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showPostPopup, setShowPostPopup] = useState(false);

  const [showReporting, setShowReporting] = useState(false);

  const [postAndComment, setPostAndComment] = useState();

  const handleShowFollowers = () => setShow(true);
  const handleShowFollowing = () => setShowFollowing(true);
  const handleShowEditProfile = () => setShowEditProfile(true);
  const handleShowPostPopup = () => setShowPostPopup(true);
  const handleShowReporting = () => setShowReporting(true);

  const handleClose = () => setShow(false);
  const handleClose2 = () => setShowFollowing(false);
  const handleCloseEditProfile = () => setShowEditProfile(false);
  const handleClosereporting = () => setShowReporting(false);

  const handleClosePostPopup = () => {
    setImage([]);
    setPostAndComment([]);
    setShowPostPopup(false);
  };

  let filtration;
  window.scrollTo(0, 0);

  const [user, setUser] = useState();

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
  // console.log(profileInfo); // array
  // console.log(profile_picture_url);
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
                  {/* عندما اكون داخل البروفايل الخاص بي */}
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
                          serCountFollowers(countFollowers - 1);
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                    >
                      Remove
                    </button>
                  ) : // {لما اكون ببروفايل شخص اخر ويظهر امي من ضمن المتابعين له لا اريد ان يظهر زر الحذف}
                  localStorage.getItem("userId") ==
                    // {اذا كان الشخص يلي بتابعني من ضمن المصفوفه يلي فيها الاشخاص يلي بتابعهم}
                    item.id ? null : arr.current?.includes(item.id) ? (
                    <button
                      className="button-pop"
                      onClick={async () => {
                        console.log("unfollow", arr.current.includes(item.id));
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
                          // console.log("t.a", res.data.result);
                          // filtration = followers.filter((ele) => {
                          //   return ele.id !== res.data.result[0].followed_id;
                          // });
                          // setFollowers(filtration);
                          arr.current = arr.current.filter((ele) => {
                            return ele !== item.id * 1;
                          });
                          // arr.current = filtration;
                          setTest(!test);
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
                        console.log("follow", arr.current.includes(item.id));

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
                          setTest(!test);
                        } catch (error) {
                          console.log(error);
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
                                serCountFollowing(countFollowing + 1);
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

  // function EditProfile() {
  //   return (
  //     <>

  //     </>
  //   );
  // }

  function PostPopUp() {
    return (
      <>
        <Modal
          show={showPostPopup}
          onHide={handleClosePostPopup}
          animation={false}
          centered
        >
          <Modal.Header
            closeButton
            style={{ borderBottom: "1px solid #808080", padding: "5px 10px" }}
          >
            <Modal.Title
              style={{
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <h4> {postAndComment?.length} comments</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            id="Modal.Body"
            style={{
              padding: "10px",
              display: "flex",
              overflowY: "auto",
            }}
          >
            {loader ? (
              <Loader />
            ) : (
              <div className="mainPostPopup">
                {image && image.length > 0 && postAndComment.length > 0 && (
                  <img
                    alt=""
                    src={postAndComment[0]?.media_url}
                    style={{ height: "250px", width: "200px" }}
                  />
                )}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "250px",
                    gap: "10px",
                  }}
                >
                  {postAndComment?.map((ele) => {
                    return (
                      <>
                        <div
                          className="inPopup"
                          style={{
                            display: "flex",
                            width: "100%",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              gap: "10px",
                              height: "fit-content",
                              alignItems: "center",
                            }}
                          >
                            <img
                              alt=""
                              src={ele.profile_picture_url}
                              style={{
                                height: "70px",
                                width: "70px",
                                borderRadius: "50%",
                              }}
                            ></img>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column-reverse",
                              }}
                            >
                              <p style={{ marginBottom: "0px" }}>
                                {ele.comment_content?.split("|")[0]}{" "}
                              </p>
                              <p style={{ marginBottom: "0px" }}>
                                {ele.username}{" "}
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            )}
          </Modal.Body>
        </Modal>
      </>
    );
  }

  return (
    <div id="mainPage">
      <Followers />
      <Following />
      {/* <EditProfile /> */}
      <PostPopUp />
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
                  <p
                    className="username"
                    style={{ width: "150px", margin: "0px" }}
                  >
                    {elm.username}
                  </p>

                  {localStorage.getItem("userId") == searchQuery2 ? (
                    <button
                      className="Btn"
                      onClick={async () => {
                        try {
                          const result = await axios.get(
                            `http://localhost:5000/users/${searchQuery2}`
                          );
                          setUser(result.data.result);
                          const { bio, profile_picture_url } =
                            result.data.result[0];
                          // console.log(result.data.result[0]);
                          set_data_user({
                            ...data_user,
                            bio: bio,
                            image: profile_picture_url,
                          });
                          // bio: "",
                          // image: "",
                          // console.log(result.data.result[0]);
                          handleShowEditProfile();
                          setShowPost(false);
                          setShowSave(false);
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                    >
                      Edit
                      <svg class="svg" viewBox="0 0 512 512">
                        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                      </svg>
                    </button>
                  ) : arr.current.includes(searchQuery2) ? (
                    <button
                      // id=" UnFollow-Public"
                      style={{
                        backgroundColor: "#efefef",
                        padding: "10px 20px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        textAlign: "center",
                        fontWeight: "600",
                        width: "150px",
                        color: "black",
                      }}
                      onClick={async () => {
                        try {
                          const res = await axios.delete(
                            `http://localhost:5000/followers/delete`,
                            {
                              data: { followed_id: searchQuery2 },
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            }
                          );

                          arr.current = arr.current.filter((ele) => {
                            return ele !== searchQuery2;
                          });
                          setRemove(!remove);
                          // {
                          //   localStorage.getItem("userId") == searchQuery2 &&
                          // }
                          serCountFollowers(countFollowers * 1 - 1);
                          setShowPost(false);
                          setShowSave(false);
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                    >
                      {" "}
                      UnFollow
                    </button>
                  ) : (
                    <button
                      // id="Follow-Public"
                      className="Btn"
                      onClick={async () => {
                        if (arr.current.includes(searchQuery2)) {
                        } else {
                          try {
                            const res = await axios.post(
                              `http://localhost:5000/followers/add`,
                              { followed_id: searchQuery2 },
                              {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              }
                            );
                            arr.current.push(searchQuery2);
                            setRemove(!remove);

                            serCountFollowers(countFollowers * 1 + 1);
                            setShowPost(false);
                            setShowSave(false);
                          } catch (error) {
                            console.log(error);
                          }
                        }
                      }}
                    >
                      {" "}
                      Follow
                    </button>
                  )}
                  <p> </p>
                  <h4>
                    <span></span>
                  </h4>
                  {localStorage.getItem("userId") == searchQuery2 ? (
                    ""
                  ) : (
                    <p
                      style={{
                        backgroundColor: "#EFEFEF",
                        padding: "10px 20px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        textAlign: "center",
                        fontWeight: "600",
                        width: "150px",
                        margin: "0px",
                      }}
                      onClick={() => {
                        handleShowReporting();
                      }}
                    >
                      Report
                    </p>
                  )}
                </div>

                <div className="followerr">
                  <p className="bio" style={{ width: "150px" }}>
                    {elm.bio}
                  </p>
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
                          setShowPost(false);
                          setShowSave(false);
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
                            setShowPost(false);
                            setShowSave(false);
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
                    console.log(result.data);
                    setMyPosts(result?.data?.result);
                    setShowSave(false);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                setShowPost(!showPost);
              }}
            >
              posts
            </p>
          </div>
          <div className="p-s">
            {localStorage.getItem("userId") == searchQuery2 ? (
              <>
                <CiBookmark />
                <p
                  className="posts-saved"
                  onClick={async () => {
                    try {
                      const res = await axios.get(
                        `http://localhost:5000/post/allSavePost`,
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      );

                      dispatch(setsavePost(res?.data?.result));
                      setShowPost(false);
                      setShowSave(!showSave);
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  Archives
                </p>
              </>
            ) : null}
          </div>
        </div>
        <div className={showPost ? "grid-media" : "none"}>
          {myPosts?.map((ele, i) => {
            return (
              <>
                {!ele.media_url.includes(".mp4") ? (
                  <img
                    key={ele.id}
                    className="img-post"
                    alt=""
                    style={{ cursor: "pointer" }}
                    src={ele.media_url}
                    onClick={async () => {
                      handleShowPostPopup();
                      // console.log(ele.id);
                      try {
                        setLoader(false);
                        // ! {The axios.get() method doesn't accept a second parameter for passing data in a GET request} مهم
                        const res = await axios.get(
                          `http://localhost:5000/post/postWComments/${ele.id}`
                        );
                        const images = await axios.get(
                          `http://localhost:5000/post/${ele.id}`,
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        );
                        // console.log(res?.data?.result);
                        // console.log(images.data.post);
                        setImage(images?.data?.post);
                        setPostAndComment(res?.data?.result);
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  ></img>
                ) : (
                  <video
                    style={{ cursor: "pointer" }}
                    controls
                    muted
                    className="img-post"
                    src={ele.media_url}
                    onClick={() => {
                      console.log(ele.id);
                    }}
                  ></video>
                )}
              </>
            );
          })}
        </div>
      </div>
      <div className={showSave ? "grid-media" : "none"}>
        {savePost?.map((ele, i) => {
          return (
            <>
              {!ele.media_url.includes(".mp4") ? (
                <img
                  key={ele.id}
                  className="img-post"
                  alt=""
                  src={ele.media_url}
                ></img>
              ) : (
                <video
                  controls
                  muted
                  className="img-post"
                  src={ele.media_url}
                ></video>
              )}
            </>
          );
        })}
      </div>
      <button
        id="Floating"
        onClick={() => {
          Navigate("/home");
        }}
      >
        HOME
      </button>
      <Modal
        show={showEditProfile}
        onHide={handleCloseEditProfile}
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
              paddingBottom: "10px",
              borderBottom: "1px solid #808080",
            }}
          >
            Public info
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          id="Modal.Body"
          style={{
            padding: "10px",
            display: "flex",
            overflowY: "auto",
          }}
        >
          <div className="mainEditProfile">
            {user?.map((ele, i) => {
              return (
                <>
                  <img
                    key={i}
                    className="imgEditProfile"
                    alt=""
                    src={data_user.image}
                  />
                  <div>
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload image
                      <VisuallyHiddenInput
                        type="file"
                        onChange={(e) => {
                          handleImageJamal(e);
                          // console.log(e.target.value);
                        }}
                      />
                    </Button>
                  </div>
                  <textarea
                    value={data_user.bio}
                    id="w3review"
                    name="w3review"
                    rows="4"
                    cols="50"
                    // placeholder={ele.bio}
                    onChange={(e) => {
                      set_data_user({ ...data_user, bio: e.target.value });
                    }}
                  ></textarea>

                  <button
                    id="btn2"
                    onClick={async () => {
                      try {
                        const result = await axios.put(
                          `http://localhost:5000/users/update`,
                          {
                            bio: data_user.bio,
                            profile_picture_url: data_user.image,
                          },
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        );

                        const newProfileInfo_X = profileInfo.map(
                          (elm, index) => {
                            elm.profile_picture_url = data_user.image;
                            return elm;
                          }
                        );
                        setProfileInfo(newProfileInfo_X);
                        Swal.fire({
                          position: "center",
                          icon: "success",
                          title: "Successfully changed",
                          showConfirmButton: false,
                          timer: 1000,
                        });
                        const edit = profileInfo.map((ele) => {
                          ele.bio = data_user.bio;
                          return ele;
                        });
                        setProfileInfo(edit);
                        handleCloseEditProfile();
                      } catch (error) {
                        console.log("error from update profile bio", error);
                      }
                    }}
                  >
                    SAVE CHANGE
                  </button>
                </>
              );
            })}
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={showReporting}
        onHide={handleClosereporting}
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
              paddingBottom: "10px",
              borderBottom: "1px solid #808080",
            }}
          >
            Reason of Reporting
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          id="Modal.Body"
          style={{
            padding: "10px",
            display: "flex",
            overflowY: "auto",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" ,justifyContent:"center" , alignItems:"center"}}>
            <textarea
              id="w3review"
              name="w3review"
              rows="4"
              cols="50"
              placeholder="The Reason of Reporting"
              onChange={(e) => {
                setReport({ ...report, reporting: e.target.value });
              }}
            ></textarea>
            <button
              id="btn2"
              onClick={async () => {
                try {
                  const result = await axios.put(
                    `http://localhost:5000/users/update/report/${searchQuery2}`,
                    {
                      report: report.reporting,
                    }
                  );
                  console.log(result);
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "repotting has been submit Successfully",
                    showConfirmButton: false,
                    timer: 1000,
                  });
                  handleClosereporting();
                } catch (error) {
                  console.log("error from reportinf", error);
                }
              }}
            >
              Reporting
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Profile;
