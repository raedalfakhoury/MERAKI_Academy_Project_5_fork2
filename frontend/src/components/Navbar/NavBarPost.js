/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { SvgIcon } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { setLogout } from "../redux/reducers/auth/index";
import Stack from "@mui/material/Stack";

import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";

import NotificationsIcon from "@mui/icons-material/Notifications";

import { useNavigate } from "react-router-dom";

import "./style.css";

// import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "font-awesome/css/font-awesome.css";
import "bootstrap/dist/css/bootstrap.min.css";
import socketInit from "../socket/socket.server";
// import Message from "./Message";
import Messages from "../socket/Messages";

import { setPosts } from "../redux/reducers/Posts";

// import * as React from 'react';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { Col } from "react-bootstrap";
// export  function Socket() {

//   return (
//     <>

//     </>
//   );
// }

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function NavBarPost() {
  // const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState([]);

  function PinnedSubheaderList() {
    return (
      <List
        style={{ top: "6px" }}
        sx={{
          borderRadius: "20px",
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 300,
          padding: 0,
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          {searchInput.map((sectionId) => (
            <li key={`section-${sectionId}`}>
              <Stack style={{ padding: "5px" }} direction="row" spacing={2}>
                <Avatar
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    redirect({
                      pathname: "/profile",
                      search: `?prf=${sectionId.id}`,
                    });
                  }}
                  alt="Remy Sharp"
                  src={sectionId.profile_picture_url}
                />
                <Col style={{ display: "flex", alignItems: "center" }}>
                  {sectionId.username}
                </Col>
              </Stack>
            </li>
          ))}
        </div>
      </List>
    );
  }
  const { posts, token, userId } = useSelector((state) => {
    return {
      posts: state.posts.posts,
      userId: state.auth.userId,
      token: state.auth.token,
      name: state.auth.name,
      image: state.auth.image,
    };
  });

  const [is_connected, set_is_connected] = useState(false);
  const [data, setData] = useState({
    token: token,
    id: userId,
    socket: null,
  });

  useEffect(() => {
    data.socket?.on("connect", () => {
      console.log(true);
      set_is_connected(true);
      // setData({ ...data, is_connected: true });
    });
    data.socket?.on("connect_error", (error) => {
      console.log(error.message);
      set_is_connected(false);
      // setData({ ...data, is_connected: false });
    });

    return () => {
      data.socket?.close();
      data.socket?.removeAllListeners();
      set_is_connected(false);
    };
  }, [data.socket]);

  const addSocket = () => {
    if (data.socket) {
      setData({
        ...data,
        socket: null,
      });
    } else {
      setData({
        ...data,
        socket: socketInit({ id: data.id, token: data.token }),
      });
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState(null);
  const handleClick = (event) => {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogout = (event) => {
    dispatch(setLogout());
    redirect("/");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          handleMenuClose();
          redirect({
            pathname: "/profile",
            search: `?prf=${My_ID}`,
          });
        }}
      >
        Profile
      </MenuItem>
      <MenuItem
        onClick={async () => {
          // لازم نرسل مع put اي اشي
          try {
            const res = await axios.put(
              `http://localhost:5000/users/logout`,
              { status: "false" },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            console.log(res);

            if (res.data.result.length) {
              handleLogout();
            }
          } catch (error) {
            console.log(error);
          }
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  );
  const redirect = useNavigate();
  // ======================================================== Search ========================================

  const searchHandle = (e) => {
    if (e === "") {
      setSearchInput([]);
    }
    console.log(e);
    axios
      .post("http://localhost:5000/search", { searchString: e })
      .then((res) => {
        console.log(res.data);
        setSearchInput(res.data.result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //====================================== Get User Profile by Id ===================================
  const My_ID = localStorage.getItem("userId");
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${My_ID}`)
      .then((res) => {
        setUserProfile(res.data.result[0].profile_picture_url);
        // console.log(res.data.result[0].profile_picture_url);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={9} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>

      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error"></Badge>
        </IconButton>

        <p>Notifications</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box
      style={{ paddingBottom: "80px", position: "relative" }}
      sx={{ flexGrow: 1 }}
    >
      <AppBar
        position="fixed"
        sx={{ bgcolor: "rgb(87,110,153)", color: "black", height: "55px" }}
      >
        <Toolbar>
          <Avatar
            src={userProfile}
            alt="User Profile"
            style={{
              width: "40px",
              height: "40px",
              cursor: "pointer",
            }}
            onClick={handleClick}
          />
          <Search
            style={{
              border: "1px solid gray",
              boxSizing: "",
              marginBottom: "0px",
              padding: "0px",
              backgroundColor: "#F7F7F7",
              color: "black",
              width: "300px",
              borderRadius: "20px",
              height: "30px",
            }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>

            <StyledInputBase
              sx={{ ml: 2, flex: 1 }}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => {
                searchHandle(e.target.value);
              }}
            />
            {/* {searchInput.length && (
              <select>
                {searchInput.map((elem, indx) => {
                  return <option key={indx}>{elem.username}</option>;
                })}
              </select>
            )} */}
            <PinnedSubheaderList />
          </Search>
          {/* Profile Picture */}

          {/* new */}
          {/* Space Box */}
          <Box sx={{ flexGrow: 1 }} />
          {/* Search */}
          <div
            style={{
              paddingRight: "180px",
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              style={{ fontFamily: "monospace" }}
              variant="h5"
              noWrap
              component="div"
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                  color: "#fff",
                  cursor: "pointer",
                },
              }}
              onClick={() => {
                redirect("/home");
              }}
            >
              TALAGI
            </Typography>
            <img
              style={{ width: "4vw" }}
              src="pngtree-cartoon-business-conversation-work-line-drawing-illustration-png-image_1718261-removebg-preview.png"
              alt="Illustration of friends"
            />
            {/* Notifications Box */}
          </div>
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
                paddingLeft: "40px",
                position: "relative",
              },
            }}
          >
            {/* Likes Notifications */}

            {/* Bell Notifications */}
            <IconButton
              sx={{ "&:hover": { backgroundColor: "rgb(255, 191, 0)" } }}
              size="large"
              aria-label="show 4 new mails"
              color="inhert"
            >
              <Badge badgeContent={8} color="warning">
                {/* <NotificationsNoneOutlinedIcon /> */}
                <SvgIcon
                  viewBox="0 0 24 24"
                  style={{
                    width: 20,
                    height: 20,
                    fill: "#ffff",
                    stroke: "black",
                    strokeWidth: 1,
                  }}
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>{" "}
                </SvgIcon>
              </Badge>
            </IconButton>

            {/* Chat Notifications */}

            {/* Message Notifications */}
            <IconButton
              onClick={() => {
                //  redirect("/messages");
                addSocket();
              }}
              sx={{
                "&:hover": { backgroundColor: "rgb(255, 191, 0)" },
              }}
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge
                badgeContent={17}
                color="warning"
                style={{ "&:hover": { backgroundColor: "rgb(255, 191, 0)" } }}
              >
                <SvgIcon
                  viewBox="0 0 24 24"
                  style={{
                    width: 20,
                    height: 20,
                    fill: "#ffff",
                    stroke: "black",
                    strokeWidth: 1,
                  }}
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </SvgIcon>{" "}
              </Badge>
            </IconButton>
          </Box>
          <button
            class="buttons"
            onClick={() => {
              redirect("/Explore");
            }}
          >
            Explore
            <svg fill="currentColor" viewBox="0 0 24 24" class="iconss">
              <path
                clip-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                fill-rule="evenodd"
              ></path>
            </svg>
          </button>
        </Toolbar>
      </AppBar>

      {renderMobileMenu}
      {renderMenu}
      {/* <h1>socket io</h1> */}

      {is_connected && <Messages setData={setData} data={data} posts={posts} />}
    </Box>
  );
}

// ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????

// import * as React from "react";
// import { styled, alpha } from "@mui/material/styles";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import InputBase from "@mui/material/InputBase";
// import Badge from "@mui/material/Badge";
// import MenuItem from "@mui/material/MenuItem";
// import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
// import SearchIcon from "@mui/icons-material/Search";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import MailIcon from "@mui/icons-material/Mail";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import MoreIcon from "@mui/icons-material/MoreVert";

// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: "100%",
//   [theme.breakpoints.up("sm")]: {
//     marginLeft: theme.spacing(3),
//     width: "auto",
//   },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("md")]: {
//       width: "20ch",
//     },
//   },
// }));

// export default function PrimarySearchAppBar() {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

//   const isMenuOpen = Boolean(anchorEl);
//   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

//   const handleProfileMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMobileMenuClose = () => {
//     setMobileMoreAnchorEl(null);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     handleMobileMenuClose();
//   };

//   const handleMobileMenuOpen = (event) => {
//     setMobileMoreAnchorEl(event.currentTarget);
//   };

//   const menuId = "primary-search-account-menu";
//   const renderMenu = (
//     <Menu
//       anchorEl={anchorEl}
//       anchorOrigin={{
//         vertical: "top",
//         horizontal: "right",
//       }}
//       id={menuId}
//       keepMounted
//       transformOrigin={{
//         vertical: "top",
//         horizontal: "right",
//       }}
//       open={isMenuOpen}
//       onClose={handleMenuClose}
//     >
//       <MenuItem onClick={()=>{

//         handleMenuClose()
//       }}>Profile</MenuItem>
//       <MenuItem onClick={handleMenuClose}>My account</MenuItem>
//     </Menu>
//   );

//   const mobileMenuId = "primary-search-account-menu-mobile";
//   const renderMobileMenu = (
//     <Menu
//       anchorEl={mobileMoreAnchorEl}
//       anchorOrigin={{
//         vertical: "top",
//         horizontal: "right",
//       }}
//       id={mobileMenuId}
//       keepMounted
//       transformOrigin={{
//         vertical: "top",
//         horizontal: "right",
//       }}
//       open={isMobileMenuOpen}
//       onClose={handleMobileMenuClose}
//     >
//       <MenuItem>
//         <IconButton size="large" aria-label="show 4 new mails" color="inherit">
//           <Badge badgeContent={4} color="error">
//             <MailIcon />
//           </Badge>
//         </IconButton>
//         <p>Messages</p>
//       </MenuItem>
//       <MenuItem>
//         <IconButton
//           size="large"
//           aria-label="show 17 new notifications"
//           color="inherit"
//         >
//           <Badge badgeContent={17} color="error">
//             <NotificationsIcon />
//           </Badge>
//         </IconButton>
//         <p>Notifications</p>
//       </MenuItem>
//       <MenuItem onClick={handleProfileMenuOpen}>
//         <IconButton
//           size="large"
//           aria-label="account of current user"
//           aria-controls="primary-search-account-menu"
//           aria-haspopup="true"
//           color="inherit"
//         >
//           <AccountCircle />
//         </IconButton>
//         <p>Profile</p>
//       </MenuItem>
//     </Menu>
//   );

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static" sx={{ backgroundColor: "#8FBC8B" }}>
//         <Toolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="open drawer"
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography
//             variant="h6"
//             noWrap
//             component="div"
//             sx={{ display: { xs: "none", sm: "block" } }}
//           >
//             MUI
//           </Typography>
//           <Search>
//             <SearchIconWrapper>
//               <SearchIcon />
//             </SearchIconWrapper>
//             <StyledInputBase
//               placeholder="Search…"
//               inputProps={{ "aria-label": "search" }}
//             />
//           </Search>
//           <Box sx={{ flexGrow: 1 }} />
//           <Box sx={{ display: { xs: "none", md: "flex" } }}>
//             <IconButton
//               size="large"
//               aria-label="show 4 new mails"
//               color="inherit"
//             >
//               <Badge badgeContent={4} color="error">
//                 <MailIcon />
//               </Badge>
//             </IconButton>
//             <IconButton
//               size="large"
//               aria-label="show 17 new notifications"
//               color="inherit"
//             >
//               <Badge badgeContent={17} color="error">
//                 <NotificationsIcon />
//               </Badge>
//             </IconButton>
//             <IconButton
//               size="large"
//               edge="end"
//               aria-label="account of current user"
//               aria-controls={menuId}
//               aria-haspopup="true"
//               onClick={handleProfileMenuOpen}
//               color="inherit"
//             >
//               <AccountCircle />
//             </IconButton>
//           </Box>
//           <Box sx={{ display: { xs: "flex", md: "none" } }}>
//             <IconButton
//               size="large"
//               aria-label="show more"
//               aria-controls={mobileMenuId}
//               aria-haspopup="true"
//               onClick={handleMobileMenuOpen}
//               color="inherit"
//             >
//               <MoreIcon />
//             </IconButton>
//           </Box>
//         </Toolbar>
//       </AppBar>
//       {renderMobileMenu}
//       {renderMenu}
//     </Box>
//   );
// }
