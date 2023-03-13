const pool = require('../database/connection');

async function getAllReviews() {
    const { rows } = await pool.query('SELECT * FROM reviews');
    return rows;
  }
  
  async function getReviewById(id) {
    const { rows } = await pool.query('SELECT * FROM reviews WHERE id = $1', [id]);
    return rows[0];
  }
  
  async function createReview(tripId, reviewerId, reviewedUserId, score, comment) {
    const { rows } = await pool.query(
      'INSERT INTO reviews (trip_id, reviewer_id, reviewed_user_id, score, comment) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [tripId, reviewerId, reviewedUserId, score, comment]
    );
    return rows[0];
  }
  
  async function updateReview(id, tripId, reviewerId, reviewedUserId, score, comment) {
    const { rows } = await pool.query(
      'UPDATE reviews SET trip_id = $1, reviewer_id = $2, reviewed_user_id = $3, score = $4, comment = $5 WHERE id = $6 RETURNING *',
      [tripId, reviewerId, reviewedUserId, score, comment, id]
    );
    return rows[0];
  }
  
  async function deleteReview(id) {
    const { rows } = await pool.query('DELETE FROM reviews WHERE id = $1 RETURNING *', [id]);
    return rows[0];
  }
  
  module.exports = {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
  };