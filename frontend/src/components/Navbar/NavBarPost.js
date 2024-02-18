import React, { useState } from "react";
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
import store from "../redux/store";
import { setLogout } from "../redux/reducers/auth/index";
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
import { useNavigate } from "react-router-dom";

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
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const handleClick = (event) => {
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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );
  const redirect = useNavigate();

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
        position="fixed"
        sx={{ bgcolor: "#ffff", color: "black", height: "55px" }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block", color: "#659BDC" } }}
          >
            TALAGI
          </Typography>

          {/* Notifications Box */}
          <Box
            sx={{ display: { xs: "none", md: "flex", paddingLeft: "40px" } }}
          >
            {/* Likes Notifications */}
            <IconButton
              sx={{ "&:hover": { backgroundColor: "red" } }}
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={8} color="error">
                {/* <FavoriteBorderIcon /> */}
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
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </SvgIcon>
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
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </SvgIcon>{" "}
              </Badge>
            </IconButton>

            {/* Message Notifications */}
            <IconButton
              sx={{
                "&:hover": { backgroundColor: "#659BDC" },
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
          {/* Space Box */}
          <Box sx={{ flexGrow: 1 }} />
          {/* Search */}
          <Search
            style={{
              backgroundColor: "#F7F7F7",
              color: "black",
              width: "400px",
              borderRadius: "20px",
            }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>

            <StyledInputBase
              sx={{ ml: 2, flex: 1 }}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          {/* Profile Picture */}
          <AccountCircle
            style={{
              color: "black",
              width: "40px",
              height: "35px",
              borderRadius: "20px",
              cursor: "pointer",
            }}
            onClick={handleClick}
          />
        </Toolbar>
      </AppBar>

      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
