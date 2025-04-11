const express = require("express");
const dayReports = require("./dayReports");
const adminProfile = require("./adminProfile");
const fetchAttendance = require("./fetchAttendance/fetchstudentAttendance");
const weekRecords = require("./weekReports/weekRecords");
const usersProfile = require("./usersProfile/usersProfile");
const fetchUsers = require("./fetchUsers/fetch");

const router = express.Router();

router.use(dayReports);
router.use(adminProfile);
router.use(fetchAttendance);
router.use(weekRecords);
router.use(usersProfile);
router.use(fetchUsers);



module.exports = router;
