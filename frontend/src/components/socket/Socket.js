import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "font-awesome/css/font-awesome.css";
import "bootstrap/dist/css/bootstrap.min.css";
import socketInit from "./socket.server";
// import Message from "./Message";
import Messages from "./Messages";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setPosts } from "../redux/reducers/Posts";

function Socket() {
  const dispatch = useDispatch();

  const { posts, token, userId } = useSelector((state) => {
    return {
      posts: state.posts.posts,
      userId: state.auth.userId,
      token: state.auth.token,
      name: state.auth.name,
      image: state.auth.image,
    };
  });

  const [data, setData] = useState({
    token: token,
    id: userId,
    socket: null,
  });
  const [is_connected, set_is_connected] = useState(false);

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

  return (
    <>
      <h1>socket io</h1>

      <button
        onClick={() => {
          setData({
            ...data,
            socket: socketInit({ id: data.id, token: data.token }),
          });
        }}
      >
        open Messages
      </button>
      {is_connected && <Messages data={data} posts={posts} />}
    </>
  );
}

export default Socket;
