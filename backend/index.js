const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./models/db");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const userRouter = require("./routes/user");
const roleRouter = require("./routes/roles");
const PostRouter = require("./routes/post");
const ReelsRouter = require("./routes/Reels");
const followersRouter = require("./routes/followers");
const storyRouter = require("./routes/story");
const commentsRouter = require("./routes/comments");
const likesRouter = require("./routes/likes");
const searchRouter = require("./routes/search");
const LikeCommentsR = require("./routes/LikeComments");
const routerMessage = require("./routes/messageRout");

app.use("/users", userRouter);
app.use("/message", routerMessage);
app.use("/roles", roleRouter);
app.use("/post", PostRouter);
app.use("/followers", followersRouter);

app.use("/LikeComments", LikeCommentsR);

app.use("/Reels", ReelsRouter);
app.use("/comments", commentsRouter);
app.use("/story", storyRouter);
app.use("/likes", likesRouter);
app.use("/search", searchRouter);

app.use("*", (req, res) => res.status(404).json("NO content at this path"));

const server = app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});


const { Server, Socket } = require("socket.io");
const auth = require("./middlewares/auth");
const messageHandler = require("./controllers/message");
const socketCi = require("./middlewares/socket");
const io = new Server(server, { cors: { origin: "*" } });
const clients = {};

io.use(auth);

io.on("connection", (socket) => {
  console.log("connection");
  socket.use(socketCi);

  const user_id = socket.handshake.headers.id;

  clients[user_id] = { socket_id: socket.id, user_id };

  console.log(clients);

  messageHandler(socket, io);

  socket.on("error", (error) => {
    socket.emit("error", { error: error.message });
  });

  socket.on("disconnect", () => {
    for (const key in clients) {
      if (socket.id === clients[key].socket_id) {
        delete clients[key];
      }
    }
    console.log(clients);
  });


});
