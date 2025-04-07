const db = require("../../../helpers/dbConfig");
const express = require("express");
const { SupervisorAttendance, Supervisor } = require("../../../models");
const { Op } = require("sequelize");

const router = express.Router();

// Helper to get Monday to Sunday of the current week
function getCurrentWeekDates() {
  const today = new Date();
  const currentDay = today.getDay(); // Sunday = 0, Monday = 1, ...
  const monday = new Date(today);
  monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return { monday, sunday };
}

function getDayOfWeek(date) {
  return date.toLocaleDateString("en-ZA", {
    weekday: "long",
    timeZone: "Africa/Johannesburg",
  });
}

// Route to fetch weekly supervisor attendance report
router.get("/supervisor/weekreport", async (req, res) => {
  try {
    const { monday, sunday } = getCurrentWeekDates();

    // Fetch attendance records for the current week
    const attendances = await SupervisorAttendance.findAll({
      where: {
        clock_in: {
          [Op.gte]: monday,
          [Op.lte]: sunday,
        },
      },
      include: [
        { model: Supervisor, attributes: ["surname", "email", "staffNo"] },
      ],
      raw: true,
    });

    const attendanceMap = {};
    const timeZone = "Africa/Johannesburg";
    const currentDate = new Date();

    // Loop through the days of the week
    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(monday);
      dayDate.setDate(monday.getDate() + i);
      dayDate.setHours(0, 0, 0, 0);

      const formattedDate = dayDate
        .toLocaleDateString("en-ZA", { timeZone })
        .split("/")
        .reverse()
        .join("-");

      const dayOfWeek = getDayOfWeek(dayDate);

      attendances.forEach((record) => {
        const email = record["Supervisor.email"];
        if (!attendanceMap[email]) {
          attendanceMap[email] = {
            name: record["Supervisor.surname"],
            staffNo: record["Supervisor.staffNo"],
            email,
            attendance: {},
          };
        }

        const recordDate = new Date(record.clock_in);
        recordDate.setHours(0, 0, 0, 0);

        const recordFormattedDate = recordDate
          .toLocaleDateString("en-ZA", { timeZone })
          .split("/")
          .reverse()
          .join("-");

        if (recordFormattedDate === formattedDate) {
          attendanceMap[email].attendance[formattedDate] = {
            date: formattedDate,
            dayOfWeek,
            status: "Attended",
          };
        }
      });

      // Fill in missing dates
      for (const supervisor in attendanceMap) {
        if (!attendanceMap[supervisor].attendance[formattedDate]) {
          attendanceMap[supervisor].attendance[formattedDate] = {
            date: formattedDate,
            dayOfWeek,
            status: dayDate < currentDate ? "Absent" : "Pending",
          };
        }
      }
    }

    res.status(200).json(attendanceMap);
  } catch (error) {
    console.error("Error fetching weekly attendance report:", error.message);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

module.exports = router;
