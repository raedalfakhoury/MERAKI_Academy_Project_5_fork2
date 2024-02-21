const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./models/db")
const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());


const userRouter = require("./routes/user")
const roleRouter = require("./routes/roles")

const PostRouter =require("./routes/post")
const ReelsRouter =require("./routes/Reels")
const followersRouter = require('./routes/followers')
const storyRouter =require("./routes/story")
const commentsRouter = require("./routes/comments");
const likesRouter = require("./routes/likes")
const searchRouter = require("./routes/search")

app.use("/users", userRouter);
app.use("/roles", roleRouter);
app.use("/post",PostRouter)
app.use("/followers",followersRouter)
app.use("/Reels",ReelsRouter)
app.use("/comments", commentsRouter);
app.use("/story", storyRouter);
app.use("/likes", likesRouter)
app.use("/search",searchRouter)





app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
