const express = require("express");
const { Op } = require("sequelize");
const SupervisorAttendance = require("../../models/supervisorAttendance"); // Assuming you have this model for supervisor attendance
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const getDataFromToken = require("../../helpers/getUserId"); // Helper function to get supervisor ID from token

const router = express.Router();
dotenv.config();
router.use(cookieParser());

// Helper function to get the current time in 'hh:mm' format
const formatTime = (date) => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

// POST /clock-out route for supervisors
router.post("/clock_out", async (req, res) => {
  try {
    // Extract userId from token (Supervisor's staffNo)
    const userId = getDataFromToken(req);
    console.log(userId);

    if (!userId) {
      return res.status(400).json({ error: "User  not found" });
    }

    const currentDate = new Date();
    const formattedTime = formatTime(currentDate); // Format current time to 'hh:mm'

    // Find the supervisor's attendance record where they have clocked in but not yet clocked out
    const attendanceRecord = await SupervisorAttendance.findOne({
      where: {
        staffNo: userId,
        clock_in: {
          [Op.ne]: null, // Ensure the supervisor has clocked in
        },
        clock_out: {
          [Op.eq]: null, // Ensure the supervisor hasn't clocked out yet
        },
      },
    });

    if (!attendanceRecord) {
      return res.status(400).json({ error: "You have not clocked in yet or already clocked out today" });
    }

    // Update the existing attendance record with the clock-out time
    attendanceRecord.clock_out = currentDate; // Set the full timestamp for clock-out

    // Save the updated record
    await attendanceRecord.save();

    // Return the success message with clock-out time in 'hh:mm' format
    return res.json({
      message: "Clock-out successful",
      success: true,
      clock_out: formattedTime, // Return the clock-out time in the response
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