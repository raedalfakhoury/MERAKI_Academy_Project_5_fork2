import React, { useState, useEffect } from "react";
import axios from "axios";

import { styled, css } from "@mui/material/styles";
import Card from "@mui/material/Card";
// import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Modal as BaseModal } from "@mui/base/Modal";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Divider from "@mui/material/Divider";
import Image from "mui-image";

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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    userNameState("Ahmad");
    userStoryState(
      "https://friendkit.cssninja.io/assets/img/illustrations/characters/friends.svg"
    );
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [expanded, setExpanded] = React.useState(false);
  const [showStory, setShowStory] = useState(false);
  const [userName, userNameState] = useState("Mohammad");
  const [userStory, userStoryState] = useState("");
  const [Data, setData] = useState([]);
  const [image_url, setImage_url] = useState("");

  const handleAvatarClick = () => {
    setShowStory(true);
    console.log(showStory);
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const test = localStorage.getItem("token");
  const pr_key = "rllytlm7";
  const cloud_name = "dmmo3zzyc";

  const handleFile = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", pr_key);

    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/video/upload`,
        formData
      )
      .then((result) => {
        setImage_url(result.data.secure_url);
        console.log(result.data.secure_url);
        // setToggleSpinnerCloudInN(false);
      })
      .catch((err) => {
        console.log(err);
      });
    
      axios.post(`http://localhost:5000/story`,
              {video_url : image_url },
                {headers: {
                Authorization: `Bearer ${test}`,
              }
            }
              ).then((result)=>{
        console.log(result);
      }).catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5000/story/1`,{
  //       headers: {
  //         Authorization: `Bearer ${test}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data.result);
  //       setData(res.data.result)
  //       console.log(Data);
  //       console.log(userStory);
  //       Data.map((elem,indx)=>{
  //         console.log(elem.video_url);
  //       })
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <Card
      style={{
        position: "absolute",
        top: "70px",
        right: "90px",
        borderRadius: "20px",
        cursor: "pointer",
      }}
      sx={{ maxWidth: 325, minWidth: 325, justifyContent: "center" }}
    >
      {/* Title of Stories Section */}
      <CardHeader />
      <h6 style={{ paddingLeft: "20px" }}>Stories</h6>
      <Divider component="div" role="presentation" />

      <CardHeader
        avatar={
          // <Button onClick={handleAvatarClick} aria-label="story">
          <Avatar
            onClick={handleFile}
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
              open={open}
              onClose={handleClose}
              slots={{ backdrop: StyledBackdrop }}
            >
              <ModalContent sx={{ width: 1000 }}>
                <h2 id="unstyled-modal-title" className="modal-title">
                  {userName}
                </h2>
              
                <p
                  id="unstyled-modal-description"
                  className="modal-description"
                >
                  Your Story
                </p>
              </ModalContent>
            </Modal>{" "}
            <input
              onChange={(e) => {
                handleFile(e);
              }}
              type="file"
              class="input-file"
            />
            +             
          </Avatar>

        }
        action={
          <IconButton aria-label="settings">
            {/* <MoreVertIcon /> */}
          </IconButton>
        }
        title={
          <Typography variant="h6" sx={{ fontSize: "15px" }}>
            Add New Story
          </Typography>
        }
        subheader={
          <Typography variant="h6" sx={{ fontSize: "12px" }}>
            Share an image, a video or some text
          </Typography>
        }
      />

      <Divider component="div" role="presentation" />

      <CardHeader
        avatar={
          <TriggerButton type="button" onClick={handleOpen}>
            R
          </TriggerButton>

          //   <div>
          //   <TriggerButton type="button" onClick={handleOpen}>
          //     Open modal
          //   </TriggerButton>
          //   <Modal
          //     aria-labelledby="unstyled-modal-title"
          //     aria-describedby="unstyled-modal-description"
          //     open={open}
          //     onClose={handleClose}
          //     slots={{ backdrop: StyledBackdrop }}
          //   >
          //     <ModalContent sx={{ width: 400 }}>
          //       <h2 id="unstyled-modal-title" className="modal-title">
          //         Text in a modal
          //       </h2>
          //       <p id="unstyled-modal-description" className="modal-description">
          //         Aliquid amet deserunt earum!
          //       </p>
          //     </ModalContent>
          //   </Modal>
          // </div>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Mohammad"
        subheader="September 14, 2016"
      />
      {/* <Divider aria-hidden="true" /> */}
      <Divider component="div" role="presentation" />

      <CardHeader
        avatar={
          <TriggerButton type="button" onClick={handleOpen}>
            R
          </TriggerButton>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={userName}
        subheader="September 14, 2016"
      />
      <Divider component="div" role="presentation" />

      <CardHeader
        avatar={
          <TriggerButton type="button" onClick={handleOpen}>
            R
          </TriggerButton>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <div>
        <TriggerButton type="button" onClick={handleOpen}>
          Open modal
        </TriggerButton>
        <Modal
          aria-labelledby="unstyled-modal-title"
          aria-describedby="unstyled-modal-description"
          open={open}
          onClose={handleClose}
          slots={{ backdrop: StyledBackdrop }}
        >
          <ModalContent sx={{ Maxwidth: "1000px" }}>
            <h2 id="unstyled-modal-title" className="modal-title">
              {userName}
            </h2>
            <p id="unstyled-modal-description" className="modal-description">
              Aliqu
            </p>

            <iframe
                      style={{ width: '500px', height: '100%' }}

            paddingRight="50px"
              width="100"
              height="400"
              src={image_url}
              title="HARDY - ROCKSTAR (Official Music Video)"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </ModalContent>
        </Modal>
      </div>
    </Card>
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
