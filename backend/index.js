const express = require("express");
const userRouter = require("./routes/userRouter");
const cors = require("cors");
const api_config = require("./config");

const app = express();
const port = api_config.port;

// for parsing request data
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

//address
// app.use("/meme", memeRouter);
app.use("/user", userRouter);

app.get("/home", (req, res) => {
  console.log("request at home");
  res.send("the wait is over!");
});

app.listen(port, () => {
  console.log("server started");
});