const express = require("express");
const { Student } = require("../../../../models");
const cookieParser = require("cookie-parser");

const router = express.Router();
router.use(cookieParser());

router.post("/edit/studentProfile", async (req, res) => {
  try {
    const { studentNo, surname, initials, specialization } = req.body;

    const user = await Student.findOne({ where: { studentNo } });

    if (!user) {
      return res.status(404).json({ status: "FAIL", message: "Student not found." });
    }

    
    if (surname !== undefined) user.surname = surname;
    if (initials !== undefined) user.initials = initials;
    if (specialization !== undefined) user.specialization = specialization;

    await user.save();

    res.status(200).json({
      status: "SUCCESS",
      message: "User profile updated.",
    });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    res.status(500).json({
      status: "ERROR",
      message: "Internal server error",
      error: error.message
    });
  }
});

module.exports = router;
