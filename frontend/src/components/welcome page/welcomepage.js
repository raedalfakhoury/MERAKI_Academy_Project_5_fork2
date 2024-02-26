import React, { useRef } from "react";
import NavBar from "../Navbar/Navbar";
import welcomepage from "../welcome page/welcomepage.css";
import { useNavigate } from "react-router-dom";

import {
  Carousel,
  Card,
  Container,
  Row,
  Col,
  Button,
  Nav,
  FormControl,
  Navbar,
  Spinner,
  Form,
} from "react-bootstrap";

function FeaturedSection() {
  return (
    <Container className="px-4 py-5" id="featured-3">
      <h2 className="pb-2 border-bottom" style={{ textAlign: "left" }}>
        TALAQI Happy Hangout: Share Smiles and Stories{" "}
      </h2>
      <Row className="g-4 py-5 row-cols-1 row-cols-lg-3">
        <Col>
          <Card className="feature d-flex flex-column h-100">
            <div className="feature-icon bg-primary bg-gradient">
              <svg
                className="bi"
                width="1em"
                height="1em"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <use xlinkHref="#collection" />
              </svg>
            </div>
            <Card.Body className="flex-grow-1">
              <Card.Title>Start Chats, Make Friends</Card.Title>
              <Card.Text>
                Say hello, share stories, and make new friends from all over!
                Dive into discussions, ask questions, or just share a smile.
                Let's make this space warm and welcoming for everyone!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="feature d-flex flex-column h-100">
            <div className="feature-icon bg-primary bg-gradient">
              <svg
                className="bi"
                width="1em"
                height="1em"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <use xlinkHref="#people-circle" />
              </svg>
            </div>
            <Card.Body className="flex-grow-1">
              <Card.Title>Get Talking, Stay Connected</Card.Title>
              <Card.Text>
                Jump into conversations, stay in touch, and keep the vibes
                positive! Whether it's a quick comment or a longer chat, let's
                keep the lines of communication open and the friendships strong!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="feature d-flex flex-column h-100">
            <div className="feature-icon bg-primary bg-gradient">
              <svg
                className="bi"
                width="1em"
                height="1em"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <use xlinkHref="#toggles2" />
              </svg>
            </div>
            <Card.Body className="flex-grow-1">
              <Card.Title>Stay Social</Card.Title>
              <Card.Text>
                Keep the conversation flowing and the friendships growing with
                our easy-to-use communication tools. Whether you're chatting
                one-on-one, joining group discussions, or sharing updates with
                your network, staying social has never been more fun!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

function AboutSection() {
  const redirect = useNavigate();
  const featuredRef = useRef(null);

  return (
    <div className="containers">
      <Container>
        <Row className="gx-lg-5 align-items-center mb-5">
          <Col
            lg={6}
            style={{ zIndex: 10, top: "60%", left: "30%" }}
            className="mb-5 mb-lg-0"
          >
            <img
              src="https://friendkit.cssninja.io/assets/img/illustrations/characters/friends.svg"
              alt=""
            />
          </Col>
          <Col lg={6} className="mb-5 mb-lg-0 position-relative">
            {" "}
            <h1
              className="my-5 display-2 fw-bold ls-tight"
              style={{ color: "hsl(218, 81%, 95%)" }}
            >
              The best offer <br />
              <span style={{ color: "hsl(218, 81%, 95%)" }}>
                for your business
              </span>
            </h1>
            <p
              className="mb-4 opacity-70"
              style={{ color: "hsl(218, 81%, 85%)" }}
            >
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Temporibus, expedita iusto veniam atque, magni tempora mollitia
              dolorum consequatur nulla, neque debitis eos reprehenderit quasi
              ab ipsum nisi dolorem modi. Quos?
            </p>
            <Button
              href="#landing-start"
              variant="light"
              className="waves-effect waves-light"
              onClick={() => {}}
            >
              Get Started
            </Button>{" "}
            <Button variant="light" className="waves-effect waves-light ">
              Take a Tour
            </Button>{" "}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

function WelcomeSection() {
  return (
    <div className="about-section text-center bg-light py-5" id="landing-start">
      <Container>
        <h1
          className="display-4 mb-4"
          style={{ fontFamily: "Montserrat, sans-serif", color: "#293241" }}
        >
          Welcome To Our Community
        </h1>
        <p
          className="lead"
          style={{
            fontFamily: "Open Sans, sans-serif",
            color: "#455a64",
            padding: "20px",
            textAlign: "left",
          }}
        >
          Welcome to TALAQI, your ultimate social destination where connections
          flourish and communities come alive! Dive into a world where every
          interaction is an opportunity to connect with friends, family, and
          like-minded individuals from across the globe. Here, we're all about
          fostering meaningful relationships and creating memories that last a
          lifetime.
        </p>
        <p
          className="lead"
          style={{
            fontFamily: "Open Sans, sans-serif",
            color: "#455a64",
            padding: "20px",
            textAlign: "left",
          }}
        >
          Join us as we embark on a journey of discovery and camaraderie, where
          every like, comment, and share brings us closer together. Whether
          you're here to network, socialize, or simply unwind after a long day,
          ConnectHub is your virtual home away from home. So come on in, make
          yourself comfortable, and let the connections begin! Welcome to
          ConnectHub – where connections thrive, and the possibilities are
          endless!
        </p>
      </Container>
    </div>
  );
}

class WelcomePage extends React.Component {
  render() {
    return (
      <div>
        <style>
          {`
        
          
          .containers {
            position: relative;
            height: 100%;

            width: 100%;
            height: 100vh;

            background : linear-gradient(to left bottom, #659BDC 60%, #ffff 10%)
          }
          
          .split {
            position: absolute;
            width: 50%;
            height: 100%;
          }
          
        
          
          .centered {
            position: absolute;
            top: 60%;
            left: 25%;
            transform: translate(-50%, -50%);
            text-align: center;
            z-index: 0;
          }
          
          .centered img {
            
            width: 300px;
            border-radius: 50%;
          }
        `}
        </style>
        <NavBar />
        <AboutSection />
        <FeaturedSection />
        <WelcomeSection />
        {/* <div style={{ padding: "25px", margin: "25px" }}>
          <Carousel>
            <Carousel.Item>
              <img
                src="https://res.cloudinary.com/dalwd5c23/image/upload/v1705177932/samples/cup-on-a-table.jpg"
                alt="First slide"
                style={{
                  width: "100%",
                  height: "500px",
                  objectFit: "cover",
                }}
              />

              <Carousel.Caption style={{ color: "black" }}>
                <h3>Welcome to Our E-Learning Platform</h3>
                <p>Explore a world of knowledge and opportunities.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                src="https://res.cloudinary.com/dalwd5c23/image/upload/v1705520544/pexels-cottonbro-studio-3826678_c9cqau.jpg"
                alt="Second slide"
                style={{
                  width: "100%",
                  height: "500px",
                  objectFit: "cover",
                }}
              />

              <Carousel.Caption>
                <h3>Discover Inspiring Learning</h3>
                <p>
                  Embark on a journey of education with our diverse courses.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://res.cloudinary.com/dalwd5c23/image/upload/v1705192445/2_tjhssu.jpg"
                alt="Third slide"
                style={{
                  width: "30%",
                  height: "500px",
                  objectFit: "cover",
                  margin: "auto",
                }}
              />

              <Carousel.Caption>
                <h3>Unlock Your Potential</h3>
                <p>Discover new horizons and expand your skills with us.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div> */}

<Container className="px-4 py-5" style={{ textAlign: "left" }}>
  <h2 className="pb-2 border-bottom">
    Welcome to TALAQI!
  </h2>

  <Row className="row-cols-1 row-cols-md-2 align-items-md-center g-5 py-5">
    <Col className="d-flex flex-column align-items-start gap-2">
      <h2
        className="fw-bold text-primary"
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontSize: "2rem",
        }}
      >
        Connect, Share, Engage
      </h2>
      <p
        className="text-secondary"
        style={{
          fontFamily: "Open Sans, sans-serif",
          fontSize: "1.1rem",
        }}
      >
        Join our vibrant community where you can connect with friends, share your thoughts and experiences, and engage in meaningful conversations.
      </p>
      <Button href="#" variant="primary" size="lg">
        Start Your Journey
      </Button>
    </Col>

    <Col>
      <Row className="row-cols-1 row-cols-sm-2 g-4">
        <Col className="d-flex flex-column gap-2">
          <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-primary bg-gradient fs-4 rounded-3">
            <svg className="bi" width="1em" height="1em">
              <use xlinkHref="#collection"></use>
            </svg>
          </div>
          <h4
            className="fw-semibold mb-0 text-primary"
            style={{ fontSize: "1.2rem" }}
          >
            Explore Content
          </h4>
          <p className="text-secondary">
            Dive into a vast array of content ranging from posts, articles, videos, and more, curated just for you.
          </p>
        </Col>

        <Col className="d-flex flex-column gap-2">
          <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-primary bg-gradient fs-4 rounded-3">
            <svg className="bi" width="1em" height="1em">
              <use xlinkHref="#gear-fill"></use>
            </svg>
          </div>
          <h4
            className="fw-semibold mb-0 text-primary"
            style={{ fontSize: "1.2rem" }}
          >
            Customize Your Profile
          </h4>
          <p className="text-secondary">
            Personalize your profile with photos, bio, and interests to showcase your personality and connect with others who share your passions.
          </p>
        </Col>

        <Col className="d-flex flex-column gap-2">
          <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-primary bg-gradient fs-4 rounded-3">
            <svg className="bi" width="1em" height="1em">
              <use xlinkHref="#speedometer"></use>
            </svg>
          </div>
          <h4
            className="fw-semibold mb-0 text-primary"
            style={{ fontSize: "1.2rem" }}
          >
            Stay Updated
          </h4>
          <p className="text-secondary">
            Get real-time updates on new posts, comments, and messages so you never miss out on what's happening in your network.
          </p>
        </Col>

        <Col className="d-flex flex-column gap-2">
          <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-primary bg-gradient fs-4 rounded-3">
            <svg className="bi" width="1em" height="1em">
              <use xlinkHref="#table"></use>
            </svg>
          </div>
          <h4
            className="fw-semibold mb-0 text-primary"
            style={{ fontSize: "1.2rem" }}
          >
            Engage with Community
          </h4>
          <p className="text-secondary">
            Participate in discussions, like and comment on posts, and connect with other members of the TALAQI community.
          </p>
        </Col>
      </Row>
    </Col>
  </Row>
</Container>

      </div>
    );
  }
}

export default WelcomePage;
