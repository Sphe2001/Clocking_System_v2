const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { Op } = require("sequelize");
const { studentRequest } = require("../../../models");
const getUserId = require("../../../helpers/getUserId");

dotenv.config();
const router = express.Router();
router.use(cookieParser());

router.post("/leave_request", async (req, res) => {
  try {
    const { reason } = req.body;
    const studentNo = getUserId(req);

    if (!studentNo || !reason) {
      return res.status(400).json({ message: "Missing studentNo or reason" });
    }

    // Get today's start and end timestamps
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Check if the student already has an unviewed request today
    const existingRequest = await studentRequest.findOne({
      where: {
        studentNo,
        isViewed: false,
        createdAt: {
          [Op.between]: [startOfDay, endOfDay],
        },
      },
    });

    if (existingRequest) {
      return res.status(409).json({
        message: "You already have a pending request today that has not been viewed.",
      });
    }

    // If not, allow the request
    const newRequest = await studentRequest.create({
      studentNo,
      reason,
      isViewed: false,
    });

    res.status(201).json({
      message: "Leave request submitted successfully",
      request: newRequest,
    });
  } catch (error) {
    console.error("Error submitting leave request:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
