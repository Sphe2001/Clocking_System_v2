const db = require("../../../helpers/dbConfig");
const express = require("express");
const { Supervisor } = require("../../../models");
const router = express.Router();
// Adjust if needed

// Get all users
router.get("/users/supervisors", async (req, res) => {
  try {
    const Supervisors = await Supervisor.findAll();
    res.status(200).json(Supervisors);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
