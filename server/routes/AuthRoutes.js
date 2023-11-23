const Router = require("express");
const {
  checkUser,
  onboardUser,
  getAllUsers,
} = require("../controllers/AuthController");

const router = Router();

router.post("/check-user", checkUser);
router.post("/onboard-user", onboardUser);
router.get("/get-contacts", getAllUsers);

module.exports = router;
