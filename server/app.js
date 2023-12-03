// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";

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
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    // console.log(userId);
    onlineUsers.set(userId, socket.id);
  });
  socket.on("send-msg", (data) => {
    
    // if (sendUserSocket) {
    console.log("cocomelon");
    socket.to(onlineUsers.get(data.to)).emit("msg-receive", {
      from: data.from,
      message: data.message,
    });
    // }
  });
});
