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
            <Col className="navCreatePost">
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
                </span>
                Publish
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
                </span>
                Albums
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
          <Row>
            <Col>1 of 1</Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default Post;
