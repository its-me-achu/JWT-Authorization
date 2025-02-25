const express = require("express");
const { registerUser, loginUser, getUserInfo} = require("../controllers/authController.js");
const authMiddleware = require("../middleware/authMiddleware.js")

const router = express.Router();

//Register a new user:
router.post("/", registerUser);

//Login user:
router.post("/login", loginUser);

//Get user Information:
router.get("/userinfo", authMiddleware, getUserInfo);



module.exports = router;