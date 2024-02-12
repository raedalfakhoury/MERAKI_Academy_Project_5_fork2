import React from "react";
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
  Form,
} from "react-bootstrap";

class WelcomePage extends React.Component {
  render() {
    return (
      <div>
        
        <div>


        <div className="view">
          <div className="mask rgba-gradient d-flex justify-content-center align-items-center">
            <Container>
              <Row>
                <Col md="6" className="white-text text-center text-md-left mt-xl-5 mb-5">
                  <h1 className="h1-responsive font-weight-bold mt-sm-5">Make purchases with our app</h1>
                  <hr className="hr-light" />
                  <h6 className="mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem repellendus quasi fuga nesciunt dolorum nulla magnam veniam sapiente, fugiat! Commodi sequi non animi ea dolor molestiae iste.</h6>
                  <Button variant="light" className="waves-effect waves-light">Download</Button>
                  <Button variant="outline-light" className="waves-effect waves-light">Learn more</Button>
                </Col>
                <Col md="6" xl="5" className="mt-xl-5">
                  <img src="https://mdbootstrap.com/img/Mockups/Transparent/Small/admin-new.png" alt="" className="img-fluid" />
                </Col>
              </Row>
            </Container>
          </div>
        </div>

        <main>
          <Container>
            <Row className="py-5">
              <Col md="12" className="text-center">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </Col>
            </Row>
          </Container>
        </main>
      </div>
        <div style={{ position: "relative", backgroundColor: "#3b5998" }}>
          {/* SVG Code */}
          <svg
            id="wave"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              transform: "rotate(180deg)",
              transition: "0.3s",
              zIndex: -1,
            }}
            viewBox="0 0 1440 490"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
                <stop stopColor="rgba(62, 71.914, 243, 1)" offset="0%"></stop>
                <stop stopColor="rgba(11, 65.697, 255, 1)" offset="100%"></stop>
              </linearGradient>
            </defs>
            <path
              style={{ transform: "translate(0, 0px)", opacity: 1 }}
              fill="url(#sw-gradient-0)"
              d="M0,49L60,57.2C120,65,240,82,360,98C480,114,600,131,720,179.7C840,229,960,310,1080,302.2C1200,294,1320,196,1440,138.8C1560,82,1680,65,1800,57.2C1920,49,2040,49,2160,73.5C2280,98,2400,147,2520,187.8C2640,229,2760,261,2880,245C3000,229,3120,163,3240,179.7C3360,196,3480,294,3600,294C3720,294,3840,196,3960,179.7C4080,163,4200,229,4320,261.3C4440,294,4560,294,4680,245C4800,196,4920,98,5040,81.7C5160,65,5280,131,5400,147C5520,163,5640,131,5760,114.3C5880,98,6000,98,6120,147C6240,196,6360,294,6480,343C6600,392,6720,392,6840,367.5C6960,343,7080,294,7200,294C7320,294,7440,343,7560,351.2C7680,359,7800,327,7920,277.7C8040,229,8160,163,8280,147C8400,131,8520,163,8580,179.7L8640,196L8640,490L8580,490C8520,490,8400,490,8280,490C8160,490,8040,490,7920,490C7800,490,7680,490,7560,490C7440,490,7320,490,7200,490C7080,490,6960,490,6840,490C6720,490,6600,490,6480,490C6360,490,6240,490,6120,490C6000,490,5880,490,5760,490C5640,490,5520,490,5400,490C5280,490,5160,490,5040,490C4920,490,4800,490,4680,490C4560,490,4440,490,4320,490C4200,490,4080,490,3960,490C3840,490,3720,490,3600,490C3480,490,3360,490,3240,490C3120,490,3000,490,2880,490C2760,490,2640,490,2520,490C2400,490,2280,490,2160,490C2040,490,1920,490,1800,490C1680,490,1560,490,1440,490C1320,490,1200,490,1080,490C960,490,840,490,720,490C600,490,480,490,360,490C240,490,120,490,60,490L0,490Z"
            ></path>
          </svg>
          {/* Image */}
          <img
            src="https://res.cloudinary.com/dalwd5c23/image/upload/v1705520544/pexels-cottonbro-studio-3826678_c9cqau.jpg"
            alt="Second slide"
            style={{
              width: "100%",
              height: "500px",
              objectFit: "cover",
            }}
          />
        </div>

