import express from "express";

import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

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
