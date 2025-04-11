const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { Student, Supervisor, Admin } = require("../../models");

dotenv.config();
const router = express.Router();
router.use(cookieParser());

router.post("/disable/user/:id", async (req, res) => {

    try {
    const { id } = req.params;
    const studentNo = id;
    const staffNo = id;

    let user = await Student.findOne({ where: { studentNo } });
    if (!user) {
      user = await Supervisor.findOne({ where: { staffNo } });
    }

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    await user.update({ isVerified: false });
    res.status(200).json({
        status: "SUCCESS",
        message: "User account disabled!",
      });
        
    } catch (error) {
        console.error("Error disabling user:", error);
    res
      .status(500)
      .json({ message: "Internal server error." });
  }
        
    });

module.exports = router;