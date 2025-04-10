const express = require("express");
const { Op } = require("sequelize");
const StudentAttendance = require("../../../models/studentAttendance");
const { studentRequest } = require("../../../models");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const getDataFromToken = require("../../../helpers/getUserId");

const router = express.Router();
dotenv.config();
router.use(cookieParser());

// Format current time
const formatTime = (date) => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

router.post("/clock-out", async (req, res) => {
  try {
    const userId = getDataFromToken(req);
    const studentNo = userId;

    if (!userId) {
      return res.status(400).json({ error: "User not found" });
    }

    const currentDate = new Date();
    const formattedTime = formatTime(currentDate);
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    // Define minimum clock-out time: 15:50
    const minHour = 15;
    const minMinute = 50;

    // Check if it's before 15:50
    const isBeforeMinTime =
      currentHour < minHour || (currentHour === minHour && currentMinute < minMinute);

    // If before 15:50, require approved request
    if (isBeforeMinTime) {
      const requestRecord = await studentRequest.findOne({
        where: { studentNo },
        order: [['createdAt', 'DESC']],
      });

      if (!requestRecord || requestRecord.isApproved !== true) {
        return res.status(403).json({
          error: "You are not allowed to clock out before 15:50 unless your request is approved.",
          status: "NOT_APPROVED",
        });
      }
    }

    // Check attendance record
    const attendanceRecord = await StudentAttendance.findOne({
      where: {
        studentNo: userId,
        clock_in: { [Op.ne]: null },
        clock_out: { [Op.eq]: null },
      },
    });

    if (!attendanceRecord) {
      return res.status(400).json({
        error: "You have not clocked in yet or have already clocked out today",
      });
    }

    attendanceRecord.clock_out = currentDate;
    await attendanceRecord.save();

    return res.json({
      message: "Clock-out successful",
      success: true,
      clock_out: formattedTime,
    });

  } catch (error) {
    console.error("Error in clock-out:", error);

    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        error: "Validation Error",
        details: error.errors.map((e) => e.message),
      });
    }

    return res.status(500).json({
      error: error.message || "Internal Server Error",
    });
  }
});

module.exports = router;
