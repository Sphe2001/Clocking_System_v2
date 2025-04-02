const express = require("express");
const { Op } = require("sequelize");
const StudentAttendance = require("../../models/studentAttendance");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const getDataFromToken = require("../../helpers/getUserId");

const router = express.Router();
dotenv.config();
router.use(cookieParser());

// Helper function to calculate hours worked
const calculateHoursWorked = (clockIn, clockOut) => {
  const diffInMilliseconds = clockOut - clockIn;
  const hoursWorked = diffInMilliseconds / (1000 * 60 * 60); // Convert milliseconds to hours
  return hoursWorked;
};

// POST /calculate-hours route
router.post("/calculate-hours", async (req, res) => {
  try {
    // Extract userId from token
    const userId = getDataFromToken(req);
    console.log(userId);

    if (!userId || isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    // Find the attendance record for today
    const attendanceRecord = await StudentAttendance.findOne({
      where: {
        studentNo: userId,
        clock_in: {
          [Op.ne]: null, // Ensure the student has clocked in
        },
        clock_out: {
          [Op.ne]: null, // Ensure the student has clocked out
        },
      },
    });

    // If no attendance record found, return an error
    if (!attendanceRecord) {
      return res.status(400).json({ error: "No attendance record found for today" });
    }

    // Calculate hours worked
    const hoursWorked = calculateHoursWorked(new Date(attendanceRecord.clock_in), new Date(attendanceRecord.clock_out));

    // Update the attendance record with the calculated hours
    await attendanceRecord.update({ hours_worked: hoursWorked });

    return res.json({
      message: "Hours calculated and stored successfully",
      success: true,
      hours_worked: hoursWorked.toFixed(2), // Return hours worked rounded to 2 decimal places
    });
  } catch (error) {
    console.error("Error in calculating hours:", error);

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