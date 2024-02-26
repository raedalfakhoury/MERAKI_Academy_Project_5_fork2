/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import "../AdminDashboard/Admin.css";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MailIcon from "@mui/icons-material/Mail";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setadminUsers } from "../redux/reducers/Admin";
const Admin = () => {
  const [toggleUser, setToggleUser] = useState(false);
  const [togglePost, setTogglePost] = useState(false);
  const dispatch = useDispatch();
  const { users, token } = useSelector((state) => {
    return {
      users: state.adminUsers.adminUsers,
      token: state.auth.token,
    };
  });

  const [userCount, setUserCount] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/admin`)
      .then((result) => {
        setUserCount(result?.data?.length);
        dispatch(setadminUsers(result?.data?.result));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/post/1/getPosts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result.data.posts);
        // setUserCount(result?.data?.length);
        // dispatch(setadminUsers(result?.data?.result));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            // width: `calc(100% - ${drawerWidth}px)`,
            width: "100%",
            margin: "0px",
          }}
        >
          <Toolbar sx={{ justifyContent: "center", margin: "0px" }}>
            <Typography
              color="white"
              fontWeight="600"
              variant="h6"
              noWrap
              component="div"
            >
              Admin Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        {/* <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <Divider />
          <List>
            {["Users", "Posts"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <PeopleAltTwoToneIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer> */}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "white",
            margin: "0px 100px",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Toolbar />
          {/* <div style={{margin:"0px 100px", display:"flex" , flexDirection:"column", justifyContent:""}}>
         
          </div> */}

          <Typography paragraph>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                gap: "5%",
              }}
            >
              {/* users */}
              <div
                class="container1"
                onClick={() => {
                  setToggleUser(!toggleUser);
                  setTogglePost(false);
                }}
              >
                <div class="card_box">
                  <h1 style={{ margin: "0px" }}>
                    <PeopleAltTwoToneIcon />
                  </h1>
                  <h3>{userCount}</h3>
                  <span> </span>
                </div>
              </div>
              {/* Posts */}
              <div
                class="container2"
                onClick={() => {
                  setToggleUser(false);
                  setTogglePost(!togglePost);
                }}
              >
                <div class="card_box2">
                  <MailIcon />
                  <span></span>
                </div>
              </div>
              {/* Comments */}
              <div class="container3">
                <div class="card_box3">
                  <ChatBubbleOutlineIcon />
                  <span></span>
                </div>
              </div>
              {/* Likes */}
              <div class="container4">
                <div class="card_box4">
                  <ThumbUpIcon />
                  <span></span>
                </div>
              </div>
            </div>
          </Typography>
          <Typography paragraph>
            {toggleUser ? (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    borderBottom: "1px solid",
                    position: "sticky",
                    top: "0",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: "18px",
                      margin: "0px 0px 5px 0px",
                    }}
                  >
                    profile Image
                  </p>
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: "18px",
                      margin: "0px 0px 5px 0px",
                    }}
                  >
                    username
                  </p>
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: "18px",
                      margin: "0px 0px 5px 0px",
                    }}
                  >
                    Bio
                  </p>
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: "18px",
                      margin: "0px 0px 5px 0px",
                    }}
                  >
                    E-mail
                  </p>
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: "18px",
                      margin: "0px 0px 5px 0px",
                    }}
                  >
                    Status
                  </p>
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: "18px",
                      margin: "0px 0px 5px 0px",
                    }}
                  >
                    Action
                  </p>
                </div>
                {users?.map((ele) => {
                  //   console.log(ele);
                  return (
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                        borderBottom: "1px solid #ff9b9b",
                        alignItems: "center",
                      }}
                    >
                      <img
                        alt=""
                        src={ele.profile_picture_url}
                        style={{
                          height: "105px",
                          width: "105px",
                          borderRadius: "50%",
                          margin: "5px 0px",
                          padding: "2px",
                          border: "1px solid grey",
                        }}
                      ></img>
                      <p>{ele.username}</p>
                      <p>{ele.bio}</p>
                      <p>{ele.email}</p>
                      <p>{ele.bio}</p>
                      <button class="btn" type="button">
                        <strong>Block</strong>
                        <div id="container-stars">
                          <div id="stars"></div>
                        </div>

                        <div id="glow">
                          <div class="circle"></div>
                          <div class="circle"></div>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Admin;
