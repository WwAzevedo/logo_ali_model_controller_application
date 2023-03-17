const express = require('express');
const router = express.Router();
const verifyToken = require('./verifyToken');
const { getAllReviews, getReviewById, createReview, updateReview, deleteReview } = require('../controllers/reviewsController');

router.get('/reviews', verifyToken, getAllReviews);
router.get('/reviews/:id', verifyToken, getReviewById);
router.post('/reviews', verifyToken, createReview);
router.patch('/reviews/:id', verifyToken, updateReview);
router.delete('/reviews/:id', verifyToken, deleteReview);

module.exports = router;