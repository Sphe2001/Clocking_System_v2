const express = require("express");
const dayReports = require("./dayReports");
const adminProfile = require("./adminProfile");
const fetchAttendance = require("./fetchAttendance/fetchstudentAttendance")

const router = express.Router();

router.use(dayReports);
router.use(adminProfile);
router.use(fetchAttendance);

module.exports = router;
