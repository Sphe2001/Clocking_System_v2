const express = require("express");
const students = require("./Students");
const supervisors = require("./supervisors");

const router = express.Router();

router.use(students);
router.use(supervisors);

module.exports = router;
