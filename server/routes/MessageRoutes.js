const { Router } = require("express");
const { addMessage } = require("../controllers/MessageController");

const router = Router();

router.post("/add-message", addMessage);

module.exports = router;
