const { getAllBookings, getBookingById, createBooking, updateBooking, deleteBooking } = require('../models/bookingModel');

const bookingsController = {
  getAllBookings: async (req, res) => {
    try {
      const bookings = await getAllBookings();
      res.status(200).json(bookings);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getBookingById: async (req, res) => {
    try {
      const booking = await getBookingById(req.params.id);
      if (!booking) {
        res.status(404).json({ message: 'Booking not found' });
      } else {
        res.status(200).json(booking);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createBooking: async (req, res) => {
    try {
      const { trip_id, user_id, num_seats_booked, total_price } = req.body;
      const newBooking = await createBooking(trip_id, user_id, num_seats_booked, total_price);
      res.status(201).json(newBooking);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateBooking: async (req, res) => {
    try {
      const { id, trip_id, user_id, num_seats_booked, total_price } = req.body;
      const updatedBooking = await updateBooking(id, trip_id, user_id, num_seats_booked, total_price);
      if (!updatedBooking) {
        res.status(404).json({ message: 'Booking not found' });
      } else {
        res.status(200).json(updatedBooking);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteBooking: async (req, res) => {
    try {
      const deletedBooking = await deleteBooking(req.params.id);
      if (!deletedBooking) {
        res.status(404).json({ message: 'Booking not found' });
      } else {
        res.status(200).json({ message: 'Booking deleted' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = bookingsController;