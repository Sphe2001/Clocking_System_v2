const express = require("express");
const { Op } = require("sequelize");
const StudentAttendance = require("../../../models/studentAttendance");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const getDataFromToken = require("../../../helpers/getUserId");

const router = express.Router();
dotenv.config();
router.use(cookieParser());

// Helper function to get the current time in 'hh:mm' format
const formatTime = (date) => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

// POST /clock-out route
router.post("/clock-out", async (req, res) => {
  try {
    const userId = getDataFromToken(req);
    console.log(userId);

    if (!userId) {
      return res.status(400).json({ error: "User not found" });
    }

    const currentDate = new Date();
    const formattedTime = formatTime(currentDate);

    // Enforce minimum clock-out time: 15:50
    const minClockOutHour = 15;
    const minClockOutMinute = 50;

    if (
      currentDate.getHours() < minClockOutHour ||
      (currentDate.getHours() === minClockOutHour && currentDate.getMinutes() < minClockOutMinute)
    ) {
      return res.status(400).json({ error: "You cannot clock out before 15:50" });
    }

    // Find attendance record with clock_in but no clock_out
    const attendanceRecord = await StudentAttendance.findOne({
      where: {
        studentNo: userId,
        clock_in: { [Op.ne]: null },
        clock_out: { [Op.eq]: null },
      },
    });

    if (!attendanceRecord) {
      return res.status(400).json({ error: "You have not clocked in yet or already clocked out today" });
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
