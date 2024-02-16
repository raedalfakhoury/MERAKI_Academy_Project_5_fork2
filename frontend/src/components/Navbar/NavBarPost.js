import React, { useEffect, useState } from "react";
import {
  Badge,
  ButtonGroup,
  DropdownButton,
  Dropdown,
  Navbar,
  Container,
  Nav,
  Button,
  NavDropdown,
} from "react-bootstrap";
import "./style.css";

const NavBarPost = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    // <header
    //   style={{
    //     paddingTop: "5px",
    //     background: "#FFFF",
    //     color: "white",
    //     marginBottom: "20px",
    //   }}
    // >
    //   <Container>
    //     <Navbar className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
    //       <Navbar.Brand
    //         href="/Home"
    //         className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none"
    //       ></Navbar.Brand>

    //       {/* Heart Notifications  */}

    //       {/* Bill Notifications  */}
    //       <Nav className="col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
    //         <Nav.Link
    //           href="/Home"
    //         >
    //           <Button
    //             className="position-relative navbar"
    //             variant="light"
    //           >

    //             <Badge
    //               pill
    //               bg="danger"
    //               className="position-absolute top-0 start-100 translate-middle"
    //             >
    //               99+<span className="visually-hidden">unread messages</span>
    //             </Badge>
    //           </Button>
    //         </Nav.Link>
    //       </Nav>

    //     {/* Bill Notifications  */}
    //       <Nav className="col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
    //         <Nav.Link
    //           style={{ color: isHovered ? "red" : "black" }}
    //           href="/Home"
    //         >
    //           <Button
    //             className="position-relative"
    //             variant="light"
    //             onMouseEnter={handleMouseEnter}
    //             onMouseLeave={handleMouseLeave}
    //           >

    //             <Badge
    //               pill
    //               bg="danger"
    //               className="position-absolute top-0 start-100 translate-middle"
    //             >
    //               99+<span className="visually-hidden">unread messages</span>
    //             </Badge>
    //           </Button>
    //         </Nav.Link>
    //       </Nav>

    //     {/* Message Notifications  */}
    //       <Nav className="col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
    //         <Nav.Link
    //           style={{ color: isHovered ? "red" : "black" }}
    //           href="/Home"
    //         >
    //           <Button
    //             className="position-relative"
    //             variant="light"
    //             onMouseEnter={handleMouseEnter}
    //             onMouseLeave={handleMouseLeave}
    //           >
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               width="16"
    //               height="16"
    //               fill="currentColor"
    //               className="bi bi-heart"
    //               viewBox="0 0 16 16"
    //             >
    //               <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
    //             </svg>
    //             <Badge
    //               pill
    //               bg="danger"
    //               className="position-absolute top-0 start-100 translate-middle"
    //             >
    //               99+<span className="visually-hidden">unread messages</span>
    //             </Badge>
    //           </Button>
    //         </Nav.Link>
    //       </Nav>

    //       <Nav.Link style={{ color: "red" }} href="/users/aboutus">
    //         About Us
    //       </Nav.Link>
    //       <Nav.Link style={{ margin: "8px", color: "red" }} href="/users/login">
    //         Login
    //       </Nav.Link>
    //       <Button
    //         variant="outline-light"
    //         style={{ fontSize: "1rem" }}
    //         href="/users/register"
    //       >
    //         Register
    //       </Button>
    //     </Navbar>
    //   </Container>
    <header
      style={{
        paddingTop: "5px",
        background: "#FFFF",
        color: "blake",
        marginBottom: "20px",
      }}
    >
      <Navbar
        expand="lg"
        bg="light"
        variant="Secondary"
        style={{
          paddingTop: "5px",
          background: "#FFFF",
          color: "white",
          marginBottom: "20px",
        }}
      >
        <Container>
          <Navbar.Toggle aria-controls="navbarSupportedContent" />
          <Navbar.Brand href="#">
            <img
              src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
              height="15"
              alt="MDB Logo"
              loading="lazy"
            />
          </Navbar.Brand>
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="me-auto">
              {/* Heart Notifications */}
              <Nav className="col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <Nav.Link href="/Home">
                  <Button
                    className="position-relative border border-0"
                    variant="outline-danger"
                    border="none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-heart"
                    >
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                    </svg>

                    <Badge
                      pill
                      bg="danger"
                      className="position-absolute top-0 start-100 translate-middle"
                    >
                      99+
                      <span className="visually-hidden">unread messages</span>
                    </Badge>
                  </Button>
                </Nav.Link>
              </Nav>
              {/* Bill Notifications */}
              <Nav className="col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <Nav.Link href="/Home">
                  <Button
                    className="position-relative border border-0"
                    variant="outline-info"
                    border="none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="#ffff"
                      stroke="black"
                      stroke-width="1"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="feather feather-bell"
                    >
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                    <Badge
                      pill
                      bg="danger"
                      className="position-absolute top-0 start-100 translate-middle"
                    >
                      99+
                      <span className="visually-hidden">unread messages</span>
                    </Badge>
                  </Button>
                </Nav.Link>
              </Nav>{" "}
              {/* Message Notifications */}
              <Nav className="col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <Nav.Link href="/Home">
                  <Button
                    className="position-relative border border-0"
                    variant="outline-info"
                    border="none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="#ffff"
                      stroke="black"
                      stroke-width="1"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-mail"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <Badge
                      pill
                      bg="danger"
                      className="position-absolute top-0 start-100 translate-middle"
                    >
                      99+
                      <span className="visually-hidden">unread messages</span>
                    </Badge>
                  </Button>
                </Nav.Link>
              </Nav>{" "}
              {/* Cate Notifications */}
              <Nav className="col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <Nav.Link href="/Home">
                  <Button
                    className="position-relative border border-0"
                    variant="outline-info"
                    border="none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="#ffff"
                      stroke="black"
                      stroke-width="1"
                    //   stroke-linecap="butt"
                    //   stroke-linejoin="miter"
                      class="feather feather-message-square"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <Badge
                      pill
                      bg="info"
                      className="position-absolute top-0 start-100 translate-middle"
                    >
                      99+
                      <span className="visually-hidden">unread messages</span>
                    </Badge>
                  </Button>
                </Nav.Link>
              </Nav>{" "}
              <Nav className="col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <Nav.Link href="/Home">
                  <Button
                    className="position-relative border border-0"
                    variant="outline-danger"
                    border="none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="#ffff"
                      stroke="black"
                      stroke-width="1"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-message-square"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <Badge
                      pill
                      bg="danger"
                      className="position-absolute top-0 start-100 translate-middle"
                    >
                      99+
                      <span className="visually-hidden">unread messages</span>
                    </Badge>
                  </Button>
                </Nav.Link>
              </Nav>{" "}
            </Nav>

            {/* Bill Notifications*/}
            <Nav className="align-items-center">
              <Nav.Link href="#">
                <i className="fas fa-shopping-cart"></i>
              </Nav.Link>
              <NavDropdown
                title={<i className="fas fa-bell"></i>}
                id="navbarDropdownMenuLink"
                align="end"
              >
                <NavDropdown.Item href="#">Some news</NavDropdown.Item>
                <NavDropdown.Item href="#">Another news</NavDropdown.Item>
                <NavDropdown.Item href="#">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title={
                  <img
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                    className="rounded-circle"
                    height="25"
                    alt="Black and White Portrait of a Man"
                    loading="lazy"
                  />
                }
                id="navbarDropdownMenuAvatar"
                align="end"
              >
                <NavDropdown.Item href="#">My profile</NavDropdown.Item>
                <NavDropdown.Item href="#">Settings</NavDropdown.Item>
                <NavDropdown.Item href="#">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavBarPost;
