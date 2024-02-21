import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { styled, css } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import PropTypes from "prop-types";
import "./index.css";
import clsx from "clsx";
import { Modal as BaseModal } from "@mui/base/Modal";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Divider from "@mui/material/Divider";
import Image from "mui-image";
import Popup from "reactjs-popup";
import ReactPlayer from "react-player";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  CardHeader,
  Avatar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";

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
  const [openResult, setOpenResult] = React.useState(false);
  const [storyIndex, setStoryIndex] = useState(0);
  const storyIndexRef = useRef(0);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [showStory, setShowStory] = useState(false);
  const [userName, setUserName] = useState("Mohammad");
  const [userStory, setUserStory] = useState([]);
  const [Data, setData] = useState([]);
  const [video, setVideo] = useState("");
  const [model, setModle] = useState(false);
  const [vidIndex, setVidIndex] = useState(0);
  const [usersStories, setUserStories] = useState([]);
  const temp = [];
  const handleVideoEnd = () => {
    setVidIndex((prevIndex) => prevIndex + 1);
  };

  // ===============================   get all stories by user Id ==============================
  const handleOpen = (e) => {
    setOpen(true);
    console.log(e.id, e.username);
    setUserName(e.username);
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
  const handleClose = () => {
    setOpen(false);
    setOpen1(false);
    setOpenResult(false);
  };

  // ==========================  Get All Followers ======================================
  useEffect(() => {
    axios
      .get(`http://localhost:5000/followers/Following/121`, {
        headers: {
          Authorization: `Bearer ${test}`,
        },
      })
      .then((res) => {
        setData(res.data.result);
        console.log(Data);
        res.data.result.map((elem, indx) => {
          axios
            .get(`http://localhost:5000/story/${elem.id}`, {
              headers: {
                Authorization: `Bearer ${test}`,
              },
            })
            .then((res) => {
              console.log(res.data.result);
              res.data.result.map((elem1, indx1) => {
                {
                  elem1.video_url && temp.push(elem1);
                }
              });
              console.log(temp);
              setUserStories(temp);
            });

        });
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

  // ===================================================================
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

        postdata(data.url);
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
          position: "absolute",
          top: "140px",
          right: "90px",
          borderRadius: "20px",
          cursor: "pointer",
        }}
        sx={{ maxWidth: 325, minWidth: 325, justifyContent: "center" }}
      >
        <CardHeader />
        {/* Title of Stories Section */}
        <h6 style={{ paddingLeft: "20px" }}>Stories</h6>
        <Divider component="div" role="presentation" />

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
              >
                <ModalContent sx={{ maxWidth: 1000, maxHeight: 1200 }}>
                  <div style={{ padding: "20px" }}>
                    <h2 id="unstyled-modal-title" className="modal-title">
                      Add New Story
                    </h2>
                    <p
                      id="unstyled-modal-description"
                      className="modal-description"
                    >
                      Your Story
                    </p>
                    <textarea
                      id="publish"
                      style={{ border: "solid 1px" }}
                      className="textarea"
                      rows="3"
                      placeholder="Write something about you..."
                      spellCheck="false"
                    ></textarea>
                  </div>
                  <div style={{ textAlign: "center", padding: "20px" }}>
                    <TriggerButton
                      type="button"
                      onClick={() => {
                        document.querySelector(".input-file").click();
                        setOpen1(false); // Close the modal after upload
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
                      Button 1
                    </TriggerButton>
                    <TriggerButton
                      type="button"
                      onClick={() => {
                        console.log(11);
                        setOpen1(false); // Close the modal
                      }}
                    >
                      Button 2
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
              >
                <ModalContent sx={{ maxwidth: 100, maxHeight: 1200 }}>
                  <h2 id="unstyled-modal-title" className="modal-title">
                    {userName}
                  </h2>
                  <p
                    id="unstyled-modal-description"
                    className="modal-description"
                  >
                    Your Story
                  </p>

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
        {Data.map((elem, indx) => (
          <React.Fragment key={indx}>
            <Divider component="div" role="presentation" />
            <CardHeader
              avatar={
                <TriggerButton type="button" onClick={() => handleOpen(elem)}>
                  R
                </TriggerButton>
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
