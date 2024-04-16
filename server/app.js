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
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", {
        from: data.from,
        message: data.message,
      });
    }
  });

  socket.on("outgoing-voice-call", (voice) => {
    const sendUserSocket = onlineUsers.get(voice.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("incoming-voice-call", {
        from: voice.from,
        roomId: voice.roomId,
        callType: voice.callType,
      });
    }
  });

  socket.on("outgoing-video-call", (video) => {
    const sendUserSocket = onlineUsers.get(video.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("incoming-video-call", {
        from: video.from,
        roomId: video.roomId,
        callType: video.callType,
      });
    }
  });

  socket.on("reject-voice-call", (voice) => {
    const sendUserSocket = onlineUsers.get(voice.from);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("voice-call-rejected");
    }
  });

  socket.on("reject-video-call", (video) => {
    const sendUserSocket = onlineUsers.get(video.from);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("video-call-rejected");
    }
  });

  socket.on("accept-incoming-call", ({ id }) => {
    const sendUserSocket = onlineUsers.get(id);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("accepted-call");
    }
  });
});
