import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
// import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Messages({ data, posts }) {
  const comber = useRef({});

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [all_message, set_all_message] = useState([]);
  const [data_user_for_sind, set_data_user_for_sind] = useState({});

  const [to_user, set_to_user] = useState("");

  const [data_message, setDate_message] = useState({
    message: "",
    to: "",
    from: data.id,
  });

  const addID = (users) => {
    setDate_message({ ...data_message, to: users.id });

    set_data_user_for_sind(users);
  };

  const ReserveMessage = (dataM) => {
    console.log(dataM);
    set_all_message([...all_message, dataM]);
  };

  useEffect(() => {
    data.socket.on("message", ReserveMessage);
    return () => {
      data.socket.off("message", ReserveMessage);
    };
  }, [all_message]);

  const sendMessage = () => {
    data.socket.emit("message", {
      to: data_message.to,
      from: data_message.from,
      message: data_message.message,
    });
  };

  return (
    <div>
      {/* <textarea
        type="text"
        placeholder="to"
        onChange={(e) => {
          setDate_message({ ...data_message, to: e.target.value });
        }}
      /> */}
      {/* <button
        onClick={() => {
          sendMessage();
        }}
      >
        Send
      </button> */}

      <Container>
        <Row>
          {posts?.map((users, index) => {
            if (!comber.current[users.user_id]) {
              comber.current[users.user_id] = 1;
            } else {
              comber.current[users.user_id]++;
            }

            return (
              <>
                {users.user_id * 1 !== data.id * 1 &&
                  comber.current[users.user_id] === 1 && (
                    <Col xs={7}>
                      {" "}
                      <Stack direction="row" spacing={2}>
                        <Avatar
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            console.log(users.user_id);
                            addID(users);
                            handleShow();
                          }}
                          alt="Remy Sharp"
                          src={users.profile_picture_url}
                        />
                        <Col style={{ display: "flex", alignItems: "center" }}>
                          {users.username}
                        </Col>
                      </Stack>
                    </Col>
                  )}
              </>
            );
          })}
        </Row>
      </Container>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header style={{ justifyContent: "space-between" }}>
          <Modal.Title>
            {" "}
            <Stack direction="row" spacing={2}>
              <Avatar
                style={{ cursor: "pointer" }}
                alt="Remy Sharp"
                src={data_user_for_sind.profile_picture_url}
              />
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontFamily: "sans-serif",
                }}
              >
                {data_user_for_sind.username}
              </Col>
            </Stack>
          </Modal.Title>
          {/* <Modal.Title style={{ fontFamily: "sans-serif" }}>
            Message
          </Modal.Title> */}
        </Modal.Header>
        <Modal.Body style={{ overflowY: "auto", maxHeight: "40vh" }}>
          {all_message.length > 0 &&
            all_message.map((mess, index) => {
              return (
                <>
                  {mess.from === data.id ? (
                    <p>
                      <Stack
                        direction="row"
                        spacing={1}
                        style={{ justifyContent: "flex-end" }}
                      >
                        <Col
                          xs={3}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "gray",
                            borderRadius: "17px",
                            padding: " 5px 15px",
                            color: "white",
                            justifyContent: "center",
                          }}
                        >
                          {mess.message}
                        </Col>
                        <Avatar
                          style={{ cursor: "pointer" }}
                          alt="Remy Sharp"
                          src={localStorage.getItem("image")}
                        />
                        {/* {mess.from} id form socket */}
                        {/* <Col xs={1}>
                        : {mess.from} {mess.message}
                      </Col> */}
                      </Stack>
                    </p>
                  ) : (
                    <p>
                      <Stack direction="row" spacing={1}>
                        <Avatar
                          style={{ cursor: "pointer" }}
                          alt="Remy Sharp"
                          src={data_user_for_sind.profile_picture_url}
                        />
                        <Col
                          xs={3}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "gray",
                            borderRadius: "14px",
                            padding: "10px",
                            color: "white",
                            justifyContent: "center",
                          }}
                        >
                          {mess.message}
                        </Col>
                        {/* {mess.from} id form socket */}
                        {/* <Col xs={1}>
                        : {mess.from} {mess.message}
                      </Col> */}
                      </Stack>
                    </p>
                  )}
                </>
              );
            })}
        </Modal.Body>
        <Modal.Footer>
          <textarea
            value={data_message.message}
            type="text"
            placeholder="message"
            onChange={(e) => {
              setDate_message({ ...data_message, message: e.target.value });
            }}
          />
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            onClick={() => {
              sendMessage();
              setDate_message({ ...data_message, message: "" });
            }}
            variant="primary"
          >
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Messages;
