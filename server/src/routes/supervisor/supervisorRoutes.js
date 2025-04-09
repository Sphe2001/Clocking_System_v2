const express = require("express");
const supervisorProfile = require("./supervisorProfile");
const clock_in = require("./clocking/clock_in");
const clock_out = require("./clocking/clock_out");
const approveRequest = require("./reviewReq/approveRequest");
const requestReview = require("./reviewReq/requestReview");

const router = express.Router();

router.use(supervisorProfile);
router.use(clock_in);
router.use(clock_out);
router.use(approveRequest);
router.use(requestReview);

module.exports = router;
