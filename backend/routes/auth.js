const express = require("express");
const signupController = require("../controllers/auth/signup");
const loginController = require("../controllers/auth/login")

const router = express.Router();

router.post("/signup", signupController.signUp);
router.post("/login", loginController.login);


module.exports = router;
