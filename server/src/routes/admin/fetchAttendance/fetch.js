const express = require("express");
const fecthStudentAttendance = require("./fetchstudentAttendance");
const fetchSupervisorAttendance = require("./fetchSupervisorAttendance");

const router = express.Router();

router.use(fecthStudentAttendance);
router.use(fetchSupervisorAttendance);

module.exports = router;
