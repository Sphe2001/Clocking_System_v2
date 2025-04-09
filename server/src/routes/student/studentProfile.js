const express = require("express");
const { Student } = require("../../models");
const getUserId = require("../../helpers/getUserId");
const cookieParser = require("cookie-parser");

const router = express.Router();
router.use(cookieParser());

router.post("/profile/student", async (req, res) => {
  try {
    const studentNo = getUserId(req);

    const user = await Student.findOne({ where: { studentNo } });

    const student = {
        studentNo: user.studentNo,
      email: user.email,
      surname: user.surname,
      initials: user.initials,
      contactNo: user.contactNo,
      specialization: user.specialization,
    };

    res.status(200).json({
      student,
    });
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