        <svg
          viewBox="0 0 1503 200"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <path
            fill="rgba(47, 73, 94, 1)"
            d="M 0 0 C 384 0 384 502 768 502 L 768 502 L 768 0 L 0 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="rgba(47, 73, 94, 1)"
            d="M 767 502 C 1143 502 1143 0 1519 0 L 1519 0 L 1519 0 L 767 0 Z"
            strokeWidth="0"
          ></path>
        </svg>
        <div style={{ padding: "25px", margin: "25px" }}>
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
        </div>
        <div className="about-section text-center bg-light py-5">
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
              Welcome to [social media name], your ultimate social destination
              where connections flourish and communities come alive! Dive into a
              world where every interaction is an opportunity to connect with
              friends, family, and like-minded individuals from across the
              globe. Here, we're all about fostering meaningful relationships
              and creating memories that last a lifetime.
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
              Join us as we embark on a journey of discovery and camaraderie,
              where every like, comment, and share brings us closer together.
              Whether you're here to network, socialize, or simply unwind after
              a long day, ConnectHub is your virtual home away from home. So
              come on in, make yourself comfortable, and let the connections
              begin! Welcome to ConnectHub – where connections thrive, and the
              possibilities are endless!
            </p>
          </Container>
        </div>

        <Container className="px-4 py-5" id="featured-3">
          <h2 className="pb-2 border-bottom" style={{ textAlign: "left" }}>
            Discover Our Featured Courses
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
                  <Card.Title>
                    Elevate Your Skills in Digital Marketing
                  </Card.Title>
                  <Card.Text>
                    Embark on a transformative journey in Marketing and Business
                    with our dynamic courses designed to enhance your digital
                    marketing skills and strategic thinking.
                  </Card.Text>
                  <a href="#" className="icon-link">
                    Explore Courses
                    <svg
                      className="bi"
                      width="1em"
                      height="1em"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                    >
                      <use xlinkHref="#chevron-right" />
                    </svg>
                  </a>
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
                  <Card.Title>Master Personal Finance and Economics</Card.Title>
                  <Card.Text>
                    Take control of your financial future with our engaging
                    courses in Personal Finance and Economics, providing
                    essential knowledge for financial independence.
                  </Card.Text>
                  <a href="#" className="icon-link">
                    Discover Courses
                    <svg
                      className="bi"
                      width="1em"
                      height="1em"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                    >
                      <use xlinkHref="#chevron-right" />
                    </svg>
                  </a>
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
                  <Card.Title>
                    Unleash Your Creativity with Arts and Photography
                  </Card.Title>
                  <Card.Text>
                    Dive into a world of creativity with our Arts and
                    Photography courses, where every brushstroke, click of the
                    camera, or digital creation becomes a unique masterpiece.
                  </Card.Text>
                  <a href="#" className="icon-link">
                    Start Learning
                    <svg
                      className="bi"
                      width="1em"
                      height="1em"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                    >
                      <use xlinkHref="#chevron-right" />
                    </svg>
                  </a>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <Container className="px-4 py-5" style={{ textAlign: "left" }}>
          <h2 className="pb-2 border-bottom">
            Unleash Your Learning Experience
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
                Unlocking Limitless Potential
              </h2>
              <p
                className="text-secondary"
                style={{
                  fontFamily: "Open Sans, sans-serif",
                  fontSize: "1.1rem",
                }}
              >
                Embark on a learning journey with features designed to elevate
                your experience. Our commitment to excellence ensures a seamless
                exploration of knowledge and skills.
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
                    Diverse Content
                  </h4>
                  <p className="text-secondary">
                    Explore a rich collection of courses covering a wide range
                    of subjects. From technology to arts, we have curated
                    content to spark your curiosity.
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
                    Interactive Learning
                  </h4>
                  <p className="text-secondary">
                    Engage in interactive learning experiences that go beyond
                    traditional methods. Our platform provides hands-on
                    activities and real-world applications.
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
                    Personalized Pace
                  </h4>
                  <p className="text-secondary">
                    Tailor your learning journey with our personalized pace
                    feature. Whether you prefer a quick sprint or a steady
                    marathon, we cater to your unique learning style.
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
                    Comprehensive Resources
                  </h4>
                  <p className="text-secondary">
                    Access a wealth of comprehensive resources, including study
                    materials, quizzes, and discussion forums. Our platform
                    ensures you have everything you need to succeed.
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <main>
          <h1 className="visually-hidden">Welcome to facebook</h1>

