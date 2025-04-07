const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { studentRequestModel } = require ("../../../models");

dotenv.config();
const router = express.Router();
router.use(cookieParser());

router.get('/student/leave-requests/:studentId', async (req, res) => {
    try {
      const { studentId } = req.params;
      const requests = await studentRequestModel.findAll({
        where: { studentNo: studentId },
        order: [['createdAt', 'DESC']],
      });
      res.status(200).json(requests);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
 module.exports = router;  