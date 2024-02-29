const messageHandler = (socket, io) => {
  socket.on("message", (data) => {
    data.success = true;
    socket.to("room-name-" + data.to).emit("message", data);
    socket.emit("message", data);
    console.log(data);
  });
  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });
  socket.on("answerCall", (data) =>{ io.to(data.to).emit("callAccepted"),data.signal});
};
module.exports = messageHandler;
