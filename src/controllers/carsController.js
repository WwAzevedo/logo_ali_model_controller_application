const express = require('express');
const router = express.Router();
const CarsModel = require('../models/carsModel');

router.get('/', async (req, res) => {
  try {
    const cars = await CarsModel.getAllCars();
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const car = await CarsModel.getCarById(req.params.id);
    if (!car) {
      res.status(404).json({ message: 'Car not found' });
    } else {
      res.status(200).json(car);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { driverId, model, year, color, licensePlate } = req.body;
    const newCar = await CarsModel.createCar(driverId, model, year, color, licensePlate);
    res.status(201).json(newCar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id, model, year, color, licensePlate } = req.body;
    const updatedCar = await CarsModel.updateCar(id, model, year, color, licensePlate);
    if (!updatedCar) {
      res.status(404).json({ message: 'Car not found' });
    } else {
      res.status(200).json(updatedCar);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
    try {
      const deletedCar = await CarModel.deleteCar(req.params.id);
    if (!deletedCar) {
      res.status(404).json({ message: 'Car not found' });
    } else {
      res.status(200).json({ message: 'Car deleted' });
        }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});
      
module.exports = router;