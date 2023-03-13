const express = require('express');
const router = express.Router();

const carsRouter = require('../controllers/carsController');

router.use('/cars', carsRouter);

module.exports = router;