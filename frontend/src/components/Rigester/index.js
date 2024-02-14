import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {Button,Form,Container,Row,Col} from "react-bootstrap";


export default function Rigester() {
  const [userLastName, setUserFirstName] = useState("");
  const [userFirstName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const [userAge, setUserAge] = useState(0);
  const [result, setUserResult] = useState("");
  const [status, setStatus] = useState(false);
  const redirect = useNavigate();

  return (
    <section className="background-radial-gradient overflow-hidden">
      <style>
        {`
          .background-radial-gradient {
            background-color: #3b5998; /* Facebook blue */
            background-image: radial-gradient(650px circle at 0% 0%,
                hsla(0, 0%, 100%, 0.1) 15%,
                hsla(0, 0%, 100%, 0) 80%),
              radial-gradient(1250px circle at 100% 100%,
                hsla(0, 0%, 100%, 0.1) 15%,
                hsla(0, 0%, 100%, 0) 80%);
          }
          
          #radius-shape-1 {
            height: 220px;
            width: 220px;
            top: -60px;
            left: -130px;
            background: radial-gradient(#44006b, #ad1fff);
            overflow: hidden;
          }
          #radius-shape-2 {
            border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;
            bottom: -60px;
            right: -110px;
            width: 300px;
            height: 300px;
            background: radial-gradient(#44006b, #ad1fff);
            overflow: hidden;
          }
          .bg-glass {
            background-color: hsla(0, 0%, 100%, 0.9) !important;
            backdrop-filter: saturate(200%) blur(25px);
          }

          .container {
            position: relative;
            width: 100%;
            height: 100vh;
          }
          
          .split {
            position: absolute;
            width: 50%;
            height: 100%;
          }
          
          .left {
            left: 0;
            background-color: #ffff;
          }
          
          .right {
            right: 0;
            background-color: red;
          }
          
          .centered {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
          }
          
          .centered img {
            width: 150px;
            border-radius: 50%;
          }
        `}
      </style>

      <Container className="px-4 py-5 px-md-5 text-center text-lg-start my-5">
        <Row className="gx-lg-5 align-items-center mb-5">
          <Col lg={6} style={{ zIndex: 10 }} className="mb-5 mb-lg-0">
            <h1
              className="my-5 display-5 fw-bold ls-tight"
              style={{ color: "hsl(218, 81%, 95%)" }}
            >
              The best offer <br />
              <span style={{ color: "hsl(218, 81%, 75%)" }}>
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
          </Col>

          <Col lg={6} className="mb-5 mb-lg-0 position-relative">
            <div
              id="radius-shape-1"
              className="position-absolute rounded-circle shadow-5-strong"
            ></div>
            <div
              id="radius-shape-2"
              className="position-absolute shadow-5-strong"
            ></div>

            <div className="card bg-glass">
              <div className="card-body px-4 py-5 px-md-5">
                <Form>
                  <Row>
                    <h2 className="mb-4" style={{ color: "black" }}>
                      Rigester
                    </h2>{" "}
                    {/* Added Login Label */}
                    <Col md={6} className="mb-4">
                      <Form.Group>
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="First Name"
                          onChange={(e) => {
                            setUserFirstName(e.target.value);
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-4">
                      <Form.Group>
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Last Name"
                          onChange={(e) => {
                            setUserLastName(e.target.value);
                          }}
                        />{" "}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      onChange={(e) => {
                        setUserEmail(e.target.value);
                      }}
                    />{" "}
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onChange={(e) => {
                        setUserPassword(e.target.value);
                      }}
                    />{" "}
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Check
                      type="checkbox"
                      id="form2Example33"
                      label="Subscribe to our newsletter"
                      defaultChecked
                    />
                  </Form.Group>

                  <Button
                  variant="outline-primary w-100"
                  id="Register_btn"
                  onClick={() => {
                    axios
                      .post("http://localhost:5000/users/register", {
                        username: `${userFirstName} ${userLastName}`,
                        email: userEmail,
                        password_hash: userPassword
                      })
                      .then((res) => {
                        setStatus(true)
                        setUserResult(res.data.message);
                        redirect("/users/login");

                      })
                      .catch((err) => {
                        setUserResult(err.response.data.message)
                      });
                  }}
                >
                  Register
                </Button>
                {status
              ? result && <div className="SuccessMessage">{result}</div>
              : result && <div className="ErrorMessage">{result}</div>}
                  <div className="text-center">
                    <p>or sign up with:</p>
                    <Button variant="link" className="btn-floating mx-1">
                      <i className="fab fa-facebook-f"></i>
                    </Button>

                    <Button variant="link" className="btn-floating mx-1">
                      <i className="fab fa-google"></i>
                    </Button>

                    <Button variant="link" className="btn-floating mx-1">
                      <i className="fab fa-twitter"></i>
                    </Button>

                    <Button variant="link" className="btn-floating mx-1">
                      <i className="fab fa-github"></i>
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
