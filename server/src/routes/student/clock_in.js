const express = require("express");
const SupervisorAttendance = require("../../models/supervisorAttendance"); // Ensure this model is set up correctly
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser"); // Import cookie-parser
const getDataFromToken = require("../../helpers/getUserId");
const { Op } = require("sequelize");

const router = express.Router();
dotenv.config();
router.use(cookieParser());

// Helper function to get the current date in 'dd Mon yyyy hh:mm' format
const formatDate = (date) => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day} ${month} ${year} ${hours}:${minutes}`;
};

// POST /supervisor/clock-in route
router.post("/clock-in", async (req, res) => {
  try {
    // Extract supervisor's userId from the token
    const supervisorId = getDataFromToken(req);
    console.log(supervisorId);

    // If supervisorId is not found, send an error response
    if (!supervisorId) {
      return res.status(400).json({ error: "Supervisor not found" });
    }

    // Get the current date and time in 'dd Mon yyyy hh:mm' format
    const today = new Date();
    const formattedClockIn = formatDate(today); // Format the clock-in date

    // Get the current date in 'YYYY-MM-DD' format for the clock-in validation
    const currentDate = today.toISOString().split('T')[0]; // For comparing date only, e.g., '2025-04-01'

    // Check if the supervisor has already clocked in today
    const existingClockIn = await SupervisorAttendance.findOne({
      where: {
        staffNo: supervisorId, // Look for a record with the same supervisor number
        clock_in: {
          [Op.gte]: new Date(`${currentDate}T00:00:00Z`), // Start of the day
          [Op.lt]: new Date(`${currentDate}T23:59:59Z`), // End of the day
        },
      },
    });

    // If a clock-in record exists for today, return an error
    if (existingClockIn) {
      return res.status(400).json({ error: "You have already clocked in today" });
    }

    // Create a new attendance record (clock-in)
    const attendanceRecord = await SupervisorAttendance.create({
      staffNo: supervisorId, // Assuming supervisorId corresponds to staffNo
      clock_in: formattedClockIn, // Store the formatted clock-in time as a string
    });

    return res.json({
      message: `Clock-in successful at ${formattedClockIn}`,
      success: true,
      attendanceRecord, // Return the created attendance record
    });
  } catch (error) {
    console.error("Error in clock-in:", error);

    // Check if the error is a validation error (Sequelize ValidationError)
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        error: "Validation Error",
        details: error.errors.map((e) => e.message), // Provide details of the validation error
      });
    }

    // Generic server error response
    return res.status(500).json({
      error: error.message || "Internal Server Error",
    });
  }
});

module.exports = router;
