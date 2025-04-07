const db = require("../../helpers/dbConfig");
const express = require("express");
const { Admin } = require("../../models");
const getUserId = require("../../helpers/getUserId");
const cookieParser = require("cookie-parser");

const router = express.Router();
router.use(cookieParser());

router.post("/profile/admin", async (req, res) => {
  try {
    const staffNo = getUserId(req);

    const user = await Admin.findOne({ where: { staffNo } });

    const admin = {
      staffNo: user.staffNo,
      email: user.email,
      surname: user.surname,
      initials: user.initials,
    };

    res.status(200).json({
      admin,
    });
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
