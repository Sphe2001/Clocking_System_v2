const express = require("express");
const bcrypt = require("bcryptjs");
const { Admin, Student, Supervisor } = require("../../models");

const router = express.Router();

router.post("/passwordreset", async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    // Check if all fields are provided
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        status: "FAILED",
        message: "Please provide email, password, and confirm password.",
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
    if (!user) user = await Admin.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        status: "FAILED",
        message: "User does not exist.",
      });
    }

    const isVerified = user.isPasswordResetVerified;

    if (!isVerified) {
      return res.status(400).json({
        status: "FAILED",
        message: "Request not verified. Please resend request.",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password
    await user.update({ password: hashedPassword });
    await user.update({ isPasswordResetVerified: false });

    res.status(200).json({
      status: "SUCCESS",
      message: "Password has been reset successfully!",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({
      status: "FAILED",
      message: "Internal server error.",
    });
  }
});

module.exports = router;
