const pool = require('../database/connection');

const getAllTrips = async () => {
  const { rows } = await pool.query('SELECT * FROM trips');
  return rows;
};

const getTripById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM trips WHERE id=$1', [id]);
  return rows[0];
};

const createTrip = async (driverId, departureLocation, destinationLocation, dateTime, availableSeats, price, description, carId) => {
  const { rows } = await pool.query(
    'INSERT INTO trips (driver_id, departure_location, destination_location, date_time, available_seats, price, description, car_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [driverId, departureLocation, destinationLocation, new Date(dateTime).toISOString(), availableSeats, price, description, carId]
  );
  return rows[0];
};

const updateTrip = async (id, driverId, departureLocation, destinationLocation, dateTime, availableSeats, price, description, carId) => {
  const { rows } = await pool.query(
    'UPDATE trips SET driver_id=$1, departure_location=$2, destination_location=$3, date_time=$4, available_seats=$5, price=$6, description=$7, car_id=$8 WHERE id=$9 RETURNING *',
    [driverId, departureLocation, destinationLocation, dateTime, availableSeats, price, description, carId, id]
  );
  return rows[0];
};

const deleteTrip = async (id) => {
  const { rows } = await pool.query('DELETE FROM trips WHERE id=$1 RETURNING *', [id]);
  return rows[0];
};

module.exports = {
  getAllTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
};