const getPrismaInstance = require("../utils/PrismaClient.js");
const { renameSync } = require("fs");

const addMessage = async (req, res, next) => {
  try {
    const prisma = getPrismaInstance();
    const { message, from, to } = req.body;
    const getUser = onlineUsers.get(to);

    if (message && from && to) {
      const newMessage = await prisma.messages.create({
        data: {
          message,
          sender: { connect: { id: parseInt(from) } },
          receiver: { connect: { id: parseInt(to) } },
          messageStatus: getUser ? "delivered" : "sent",
        },
        include: { sender: true, receiver: true },
      });
      return res.status(201).send({ message: newMessage });
    }
    return res.status(400).send("from, to and message is required");
  } catch (error) {
    console.log(error.message);
  }
};

const getMessaages = async (req, res, next) => {
  try {
    const prisma = getPrismaInstance();
    const { from, to } = req.params;

    const messages = await prisma.messages.findMany({
      where: {
        OR: [
          {
            senderId: parseInt(from),
            receiverId: parseInt(to),
          },
          {
            senderId: parseInt(to),
            receiverId: parseInt(from),
          },
        ],
      },
      orderBy: {
        id: "asc",
      },
    });
    const unreadMessages = [];

    messages.forEach((message, index) => {
      if (
        message.messageStatus !== "read" &&
        message.senderId === parseInt(to)
      ) {
        messages[index].messageStatus = "read";
        unreadMessages.push(message.id);
      }
    });
    await prisma.messages.updateMany({
      where: {
        id: { in: unreadMessages },
      },
      data: {
        messageStatus: "read",
      },
    });

    res.status(200).json({ messages });
  } catch (error) {
    next();
  }
};

const addImageMessage = async (req, res, next) => {
  console.log(req.file);
  try {
    if (req.file) {
      const date = Date.now();
      let fileName = "uploads/images" + date + req.file.originalname;
      renameSync(fileName);
      console.log(fileName, req.file.path);

      const prisma = getPrismaInstance();
      const { from, to } = req.query;

      if (from && to) {
        const message = await prisma.message.create({
          data: {
            message: fileName,
            sender: { connect: { id: parseInt(from) } },
            receiver: { connect: { id: parseInt(to) } },
            type: "image",
          },
        });
        return res.status(201).json({ message });
      }
      return res.status(400).send("from and to are required");
    }
    return res.status(400).send("Image is required");
  } catch (error) {
    next(error);
  }
};

module.exports = { addMessage, getMessaages, addImageMessage };
