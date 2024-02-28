import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { styled, css } from "@mui/material/styles";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import "./index.css";
import clsx from "clsx";
import { Modal as BaseModal } from "@mui/base/Modal";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { CardHeader, Avatar, IconButton, Typography } from "@mui/material";
import Dropdown from 'react-bootstrap/Dropdown';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Stories() {
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [openResult, setOpenResult] = useState(false);
  const [openDeleteStory, setopenDeleteStory] = useState(false);
  const [storyIndex, setStoryIndex] = useState(0);
  const storyIndexRef = useRef(0);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [openAddedStory, setOpenAddedStory] = useState(false);
  const [user_Id, setUser_Id] = useState("");
  const [userName, setUserName] = useState("");
  const [userStory, setUserStory] = useState([]);
  const [Data, setData] = useState([]);
  const [userPhoto, setUserPhoto] = useState("");
  const [uploadedStory, setUploadedStory] = useState("");
  const [model, setModle] = useState(false);
  const [vidIndex, setVidIndex] = useState(0);
  const [usersStories, setUserStories] = useState([]);
  const temp = [];

  // ================= My Informations From Local Storge =================================
  const My_ID = localStorage.getItem("userId");
  const My_userName = localStorage.getItem("name");
  const My_Img = localStorage.getItem("image");

  // ====================================================================================
  const handleVideoEnd = () => {
    setVidIndex((prevIndex) => prevIndex + 1);
  };
  // =================== Delete Story =================================

  const deleteStory = (e) => {
    console.log(userStory[storyIndex].id);
    console.log("Deleted");
    const story_id = userStory[storyIndex].id;
    axios
      .delete(`http://localhost:5000/story/${story_id}`, {
        headers: {
          Authorization: `Bearer ${test}`,
        },
      })

      .then((result) => {
        console.log(result);
        setOpen(false);
        setopenDeleteStory(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ===============================   get all stories by user Id ==============================
  const handleOpen = (e) => {
    setOpen(true);
    console.log(e.id, e.username);
    setUserName(e.username);
    setUser_Id(e.id);
    setUserPhoto(e.profile_picture_url)

    setLoading(true);
    axios
      .get(`http://localhost:5000/story/${e.id}`, {
        headers: {
          Authorization: `Bearer ${test}`,
        },
      })
      .then((res) => {
        console.log(res.data.result[0].video_url);
        setUserStory(res.data.result);
        console.log(userStory);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setOpen(false);

        setOpenResult(true);
      });
  };

  const handleOpenMyStories = (e) => {
    setOpen(true);
    setUserName(My_userName);
    setLoading(true);
    axios
      .get(`http://localhost:5000/story/${My_ID}`, {
        headers: {
          Authorization: `Bearer ${test}`,
        },
      })
      .then((res) => {
        console.log(res.data.result);
        setUserStory(res.data.result);
        console.log(userStory);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setOpen(false);

        setOpenResult(true);
      });
  };
  const handleClose = () => {
    setOpen(false);
    setOpen1(false);
    setOpenAddedStory(false);

    setOpenResult(false);
    setLoading1(true);
    setopenDeleteStory(false);
    setUploadedStory("");
  };

  // ==========================  Get All Following ======================================
  useEffect(() => {
    axios
      .get(`http://localhost:5000/followers/Following/${My_ID}`, {
        headers: {
          Authorization: `Bearer ${test}`,
        },
      })
      .then((res) => {
        setData(res.data.result);
        console.log(Data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // ==============================  To show all stories   ======================================

  useEffect(() => {
    const video = document.getElementById("video");
    if (video) {
      video.onended = (e) => {
        console.log("Video Ended");
        if (storyIndexRef.current === userStory.length - 1) {
          handleClose();
        } else {
          setStoryIndex((value) => value + 1);
        }
      };
    }
  }, []);

  useEffect(() => {
    storyIndexRef.current = storyIndex;
  }, [storyIndex]);

  //
  const handleAvatarClick = () => {
    setShowStory(true);
    console.log(showStory);
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const test = localStorage.getItem("token");

  // Cloudinary Parameters
  const pr_key = "nb0pjnta";
  const cloud_name = "dalwd5c23";
  const q = 0;

  // =======================   Add Story Function  ====================================

  // get Cloudinary URL
  const StoryHandle = (files) => {
    setOpen1(true);
    setLoading1(false);

    console.log("Start Story Handle Function >> [+]");
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", pr_key);

    fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/video/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.url);
        setUploadedStory(data.url);
      });
  };

  // Post the Video in the database
  const postdata = (Url) => {
    axios
      .post(
        `http://localhost:5000/story`,
        { video_url: Url },
        {
          headers: {
            Authorization: `Bearer ${test}`,
          },
        }
      )
      .then((result) => {
        console.log(result);
        setOpenAddedStory(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // ===========================================================================================

  return (
    <>
      <Card
        style={{
          borderRadius: "10px",
          cursor: "pointer",
          width: "125%",
        }}
        sx={{}}
      >
        {/* Title of Stories Section */}
        <h6 style={{ paddingLeft: "20px", paddingTop: "20px" }}>Stories</h6>
        <Divider component="div" role="presentation" />

        {/* My stories Section  */}

        <CardHeader
          avatar={
            <Avatar
              sx={{
                bgcolor: "#E8E8E8",
                "&:hover": {
                  bgcolor: "#0288D1",
                  color: "#ffff",
                },
              }}
              aria-label="recipe"
            >
              <img
                src={My_Img}
                onClick={() => handleOpenMyStories()}
                style={{
                  color: "black",
                  width: "40px",
                  height: "35px",
                  borderRadius: "25px",
                  cursor: "pointer",
                }}
              />
            </Avatar>
          }
          action={<IconButton aria-label="settings"></IconButton>}
          title={
            <Typography variant="h6" sx={{ fontSize: "15px" }}>
              My Stories
            </Typography>
          }
          subheader={
            <Typography variant="h6" sx={{ fontSize: "12px" }}>
              {My_userName} 's Stories
            </Typography>
          }
        />

        {/* Add new Story Section  */}
        <CardHeader
          avatar={
            <Avatar
              sx={{
                bgcolor: "#E8E8E8",
                "&:hover": {
                  bgcolor: "#0288D1",
                  color: "#ffff",
                },
              }}
              aria-label="recipe"
            >
              {/* Deleted Model  */}
              <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={openDeleteStory}
                onClose={handleClose}
                slots={{ backdrop: StyledBackdrop }}
              >
                <ModalContent sx={{ maxWidth: 1000, maxHeight: 1200 }}>
                  <div style={{ padding: "20px" }}>
                    <h2 id="unstyled-modal-title" className="modal-title">
                      {userName}
                    </h2>
                    <p
                      id="unstyled-modal-description"
                      className="modal-description"
                    >
                      Story Deleted Succsifully
                    </p>
                  </div>
                </ModalContent>
              </Modal>
              {/* Adding Story Succefully Model */}
              <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={openAddedStory}
                onClose={handleClose}
                slots={{ backdrop: StyledBackdrop }}
              >
                <ModalContent sx={{ maxWidth: 1000, maxHeight: 1200 }}>
                  <div style={{ padding: "20px" }}>
                    <h2 id="unstyled-modal-title" className="modal-title">
                      {userName}
                    </h2>
                    <p
                      id="unstyled-modal-description"
                      className="modal-description"
                    >
                      Story Added Succsifully
                    </p>
                  </div>
                </ModalContent>
              </Modal>
              <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={openResult}
                onClose={handleClose}
                slots={{ backdrop: StyledBackdrop }}
              >
                <ModalContent sx={{ maxWidth: 1000, maxHeight: 1200 }}>
                  <div style={{ padding: "20px" }}>
                    <h2 id="unstyled-modal-title" className="modal-title">
                      {userName}
                    </h2>
                    <p
                      id="unstyled-modal-description"
                      className="modal-description"
                    >
                      No Stories
                    </p>
                  </div>
                </ModalContent>
              </Modal>
              {/* This Modal to Add New Story */}
              <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open1}
                onClose={handleClose}
                slots={{ backdrop: StyledBackdrop }}
                className="add-new-story-model"
              >
                <ModalContent
                  sx={{ maxWidth: 1000, maxHeight: 1200 }}
                  className="model-content"
                >
                  <h2>welcome</h2>
                  <h2>{userName}</h2>
                  <TriggerButton
                    className="close-button"
                    type="button"
                    onClick={() => {
                      console.log(11);
                      setOpen1(false); // Close the modal
                      setLoading1(true);
                      setUploadedStory("");
                    }}
                  >
                    <span aria-hidden="true">&times;</span>
                  </TriggerButton>
                  <div className="show-content">
                    {uploadedStory ? (
                      <video
                        src={uploadedStory}
                        autoPlay
                        width={"300px"}
                        height={"300px"}
                        controls
                        className="video-inside-addingStory"
                      ></video>
                    ) : loading1 ? (
                      <>Upload your Story</>
                    ) : (
                      <Box sx={{ display: "flex" }}>
                        <CircularProgress />
                      </Box>
                    )}
                    <div className="input-file-section">
                      <TriggerButton
                        className="add-story-button"
                        type="button"
                        onClick={() => {
                          document.querySelector(".input-file").click();
                          // setOpen1(false); // Close the modal after upload
                        }}
                      >
                        <input
                          onChange={(e) => {
                            StoryHandle(e.target.files);
                          }}
                          type="file"
                          className="input-file"
                          style={{ display: "none" }} // hide the input element visually
                        />
                        Choose File
                      </TriggerButton>
                    </div>
                  </div>

                  <div
                    className="submit-section"
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    <TriggerButton
                      className="submit-story-button"
                      type="button"
                      onClick={() => {
                        // Function to submit story
                        postdata(uploadedStory);
                        setOpen1(false); // Close the modal after submission
                      }}
                    >
                      Submit Story
                    </TriggerButton>
                  </div>
                </ModalContent>
              </Modal>
              {/* This Modal to Show the User Story */}
              <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={handleClose}
                slots={{ backdrop: StyledBackdrop }}
                className="model-show-stories"
              >
                <ModalContent
                  sx={{ maxwidth: 100, maxHeight: 1200 }}
                  className="model-content"
                >
                  <div className="show-story-user-information">
                    {" "}
                    <img
                    src={userPhoto}
                      style={{
                        color: "black",
                        width: "40px",
                        
                        height: "35px",
                        borderRadius: "25px",
                        cursor: "pointer",
                      }}
                    />
                    <h6 id="unstyled-modal-title" className="modal-title">
                      {userName}
                    </h6>
                    {My_userName === userName ? (
                      // <button
                      //   style={{ marginLeft: "auto" }}
                      //   onClick={(e) => deleteStory(e)}
                      // >
                      //   {" "}
                      //   Delete Story
                      // </button>
                      <Dropdown style={{ marginLeft: "auto" }}>
                        <Dropdown.Toggle style={{backgroundColor:"#659BDC"}} id="dropdown-basic">
                          :
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item  onClick={(e) => deleteStory(e)}>
                            Delete Story
                          </Dropdown.Item>
                          <Dropdown.Item  onClick={(e) => handleClose(e)}>
                            Close
                          </Dropdown.Item>
                          
                        </Dropdown.Menu>
                      </Dropdown>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div className="video">
                    {loading ? (
                      <Box sx={{ display: "flex" }}>
                        <CircularProgress />
                      </Box>
                    ) : (
                      <video
                        width={"300px"}
                        height={"300px"}
                        id="video"
                        src={userStory[storyIndex].video_url}
                        autoPlay
                        controls
                      ></video>
                    )}
                    {storyIndex !== 0 && (
                      <ChevronLeftIcon
                        onClick={(e) => setStoryIndex((value) => value - 1)}
                        className="previous hoverable"
                      />
                    )}
                    {storyIndex !== userStory.length - 1 && (
                      <ChevronRightIcon
                        onClick={(e) => setStoryIndex((value) => value + 1)}
                        className="next hoverable"
                      />
                    )}
                  </div>
                </ModalContent>
              </Modal>{" "}
              <TriggerButton
                type="button"
                onClick={() => {
                  setOpen1(true);
                }}
              >
                <input
                  onChange={(e) => {
                    StoryHandle(e.target.files);
                  }}
                  type="file"
                  className="input-file"
                  style={{ display: "none" }} // hide the input element visually
                />
                +
              </TriggerButton>
            </Avatar>
          }
          action={<IconButton aria-label="settings"></IconButton>}
          title={
            <Typography variant="h6" sx={{ fontSize: "15px" }}>
              Add New Story
            </Typography>
          }
          subheader={
            <Typography variant="h6" sx={{ fontSize: "12px" }}>
              Share an image, a video, or some text
            </Typography>
          }
        />
        <div
          style={{
            maxHeight: "220px",
            overflowY: "scroll",
          }}
        >
          {/* Render all friends */}
          {Data.map((elem, indx) => (
            <React.Fragment key={indx}>
              <Divider component="div" role="presentation" />
              <CardHeader
                avatar={
                  <img
                    src={elem.profile_picture_url}
                    onClick={() => handleOpen(elem)}
                    style={{
                      color: "black",
                      width: "40px",
                      height: "35px",
                      borderRadius: "25px",
                      cursor: "pointer",
                    }}
                  />
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={elem.username}
                subheader={elem.created_at}
              />
            </React.Fragment>
          ))}
        </div>
      </Card>
    </>
  );
}

const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "base-Backdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const blue = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
);

const TriggerButton = styled("button")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 150ms ease;
    cursor: pointer;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    &:hover {
      background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
    }

    &:active {
      background: ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
    }

    &:focus-visible {
      box-shadow: 0 0 0 4px
        ${theme.palette.mode === "dark" ? blue[300] : blue[200]};
      outline: none;
    }
  `
);
