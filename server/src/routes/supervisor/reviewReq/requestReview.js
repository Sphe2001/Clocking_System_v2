const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { Op } = require("sequelize");
const { studentRequestModel } = require("../../../models");

dotenv.config();

const router = express.Router();
router.use(cookieParser());

router.get('/leave-requests', async (req, res) => {
    try {
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));

        const requests = await studentRequestModel.findAll({
            where: {
                createdAt: {
                    [Op.between]: [startOfDay, endOfDay],
                }
            }
        });

        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/leave-request/:id', async (req, res) => {
    try {
        const { status } = req.body;
        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const request = await studentRequestModel.findByPk(req.params.id);
        if (!request) {
            return res.status(404).json({ error: 'Request not found' });
        }

        if (status === 'approved') {
            request.isApproved = true;
        } else if (status === 'rejected') {
            request.isApproved = false;
        }

        request.status = status;
        await request.save();

        res.status(200).json({ message: 'Request updated successfully', request });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
