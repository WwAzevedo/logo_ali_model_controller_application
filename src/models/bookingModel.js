const pool = require('../database/connection');

// Função para buscar todas as reservas do banco de dados
async function getAllBookings() {
  const { rows } = await pool.query('SELECT * FROM bookings');
  return rows;
}

// Função para buscar uma reserva pelo seu ID
async function getBookingById(id) {
  const { rows } = await pool.query('SELECT * FROM bookings WHERE id = $1', [id]);
  return rows[0];
}

// Função para inserir uma nova reserva no banco de dados
async function createBooking(tripId, userId, numSeatsBooked, totalPrice) {
  const { rows } = await pool.query(
    'INSERT INTO bookings (trip_id, user_id, num_seats_booked, total_price) VALUES ($1, $2, $3, $4) RETURNING *',
    [tripId, userId, numSeatsBooked, totalPrice]
  );
  return rows[0];
}

// Função para atualizar uma reserva existente no banco de dados
async function updateBooking(id, tripId, userId, numSeatsBooked, totalPrice) {
  const { rows } = await pool.query(
    'UPDATE bookings SET trip_id = $1, user_id = $2, num_seats_booked = $3, total_price = $4 WHERE id = $5 RETURNING *',
    [tripId, userId, numSeatsBooked, totalPrice, id]
  );
  return rows[0];
}

// Função para excluir uma reserva do banco de dados
async function deleteBooking(id) {
  const { rows } = await pool.query('DELETE FROM bookings WHERE id = $1 RETURNING *', [id]);
  return rows[0];
}

module.exports = {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
};