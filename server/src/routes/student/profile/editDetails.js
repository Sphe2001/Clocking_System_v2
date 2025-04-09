const express = require("express");
const { Student } = require("../../../models");
const getUserId = require("../../../helpers/getUserId");
const cookieParser = require("cookie-parser");

const router = express.Router();
router.use(cookieParser());

router.post("/edit/details/student", async (req, res) => {
  try {
    const {contactNo} = req.body;
    const studentNo = getUserId(req);

    const user = await Student.findOne({ where: { studentNo } });

    if(!user){
        return res.status(404).json({
            message: "Please log in to edit user datails."
        })
    }

    await user.update({ contactNo: contactNo });
    

    res.status(200).json({
        status: "SUCCESS",
        message: "Contact number updated."
    });
  } catch (error) {
    console.error("Error updating details:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
