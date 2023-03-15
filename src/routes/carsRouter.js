const express = require('express');
const router = express.Router();

const carsRouter = require('../controllers/carsController');

router.use('/cars', verifyToken, carsRouter);

module.exports = router;