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

    const leaveRequest = await studentRequest.findOne({
      where: {
        studentNo,
        createdAt: {
          [Op.between]: [startOfDay, endOfDay],
        },
      },
      order: [["createdAt", "DESC"]],
    });

    if (!leaveRequest) {
      return res
        .status(404)
        .json({ message: "No leave request found for today." });
    }

    let leaveIsApproved = leaveRequest.isApproved;
    let status;

    if (leaveIsApproved === null) {
      status = "Pending";
    } else if (leaveIsApproved) {
      status = "Approved";
    } else {
      status = "Rejected";
    }

    res.status(200).json({
      reason: leaveRequest.reason,
      status: status,
    });
  } catch (error) {
    console.error("Error fetching leave status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
