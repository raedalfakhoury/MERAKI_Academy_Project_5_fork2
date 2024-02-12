import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

function Post() {
  return (
    <>
      <Container>
        <Container className="containerPosts">
          <Row>
            <Col
              className="navCreatePost"
              style={{padding:"0"}}
            >
              <Col className="box active">
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
                  src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  roundedCircle
                />
              </Col>
              <Col style={{ height: "10px" }} xs={9}>
                <span className="usernameLap">jamal azeez</span>
                <p className="xx">July 26 2018, 01:03pm</p>
              </Col>

              <Col xs={1} xd={2}>
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
            <Row className="bodyPost" style={{ justifyContent: "center" }}>
              <Row className="bodyPostImage">
                {" "}
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris in sapien eu mi tincidunt posuere at nec dui. Mauris
                  finibus lectus in mollis porta. Pellentesque rutrum
                  consectetur aliquet. Sed vel purus suscipit, condimentum orci
                  id, dignissim purus. In vitae facilisis nibh. Aliquam id erat
                  convallis, luctus mi eu, accumsan justo. Nullam interdum.
                </p>
              </Row>
              <Row>
                {" "}
                <Col xs={12}>
                  <Image
                    style={{ maxWidth: "100%", height: "100%" }}
                    src="https://images.unsplash.com/photo-1521575107034-e0fa0b594529?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    rounded
                  />
                </Col>
              </Row>
            </Row>
            <Row style={{ position: "relative" }} className="card-footer-post">
              <Col
                md={{ span: 1, offset: 0 }}
                xs={4}
                style={{
                  position: "absolute",
                  height: "2vw",
                  width: "180px",
                  paddingTop: "5px",
                }}
              >
                <Image
                  style={{
                    maxWidth: "100%",
                    height: "100%",
                    position: "absolute",
                    border: "solid 2px #fff",
                  }}
                  src="https://images.unsplash.com/photo-1521575107034-e0fa0b594529?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  roundedCircle
                />
                <Image
                  style={{
                    maxWidth: "100%",
                    height: "100%",
                    position: "absolute",
                    left: "25%",
                    border: "solid 2px #fff",
                  }}
                  src="https://images.unsplash.com/photo-1521575107034-e0fa0b594529?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  roundedCircle
                />
                <Image
                  style={{
                    maxWidth: "100%",
                    height: "100%",
                    position: "absolute",
                    left: "40%",
                    border: "solid 2px #fff",
                  }}
                  src="https://images.unsplash.com/photo-1521575107034-e0fa0b594529?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  roundedCircle
                />
                <Image
                  style={{
                    maxWidth: "100%",
                    height: "100%",
                    position: "absolute",
                    left: "55%",
                    border: "solid 2px #fff",
                  }}
                  src="https://images.unsplash.com/photo-1521575107034-e0fa0b594529?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  roundedCircle
                />
              </Col>
              <Col style={{ paddingLeft: "150px" }}>
                <span
                  class="usernameLap"
                  style={{
                    fontSize: "10px",
                    fontFamily: "cursive",
                    fontWeight: "bold",
                  }}
                >
                  jamal And sara
                </span>
                <p class="xx">and 23 more liked this</p>
              </Col>
              <Col style={{}}>dasdsa</Col>
            </Row>
          </Col>
        </Container>
      </Container>

      <br />
      <br />
      <br />
    </>
  );
}

export default Post;
