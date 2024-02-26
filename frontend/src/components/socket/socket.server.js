import { io } from "socket.io-client";

const socketInit = ({ id, token }) => {
  return io("http://localhost:8080/", {
    extraHeaders: { id, token },
    // autoConnect:false,
  });
};
export default socketInit;
