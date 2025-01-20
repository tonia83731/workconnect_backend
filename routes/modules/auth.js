const express = require("express");
const router = express.Router();
const userControllers = require("../../controllers/user-controllers");

// V
router.post("/register", userControllers.register);
// V
router.post("/login", userControllers.login);

module.exports = router;