          <div className="bg-primary text-white px-4 py-5 text-start">
            <div className="py-5">
              <h1 className="display-5 fw-bold">Welcome to facebook</h1>
              <Col lg={6} className="mx-auto">
                <p className="fs-5 mb-4">
                  Quickly design and customize responsive mobile-first sites
                  with Bootstrap, the world’s most popular front-end open source
                  toolkit, featuring Sass variables and mixins, responsive grid
                  system, extensive prebuilt components, and powerful JavaScript
                  plugins.
                </p>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                  <Button
                    variant="outline-info"
                    size="lg"
                    className="px-4 me-sm-3 fw-bold"
                  >
                    Custom button
                  </Button>
                  <Button variant="outline-light" size="lg" className="px-4">
                    Secondary
                  </Button>
                </div>
              </Col>
            </div>
          </div>

          <div className="b-example-divider"></div>

          <Container className="px-4 pt-5 my-5 text-center border-bottom">
            <h1 className="display-4 fw-bold text-body-emphasis">
              Centered screenshot
            </h1>
            <Col lg={6} className="mx-auto">
              <p className="lead mb-4">
                Quickly design and customize responsive mobile-first sites with
                Bootstrap, the world’s most popular front-end open source
                toolkit, featuring Sass variables and mixins, responsive grid
                system, extensive prebuilt components, and powerful JavaScript
                plugins.
              </p>
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                <Button variant="primary" size="lg" className="px-4 me-sm-3">
                  Primary button
                </Button>
                <Button variant="outline-secondary" size="lg" className="px-4">
                  Secondary
                </Button>
              </div>
            </Col>
            <div className="overflow-hidden" style={{ maxHeight: "30vh" }}>
              <Container className="px-5">
                <img
                  src="bootstrap-docs.png"
                  className="img-fluid border rounded-3 shadow-lg mb-4"
                  alt="Example image"
                  width="700"
                  height="500"
                  loading="lazy"
                />
              </Container>
            </div>
          </Container>

          <div className="b-example-divider"></div>

          <Container className="col-xxl-8 px-4 py-5">
            <Row className="flex-lg-row-reverse align-items-center g-5 py-5">
              <Col lg={6}>
                <img
                  className="rounded-lg-3"
                  src="https://res.cloudinary.com/dalwd5c23/image/upload/v1705177935/cld-sample-2.jpg"
                  alt=""
                  width="720"
                />
              </Col>
              <Col lg={6}>
                <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
                  Responsive left-aligned hero with image
                </h1>
                <p className="lead">
                  Quickly design and customize responsive mobile-first sites
                  with Bootstrap, the world’s most popular front-end open source
                  toolkit, featuring Sass variables and mixins, responsive grid
                  system, extensive prebuilt components, and powerful JavaScript
                  plugins.
                </p>

                <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                  <Button variant="primary" size="lg" className="px-4 me-md-2">
                    Primary
                  </Button>

                  <Button
                    variant="outline-secondary"
                    size="lg"
                    className="px-4"
                  >
                    Default
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>

          <div className="b-example-divider"></div>

          <Container className="col-xl-10 col-xxl-8 px-4 py-5">
            <Row className="align-items-center g-lg-5 py-5">
              <Col lg={7} className="text-center text-lg-start">
                <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
                  Vertically centered hero sign-up form
                </h1>
                <p className="col-lg-10 fs-4">
                  Below is an example form built entirely with Bootstrap’s form
                  controls. Each required form group has a validation state that
                  can be triggered by attempting to submit the form without
                  completing it.
                </p>
              </Col>
              <Col md={10} className="mx-auto col-lg-5">
                <Form className="p-4 p-md-5 border rounded-3 bg-body-tertiary">
                  <Form.Group className="mb-3" controlId="floatingInput">
                    <Form.Control type="email" placeholder="name@example.com" />
                    <Form.Label>Email address</Form.Label>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="floatingPassword">
                    <Form.Control type="password" placeholder="Password" />
                    <Form.Label>Password</Form.Label>
                  </Form.Group>
                  <Form.Group className="checkbox mb-3">
                    <Form.Check type="checkbox" label="Remember me" />
                  </Form.Group>
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    className="w-100"
                  >
                    Sign up
                  </Button>
                  <hr className="my-4" />
                  <small className="text-body-secondary">
                    By clicking Sign up, you agree to the terms of use.
                  </small>
                </Form>
              </Col>
            </Row>
          </Container>

