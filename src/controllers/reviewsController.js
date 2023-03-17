const { getAllReviews, getReviewById, createReview, updateReview, deleteReview } = require('../models/reviewsModel');

const reviewsController = {
  async getAllReviews(req, res) {
    try {
      const reviews = await getAllReviews();
      res.status(200).json(reviews);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getReviewById(req, res) {
    try {
      const review = await getReviewById(req.params.id);
      if (!review) {
        res.status(404).json({ message: 'Review not found' });
      } else {
        res.status(200).json(review);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async createReview(req, res) {
    try {
      const { tripId, reviewerId, reviewedUserId, score, comment } = req.body;
      const newReview = await createReview(tripId, reviewerId, reviewedUserId, score, comment);
      res.status(201).json(newReview);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async updateReview(req, res) {
    try {
      const { id, tripId, reviewerId, reviewedUserId, score, comment } = req.body;
      const updatedReview = await updateReview(id, tripId, reviewerId, reviewedUserId, score, comment);
      if (!updatedReview) {
        res.status(404).json({ message: 'Review not found' });
      } else {
        res.status(200).json(updatedReview);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async deleteReview(req, res) {
    try {
      const deletedReview = await deleteReview(req.params.id);
      if (!deletedReview) {
        res.status(404).json({ message: 'Review not found' });
      } else {
        res.status(200).json({ message: 'Review deleted' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = reviewsController;