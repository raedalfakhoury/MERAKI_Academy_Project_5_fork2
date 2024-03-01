import { io } from "socket.io-client";

const socketInit = ({ id, token }) => {
  return io("https://talaqi-platform.onrender.com", {
    extraHeaders: { id, token },
    // autoConnect:false,
  });
};
export default socketInit;
