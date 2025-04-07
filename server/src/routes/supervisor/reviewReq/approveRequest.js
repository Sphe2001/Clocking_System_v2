const router = require("../../auth/login");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { supervisorReviewModel } = require ("../../../models");
const {studentRequestModel} = require("../../../models");

dotenv.config();
const router = express.Router();
router.use(cookieParser());



router.post('/supervisor/leave-request/respond', async (req, res) => {
    try {
      const { requestId, action, responseMessage } = req.body;
  
      if (!['approved', 'denied'].includes(action)) {
        return res.status(400).json({ error: 'Invalid action' });
      }
  
      const request = await studentRequestModel.findByPk(requestId);
  
      if (!request) {
        return res.status(404).json({ error: 'Request not found' });
      }
  
      request.status = action;
      request.responseMessage = responseMessage || '';
      await request.save();
  
      res.status(200).json({ message: `Request ${action}`, request });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  module.exports = router;