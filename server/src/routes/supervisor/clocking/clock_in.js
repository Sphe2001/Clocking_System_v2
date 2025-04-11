const express = require("express");
const { Op } = require("sequelize");
const SupervisorAttendance = require("../../../models/supervisorAttendance"); // Assuming you have this model for supervisor attendance
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const getDataFromToken = require("../../../helpers/getUserId"); // Helper function to get supervisor ID from token

const router = express.Router();
dotenv.config();
router.use(cookieParser());

// Helper function to get the current time in 'hh:mm' format
const formatTime = (date) => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

// POST /clock-in route for supervisors
router.post("/clock_in", async (req, res) => {
  try {
    // Extract userId from token (Supervisor's staffNo)
    const userId = getDataFromToken(req); // Assuming staffNo is used as userId for supervisors
    console.log(userId);

    if (!userId) {
      return res.status(400).json({ error: "User  not found" });
    }

    const currentDate = new Date();
    const formattedTime = formatTime(currentDate); // Format current time to 'hh:mm'

    // Check if the supervisor has already clocked in today
    const existingClockIn = await SupervisorAttendance.findOne({
      where: {
        staffNo: userId, // Changed from supervisorNo to staffNo
        clock_in: {
          [Op.gte]: new Date(`${currentDate.toISOString().split('T')[0]}T00:00:00Z`), // start of the day
          [Op.lt]: new Date(`${currentDate.toISOString().split('T')[0]}T23:59:59Z`), // end of the day
        },
      },
    });

    // Create a new attendance record (clock-in)
    const attendanceRecord = await SupervisorAttendance.create({
      staffNo: userId, // Changed from supervisorNo to staffNo
      clock_in: currentDate, // Set the full timestamp for clock-in
    });

    return res.json({
      message: "Clock-in successful",
      success: true,
      time: formattedTime, // Return only the time part in the response
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