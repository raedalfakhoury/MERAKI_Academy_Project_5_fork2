import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { setMessages, addMessages } from "../redux/reducers/Messages/message";
import "./message.css";
import axios from "axios";
import { TbSquareRoundedNumber1Filled } from "react-icons/tb";
import ReactSearchBox from "react-search-box";
function Messages({ data, posts, setData }) {


// const [BK_data_message,set_BK_data_message] =useState([])



  useEffect(() => {
   
  }, []);
  const dispatch = useDispatch();
  const [myFollowing, set_myFollowing] = useState();

  const { token, MessagesALL, userId } = useSelector((state) => {
    return {
      posts: state.posts.posts,
      userId: state.auth.userId,
      token: state.auth.token,
      name: state.auth.name,
      image: state.auth.image,
      MessagesALL: state.Messages.Messages,
    };
  });
  // console.log("=>>>>>>>>>>>>>>>>>>", MessagesALL);
  const [send_for_id, set_send_for_id] = useState("");
  const [Content, set_Content] = useState("");

  const comber = useRef({});
  const [toggleBoxMessage, set_toggleBoxMessage] = useState(true);

  const [compar_icn_not, set_compar_icn_not] = useState();
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
    set_send_for_id(users.id);
  };

  const ReserveMessage = (dataM) => {
    if (dataM.from * 1 !== userId * 1) {
      SoundEffects();
    }

    // sendMessageBK(dataM);
    console.log(dataM);
    set_all_message([...all_message, dataM]);
    set_compar_icn_not(dataM);
  };
  const SoundEffects = () => {
    let audio = new Audio("notifications-sound-127856.mp3");
    audio.play();
    audio.loop = false;
  };
  useEffect(() => {
    //  getMessagesDataBK()

    getMyFollowing();

    data.socket.on("message", ReserveMessage);
    return () => {
      data.socket.off("message", ReserveMessage);
      // getMessagesDataBK()
    };
  }, [all_message]);

  // useEffect(() => {
  //   axios.get()
  // }, []);
  const getMyFollowing = () => {
    axios
      .get(
        `https://talaqi-platform.onrender.com/followers/Following/${localStorage.getItem(
          "userId"
        )}`
      )
      .then((result) => {
        console.log(result.data.result);
        set_myFollowing(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const sendMessage = () => {
    data.socket.emit("message", {
      to: data_message.to * 1,
      from: data_message.from * 1,
      message: data_message.message,
    });
    sendMessageBK();
  };
  const sendMessageBK = () => {
    console.log("jamal");
    axios
      .post(
        `https://talaqi-platform.onrender.com/message/send`,
        { send_for_id: data_message.to, Content: data_message.message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getMessagesDataBK = (id) => {
    console.log("getMessageBK");
    axios
      .get(`https://talaqi-platform.onrender.com/message/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result.data.data);
        dispatch(setMessages(result.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filterUSers = (e) => {
    if (e.target.value === "") {
      getMyFollowing();
    }
    const copy = myFollowing?.filter((user, index) => {
      return user.username.includes(e.target.value);
    });
    set_myFollowing(copy);
  };

  return (
    <div
      style={{ position: "absolute", zIndex: "5px", top: "100%", left: "65%" }}
    >
      {toggleBoxMessage && (
        <Container
          className="box_Users_message"
          style={{
            border: "solid 1px #000",
            width: "30vw",
            overflowY: "auto",
            height: "20vw",
            zIndex: "50",
            position: "absolute",
            backgroundColor: "#fff",
            borderRadius: "5px",
            //   left: "100%",
            top: "-25px",
            //   right:"1px"
          }}
        >
          <Row
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              paddingTop: "2px",
            }}
          >
            <textarea
              style={{ height: "6vh", backgroundColor: "#dcdcdc" }}
              placeholder="Placeholder"
              // myFollowing={"dsdsdsds"}
              onChange={(e) => {
                filterUSers(e);
              }}
            />
            {myFollowing?.map((users, index) => {
              return (
                <>
                  {users.id * 1 !== data.id * 1 && (
                    <Col xs={12}>
                      {" "}
                      <Stack direction="row" spacing={2}>
                        <Avatar
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            console.log(users.id);
                            addID(users);
                            handleShow();
                            getMessagesDataBK(users.id);
                            // setData({...data,socket:null})
                            set_toggleBoxMessage(false);
                          }}
                          alt="Remy Sharp"
                          src={users.profile_picture_url}
                        />
                        <Col style={{ display: "flex", alignItems: "center" }}>
                          {users.username}
                        </Col>
                        <Col
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                          }}
                        >
                          {compar_icn_not?.from === users.id && (
                            <TbSquareRoundedNumber1Filled
                              number={4}
                              style={{
                                width: "20px",
                                // backgroundColor:"red",
                                color: "red",
                              }}
                            />
                          )}
                        </Col>
                      </Stack>
                    </Col>
                  )}
                </>
              );
            })}
          </Row>
        </Container>
      )}
      <Modal
        style={{ top: "20%" }}
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
        <Modal.Body
          className="Modal-Body-messages-send"
          style={{ overflowY: "auto", maxHeight: "30vh" }}
        >
          {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! data backend */}
          {MessagesALL.length > 0 &&
            MessagesALL.map((mess, index) => {
              return (
                <>
                  {mess.senderid == data.id ? (
                    mess.recipientid === data_message?.to && (
                      <p>
                        <Stack
                          direction="row"
                          spacing={1}
                          style={{ justifyContent: "flex-end" }}
                        >
                          <Col
                            xs={4}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              backgroundColor: "rgb(29,47,109)",
                              borderRadius: "17px",
                              padding: " 5px 10px",
                              color: "#fff",
                              fontWeight: "600px",
                              justifyContent: "center",
                            }}
                          >
                            {mess.content}
                          </Col>
                          <Avatar
                            style={{ cursor: "pointer" }}
                            alt="Remy Sharp"
                            src={localStorage.getItem("image")}
                          />
                        </Stack>
                      </p>
                    )
                  ) : (
                    <p>
                      <Stack direction="row" spacing={1}>
                        <Avatar
                          style={{ cursor: "pointer" }}
                          alt="Remy Sharp"
                          src={data_user_for_sind.profile_picture_url}
                        />
                        <Col
                          xs={4}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "#dcdcdc",
                            borderRadius: "14px",
                            padding: " 5px 10px",
                            color: "#000",
                            fontWeight: "600px",
                            justifyContent: "center",
                          }}
                        >
                          {mess.content}
                        </Col>
                      </Stack>
                    </p>
                  )}
                </>
              );
            })}

          {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! socket io  */}
          {all_message.length > 0 &&
            all_message.map((mess, index) => {
              return (
                <>
                  {mess.from == data.id ? (
                    mess.to === data_message?.to && (
                      <p>
                        <Stack
                          direction="row"
                          spacing={1}
                          style={{ justifyContent: "flex-end" }}
                        >
                          <Col
                            xs={4}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              backgroundColor: "rgb(29,47,109)",
                              borderRadius: "17px",
                              padding: " 5px 10px",
                              color: "#fff",
                              fontWeight: "600px",
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
                        </Stack>
                      </p>
                    )
                  ) : (
                    <p>
                      <Stack direction="row" spacing={1}>
                        <Avatar
                          style={{ cursor: "pointer" }}
                          alt="Remy Sharp"
                          src={data_user_for_sind.profile_picture_url}
                        />
                        <Col
                          xs={4}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "#dcdcdc",
                            borderRadius: "14px",
                            padding: " 5px 10px",
                            color: "#000",
                            fontWeight: "600px",
                            justifyContent: "center",
                          }}
                        >
                          {mess.message}
                        </Col>
                      </Stack>
                    </p>
                  )}
                </>
              );
            })}
        </Modal.Body>
        <Modal.Footer>
          <textarea
            style={{ height: "10vh" }}
            value={data_message.message}
            type="text"
            placeholder="message"
            onChange={(e) => {
              setDate_message({ ...data_message, message: e.target.value });
              set_Content(e.target.value);
            }}
          />
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
              setData({
                ...data,
                socket: null,
              });
              setTimeout(() => {
                set_toggleBoxMessage(true);
                getMessagesDataBK();
              }, 1000);
            }}
          >
            Close
          </Button>
          <Button
            style={{
              backgroundColor: "rgb(46,70,130)",
              borderColor: "rgb(46,70,130)",
            }}
            onClick={() => {
              // getMessagesDataBK();
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
