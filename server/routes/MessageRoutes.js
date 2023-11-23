const { Router } = require("express");
const {
  addMessage,
  getMessaages,
} = require("../controllers/MessageController");

const router = Router();

router.post("/add-message", addMessage);
router.get("/get-messages/:from/:to", getMessaages);

module.exports = router;
