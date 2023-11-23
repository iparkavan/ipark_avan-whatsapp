const getPrismaInstance = require("../utils/PrismaClient");

const checkUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log(email);

    if (!email) {
      return res.json({ msg: "Email is required", status: false });
    }
    const prisma = getPrismaInstance();
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.json({ msg: "User Not Found", status: false });
    } else {
      res.json({ msg: "User found", status: true, data: user });
    }
  } catch (error) {
    next(error);
  }
};

const onboardUser = async (req, res, next) => {
  try {
    const { name, email, image: profilePicture, about } = req.body;
    console.log(name, email, profilePicture, about);

    if (!name || !email || !profilePicture) {
      return res.send("Name, Email and Display picture are required");
    }
    const prisma = getPrismaInstance();
    const user = await prisma.user.create({
      data: {
        name,
        email,
        profilePicture,
        about,
      },
    });
    return res.json({
      msg: "The User has created successfully",
      status: true,
      user,
    });
  } catch (error) {
    res.json({ msg: "Error Creating User", status: false });
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const prisma = getPrismaInstance();
    const users = await prisma.user.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        email: true,
        profilePicture: true,
        about: true,
      },
    });

    const userGroupedByInitialLetter = {};

    users.forEach((user) => {
      const initialLetter = user.name.charAt(0).toUpperCase();
      if (!userGroupedByInitialLetter[initialLetter]) {
        userGroupedByInitialLetter[initialLetter] = [];
      }
      userGroupedByInitialLetter[initialLetter].push(user);
    });

    return res.status(200).send({ users: userGroupedByInitialLetter });
  } catch (error) {
    next(error);
  }
};

module.exports = { checkUser, onboardUser, getAllUsers };
