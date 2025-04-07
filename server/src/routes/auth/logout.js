const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();
const router = express.Router();
router.use(cookieParser());

router.get("/logout", async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      expires: new Date(0),
    });
    const redirectUrl = "/login";

    res
      .status(200)
      .json({ message: "Logout successful", success: true, redirectUrl });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
