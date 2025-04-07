const express = require("express");
const studentWeekReports = require("./studentWeekReports");
const supervisorWeekReports = require("./supervisorWeekReports");

const router = express.Router();

router.use(studentWeekReports);
router.use(supervisorWeekReports);

module.exports = router;
