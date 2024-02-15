import React, { useEffect, useState } from "react";
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
} from "../redux/reducers/Posts";
import { GiSelfLove } from "react-icons/gi";
import { BsSuitHeart } from "react-icons/bs";
import axios from "axios";
import { Button } from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";
import { IoCameraOutline } from "react-icons/io5";
import { AiOutlineLike } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi";
import { FcLike } from "react-icons/fc";
import { IoSend } from "react-icons/io5";
function Post() {
  const [toggleLike, setToggleLike] = useState(false);
  const [inputAddComment,setInputAddComment] = useState("")
  const [togComment, setTogComment] = useState(false);
  const [x, setX] = useState(false);
  const [IDPost, setIDPost] = useState("");
  const [image_url, setImage_url] = useState("");
  const [ContentPost, setContentPost] = useState("");
  const pr_key = "rllytlm7";
  const cloud_name = "dmmo3zzyc";

  const handleFile = (e) => {
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
        // console.log(result.data.secure_url);
        setImage_url(result.data.secure_url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const dispatch = useDispatch();

  // ! posts  data=>
  //  comment_count: "2"
  // comments: (2) [{…}, {…}]
  // content :"Creating a storyteller's circle where women share their joy, pain, and experience, the poems in this collection are lyrical vignettes"
  // created_at:"2024-02-10T16:55:56.635Z"
  // id:12
  // like_count:"2"
  // media_url: "https://thirdworldpress-us.imgix.net/covers/9780883782231.jpg?auto=format&w=300"
  // profile_picture_url:"https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914_640.png"
  // username":username"

  // ! ????????????
  // comment_count:"0"
  // comments:[]
  // like_count:"0"
  // profile_picture_url ?
  //username:username ?

  // ! create post data =>
  // content: ""
  // created_at: "2024-02-13T14:19:21.326Z"
  // id:25
  // is_deleted: 0
  // media_url:"https://res.cloudinary.com/dmmo3zzyc/image/upload/v1707844756/si581g2sj4iazi6cl1zb.png"
  // user_id:30

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
        console.log(result.data.result);
        // dispatch(addPost(result.data.result))
        setImage_url("");
        setContentPost("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log(posts.like_count);
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
        console.log("true  like =>", result);
        axios
          .get(`http://localhost:5000/likes/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((result) => {
            console.log("cunt =>>>>>>", result.data.LikesCounter);
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

        setIDPost("");
        setIDPost(PostID);

        // console.log(PostID)
        // console.log(result.data.result)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addComment = (id)=>{
    axios.post(`http://localhost:5000/comments/${id}`, {content:inputAddComment},{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((result)=>{
        console.log(result);
    }).catch((err)=>{
        console.log(err);
    })
  }




  useEffect(() => {
    axios
      .get("http://localhost:5000/post/1/getAllPostsMyFollower", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result.data.result);
        dispatch(setPosts(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);
  const { posts, token, userId } = useSelector((state) => {
    return {
      posts: state.posts.posts,
      userId: state.auth.userId,
      token: state.auth.token,
    };
  });
  console.log(posts);

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
                    <Col
                      md={2}
                      xs={6}
                      style={{ maxHeight: "40px", maxWidth: "70px" }}
                    >
                      <Image
                        style={{ width: "100%", height: "100%" }}
                        src={elm.profile_picture_url}
                        roundedCircle
                      />
                    </Col>
                    <Col style={{ height: "10px" }} xs={6}>
                      <span className="usernameLap">{elm.username}</span>
                      <p className="xx">{elm.created_at} pm</p>
                    </Col>

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
                         <Col className="com-text">comments ({elm.comment_count})</Col>
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
                                 xs={6}
                                 style={{
                                   maxHeight: "100%",
                                   maxWidth: "70px",
                                   margin:"0px",
                                   display:"flex",
                                   paddingRight:"5px",
                                   justifyContent:"center",
                                   alignItems:"center"
                                   
                                 }}
                               >
                                 <Image
                                   style={{ width: "80%", height: "80%"}}
                                   src={comment.profile_picture_url}
                                   roundedCircle
                                 />
                               </Col>
                               <Col style={{paddingLeft:"3px"}}>
                                 <span className="usernameLap">
                                   {comment.username}
                                 </span>
                                 <br />
                                 <p className="xx">{comment.created_at}</p>
                               </Col>
                             </Row>

                             <Row>
                               <span
                                 className="cont_comment_box_x"
                                 style={{
                                   margin: "0",
                                   width: "500px"
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
                           <input onChange={(e)=>{
                               setInputAddComment(e.target.value)
                           }}
                             style={{
                               width: "100%",
                               height: "8vh",
                               borderRadius: "10px",
                               borderColor: "#FF94",
                             }}
                             type="text"
                             name="inputname"
                             placeholder="Create Comment ..."
                             className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                           />
                           <Col style={{ position: "relative" }}>
                             <a  onClick={()=>{
                               if(inputAddComment ){

                                 addComment(elm.id)
                               }

                               
                             }} class="button is-solid primary-button raised">
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

      <br />
      <br />
      <br />
    </>
  );
}

export default Post;
