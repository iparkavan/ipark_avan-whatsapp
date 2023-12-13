const { Router } = require("express");
const {
  addMessage,
  getMessaages,
  addImageMessage,
} = require("../controllers/MessageController");
const multer = require("multer");

const router = Router();

const uploadImage = multer({ dest: "/uploads/images" });

router.post("/add-message", addMessage);
router.get("/get-messages/:from/:to", getMessaages);
router.post("/add-image-message", uploadImage.single("image"), addImageMessage);

module.exports = router;
