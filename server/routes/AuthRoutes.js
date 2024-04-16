const Router = require("express");
const {
  checkUser,
  onboardUser,
  getAllUsers,
  generateToken,
} = require("../controllers/AuthController");

const router = Router();

router.post("/check-user", checkUser);
router.post("/onboard-user", onboardUser);
router.get("/get-contacts", getAllUsers);
router.get("/generate-token/:userId", generateToken);

module.exports = router;
