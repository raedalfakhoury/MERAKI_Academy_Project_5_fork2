import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "font-awesome/css/font-awesome.css";
import "bootstrap/dist/css/bootstrap.min.css";
import socketInit from "./socket.server";
// import Message from "./Message";
import Messages from "./Messages";

function Socket() {
  const [data, setData] = useState({
    token: "",
    id: "",
    socket: null,
  });
  const [is_connected , set_is_connected] =useState(false)

  useEffect(() => {
    data.socket?.on("connect", () => {
      console.log(true);
      set_is_connected(true)
      // setData({ ...data, is_connected: true });
    });
    data.socket?.on("connect_error", (error) => {
      console.log(error.message);
      set_is_connected(false)
      // setData({ ...data, is_connected: false });
    });

    return () => {
      data.socket?.close();
      data.socket?.removeAllListeners();
      set_is_connected(false)
    };
  }, [data.socket]);

  return (
    <>
      <h1>socket io</h1>
      <textarea
        type="text"
        placeholder="user_id"
        onChange={(e) => {
          setData({ ...data, id: e.target.value });
        }}
      />
      <textarea
        type="text"
        placeholder="token"
        onChange={(e) => {
          setData({ ...data, token: e.target.value });
        }}
      />

      <button
        onClick={() => {
          setData({
            ...data,
            socket: socketInit({ id: data.id, token: data.token }),
          });
        }}
      >
        connect
      </button>
      {is_connected&& <Messages data={data} />}
    </>
  );
}

export default Socket;
