const express = require("express");
const bcrypt = require("bcryptjs");
const { Student, Supervisor } = require("../../models");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const getUserEmail = require("../../helpers/getUserEmailPassReset");
const getTokenData = require("../../helpers/getTokenData");

const router = express.Router();
router.use(cookieParser());
dotenv.config();

router.post("/setpassword", async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;
    // const email = getUserEmail(req);
    const {email , role} = getTokenData(req);
    console.log(email, role);

    // Check if all fields are provided
    if (!password || !confirmPassword) {
      return res.status(400).json({
        status: "FAILED",
        message: "Please provide password, and confirm password.",
      });
    }

    if(!email){
      return res.status(404).json({
        status: "FAILED",
        message: "Token missing, Please send new request",
      });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "FAILED",
        message: "Password and confirm password do not match.",
      });
    }

    // Find user in any of the three tables
    let user = await Student.findOne({ where: { email } });
    if (!user) user = await Supervisor.findOne({ where: { email } });
    

    if (!user) {
      return res.status(404).json({
        status: "FAILED",
        message: "User does not exist.",
      });
    }


    if (user.isPasswordSet) {
      return res.status(400).json({
        status: "FAILED",
        message: "Password already set, please go to forgot password to reset.",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password
    await user.update({ password: hashedPassword });
    await user.update({ isPasswordSet: true });

    

    const redirectUrl = `/dashboard/${role}`

    res.status(200).json({
      status: "SUCCESS",
      message: "Password has been set!",
      redirectUrl,
    });
  } catch (error) {
    console.error("Error setting password:", error);
    res.status(500).json({
      status: "FAILED",
      message: "Internal server error.",
    });
  }
});

module.exports = router;
