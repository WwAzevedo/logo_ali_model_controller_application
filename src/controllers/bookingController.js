const express = require('express');
const router = express.Router();
const BookingsModel = require('../models/bookingModel');

// List all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await BookingsModel.getAllBookings();
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get booking by ID
router.get('/:id', async (req, res) => {
  try {
    const booking = await BookingsModel.getBookingById(req.params.id);
    if (!booking) {
      res.status(404).json({ message: 'Booking not found' });
    } else {
      res.status(200).json(booking);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new booking
router.post('/', async (req, res) => {
  try {
    const { trip_id, user_id, num_seats_booked, total_price } = req.body;
    const newBooking = await BookingsModel.createBooking(trip_id, user_id, num_seats_booked, total_price);
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update booking by ID
router.patch('/:id', async (req, res) => {
  try {
    const { id, trip_id, user_id, num_seats_booked, total_price } = req.body;
    const updatedBooking = await BookingsModel.updateBooking(id, trip_id, user_id, num_seats_booked, total_price);
    if (!updatedBooking) {
      res.status(404).json({ message: 'Booking not found' });
    } else {
      res.status(200).json(updatedBooking);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete booking by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedBooking = await BookingsModel.deleteBooking(req.params.id);
    if (!deletedBooking) {
      res.status(404).json({ message: 'Booking not found' });
    } else {
      res.status(200).json({ message: 'Booking deleted' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;