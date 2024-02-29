import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

const NavBar = () => {
  return (
    <header
      style={{ paddingTop: "5px", background: "#1D2F6D  ", color: "white" }}
    >
      <Container>
        <Navbar className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Navbar.Brand
            href="/Home"
            className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none"
          ></Navbar.Brand>

          <Nav className="col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
       
            <Nav.Link style={{ color: "white" }} href="#xs">
              About Us
            </Nav.Link>
          </Nav>

          <Nav.Link style={{ margin: "8px" }} href="/users/login">
            Login
          </Nav.Link>
          <Button
            variant="outline-light"
            style={{ fontSize: "1rem" }}
            href="/users/register"
          >
            Register
          </Button>
        </Navbar>
      </Container>
    </header>
  );
};

export default NavBar;
