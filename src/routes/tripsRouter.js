const express = require('express');
const router = express.Router();
const verifyToken = require('./verifyToken');
const { getAllTrips, getTripById, createTrip, updateTrip, deleteTrip } = require('../controllers/tripsController');

router.get('/trips', verifyToken, getAllTrips);
router.get('/trips/:id', verifyToken, getTripById);
router.post('/trips', verifyToken, createTrip);
router.patch('/trips/:id', verifyToken, updateTrip);
router.delete('/trips/:id', verifyToken, deleteTrip);

module.exports = router;