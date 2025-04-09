const express = require("express");
const { Supervisor } = require("../../../../models");
const cookieParser = require("cookie-parser");

const router = express.Router();
router.use(cookieParser());

router.post("/view/studentProfile", async (req, res) => {
  try {
    const {staffNo} = req.body

    const user = await Supervisor.findOne({ where: { staffNo } });

    const supervisor = {
        staffNo: user.staffNo,
      email: user.email,
      surname: user.surname,
      initials: user.initials,
      contactNo: user.contactNo,
      specialization: user.specialization,
    };

    res.status(200).json({
      supervisor,
    });
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
