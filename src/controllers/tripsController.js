const express = require('express');
const TripsModel = require('../models/tripsModel');

const router = express.Router();

// Rota para listar todas as viagens
router.get('/', async (req, res) => {
  try {
    const trips = await TripsModel.getAllTrips();
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para buscar uma viagem pelo id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const trip = await TripsModel.getTripById(id);
    if (trip) {
      res.status(200).json(trip);
    } else {
      res.status(404).json({ message: 'Viagem não encontrada.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para criar uma nova viagem
router.post('/', async (req, res) => {
  try {
    const {
      driverId,
      departureLocation,
      destinationLocation,
      dateTime,
      availableSeats,
      price,
      description,
      carId,
    } = req.body;
    const newTrip = await TripsModel.createTrip(
      driverId,
      departureLocation,
      destinationLocation,
      dateTime,
      availableSeats,
      price,
      description,
      carId
    );
    res.status(201).json(newTrip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para atualizar uma viagem existente
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      driverId,
      departureLocation,
      destinationLocation,
      dateTime,
      availableSeats,
      price,
      description,
      carId,
    } = req.body;
    const updatedTrip = await TripsModel.updateTrip(
      id,
      driverId,
      departureLocation,
      destinationLocation,
      dateTime,
      availableSeats,
      price,
      description,
      carId
    );
    if (updatedTrip) {
      res.status(200).json(updatedTrip);
    } else {
      res.status(404).json({ message: 'Viagem não encontrada.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para excluir uma viagem
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTrip = await TripsModel.deleteTrip(id);
    if (deletedTrip) {
      res.status(200).json({ message: 'Viagem excluída com sucesso.' });
    } else {
      res.status(404).json({ message: 'Viagem não encontrada.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;