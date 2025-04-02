const db = require("../../../helpers/dbConfig"); 
const express = require("express");
const router = express.Router();
// Adjust if needed

// Get all users
router.get("/supervisorUsers", async (req, res) => {
    try {
      const [users] = await db.query("SELECT * FROM supervisors");
      if (!users || users.length === 0) {
        return res.status(404).json({ message: "No users found." });
      }
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error.message);  // Log specific error message
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  });

module.exports = router;
