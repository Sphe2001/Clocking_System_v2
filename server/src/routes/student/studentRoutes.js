const express = require("express");
const studentProfile = require("./profile/studentProfile");
const editDetails = require("./profile/editDetails");
const getHourWorked = require("./getHourWorked");
const clock_in = require("./clocking/clock_in");
const clock_out = require("./clocking/clock_out");
const earlyLeave = require("./studentRequest/earlyLeave");
const checkRequestStatus = require("./studentRequest/checkRequestStatus");

const router = express.Router();

router.use(studentProfile);
router.use(getHourWorked);
router.use(clock_in);
router.use(clock_out);
router.use(earlyLeave);
router.use(checkRequestStatus);
router.use(editDetails);

module.exports = router;
