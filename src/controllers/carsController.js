const {getAllCars, getCarById, createCar, updateCar, deleteCar} = require('../models/carsModel');

const carsController = {
  getAllCars: async (req, res) => {
    try {
      const cars = await getAllCars();
      res.status(200).json(cars);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getCarById: async (req, res) => {
    try {
      const car = await getCarById(req.params.id);
      if (!car) {
        res.status(404).json({ message: 'Car not found' });
      } else {
        res.status(200).json(car);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createCar: async (req, res) => {
    try {
      const { driverId, model, year, color, licensePlate } = req.body;
      const newCar = await createCar(driverId, model, year, color, licensePlate);
      res.status(201).json(newCar);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateCar: async (req, res) => {
    try {
      const { id, model, year, color, licensePlate } = req.body;
      const updatedCar = await updateCar(id, model, year, color, licensePlate);
      if (!updatedCar) {
        res.status(404).json({ message: 'Car not found' });
      } else {
        res.status(200).json(updatedCar);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteCar: async (req, res) => {
    try {
      const deletedCar = await deleteCar(req.params.id);
      if (!deletedCar) {
        res.status(404).json({ message: 'Car not found' });
      } else {
        res.status(200).json({ message: 'Car deleted' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};


module.exports = carsController;