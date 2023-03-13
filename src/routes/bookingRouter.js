const express = require('express');
const router = express.Router();

const bookingRouter = require('../controllers/bookingController');

router.use('/bookings', bookingRouter);

module.exports = router;