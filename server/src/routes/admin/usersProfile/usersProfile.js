const express = require("express");
const studentProfile = require("./student/studentProfile");
const editStudentProfile = require("./student/editStudentProfile");
const supervisorProfile = require("./supervisor/supervisorProfile");
const editSupervisorProfile = require("./supervisor/editSupervisorProfile")

const router = express.Router();

router.use(studentProfile);
router.use(editStudentProfile);
router.use(supervisorProfile);
router.use(editSupervisorProfile);


module.exports = router;
