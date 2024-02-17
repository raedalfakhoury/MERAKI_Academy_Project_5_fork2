/* eslint-disable eqeqeq */
import React, {
  useEffect,
  useState,
  forwardRef,
  ReactElement,
  Ref,
} from "react";

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
} from "../redux/reducers/Posts";
import { GiSelfLove } from "react-icons/gi";
import axios from "axios";
import { Button } from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";
import { IoCameraOutline } from "react-icons/io5";

import { FcLike } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

import Spinner from "react-bootstrap/Spinner";
// import Button from '@mui/material/Button';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { MdOutlineTipsAndUpdates } from "react-icons/md";

function Post() {
  const Navigate = useNavigate();

  const [toggleLike, setToggleLike] = useState(false);
  const [inputAddComment, setInputAddComment] = useState("");
  const [togComment, setTogComment] = useState(false);
  const [x, setX] = useState(false);
  const [IDPost, setIDPost] = useState("");
  const [image_url, setImage_url] = useState("");
  const [image_url_update, setImage_url_update] = useState("");
  const [ContentPost, setContentPost] = useState("");
  const [ToggleSpinnerCloudInN, setToggleSpinnerCloudInN] = useState(false);
  const [ToggleSpinnerCloudInNUpdate, setToggleSpinnerCloudInUpdate] =
    useState(false);

  const pr_key = "rllytlm7";
  const cloud_name = "dmmo3zzyc";

  const [inputUpdate, setInputUpdate] = useState({
    ID_post: "",
    content: "",
    image: "",
  });

  const handleFile = (e) => {
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFileUpdatePost = (e) => {
    setInputUpdate({ ...inputUpdate, image: "" });
    setToggleSpinnerCloudInUpdate(true);
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
        { content: ContentPost, media_url: image_url },
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
        const dataCommentMax = {
          ...result.data.result,
          profile_picture_url: image,
          username: name,
        };
        dispatch(addCommentByPostId({ id: id, comment: dataCommentMax }));
        setInputAddComment("");
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
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(posts);

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
  return (
    <>
      <Container>
        <Container className="containerPosts">
          <Row>
            <Col className="navCreatePost" style={{ padding: "0" }}>
              <Col className="box">
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
              <Col className="box">
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
                    class="feather feather-image"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                  Albums
                </span>
              </Col>
              <Col className="box">
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
                Video
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
                  <Image
                    style={{ width: "100%", height: "100%" }}
                    src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    roundedCircle
                  />
                </Col>
                <Col>
                  <div class="controlCreateText">
                    <textarea
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
                </Col>
              </Row>

              <Col
                style={{ justifyContent: "space-between" }}
                className="imageClod"
              >
                <label class="file-label">
                  <input
                    onChange={(e) => {
                      handleFile(e);
                    }}
                    type="file"
                    class="input-file"
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
                    {/* <Col
                      style={{
                        maxHeight: "50px",
                        maxWidth: "50px",
                        display: "flex",
                        justifyContent: "space-around",
                        padding: "0px",
                      }}
 
                    >
                      <Image
                      
                        style={{ width: "100%", height: "100%" }}
                        src={elm.profile_picture_url}
                        roundedCircle
                      />
                    </Col>
 
                    > */}
                    {localStorage.getItem("userId") == elm.user_id ? (
                      <div className="status">
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
                          roundedCircle
                        />
                        
                        <div className="roundCircle"></div>
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
                        roundedCircle
                      />
                      
                      <div className="greyCircle"></div>
                    </div>
                    )}
                    {/* </Col> */}

                    <Col style={{ height: "10px" }}>
                      <span className="usernameLap">{elm.username}</span>
                      <p className="xx">{elm.created_at} pm</p>
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
                              // dataUpdatePost(elm.content, elm.media_url);
                            }}
                            href="#/action-1"
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              deletePostById(elm.id);
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
                      <p style={{ margin: "5px" }}>{elm.content}</p>
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
                        <Image
                          className="imagePosts"
                          style={{
                            width: "100%",
                            height: "50vh",
                            borderRadius: "600px",
                            border: "solid 1px #e8e8e8",
                          }}
                          src={elm.media_url}
                          rounded
                        />
                        <FaRegComment
                          onClick={() => {
                            setTogComment(!togComment);
                            if (IDPost === elm.id) {
                              setIDPost("");
                            } else {
                              getCommentsByPostId(elm.id);
                            }
                          }}
                          className="icn-comment"
                        />

                        {localStorage.getItem(`${elm.id}`) * 1 !== elm.id ? (
                          <FcLike
                            style={{ backgroundColor: "#fff" }}
                            onClick={(e) => {
                              setToggleLike(!toggleLike);

                              Like(elm.id);
                              localStorage.setItem(`${elm.id}`, `${elm.id}`);
                            }}
                            className="icn-like"
                          />
                        ) : (
                          <>
                            <div
                              onClick={(e) => {
                                setToggleLike(!toggleLike);

                                Like(elm.id);

                                localStorage.removeItem(`${elm.id}`);
                              }}
                              class="containerss"
                            >
                              <div class="preloader">
                                <span></span>
                                <span></span>
                                <span></span>
                              </div>
                              <div class="shadow"></div>
                            </div>
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
                      <FaRegComment className="num" />
                      <span className="num">{elm.comment_count}</span>
                      <GiSelfLove className="num" />
                      <span style={{ marginLeft: "10px" }} className="num">
                        {elm.like_count}
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
                                  style={{ width: "80%", height: "80%" }}
                                  src={comment.profile_picture_url}
                                  roundedCircle
                                />
                              </Col>
                              <Col style={{ paddingLeft: "3px" }}>
                                <span className="usernameLap">
                                  {comment.username}
                                </span>
                                <br />
                                <p className="xx">{comment.created_at}</p>
                              </Col>
                              <Col xs={1}>
                                {elm.user_id ===
                                  localStorage.getItem("userId") * 1 && (
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
                                      <Dropdown.Item href="#/action-1">
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
                              </Col>
                            </Row>

                            <Row>
                              <span
                                className="cont_comment_box_x"
                                style={{
                                  margin: "0",
                                  width: "500px",
                                }}
                              >
                                {comment.content}
                              </span>

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
                }}
              />
              <div className="updateImage">
                {inputUpdate.image !== "" && (
                  <img
                    style={{ width: "120px", height: "120px" }}
                    src={inputUpdate.image}
                  ></img>
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
                      handleFileUpdatePost(e);
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
            <Button
              onClick={() => {
                handleClose();
                updatePostAPI();
              }}
            >
              Update
            </Button>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
      <br />
      <br />
      <br />
    </>
  );
}

export default Post;
