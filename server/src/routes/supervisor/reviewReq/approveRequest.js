const express = require("express");
const cookieParser = require("cookie-parser");
const { studentRequest } = require("../../../models");

const router = express.Router();
router.use(cookieParser());

router.get("/students/requests", async (req, res) => {
  try {
    const requests = await studentRequest.findAll();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific student request by ID
router.post("/student/request/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const request = await studentRequest.findByPk(id);

    await request.update({ isViewed: true });

    if (!request) {
      return res
        .status(404)
        .json({ message: "Request not found", status: "FAILED" });
    }

    res.status(200).json({ status: "SUCCESS", request });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Approve or reject a student request
router.put("/student/request/response/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { isApproved } = req.body;

    const request = await studentRequest.findByPk(id);

    await request.update({ isViewed: true });

    if (!request) {
      return res
        .status(404)
        .json({ message: "Request not found", status: "FAILED" });
    }

    if (!isApproved) {
      await request.update({ isApproved: false });
      return res
        .status(403)
        .json({ message: "Request rejected", status: "REJECTED" });
    }

    await request.update({ isApproved: true });

    res.status(200).json({ message: "Request approved", status: "APPROVED" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mark a student request as viewed
router.patch("/student/request/viewed/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const request = await studentRequest.findByPk(id);
    if (!request) {
      return res
        .status(404)
        .json({ message: "Request not found", status: "FAILED" });
    }

    await request.update({ isViewed: true });

    res.status(200).json({ message: "Marked as viewed", status: "SUCCESS" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