          <div className="b-example-divider"></div>

          <Container className="my-5">
            <Row className="p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
              <Col lg={7} className="p-3 p-lg-5 pt-lg-3">
                <h1 className="display-4 fw-bold lh-1 text-body-emphasis">
                  Border hero with cropped image and shadows
                </h1>
                <p className="lead">
                  Quickly design and customize responsive mobile-first sites
                  with Bootstrap, the world’s most popular front-end open source
                  toolkit, featuring Sass variables and mixins, responsive grid
                  system, extensive prebuilt components, and powerful JavaScript
                  plugins.
                </p>
                <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
                  <Button
                    variant="primary"
                    size="lg"
                    className="px-4 me-md-2 fw-bold"
                  >
                    Primary
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="lg"
                    className="px-4"
                  >
                    Default
                  </Button>
                </div>
              </Col>
              <Col lg={4} className="offset-lg-1 p-0 overflow-hidden shadow-lg">
                <img
                  className="rounded-lg-3"
                  src="https://res.cloudinary.com/dalwd5c23/image/upload/v1705177935/cld-sample-2.jpg"
                  alt=""
                  width="720"
                />
              </Col>
            </Row>
          </Container>

          <div className="b-example-divider"></div>

          <div className="b-example-divider mb-0"></div>
        </main>

        <div className="p-4 p-md-5 mb-4 rounded text-body-emphasis bg-body-secondary">
          <div className="col-lg-6 px-0">
            <h1 className="display-4 fst-italic">
              Title of a longer featured blog post
            </h1>
            <p className="lead my-3">
              Multiple lines of text that form the lede, informing new readers
              quickly and efficiently about what’s most interesting in this
              post’s contents.
            </p>
            <p className="lead mb-0">
              <a href="#" className="text-body-emphasis fw-bold">
                Continue reading...
              </a>
            </p>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-6">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <strong className="d-inline-block mb-2 text-primary-emphasis">
                  World
                </strong>
                <h3 className="mb-0">Featured post</h3>
                <div className="mb-1 text-body-secondary">Nov 12</div>
                <p className="card-text mb-auto">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content.
                </p>
                <a
                  href="#"
                  className="icon-link gap-1 icon-link-hover stretched-link"
                >
                  Continue reading
                  <svg className="bi">
                    <use xlinkHref="#chevron-right"></use>
                  </svg>
                </a>
              </div>
              <div className="col-auto d-none d-lg-block">
                <svg
                  className="bd-placeholder-img"
                  width="200"
                  height="250"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Placeholder: Thumbnail"
                  preserveAspectRatio="xMidYMid slice"
                  focusable="false"
                >
                  <title>Placeholder</title>
                  <rect width="100%" height="100%" fill="#55595c"></rect>
                  <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                    Thumbnail
                  </text>
                </svg>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <strong className="d-inline-block mb-2 text-success-emphasis">
                  Design
                </strong>
                <h3 className="mb-0">Post title</h3>
                <div className="mb-1 text-body-secondary">Nov 11</div>
                <p className="mb-auto">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content.
                </p>
                <a
                  href="#"
                  className="icon-link gap-1 icon-link-hover stretched-link"
                >
                  Continue reading
                  <svg className="bi">
                    <use xlinkHref="#chevron-right"></use>
                  </svg>
                </a>
              </div>
              <div className="col-auto d-none d-lg-block">
                <svg
                  className="bd-placeholder-img"
                  width="200"
                  height="250"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Placeholder: Thumbnail"
                  preserveAspectRatio="xMidYMid slice"
                  focusable="false"
                >
                  <title>Placeholder</title>
                  <rect width="100%" height="100%" fill="#55595c"></rect>
                  <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                    Thumbnail
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WelcomePage;
