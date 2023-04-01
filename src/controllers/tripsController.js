const { getAllTrips, getTripById, createTrip, updateTrip, deleteTrip} = require('../models/tripsModel');

const tripsController = {
  getAllTrips: async (req, res) => {
    try {
      const trips = await getAllTrips();
      res.status(200).json(trips);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getTripById: async (req, res) => {
    try {
      const trip = await getTripById(req.params.id);
      if (!trip) {
        res.status(404).json({ message: 'Trip not found' });
      } else {
        res.status(200).json(trip);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createTrip: async (req, res) => {
    try {
      const { driverId, departureLocation, destinationLocation, dateTime, availableSeats, price, description, carId } = req.body;
      const newTrip = await createTrip(driverId, departureLocation, destinationLocation, dateTime, availableSeats, price, description, carId);
      res.status(201).json(newTrip);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateTrip: async (req, res) => {
    try {
      const { id, startLocation, endLocation, startTime, availableSeats, price } = req.body;
      const updatedTrip = await updateTrip(id, startLocation, endLocation, startTime, availableSeats, price);
      if (!updatedTrip) {
        res.status(404).json({ message: 'Trip not found' });
      } else {
        res.status(200).json(updatedTrip);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteTrip: async (req, res) => {
    try {
      const deletedTrip = await deleteTrip(req.params.id);
      if (!deletedTrip) {
        res.status(404).json({ message: 'Trip not found' });
      } else {
        res.status(200).json({ message: 'Trip deleted' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = tripsController;