/* eslint-disable no-lone-blocks */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "../redux/store";
import authSlice, {
  setLogin,
  setUserId,
  setImageAndName,
} from "../redux/reducers/auth/index";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
function LoginPage() {
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [result, setUserResult] = useState("");
  const redirect = useNavigate();
  const [status, setStatus] = useState(false);
  const [variant, setVariant] = useState("success");
  const [showPass, setShowPass] = useState(true);
  const { token } = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });

  const loginWithGoogle = (data) => {
    const name = data.name;
    const password = data.sub;
    const email = data.email;

    axios
      .post("https://talaqi-platform.onrender.com/users/register", {
        username: name,
        email: email,
        password_hash: password,
      })
      .then((res) => {
        axios
          .post("https://talaqi-platform.onrender.com/users/login", {
            email: email,
            password: password,
          })
          .then((res) => {
            setStatus(true);
            console.log(res.data);
            setUserResult(res.data.massage);
            dispatch(setLogin(res.data.token));
            dispatch(setUserId(res.data.userId));
            dispatch(
              setImageAndName({ name: res.data.name, image: res.data.image })
            );
            redirect("/home");
          })
          .catch((err) => {
            console.log(err.response.data.massage);
            setUserResult(err.response.data.massage);
            setVariant("danger");
          });
      })
      .catch((err) => {
        if (
          err.response.data.message === "The email or username already exists"
        ) {
          axios
            .post("https://talaqi-platform.onrender.com/users/login", {
              email: email,
              password: password,
            })
            .then((res) => {
              setStatus(true);
              console.log(res.data);
              setUserResult(res.data.massage);
              dispatch(setLogin(res.data.token));
              dispatch(setUserId(res.data.userId));
              dispatch(
                setImageAndName({ name: res.data.name, image: res.data.image })
              );
              redirect("/home");
            })
            .catch((err) => {
              console.log(err.response.data.massage);
              setUserResult(err.response.data.massage);
              setVariant("danger");
            });
        } else {
          console.log(err);
        }
      });
  };

  return (
    <section className="bg-light p-3 p-md-4 p-xl-5">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} xxl={11}>
            <Card className="border-light-subtle shadow-sm">
              <Row className="g-0">
                <Col xs={12} md={6}>
                  <img
                    class="card-img"
                    src="https://friendkit.cssninja.io/assets/img/illustrations/characters/friends.svg"
                    style={{ width: "600px" }}
                  />
                </Col>
                <Col
                  xs={12}
                  md={6}
                  className="d-flex align-items-center justify-content-center"
                >
                  <Col xs={12} lg={11} xl={10}>
                    <Card.Body className="p-3 p-md-4 p-xl-5">
                      <Row>
                        <Col xs={12}>
                          <div className="mb-5">
                            <h4
                              style={{ fontFamily: "cursive" }}
                              className="text-center"
                            >
                              Welcome back you've been missed!
                            </h4>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12}>
                          <div className="d-flex gap-3 flex-column">
                            {/* <Button
                              href="#!"
                              className="btn btn-lg btn-outline-dark"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-google"
                                viewBox="0 0 16 16"
                              >
                                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                              </svg>
                              <span className="ms-2 fs-6">
                                Log in with Google
                              </span>
                            </Button> */}
                            <div
                              className="Container_Google_Login"
                              style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <GoogleLogin
                                onSuccess={(credentialResponse) => {
                                  const credentialResponseDecode = jwtDecode(
                                    credentialResponse.credential
                                  );

                                  loginWithGoogle(credentialResponseDecode);
                                }}
                                onError={() => {
                                  console.log("Login Failed");
                                }}
                              />
                            </div>
                          </div>
                          <p
                            style={{ fontFamily: "cursive" }}
                            className="text-center mt-4 mb-5"
                          >
                            Or sign in with
                          </p>
                        </Col>
                      </Row>
                      <Form action="#!">
                        <Row className="gy-3 overflow-hidden">
                          <Col xs={12}>
                            <Form.Floating className="mb-3">
                              <Form.Control
                                type="email"
                                name="email"
                                id="email"
                                placeholder="name@example.com"
                                required
                                onChange={(e) => {
                                  setUserEmail(e.target.value);
                                }}
                              />
                              <label htmlFor="email">Email</label>
                            </Form.Floating>
                          </Col>
                          <Col xs={12}>
                            <Form.Floating className="mb-3">
                              <Form.Control
                                style={{ position: "relative" }}
                                type={!showPass ? "url" : "password"}
                                name="password"
                                id="password"
                                placeholder="Password"
                                required
                                onChange={(e) => {
                                  setUserPassword(e.target.value);
                                }}
                              />
                              <label htmlFor="password">Password</label>
                              {showPass ? (
                                <FaRegEyeSlash
                                  style={{
                                    position: "absolute",
                                    top: "30%",
                                    right: "5",
                                  }}
                                  onClick={() => {
                                    setShowPass(!showPass);
                                  }}
                                />
                              ) : (
                                <FaRegEye
                                  style={{
                                    position: "absolute",
                                    top: "30%",
                                    right: "5",
                                  }}
                                  onClick={() => {
                                    setShowPass(!showPass);
                                  }}
                                />
                              )}
                            </Form.Floating>
                          </Col>
                          {/*  */}

                          <Col xs={12}>
                            <div className="d-grid">
                              <Button
                                style={{ backgroundColor: "rgb(46,70,130)" }}
                                onClick={() => {
                                  axios
                                    .post(
                                      "https://talaqi-platform.onrender.com/users/login",
                                      {
                                        email: userEmail,
                                        password: userPassword,
                                      }
                                    )
                                    .then((res) => {
                                      setStatus(true);
                                      console.log(res.data);
                                      setUserResult(res.data.massage);
                                      dispatch(setLogin(res.data.token));
                                      dispatch(setUserId(res.data.userId));
                                      dispatch(
                                        setImageAndName({
                                          name: res.data.name,
                                          image: res.data.image,
                                        })
                                      );

                                      {
                                        userEmail == "admin@gmail.com"
                                          ? redirect("/admin")
                                          : redirect("/home");
                                      }
                                    })
                                    .catch((err) => {
                                      console.log(err.response.data.massage);
                                      setUserResult(err.response.data.massage);
                                      setVariant("danger");
                                    });
                                }}
                              >
                                Sign in
                              </Button>
                              {status
                                ? result && (
                                    <Alert key={variant} variant={variant}>
                                      {result}
                                    </Alert>
                                  )
                                : result && (
                                    <Alert key={variant} variant={variant}>
                                      {result}
                                    </Alert>
                                  )}
                            </div>
                          </Col>
                        </Row>
                      </Form>
                      <Row>
                        <Col xs={12}>
                          <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center mt-5">
                            <a
                              style={{ fontWeight: "600" }}
                              href="register"
                              className="link-secondary text-decoration-none"
                            >
                              Create new account
                            </a>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Col>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default LoginPage;
