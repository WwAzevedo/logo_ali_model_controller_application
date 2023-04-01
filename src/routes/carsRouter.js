const express = require('express');
const router = express.Router();
const verifyToken = require('./verifyToken');
const { getAllCars, getCarById, createCar, updateCar, deleteCar, getCarsByDriverId } = require('../controllers/carsController');

router.get('/cars', verifyToken, getAllCars);
router.get('/cars/:id', verifyToken, getCarById);
router.get('/cars/driver/:driverId', verifyToken, getCarsByDriverId);
router.post('/cars', verifyToken, createCar);
router.patch('/cars/:id', verifyToken, updateCar);
router.delete('/cars/:id', verifyToken, deleteCar);

module.exports = router;