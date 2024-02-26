const messageHandler = (socket, io) => {
  socket.on("message", (data) => {
    data.success = true;
    socket.to("room-name-" + data.to).emit("message", data);
    socket.emit("message", data);
    console.log(data);
  });
};
module.exports = messageHandler;
