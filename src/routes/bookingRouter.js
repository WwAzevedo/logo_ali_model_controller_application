const express = require('express');
const router = express.Router();
const { getAllBookings, getBookingById, createBooking, updateBooking, deleteBooking } = require('../controllers/bookingController');
const verifyToken = require('./verifyToken');

router.get('/bookings', verifyToken, getAllBookings);
router.get('/bookings/:id', verifyToken, getBookingById);
router.post('/bookings', verifyToken, createBooking);
router.patch('/bookings/:id', verifyToken, updateBooking);
router.delete('/bookings/:id', verifyToken, deleteBooking);

module.exports = router;
