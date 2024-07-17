const express = require("express");

const { authenticateToken, authorizeRoles } = require("../middlewares/auth.js");
const authController = require("../controllers/userAuth.js");
const User = require("../models/user.js");

const router = express.Router();


router.post("/register", authController.register); // Register a new user


router.post("/login", authController.login);  // Log in a user


router.post("/logout", authController.logout);  // Log out a user


router.get("/profile", authenticateToken, async (req, res) => {  // Access protected route
    const { token } = req.cookies;

    res.json({ token, role: req.user.role, userId: req.user.id });
});

module.exports = router;