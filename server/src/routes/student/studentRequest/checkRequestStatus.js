const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { Op } = require("sequelize");
const { studentRequest } = require("../../../models");
const getUserId = require("../../../helpers/getUserId");

dotenv.config();
const router = express.Router();
router.use(cookieParser());

// GET all today's request statuses for a student
router.get("/viewrequest/status", async (req, res) => {
  try {
    const studentNo = getUserId(req);

    if (!studentNo) {
      return res.status(400).json({ message: "Invalid or missing studentNo" });
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const requests = await studentRequest.findAll({
      where: {
        studentNo,
        createdAt: {
          [Op.between]: [startOfDay, endOfDay],
        },
      },
      attributes: ["reason", "isApproved", "isViewed", "createdAt"], // optional: return only needed fields
      order: [["createdAt", "DESC"]], // optional: most recent first
    });

    if (!requests || requests.length === 0) {
      return res.status(404).json({ message: "No requests found for today" });
    }

    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching request statuses:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
