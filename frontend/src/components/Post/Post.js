import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { FaRegComment } from "react-icons/fa";
import { setPosts, filter_like } from "../redux/reducers/Posts";
import { GiSelfLove } from "react-icons/gi";
import { BsSuitHeart } from "react-icons/bs";
import axios from "axios";

function Post() {
  const [tog, setTog] = useState(false);
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => {
    return {
      posts: state.posts.posts,
    };
  });

  // console.log(posts.like_count);
  const Like = (id) => {
    axios
      .post(
        `http://localhost:5000/likes/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozMCwibmFtZSI6Inh4IiwiaW1hZ2UiOiJodHRwczovL2ltYWdlcy5jdGZhc3NldHMubmV0L2g2Z29vOWd3MWhoNi8yc05adEZBV09kUDFsbVEzM1Z3Uk4zLzI0ZTk1M2I5MjBhOWNkMGZmMmUxZDU4Nzc0MmEyNDcyLzEtaW50cm8tcGhvdG8tZmluYWwuanBnP3c9MTIwMCZoPTk5MiZxPTcwJmZtPXdlYnAiLCJyb2xlIjoxLCJpc19kZWxldGVkIjowLCJpYXQiOjE3MDc4MjA1NTAsImV4cCI6MTcwNzg0MjE1MH0.00_V1BpyMLjrWj33dOMdU2oNN1IcjQjw2X-Pv0mYCCY`,
          },
        }
      )
      .then((result) => {
        console.log("true  like =>", result);
        axios
          .get(`http://localhost:5000/likes/${id}`, {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozMCwibmFtZSI6Inh4IiwiaW1hZ2UiOiJodHRwczovL2ltYWdlcy5jdGZhc3NldHMubmV0L2g2Z29vOWd3MWhoNi8yc05adEZBV09kUDFsbVEzM1Z3Uk4zLzI0ZTk1M2I5MjBhOWNkMGZmMmUxZDU4Nzc0MmEyNDcyLzEtaW50cm8tcGhvdG8tZmluYWwuanBnP3c9MTIwMCZoPTk5MiZxPTcwJmZtPXdlYnAiLCJyb2xlIjoxLCJpc19kZWxldGVkIjowLCJpYXQiOjE3MDc4MjA1NTAsImV4cCI6MTcwNzg0MjE1MH0.00_V1BpyMLjrWj33dOMdU2oNN1IcjQjw2X-Pv0mYCCY`,
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

  const [toggleLike, setToggleLike] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/post/1/getAllPostsMyFollower", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozMCwibmFtZSI6Inh4IiwiaW1hZ2UiOiJodHRwczovL2ltYWdlcy5jdGZhc3NldHMubmV0L2g2Z29vOWd3MWhoNi8yc05adEZBV09kUDFsbVEzM1Z3Uk4zLzI0ZTk1M2I5MjBhOWNkMGZmMmUxZDU4Nzc0MmEyNDcyLzEtaW50cm8tcGhvdG8tZmluYWwuanBnP3c9MTIwMCZoPTk5MiZxPTcwJmZtPXdlYnAiLCJyb2xlIjoxLCJpc19kZWxldGVkIjowLCJpYXQiOjE3MDc4MjA1NTAsImV4cCI6MTcwNzg0MjE1MH0.00_V1BpyMLjrWj33dOMdU2oNN1IcjQjw2X-Pv0mYCCY`,
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
                        console.log(e.target.value);
                      }}
                      id="publish"
                      class="textarea"
                      rows="3"
                      placeholder="Write something about you..."
                    ></textarea>
                  </div>
                </Col>
              </Row>
              <Col className="imageClod">
                <div class="imageClodx">
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
                    class="feather feather-camera"
                  >
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                  </svg>
                  <span>Media</span>
                  {/* <input id="feed-upload-input-2" type="file" accept=".png, .jpg, .jpeg .video" onChange={(e)=>{
                    console.log(e.target.value);
                  }}/> */}
                </div>
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
                      <p>{elm.content}</p>
                    </Row>
                    <Row>
                      {" "}
                      <Col style={{ position: "relative" }} xs={12}>
                        <Image
                          style={{ width: "100%", height: "50vh" }}
                          src={elm.media_url}
                          rounded
                        />
                        <FaRegComment
                          onClick={() => {}}
                          className="icn-comment"
                        />
                        <BsSuitHeart
                          onClick={(e) => {
                            setToggleLike(!toggleLike);
                            if (!toggleLike) {
                              Like(elm.id);

                              // e.target.style.backgroundColor = "#6ba4e9";
                            } else {
                              Like(elm.id);

                              // e.target.style.color = "#fff";
                              // e.target.style.backgroundColor = "red";
                            }
                          }}
                          className="icn-like"
                        />
                      </Col>
                    </Row>
                  </Row>
                  <Row className="card-footer-post">
                    <Col
                      xs={3}
                      style={{
                        display: "flex",
                        flexDirection: "row",

                        height: "60px",
                        minWidth: "100px",
                        paddingTop: "5px",
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
                    <Col xs={2}>
                      <span
                        class="usernameLap"
                        style={{
                          fontSize: "10px",
                          fontFamily: "cursive",
                          fontWeight: "bold",
                          marginLeft: "-40px",
                        }}
                      >
                        {elm.comments[0]?.commenter_name}{" "}
                        {elm.comments[0] && <span>and</span>}{" "}
                        {elm.comments[1]?.commenter_name}
                      </span>
                      {elm.comments[0] && (
                        <p style={{ marginLeft: "-40px" }} class="xx">
                          and {elm.comment_count} more comment this
                        </p>
                      )}
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
