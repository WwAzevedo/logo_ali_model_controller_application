const express = require('express');
const router = express.Router();
const ReviewsModel = require('../models/reviewsModel');

router.get('/', async (req, res) => {
  try {
    const reviews = await ReviewsModel.getAllReviews();
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const review = await ReviewsModel.getReviewById(req.params.id);
    if (!review) {
      res.status(404).json({ message: 'Review not found' });
    } else {
      res.status(200).json(review);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { tripId, reviewerId, reviewedUserId, score, comment } = req.body;
    const newReview = await ReviewsModel.createReview(tripId, reviewerId, reviewedUserId, score, comment);
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id, tripId, reviewerId, reviewedUserId, score, comment } = req.body;
    const updatedReview = await ReviewsModel.updateReview(id, tripId, reviewerId, reviewedUserId, score, comment);
    if (!updatedReview) {
      res.status(404).json({ message: 'Review not found' });
    } else {
      res.status(200).json(updatedReview);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
    try {
      const deletedReview = await ReviewsModel.deleteReview(req.params.id);
    if (!deletedReview) {
      res.status(404).json({ message: 'Review not found' });
    } else {
      res.status(200).json({ message: 'Review deleted' });
        }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});
      
module.exports = router;