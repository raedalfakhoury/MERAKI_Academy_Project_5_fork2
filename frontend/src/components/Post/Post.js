/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { FaRegComment } from "react-icons/fa";
import {
  setPosts,
  filter_like,
  addPost,
  setCommentByPostId,
  addCommentByPostId,
  deletePost,
  deleteCommentByPostId,
  UpdatePost,
  UpdateCommentByPostId,
} from "../redux/reducers/Posts";
import savePostSlice, { addsavePost } from "../redux/reducers/savePost/index";

import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";
import { IoCameraOutline } from "react-icons/io5";

import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import Spinner from "react-bootstrap/Spinner";
// import Button from '@mui/material/Button';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
// import {FontAwesomeIcon } from "react-icons/fa"

import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";

import { motion } from "framer-motion";

import { BiSolidLike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
function Post() {
  const [Add_className, set_Add_className] = useState(true);

  const [LikeComments, setLikeComment] = useState([]);
  const [Count_like_Comment_number, setCount_like_Comment_number] = useState(
    []
  );
  const [all_user_like_post, set_all_user_like_post] = useState();

  const Count_like_Comment = (id) => {
    axios
      .get(`http://localhost:5000/LikeComments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        // console.log(result.data.result);
        setCount_like_Comment_number(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllIdLikeComments = () => {
    axios
      .get(`http://localhost:5000/LikeComments/2/xx`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setLikeComment(result.data.result);
        // console.log(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createLikeComment = (id) => {
    axios
      .post(
        `http://localhost:5000/LikeComments/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        console.log(result);
        getAllIdLikeComments();
        const InCre = Count_like_Comment_number.map((elm, index) => {
          if (elm.comment_id === id) {
            elm.like_count = elm.like_count * 1 + 1;
          }
          return elm;
        });
        setCount_like_Comment_number(InCre);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const removeLikeComments = (id) => {
    axios
      .delete(`http://localhost:5000/LikeComments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        getAllIdLikeComments();
        const DCre = Count_like_Comment_number.map((elm, index) => {
          if (elm.comment_id === id) {
            elm.like_count = elm.like_count * 1 - 1;
          }
          return elm;
        });
        setCount_like_Comment_number(DCre);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postSavedArray = useRef([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/post/allSavePost`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        result?.data?.result?.map((ele) => {
          return postSavedArray.current.push(ele.post_id);
        });
      })
      .catch((err) => {
        console.log("from get saved post", err);
      });
  }, []);

  const Navigate = useNavigate();
  const [showF, setShowF] = useState(false);

  const handleCloseF = () => setShowF(false);
  const handleShowF = () => setShowF(true);
  const [ToggleSava, setToggleSava] = useState(true);
  const [toggleLike, setToggleLike] = useState(false);
  const [inputAddComment, setInputAddComment] = useState("");
  const [togComment, setTogComment] = useState(false);
  // const [x, setX] = useState(false);
  const [IDPost, setIDPost] = useState("");
  const [image_url, setImage_url] = useState("");
  // const [image_url_update, setImage_url_update] = useState("");
  const [ContentPost, setContentPost] = useState("");
  const [ToggleSpinnerCloudInN, setToggleSpinnerCloudInN] = useState(false);
  const [ToggleSpinnerCloudInNUpdate, setToggleSpinnerCloudInUpdate] =
    useState(false);
  const [toggleUpdateComment, settToggleUpdateComment] = useState(false);
  const [ToggleUpdatePost, setToggleUpdatePost] = useState(false);
  const pr_key = "rllytlm7";
  const cloud_name = "dmmo3zzyc";
  const [video, setVideoUrl] = useState();
  const [inputUpdate, setInputUpdate] = useState({
    ID_post: "",
    content: "",
    image: "",
  });
  const [UpdateComment, setUpdateComment] = useState({
    id_post: "",
    id_comment: "",
    content: "",
  });
  // console.log(UpdateComment);

  const handleImageJamal = (e) => {
    setToggleSpinnerCloudInN(true);
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
        setImage_url(result.data.secure_url);
        setToggleSpinnerCloudInN(false);
        setVideoUrl("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleVideoS = (ee) => {
    setToggleSpinnerCloudInN(true);

    const file = ee.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", pr_key);

    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/video/upload`,
        formData
      )
      .then((result) => {
        console.log(result.data.url);
        setVideoUrl(result.data.url);
        setImage_url("");
        setToggleSpinnerCloudInN(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const [Action, setAction] = useState("");
  const handleFileUpdatePost = (e, Action) => {
    setInputUpdate({ ...inputUpdate, image: "" });
    setToggleSpinnerCloudInUpdate(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", pr_key);

    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/${Action}/upload`,
        formData
      )
      .then((result) => {
        setInputUpdate({ ...inputUpdate, image: result.data.secure_url });
        setToggleSpinnerCloudInUpdate(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const dispatch = useDispatch();

  const createNewPost = () => {
    axios
      .post(
        `http://localhost:5000/post/create`,
        { content: ContentPost, media_url: image_url || video },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        const dataPostMax = {
          ...result.data.result,
          like_count: "0",
          comment_count: "0",
          comments: [],
          profile_picture_url: image,
          username: name,
        };

        dispatch(addPost(dataPostMax));
        setImage_url("");
        setVideoUrl("");
        setContentPost("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Like = (id) => {
    axios
      .post(
        `http://localhost:5000/likes/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        axios
          .get(`http://localhost:5000/likes/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((result) => {
            dispatch(filter_like({ id: id, num: result.data.LikesCounter }));
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCommentsByPostId = (PostID) => {
    axios
      .get(`http://localhost:5000/comments/${PostID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(
          setCommentByPostId({ id: PostID, comments: result.data.result })
        );
        console.log(result);

        setIDPost("");
        setIDPost(PostID);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addComment = (id) => {
    axios
      .post(
        `http://localhost:5000/comments/${id}`,
        { content: inputAddComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        const { comment_id } = result.data.result;
        // console.log(result.data.result.comment_id);
        const dataCommentMax = {
          ...result.data.result,
          profile_picture_url: image,
          username: name,
        };
        dispatch(addCommentByPostId({ id: id, comment: dataCommentMax }));
        setInputAddComment("");

        console.log(Count_like_Comment_number);
        setCount_like_Comment_number([
          ...Count_like_Comment_number,
          { comment_id: comment_id, like_count: 0 },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deletedComment = (commentID, PostID) => {
    axios
      .delete(`http://localhost:5000/comments/${commentID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result);
        dispatch(
          deleteCommentByPostId({ commentID: commentID, postID: PostID })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePostById = (id) => {
    axios
      .delete(`http://localhost:5000/post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result);
        dispatch(deletePost(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/post/1/getAllPostsMyFollower", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(setPosts(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const { posts, token, userId, name, image } = useSelector((state) => {
    return {
      posts: state.posts.posts,
      userId: state.auth.userId,
      token: state.auth.token,
      name: state.auth.name,
      image: state.auth.image,
    };
  });
  const [open, setOpen] = useState(false);
  const [openCommentUpdate, setOpenCommentUpdate] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenUpComment = () => {
    setOpenCommentUpdate(true);
  };

  const handleCloseUpComment = () => {
    setOpenCommentUpdate(false);
  };

  const updatePostAPI = () => {
    console.log(inputUpdate);
    axios
      .put(
        `http://localhost:5000/post/update/${inputUpdate.ID_post}`,
        {
          content: inputUpdate.content,
          media_url: inputUpdate.image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        console.log(result);
        dispatch(UpdatePost(inputUpdate));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateCommentAPI = () => {
    axios
      .put(
        `http://localhost:5000/comments/${UpdateComment.id_comment}`,
        {
          comment: UpdateComment.content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        console.log(result);
        dispatch(UpdateCommentByPostId(UpdateComment));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllUserLikedPost = (id) => {
    axios
      .get(`http://localhost:5000/likes/AllLikeByPost/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        set_all_user_like_post(result.data.result);
        console.log(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // localhost:5000/likes/AllLikeByPost/43
  // GetAllLikesByPostID(elm.id)
  return (
    <>
      {/* <NavBarPost /> */}
      <Container
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <Container className="containerPosts">
          <Row>
            <Col className="navCreatePost" style={{ padding: "0" }}>
              <Col
                className={Add_className ? "box active" : "box"}
                onClick={() => {
                  set_Add_className(true);
                }}
              >
                <span class="icon is-small">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-edit-3"
                  >
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                  Publish
                </span>
              </Col>

              <Col
                className={!Add_className ? "box active" : "box "}
                onClick={() => {
                  set_Add_className(false);
                }}
              >
                <label
                  style={{ position: "relative", cursor: "pointer" }}
                  class="file-label"
                >
                  {" "}
                  <span style={{ cursor: "pointer" }}> video</span>
                  <input
                    style={{
                      width: "170px",
                      height: "2.5vw",
                      position: "absolute",
                      left: "-150%",
                      top: "-50%",
                      opacity: "0",
                      // backgroundColor: "red",
                      cursor: "pointer",
                      zIndex: "1",
                    }}
                    // class="input-file"
                    id="video"
                    onChange={(e) => {
                      handleVideoS(e);
                    }}
                    type="file"
                  ></input>
                </label>
                <span style={{ cursor: "pointer" }} class="icon is-small">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-video"
                  >
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect
                      x="1"
                      y="5"
                      width="15"
                      height="14"
                      rx="2"
                      ry="2"
                    ></rect>
                  </svg>
                </span>{" "}
              </Col>
            </Col>
          </Row>
          <Row>
            <Col className="contentCreatePostAnd">
              <Row className="contentCreatePost">
                <Col
                  md={2}
                  xs={6}
                  style={{ maxHeight: "40px", maxWidth: "70px" }}
                >
                  <Stack direction="row" spacing={2}>
                    <Avatar
                      style={{ cursor: "pointer" }}
                      alt="Remy Sharp"
                      src={image}
                    />
                  </Stack>
                </Col>

                <Col>
                  <div class="controlCreateText">
                    <textarea
                      value={ContentPost}
                      onChange={(e) => {
                        setContentPost(e.target.value);
                      }}
                      id="publish"
                      class="textarea"
                      rows="3"
                      placeholder="Write something about you..."
                    ></textarea>
                  </div>
                  {ToggleSpinnerCloudInN && (
                    <Spinner animation="border" variant="secondary" />
                  )}
                  {image_url && (
                    <Image
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "10px",
                      }}
                      src={image_url}
                    />
                  )}

                  {video && (
                    <video
                      controls
                      muted
                      autoPlay
                      // loop
                      className="imagePosts"
                      style={{
                        width: "70%",
                        height: "20vh",
                        borderRadius: "10px",
                        border: "solid 1px #e8e8e8",
                        cursor: "pointer",
                      }}
                      src={video}
                      rounded
                    ></video>
                  )}
                </Col>
              </Row>

              <Col
                style={{ justifyContent: "space-between" }}
                className="imageClod"
              >
                <label class="file-label">
                  <input
                    style={{
                      width: "170px",
                      height: "2.5vw",
                      position: "absolute",
                      left: "-150%",
                      top: "-50%",
                      opacity: "0",
                      // backgroundColor: "red",
                      cursor: "pointer",
                      zIndex: "1",
                    }}
                    onChange={(e) => {
                      handleImageJamal(e);
                    }}
                    type="file"
                    // class="input-file"
                  />
                  <IoCameraOutline />
                  <span class="ic"> Media</span>
                </label>
                {image_url && (
                  <Button
                    onClick={() => {
                      createNewPost();
                    }}
                    style={{ marginLeft: "10px", borderRadius: "500px" }}
                    variant="primary"
                  >
                    publish
                  </Button>
                )}
                {video && (
                  <Button
                    onClick={() => {
                      createNewPost();
                    }}
                    style={{ marginLeft: "10px", borderRadius: "500px" }}
                    variant="primary"
                  >
                    publish
                  </Button>
                )}
              </Col>
            </Col>
          </Row>
        </Container>
        {/* =>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
        {posts?.map((elm, i) => {
          return (
            <>
              <Container className="containerPosts">
                <Col>
                  <Row className="postsUserNav">
                    {elm.is_loggedin ? (
                      <div
                        style={{ width: "70px", padding: "0px" }}
                        className="status"
                      >
                        <Image
                          onClick={() => {
                            Navigate({
                              pathname: "/profile",
                              search: `?prf=${elm.user_id}`,
                            });
                          }}
                          style={{
                            width: "50px",
                            height: "50px",
                            padding: "0px",
                            cursor: "pointer",
                          }}
                          src={elm.profile_picture_url}
                          alt="Remy Sharp"
                          roundedCircle
                        />

                        <span className="roundCircle"></span>
                      </div>
                    ) : (
                      <div className="statusOffline">
                        <Image
                          onClick={() => {
                            Navigate({
                              pathname: "/profile",
                              search: `?prf=${elm.user_id}`,
                            });
                          }}
                          style={{
                            width: "50px",
                            height: "50px",
                            padding: "0px",
                            cursor: "pointer",
                          }}
                          src={elm.profile_picture_url}
                          alt="Remy Sharp"
                          roundedCircle
                        />

                        <div className="greyCircle"></div>
                      </div>
                    )}
                    {/* </Col> */}

                    <Col style={{ height: "10px" }}>
                      <span className="usernameLap">{elm.username}</span>
                      <p className="xx">{elm.created_at.slice(0, 10)}</p>
                    </Col>
                    {elm.user_id === localStorage.getItem("userId") * 1 && (
                      <Dropdown xs={2} style={{ width: "20px" }}>
                        <Dropdown.Toggle
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            margin: "0px",
                            padding: "0px",
                            height: "0px",
                          }}
                        >
                          <Col className="navPostsDot">
                            <svg
                              style={{ cursor: "pointer" }}
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class="feather feather-more-vertical"
                            >
                              <circle cx="12" cy="12" r="1"></circle>
                              <circle cx="12" cy="5" r="1"></circle>
                              <circle cx="12" cy="19" r="1"></circle>
                            </svg>
                          </Col>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => {
                              handleClickOpen();
                              setInputUpdate({
                                ...inputUpdate,
                                content: elm.content,
                                image: elm.media_url,
                                ID_post: elm.id,
                              });
                            }}
                            href="#/action-1"
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              deletePostById(elm.id);
                              console.log(" delete post");
                            }}
                          >
                            delete post
                          </Dropdown.Item>
                          <Dropdown.Item href="#/action-3">Close</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </Row>

                  <Row
                    className="bodyPost"
                    style={{ justifyContent: "center" }}
                  >
                    <Row className="bodyPostImage">
                      {" "}
                      <p
                        style={{
                          margin: "5px",
                          fontWeight: "500",
                          color: "#000",
                          fontSize: "18px",
                          fontFamily:" revert-layer"
                        }}
                      >
                        {elm.content}
                      </p>
                    </Row>
                    <Row>
                      {" "}
                      <span
                        style={{
                          position: "relative",
                          margin: "0px",
                          padding: "0px",
                        }}
                      >
                        {elm.media_url.includes(".mp4") ? (
                          <video
                            controls
                            muted
                            autoPlay
                            loop
                            className="imagePosts"
                            style={{
                              width: "100%",
                              height: "50vh",
                              // borderRadius: "600px",
                              border: "solid 1px #e8e8e8",
                              cursor: "pointer",
                            }}
                            src={elm.media_url}
                            rounded
                          ></video>
                        ) : (
                          <Image
                            onDoubleClick={() => {
                              if (
                                localStorage.getItem(`${elm.id}`) * 1 !==
                                elm.id
                              ) {
                                setToggleLike(!toggleLike);

                                Like(elm.id);
                                localStorage.setItem(`${elm.id}`, `${elm.id}`);
                              } else {
                                setToggleLike(!toggleLike);

                                Like(elm.id);

                                localStorage.removeItem(`${elm.id}`);
                              }
                            }}
                            className="imagePosts"
                            style={{
                              width: "100%",
                              height: "50vh",
                              borderRadius: "600px",
                              border: "solid 1px #e8e8e8",
                              cursor: "pointer",
                            }}
                            src={elm.media_url}
                            rounded
                          />
                        )}

                        <FaRegComment
                          style={{
                            left: "76%",

                            color: "#000",
                          }}
                          onClick={() => {
                            setTogComment(!togComment);
                            if (IDPost === elm.id) {
                              setIDPost("");
                            } else {
                              getAllIdLikeComments();
                              Count_like_Comment(elm.id);
                              getCommentsByPostId(elm.id);
                            }
                          }}
                          className="containerss"
                        />

                        {!postSavedArray.current.includes(elm.id) ? (
                          <div
                            id="SavePost"
                            onClick={async () => {
                              try {
                                const res = await axios.put(
                                  `http://localhost:5000/post/save`,
                                  { post_id: elm.id },

                                  {
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                    },
                                  }
                                );
                                console.log("save");
                                setToggleSava(false);
                                console.log(elm);
                                console.log(res);
                                dispatch(addsavePost(elm));
                                postSavedArray.current.push(elm.id);
                              } catch (error) {
                                console.log("from save posts", error);
                              }
                            }}
                            class=" containerss"
                            style={{
                              left: "87%",

                              color: "#000",
                            }}
                          >
                            <FaRegBookmark />
                          </div>
                        ) : (
                          <div
                            id="UnSavePost"
                            onClick={async () => {
                              try {
                                const res = await axios.delete(
                                  `http://localhost:5000/post/delete/saved`,
                                  {
                                    data: { post_id: elm.id },
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                    },
                                  }
                                );
                                console.log(res);
                                console.log("unsave");
                                setToggleSava(true);
                                postSavedArray.current =
                                  postSavedArray.current.filter(
                                    (ele) => ele !== elm.id
                                  );
                              } catch (error) {
                                console.log(error);
                              }
                            }}
                            class=" containerss"
                            style={{
                              left: "87%",

                              color: "#000",
                            }}
                          >
                            <FaBookmark />
                          </div>
                        )}
                        {localStorage.getItem(`${elm.id}`) * 1 !== elm.id ? (
                          <motion.div
                            animate={{ x: 0, scale: 1 }}
                            initial={{ scale: 0, x: 210 }}
                          >
                            <svg
                              style={{ left: "98%" }}
                              onClick={() => {
                                setToggleLike(!toggleLike);

                                Like(elm.id);
                                localStorage.setItem(`${elm.id}`, `${elm.id}`);
                              }}
                              class=" containerss"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                            >
                              <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
                            </svg>
                          </motion.div>
                        ) : (
                          <>
                            <motion.div
                              animate={{ x: 0, scale: 1 }}
                              initial={{ scale: 0, x: 200 }}
                            >
                              <svg
                                style={{ backgroundColor: "red", left: "98%" }}
                                onClick={() => {
                                  setToggleLike(!toggleLike);

                                  Like(elm.id);

                                  localStorage.removeItem(`${elm.id}`);
                                }}
                                class=" containerss"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                              >
                                <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
                              </svg>
                            </motion.div>
                          </>
                        )}
                      </span>
                    </Row>
                  </Row>

                  <Row className="card-footer-post">
                    <Col
                      xs={5}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        padding: "0",
                        height: "60px",
                        minWidth: "100px",
                        paddingTop: "10px",
                        flexWrap: "nowrap",
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          height: "40px",
                          border: "solid 2px #fff",
                          width: "300px",
                          overflow: "hidden",
                        }}
                      >
                        {elm.comments?.map((elm, i) => {
                          return (
                            <>
                              <Image
                                style={{
                                  flex: 1,
                                  height: "40px",
                                  width: "40px",
                                  marginRight: "-5px",
                                  border: "solid 3px #fff",
                                }}
                                src={elm.commenter_profile_picture}
                                roundedCircle
                              />
                            </>
                          );
                        })}
                      </div>
                    </Col>

                    <Col className="comment-ic" style={{ paddingTop: "7px" }}>
                      {/* <FaRegComment className="num" />
                      <span className="num">{elm.comment_count}</span>
                      <GiSelfLove className="num" />
                      <span style={{ marginLeft: "10px" }} className="num">
                        {elm.like_count}
                      </span> */}

                      <span
                        onClick={() => {
                          handleShowF();
                          getAllUserLikedPost(elm.id);
                        }}
                        style={{
                          fontWeight: "bold",
                          fontSize: "12px",
                          cursor: "pointer",
                        }}
                      >
                        {" "}
                        {elm.like_count} likes
                      </span>
                    </Col>
                  </Row>
                </Col>
                {IDPost === elm.id && (
                  <>
                    <Container className="cont_comment_box">
                      <Row style={{ paddingBottom: "15px" }}>
                        <Col className="com-text">
                          comments ({elm.commentsByPostId.length})
                        </Col>

                        <Col></Col>
                        <CloseButton
                          className="CloseButton_x"
                          style={{ paddingRight: "10px" }}
                          onClick={() => {
                            setTogComment(!togComment);

                            setIDPost("");
                          }}
                        />
                      </Row>
                      {elm.commentsByPostId?.map((comment, index) => {
                        return (
                          <Container className="containerAllComment">
                            <Row className="commentsAll">
                              <Col
                                md={2}
                                xs={3}
                                style={{
                                  maxHeight: "100%",
                                  maxWidth: "70px",
                                  margin: "0px",
                                  display: "flex",
                                  paddingRight: "5px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Image
                                  onClick={() => {
                                    Navigate({
                                      pathname: "/profile",
                                      search: `?prf=${comment.user_id}`,
                                    });
                                  }}
                                  style={{
                                    width: "80%",
                                    height: "80%",
                                    cursor: "pointer",
                                  }}
                                  src={comment.profile_picture_url}
                                  alt="Remy Sharp"
                                  roundedCircle
                                />
                              </Col>
                              <Col style={{ paddingLeft: "3px" }}>
                                <span className="usernameLap">
                                  {comment.username}
                                </span>
                                <br />
                                <p className="xx">
                                  {comment.created_at.slice(0, 10)}
                                </p>
                              </Col>
                              <Col xs={1}>
                                {/* delete And Update comment for my comment */}
                                {comment.user_id * 1 === userId * 1 && (
                                  <Dropdown style={{ width: "20px" }}>
                                    <Dropdown.Toggle
                                      style={{
                                        backgroundColor: "transparent",
                                        border: "none",
                                        margin: "0px",
                                        padding: "0px",
                                        height: "0px",
                                      }}
                                    >
                                      <Col className="navPostsDot">
                                        <svg
                                          style={{ cursor: "pointer" }}
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="currentColor"
                                          stroke-width="2"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          class="feather feather-more-vertical"
                                        >
                                          <circle
                                            cx="12"
                                            cy="12"
                                            r="1"
                                          ></circle>
                                          <circle cx="12" cy="5" r="1"></circle>
                                          <circle
                                            cx="12"
                                            cy="19"
                                            r="1"
                                          ></circle>
                                        </svg>
                                      </Col>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                      <Dropdown.Item
                                        onClick={() => {
                                          handleClickOpenUpComment();
                                          setUpdateComment({
                                            ...UpdateComment,
                                            id_post: elm.id,
                                            id_comment: comment.comment_id,
                                            content: comment.content,
                                          });
                                        }}
                                      >
                                        Edit
                                      </Dropdown.Item>
                                      <Dropdown.Item
                                        onClick={() => {
                                          deletedComment(
                                            comment.comment_id,
                                            elm.id
                                          );
                                        }}
                                      >
                                        delete comment
                                      </Dropdown.Item>
                                      <Dropdown.Item href="#/action-3">
                                        Close
                                      </Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown>
                                )}
                                {/* delete comment for my post */}
                                {elm.user_id * 1 === userId * 1 &&
                                  comment.user_id * 1 !== userId * 1 && (
                                    <Dropdown style={{ width: "20px" }}>
                                      <Dropdown.Toggle
                                        style={{
                                          backgroundColor: "transparent",
                                          border: "none",
                                          margin: "0px",
                                          padding: "0px",
                                          height: "0px",
                                        }}
                                      >
                                        <Col className="navPostsDot">
                                          <svg
                                            style={{ cursor: "pointer" }}
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="feather feather-more-vertical"
                                          >
                                            <circle
                                              cx="12"
                                              cy="12"
                                              r="1"
                                            ></circle>
                                            <circle
                                              cx="12"
                                              cy="5"
                                              r="1"
                                            ></circle>
                                            <circle
                                              cx="12"
                                              cy="19"
                                              r="1"
                                            ></circle>
                                          </svg>
                                        </Col>
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item
                                          onClick={() => {
                                            deletedComment(
                                              comment.comment_id,
                                              elm.id
                                            );
                                          }}
                                        >
                                          delete comment
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">
                                          Close
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  )}
                              </Col>
                            </Row>

                            <Row>
                              <span
                                className="cont_comment_box_x"
                                style={{
                                  margin: "0",
                                  width: "490px",
                                }}
                              >
                                {comment.content}
                              </span>
                              <div
                                style={{
                                  display: "flex",
                                  gap: "5px",
                                  paddingLeft: "65px",
                                }}
                              >
                                {LikeComments?.find((elm, index) => {
                                  return elm.comment_id === comment.comment_id;
                                }) ? (
                                  <BiSolidLike
                                    style={{ cursor: "pointer", width: "20px" }}
                                    onClick={() => {
                                      removeLikeComments(comment.comment_id);
                                    }}
                                  />
                                ) : (
                                  <BiLike
                                    style={{ cursor: "pointer", width: "20px" }}
                                    onClick={() => {
                                      createLikeComment(comment.comment_id);
                                    }}
                                  />
                                )}
                                {Count_like_Comment_number?.map(
                                  (element, i) => {
                                    return (
                                      <>
                                        {element?.comment_id ===
                                          comment?.comment_id && (
                                          <span>{element.like_count || 0}</span>
                                        )}
                                      </>
                                    );
                                  }
                                )}
                              </div>
                              <span className="const_like">
                                <span className=" line"></span>
                              </span>
                            </Row>
                          </Container>
                        );
                      })}

                      <div>
                        <div class="mt-2">
                          <textarea
                            value={inputAddComment}
                            onChange={(e) => {
                              setInputAddComment(e.target.value);
                            }}
                            type="text"
                            name="inputname"
                            placeholder="Create Comment ..."
                          />
                          <Col style={{ position: "relative" }}>
                            <a
                              onClick={() => {
                                if (inputAddComment) {
                                  addComment(elm.id);
                                }
                              }}
                              class="button is-solid primary-button raised"
                            >
                              Post Comment
                            </a>
                          </Col>
                        </div>
                      </div>
                    </Container>
                  </>
                )}
              </Container>
            </>
          );
        })}
      </Container>
      {/* /* {updatePost}*/}

      <React.Fragment>
        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            {`Update Post `} <MdOutlineTipsAndUpdates />
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <textarea
                value={inputUpdate.content}
                onChange={(e) => {
                  setInputUpdate({ ...inputUpdate, content: e.target.value });
                  setToggleUpdatePost(true);
                }}
              />
              <div className="updateImage">
                {inputUpdate.image !== "" &&
                !inputUpdate.image.includes(".mp4") ? (
                  <img
                    alt=""
                    style={{ width: "120px", height: "120px" }}
                    src={inputUpdate.image}
                  ></img>
                ) : (
                  <video
                    style={{ width: "120px", height: "120px" }}
                    src={inputUpdate.image}
                  ></video>
                )}
                {ToggleSpinnerCloudInNUpdate && (
                  <div
                    style={{
                      width: "120px",
                      height: "120px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Spinner animation="border" variant="secondary" />
                  </div>
                )}
                <div
                  style={{
                    width: "120px",
                    height: "120px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {" "}
                  <h4
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    <FaLongArrowAltLeft />
                    <FaLongArrowAltLeft />
                    <FaLongArrowAltLeft />
                  </h4>
                </div>

                <label class="file-label">
                  <input
                    onChange={(e) => {
                      if (e.target.files[0].type === "video/mp4") {
                        handleFileUpdatePost(e, "video");
                        setToggleUpdatePost(true);
                      } else {
                        handleFileUpdatePost(e, "image");
                        setToggleUpdatePost(true);
                      }
                    }}
                    type="file"
                    class="input-file"
                  />
                  <IoCameraOutline />
                  <span class="ic"> Media</span>
                </label>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {ToggleUpdatePost && (
              <Button
                onClick={() => {
                  handleClose();
                  updatePostAPI();
                  setToggleUpdatePost(false);
                }}
              >
                Update
              </Button>
            )}
            <Button
              onClick={() => {
                handleClose();
                setToggleUpdatePost(false);
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
      {/* /* {updateComment}*/}
      <React.Fragment>
        <Dialog
          open={openCommentUpdate}
          keepMounted
          onClose={handleCloseUpComment}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle style={{ width: "1000px" }}>
            {`Update Comment `} <MdOutlineTipsAndUpdates />
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <textarea
                value={UpdateComment.content}
                onChange={(e) => {
                  setUpdateComment({
                    ...UpdateComment,
                    content: e.target.value,
                  });

                  settToggleUpdateComment(true);
                }}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {toggleUpdateComment && (
              <Button
                onClick={() => {
                  settToggleUpdateComment(false);
                  handleCloseUpComment();
                  updateCommentAPI();
                }}
              >
                Update
              </Button>
            )}
            <Button
              onClick={() => {
                settToggleUpdateComment(false);
                handleCloseUpComment();
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
      {/* {all user Likes post} */}

      {/* <Button variant="primary" onClick={handleShowF}>
        Launch demo modal
      </Button> */}

      <Modal style={{ top: "30%" }} show={showF} onHide={handleCloseF}>
        <Modal.Header closeButton>
          <Modal.Title>Likes ({all_user_like_post?.length})</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row style={{ gap: "10px" }}>
              {all_user_like_post?.map((elm, i) => {
                return (
                  <>
                    <Stack direction="row" spacing={2}>
                      <Avatar
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          Navigate({
                            pathname: "/profile",
                            search: `?prf=${elm.id}`,
                          });
                        }}
                        alt="Remy Sharp"
                        src={elm.profile_picture_url}
                      />
                      <Col style={{ display: "flex", alignItems: "center" }}>
                        {elm.username}
                      </Col>
                    </Stack>
                  </>
                );
              })}
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <br />
      <br />
      <div></div>
      <br />
    </>
  );
}

export default Post;
