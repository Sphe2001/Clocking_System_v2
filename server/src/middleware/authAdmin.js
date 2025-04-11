const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const userData = require("../helpers/getTokenData");

dotenv.config();
const router = express.Router();
router.use(cookieParser());

router.post("/auth", async (req, res) => {
  try {
    const {role} = userData(req);
    res.status(200).json({
      role,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
