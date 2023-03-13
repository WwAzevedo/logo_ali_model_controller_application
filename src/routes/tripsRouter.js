const express = require('express');
const router = express.Router();

const tripsRouter = require('../controllers/tripsController');

router.use('/trips', tripsRouter);

module.exports = router;