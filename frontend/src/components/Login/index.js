import React from 'react';
import { Container, Row, Col, Card, Form, Button, InputGroup } from 'react-bootstrap';

function LoginPage() {
  return (
    <section className="bg-light p-3 p-md-4 p-xl-5">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} xxl={11}>
            <Card className="border-light-subtle shadow-sm">
              <Row className="g-0">
                <Col xs={12} md={6}>
                  <Card.Img className="img-fluid rounded-start w-100 h-100 object-fit-cover" loading="lazy" src="https://res.cloudinary.com/dalwd5c23/image/upload/v1705177930/samples/man-on-a-street.jpg" />
                </Col>
                <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                  <Col xs={12} lg={11} xl={10}>
                    <Card.Body className="p-3 p-md-4 p-xl-5">
                      <Row>
                        <Col xs={12}>
                          <div className="mb-5">
                            <div className="text-center mb-4">
                              <a href="#!">
                                <img src="./assets/img/bsb-logo.svg" alt="BootstrapBrain Logo" width="175" height="57" />
                              </a>
                            </div>
                            <h4 className="text-center">Welcome back you've been missed!</h4>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12}>
                          <div className="d-flex gap-3 flex-column">
                            <Button href="#!" className="btn btn-lg btn-outline-dark">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                              </svg>
                              <span className="ms-2 fs-6">Log in with Google</span>
                            </Button>
                          </div>
                          <p className="text-center mt-4 mb-5">Or sign in with</p>
                        </Col>
                      </Row>
                      <Form action="#!">
                        <Row className="gy-3 overflow-hidden">
                          <Col xs={12}>
                            <Form.Floating className="mb-3">
                              <Form.Control type="email" name="email" id="email" placeholder="name@example.com" required />
                              <label htmlFor="email">Email</label>
                            </Form.Floating>
                          </Col>
                          <Col xs={12}>
                            <Form.Floating className="mb-3">
                              <Form.Control type="password" name="password" id="password" placeholder="Password" required />
                              <label htmlFor="password">Password</label>
                            </Form.Floating>
                          </Col>
        
                          <Col xs={12}>
                            <div className="d-grid">
                              <Button variant="dark" size="lg" type="submit">Log in now</Button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                      <Row>
                        <Col xs={12}>
                          <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center mt-5">
                            <a href="#!" className="link-secondary text-decoration-none">Create new account</a>
                            <a href="#!" className="link-secondary text-decoration-none">Forgot password</a>
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
