const express = require("express");
const dayReports = require("./dayReports");
const adminProfile = require("./adminProfile");

const router = express.Router();

router.use(dayReports);
router.use(adminProfile);

module.exports = router;
