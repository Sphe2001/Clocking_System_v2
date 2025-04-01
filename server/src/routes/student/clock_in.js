const express = require('express');
const StudentAttendance = require('../../models/studentModel'); // Ensure this model is set up correctly
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser'); // Import cookie-parser
const getDataFromToken = require('../../helpers/getUserId');

const router = express.Router();
dotenv.config();
router.use(cookieParser());

// POST /clock-in route
router.post('/clock-in', async (req, res) => {
    try {
        // Extract userId from token
        const userId = getDataFromToken(req);
        console.log(userId);

        // If userId is not found, send an error response
        if (!userId) {
            return res.status(400).json({ error: "User not found" });
        }

        // Create a new attendance record only
        const attendanceRecord = await StudentAttendance.create({
            studentNo: userId, // Assuming userId corresponds to studentNo
            clock_in: new Date(), // Set the current timestamp
        });

        

        return res.json({
            message: "Clock-in successful",
            success: true,
            attendanceRecord, // Return the created attendance record
        });

    } catch (error) {
        console.error("Error in clock-in:", error);

        // Check if the error is a validation error (Sequelize ValidationError)
        if (error.name === "SequelizeValidationError") {
            return res.status(400).json({
                error: "Validation Error",
                details: error.errors.map(e => e.message), // Provide details of the validation error
            });
        }

        // Generic server error response
        return res.status(500).json({
            error: error.message || "Internal Server Error"
        });
    }
});

module.exports = router;
