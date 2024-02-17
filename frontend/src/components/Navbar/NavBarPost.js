// import React, { useEffect, useState } from "react";
// import {
//   Badge,
//   ButtonGroup,
//   DropdownButton,
//   Dropdown,
//   Navbar,
//   Container,
//   Nav,
//   Button,
//   NavDropdown,
//   NavbarCollapse,
//   Form,
// } from "react-bootstrap";
// import "./style.css";

// const NavBarPost = () => {
//   const [isHovered, setIsHovered] = useState(false);

//   const handleMouseEnter = () => {
//     setIsHovered(true);
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//   };
//   return (
//     <header
//       style={{
//         background: "#FFFF",
//         color: "blake",
//         marginBottom: "20px",
//         height: "55px",
//       }}
//     >
//       <Navbar
//         expand="lg"
//         bg="light"
//         variant="Secondary"
//         style={{
//           paddingTop: "5px",
//           background: "#FFFF",
//           color: "white",
//           marginBottom: "20px",
//           position: "fixed",
//           height: "55px",
//           width:"100%",
//           zIndex:"10"
//         }}
//       >
//         <Container>
//           <Navbar.Toggle aria-controls="navbarSupportedContent" />
//           <Navbar.Brand href="#">
//             <img
//               src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
//               height="15"
//               alt="MDB Logo"
//               loading="lazy"
//             />
//           </Navbar.Brand>

//           <Navbar.Collapse id="navbarSupportedContent">
//             <Nav className="me-auto">
//               {/* Heart Notifications */}
//               <Nav className="col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
//                 <Nav.Link href="/Home">
//                   <Button
//                     className="position-relative border border-0"
//                     variant="outline-danger"
//                     border="none"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="20"
//                       height="20"
//                       viewBox="0 0 24 24"
//                       fill="#ffff"
//                       stroke="black"
//                       stroke-width="1"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                       class="feather feather-heart"
//                     >
//                       <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
//                     </svg>

//                     <Badge
//                       pill
//                       bg="danger"
//                       className="position-absolute top-0 start-100 translate-middle"
//                     >
//                       6<span className="visually-hidden">unread messages</span>
//                     </Badge>
//                   </Button>
//                 </Nav.Link>
//               </Nav>
//               {/* Bill Notifications */}
//               <Nav className="col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
//                 <Nav.Link href="/Home">
//                   <Button
//                     className="position-relative border border-0"
//                     variant="outline-info"
//                     border="none"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="20"
//                       height="20"
//                       viewBox="0 0 24 24"
//                       fill="#ffff"
//                       stroke="black"
//                       stroke-width="1"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                       className="feather feather-bell"
//                     >
//                       <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
//                       <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
//                     </svg>
//                     <Badge
//                       pill
//                       bg="danger"
//                       className="position-absolute top-0 start-100 translate-middle"
//                     >
//                       99+
//                       <span className="visually-hidden">unread messages</span>
//                     </Badge>
//                   </Button>
//                 </Nav.Link>
//               </Nav>{" "}
//               {/* Message Notifications */}
//               <Nav className="col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
//                 <Nav.Link href="/Home">
//                   <Button
//                     className="position-relative border border-0"
//                     variant="outline-info"
//                     border="none"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="20"
//                       height="20"
//                       viewBox="0 0 24 24"
//                       fill="#ffff"
//                       stroke="black"
//                       stroke-width="1"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                       class="feather feather-mail"
//                     >
//                       <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
//                       <polyline points="22,6 12,13 2,6"></polyline>
//                     </svg>
//                     <Badge
//                       pill
//                       bg="danger"
//                       className="position-absolute top-0 start-100 translate-middle"
//                     >
//                       99+
//                       <span className="visually-hidden">unread messages</span>
//                     </Badge>
//                   </Button>
//                 </Nav.Link>
//               </Nav>{" "}
//               {/* Cate Notifications */}
//               <Nav className="col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
//                 <Nav.Link href="/Home">
//                   <Button
//                     className="position-relative border border-0"
//                     variant="outline-info"
//                     border="none"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="20"
//                       height="20"
//                       viewBox="0 0 24 24"
//                       fill="#ffff"
//                       stroke="black"
//                       stroke-width="1"
//                       //   stroke-linecap="butt"
//                       //   stroke-linejoin="miter"
//                       class="feather feather-message-square"
//                     >
//                       <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
//                     </svg>
//                     <Badge
//                       pill
//                       bg="info"
//                       className="position-absolute top-0 start-100 translate-middle"
//                     >
//                       99+
//                       <span className="visually-hidden">unread messages</span>
//                     </Badge>
//                   </Button>
//                 </Nav.Link>
//               </Nav>{" "}
//             </Nav>

