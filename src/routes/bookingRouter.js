const express = require('express');
const router = express.Router();
const verifyToken = require('./verifyToken');

const bookingRouter = require('../controllers/bookingController');

router.use('/bookings', verifyToken, bookingRouter);

module.exports = router;