const db = require("../../helpers/dbConfig");
const express = require("express");
const { StudentAttendance, SupervisorAttendance } = require("../../models");

const router = express.Router();

router.get("/todays/attendance", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const studentRecords = await StudentAttendance.findAll({
      where: {
        createdAt: {
          [db.Sequelize.Op.gte]: today,
          [db.Sequelize.Op.lt]: tomorrow,
        },
      },
    });

    const supervisorRecords = await SupervisorAttendance.findAll({
      where: {
        createdAt: {
          [db.Sequelize.Op.gte]: today,
          [db.Sequelize.Op.lt]: tomorrow,
        },
      },
    });

    res.status(200).json({
      students: studentRecords,
      supervisors: supervisorRecords,
    });
  } catch (error) {
    console.error("Error fetching attendance:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
