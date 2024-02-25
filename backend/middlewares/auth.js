const auth = (socket, next) => {
  const headers = socket.handshake.headers;

  if (!headers.token) {
    next(new Error("invalid"));
  } else {
    socket.join("room-name-"+headers.id);
    socket.user = { token: headers.token, user_id: headers.id };
    next();
  }
};
module.exports = auth;
