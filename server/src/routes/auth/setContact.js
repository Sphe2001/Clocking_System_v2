const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { Student, Supervisor } = require("../../models");

dotenv.config();
const router = express.Router();
router.use(cookieParser());

router.put("/profile/contact", async (req, res) => {
    try {
        const { contactNo } = req.body;
        const { email, role } = getTokenData(req);

        if (!contactNo || typeof contactNo !== 'string') {
            return res.status(400).json({
                status: "FAILED",
                message: "A valid contact number must be provided.",
            });
        }

        if (!email || !role) {
            return res.status(404).json({
                status: "FAILED",
                message: "Token missing, Please send a new request.",
            });
        }

        let user;

        if (role === "student") {
            user = await Student.findOne({ where: { email } });
        } else if (role === "supervisor") {
            user = await Supervisor.findOne({ where: { email } });
        } else {
            return res.status(400).json({ error: "Invalid role" });
        }

        if (!user) {
            return res.status(404).json({
                status: "FAILED",
                message: "User does not exist.",
            });
        }

        user.contactNo = contactNo;
        await user.save();

        const redirectUrl = `/profile/${role}`

        res.status(200).json({
            status: "SUCCESS",
            message: "Contact number has been updated!",
            redirectUrl,
        });
    } catch (error) {
        console.error("Error updating contact:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
