const express = require("express");

const login = require("../routes/auth/login");
const logout = require("../routes/auth/logout");
const registerAdmin = require("../routes/auth/registerAdmin");
const registerStudent = require("../routes/auth/registerStudent");
const registerSupervisor = require("../routes/auth/registerSupervisor");
const requestPasswordReset = require("../routes/auth/requestPasswordReset");
const verifyPasswordResetOTP = require("../routes/auth/verifyPasswordResetOTP");
const resetPassword = require("../routes/auth/resetPassword");
const setPassword = require("../routes/auth/setPassword");
const disableUser = require("../routes/auth/disableUser")

const router = express.Router();

router.use(login);
router.use(logout);
router.use(registerAdmin);
router.use(registerStudent);
router.use(registerSupervisor);
router.use(requestPasswordReset);
router.use(verifyPasswordResetOTP);
router.use(resetPassword);
router.use(setPassword);
router.use(disableUser);

module.exports = router;
