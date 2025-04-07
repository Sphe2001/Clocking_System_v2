const db = require("../../../helpers/dbConfig");
const express = require("express");
const StudentAttendance = require("../../../models");

const router = express.Router();
// Adjust if needed

// Get all users
router.get("/attendance/students", async (req, res) => {
  try {
    const records = await StudentAttendance.findAll();
    res.status(200).json(records);
  } catch (error) {
    console.error("Error fetching users:", error.message); // Log specific error message
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
