const express = require('express');
const router = express.Router();

const reviewsRouter = require('../controllers/reviewsController');

router.use('/reviews', reviewsRouter);

module.exports = router;