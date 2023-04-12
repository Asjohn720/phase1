const express = require("express");
const {
  registerUser,
  loginUser,
} = require("../controllers/loginSignupController");
const {
  saveQuestions,
  getQuestions,
} = require("../controllers/mchartController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/mchartques").post(saveQuestions);
router.route("/mchartques").get(getQuestions);

module.exports = router;
