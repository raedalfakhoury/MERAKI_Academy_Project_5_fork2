import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { FaImages } from "react-icons/fa6";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import axios from "axios";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { useNavigate, useHistory } from "react-router-dom";

import { MdOutlineVideoLibrary } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import NavBarPost from "../Navbar/NavBarPost";
export function TemporaryDrawer() {
  const navigate = useNavigate();

  // const history = useHistory();

  const Navigate = (text) => {
    navigate({
      pathname: `/${text.toLowerCase()}`,
      search: `?prf=${localStorage.getItem("userId")}`,
    });
  };
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      s
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["home", "profile", "LogOut"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => {
                Navigate(text);
              }}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      {["Drawer"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button style={{border:"2px solid #000"}} onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
// /!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!///
const Explore = () => {
  const { token, userId, name, image } = useSelector((state) => {
    return {
      posts: state.posts.posts,
      userId: state.auth.userId,
      token: state.auth.token,
      name: state.auth.name,
      image: state.auth.image,
    };
  });

  // http://localhost:5000/post/1/getPosts
  const [Posts, setPosts] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/post/1/getPosts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setPosts(result.data.posts);
        console.log(result.data.posts);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <NavBarPost />
      <Container style={{ display: "flex", margin: "0px" }}>
        <Container style={{ width: "30%" }}>{TemporaryDrawer()}</Container>
        <Container
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
            width: "70%",
          }}
        >
          <Container style={{ width: "35%", padding: "0px", margin: "0px" }}>
            <Row
              style={{
                display: "flex",
                flexDirection: "column",
                // height: "55vw",
                flexWrap: "nowrap",

                padding: "0 10px ",
              }}
            >
              {Posts?.map((post, index) => {
                return (
                  <>
                    {post.media_url.includes(".mp4") && index > 25 && (
                      <Col
                        style={{
                          display: "flex",
                          FlexDirection: "column",
                          flexWrap: "nowrap",
                          height: "0px",
                          padding: "0",
                          margin: "0",
                          flex: "1 ",
                          position: "relative",
                          width: "500px",

                          // borderTop: "1px solid red",
                          // borderBottom: "1px solid red",
                        }}
                      >
                        <MdOutlineOndemandVideo
                          style={{
                            position: "absolute",
                            right: "20",
                            top: "10",
                            color: "#fff",
                          }}
                        />

                        <video
                          controls
                          muted
                          style={{
                            width: "100%",
                            height: "20.7vw",
                            border: "none",
                            flexWrap: "nowrap",
                            padding: "0px",
                            backgroundColor: "#000",
                            // marginTop: "2px",
                            // borderTop: "4px solid  #fff",

                            borderBottom: "4px solid  #fff",
                            borderRight: "11px solid  #fff",
                          }}
                          src={post.media_url}
                        ></video>
                      </Col>
                    )}
                  </>
                );
              })}
            </Row>
          </Container>
          <Container style={{ width: "34%", padding: "0px", margin: "0px" }}>
            <Row
              style={{
                display: "flex",
                flexDirection: "column",
                // height: "55vw",
                flexWrap: "nowrap",
                paddingLeft: "10px ",
                // gap: "2px",
              }}
            >
              {Posts?.map((post, index) => {
                return (
                  <>
                    {!post.media_url.includes(".mp4") && index > 10 && (
                      <Col
                        style={{
                          position: "relative",
                          width: "500px",
                          margin: "0px",
                          padding: "0px",
                          borderBottom: "4px solid  #fff",
                          borderRight: "18px solid  #fff",
                        }}
                      >
                        <FaImages
                          style={{
                            position: "absolute",
                            right: "20",
                            top: "10",
                            color: "#fff",
                          }}
                        />
                        <Image
                          style={{
                            padding: "0",
                            width: "100%",
                            height: "20.4vw",
                            border: "none",
                          }}
                          src={post.media_url}
                        />
                      </Col>
                    )}
                  </>
                );
              })}
            </Row>
          </Container>
          <Container style={{ width: "40%", padding: "0px", margin: "0px" }}>
            <Row
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2px",
                padding: "0 10px 0 10px ",
                // marginTop: "3px",
              }}
            >
              {Posts?.map((post, index) => {
                return (
                  <>
                    {post.media_url.includes(".mp4") && index < 25 && (
                      <Col
                        style={{
                          display: "flex",
                          FlexDirection: "column",
                          flexWrap: "nowrap",
                          position: "relative",
                          width: "500px",
                          padding: "0px",
                          margin: "0",
                          // height: "10000px",

                          // borderTop: "1px solid red",
                          // borderBottom: "1px solid red",
                        }}
                      >
                        <MdOutlineVideoLibrary
                          style={{
                            position: "absolute",
                            right: "20",
                            top: "10",
                            color: "#fff",
                          }}
                        />
                        <video
                          controls
                          muted
                          autoPlay
                          loop
                          rounded
                          style={{
                            width: "100%",
                            height: "100%",
                            border: "none",
                            flexWrap: "nowrap",
                            padding: "0px",
                            margin: "0",
                            border: "2px solid  rgb(244,244,244)",
                            backgroundColor: "#000",
                          }}
                          src={post.media_url}
                        ></video>
                      </Col>
                    )}
                  </>
                );
              })}
            </Row>
          </Container>
        </Container>
      </Container>
    </>
  );
};

export default Explore;