//             {/* DropDown section*/}
//             <Nav className="align-items-center">
//               <NavbarCollapse style={{
//                 height:"10px",
//                 width:"350px",
//                 paddingTop:"8px"
//               }}>
//                 <Form.Control
//                   type="text"
//                   placeholder="Search"
//                   className=" mr-sm-2"
//                 />
//               </NavbarCollapse>
//               <Nav.Link href="#">
//                 <i className="fas fa-shopping-cart"></i>
//               </Nav.Link>

//               <NavDropdown
//                 title={
//                   <img
//                     src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
//                     className="rounded-circle"
//                     height="25"
//                     alt="Black and White Portrait of a Man"
//                     loading="lazy"
//                     style={{height:"40px",
//                 width:""}}
//                   />
//                 }
//                 id="navbarDropdownMenuAvatar"
//                 align="end"
//               >
//                 <NavDropdown.Item href="#">My profile</NavDropdown.Item>
//                 <NavDropdown.Item href="#">Settings</NavDropdown.Item>
//                 <NavDropdown.Item href="#">Logout</NavDropdown.Item>
//               </NavDropdown>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </header>
//   );
// };

// export default NavBarPost;
import * as React from "react";
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
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import "./style.css";

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
  const [anchorEl, setAnchorEl] = React.useState(null);
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

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ bgcolor: "#ffff", color: "black", height: "55px" }}
      >
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="warning"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block", color: "#659BDC" } }}
          >
            TALAGI
          </Typography>

          {/* Notifications Box */}
          <Box
            sx={{ display: { xs: "none", md: "flex", paddingLeft: "70px" } }}
          >
            {/* Likes Notifications */}
            <IconButton
              sx={{ "&:hover": { backgroundColor: "red" } }}
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={8} color="error">
                <FavoriteBorderIcon  />
              </Badge>
            </IconButton>

            {/* Bell Notifications */}
            <IconButton
              sx={{ "&:hover": { backgroundColor: "#659BDC" } }}
              size="large"
              aria-label="show 4 new mails"
              color="inhert"
            >
              <Badge badgeContent={8} color="error">
                <NotificationsNoneOutlinedIcon />
              </Badge>
            </IconButton>

            {/* Chat Notifications */}
            <IconButton
              sx={{ "&:hover": { backgroundColor: "#659BDC" } }}
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="#ffff"
              stroke="black"
              stroke-width="4"
            >
              <Badge badgeContent={17} color="info">
                <MailOutlineIcon />
              </Badge>
            </IconButton>

            {/* Message Notifications */}
            <IconButton
              sx={{
                "&:hover": { backgroundColor: "#659BDC" }
                
              }}
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge
                badgeContent={17}
                color="info"
                style={{ "&:hover": { backgroundColor: "#659BDC" } }}
              >
                <ChatBubbleOutlineIcon />
              </Badge>
            </IconButton>
          </Box>
          {/* Space Box */}
          <Box sx={{ flexGrow: 1 }} />
          {/* Search */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          {/* Profile Picture */}
          <AccountCircle />

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
