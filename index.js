import express from "express";

import { createServer } from "http";
import { Server } from "socket.io";
import router from "./router.js";
import { redisClient } from "./src/redis/connection.js";

const app = express();
app.use(express.json());
await redisClient.connect();

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Hello world");
});

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chat message", (value) => {
    console.log(socket.id);
    socket.broadcast.emit("chat message", value);
  });
});

httpServer.listen(3000, () => {
  console.log("listening on *:3000");
});
