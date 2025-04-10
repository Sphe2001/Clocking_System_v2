const express = require("express");
const { Op } = require("sequelize");
const StudentAttendance = require("../../../models/studentAttendance");
const studentRequest = require("../../../models/studentRequestModel");
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

// POST /clock-in route
router.post("/clock-in", async (req, res) => {
  try {
    // Extract userId from token
    const userId = getDataFromToken(req);
    const studentNo = userId;
    console.log(userId);

    if (!userId) {
      return res.status(400).json({ error: "User not found" });
    }

    const currentDate = new Date();
    const formattedTime = formatTime(currentDate);

    // Get the latest clock-in record for today
    const existingClockIn = await StudentAttendance.findOne({
      where: {
        studentNo: userId,
        clock_in: {
          [Op.gte]: new Date(`${currentDate.toISOString().split('T')[0]}T00:00:00Z`),
          [Op.lt]: new Date(`${currentDate.toISOString().split('T')[0]}T23:59:59Z`),
        },
      },
      order: [['clock_in', 'DESC']],
    });

    // Get the latest student request
    const requestRecord = await studentRequest.findOne({
      where: { studentNo },
      order: [['createdAt', 'DESC']],
    });

    let isApproved = requestRecord?.isApproved ?? false;

    if (existingClockIn && !isApproved) {
      return res.status(400).json({ error: "You have already clocked in today" });
    }

    // Create a new attendance record
    const attendanceRecord = await StudentAttendance.create({
      studentNo: userId,
      clock_in: currentDate,
    });

    // Update the latest request's approval
    if (requestRecord) {
      await requestRecord.update({ isApproved: false });
    }

    return res.json({
      message: "Clock-in successful",
      success: true,
      time: formattedTime,
    });
  } catch (error) {
    console.error("Error in clock-in:", error);

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
