const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("../server/routes/AuthRoutes");
const messageRoutes = require("./routes/MessageRoutes");
const { Server } = require("socket.io");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads/recordings", express.static("uploads/recordings"));
app.use("/uploads/images", express.static("uploads/images"));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server Started on port: ${process.env.PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatScocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
    // console.log("onlineUsers", userId, socket.id, global.onlineUsers);
  });
  socket.on("send-msg", (data) => {
    // console.log("newData", data.message.message);
    const sendUserSocket = onlineUsers.get(data.to);
    // console.log(data);
    console.log("prong", data.to, sendUserSocket);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", {
        from: data.from,
        message: data.message,
      });
    }
  });
});
