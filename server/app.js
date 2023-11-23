// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("../server/routes/AuthRoutes");
const messageRoutes = require("./routes/MessageRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server Started on port: ${process.env.PORT}`);
});

global.onlineUsers = new Map();
