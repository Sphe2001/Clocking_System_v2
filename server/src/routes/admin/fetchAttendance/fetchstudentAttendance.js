const express = require("express");
const db = require("../../../helpers/dbConfig");
const { StudentAttendance } = require("../../../models"); // Assuming StudentAttendance is exported properly

const router = express.Router();

// GET all student attendance records
router.get("/attendance/students", async (req, res) => {
  try {
    const records = await StudentAttendance.findAll();
    res.status(200).json(records);
  } catch (error) {
    console.error("Error fetching student attendance records:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// POST: Get a student's attendance by student number
router.post("/attendance/student", async (req, res) => {
  try {
    const { studentNo } = req.body;

    if (!studentNo) {
      return res.status(400).json({ message: "Missing studentNo in request body" });
    }

    const record = await StudentAttendance.findOne({ where: { studentNo } });

    if (!record) {
      return res.status(404).json({ message: "Student record not found" });
    }

    res.status(200).json(record);
  } catch (error) {
    console.error("Error fetching student record:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;

