const pool = require('../database/connection');

async function getAllCars() {
  const { rows } = await pool.query('SELECT * FROM cars');
  return rows;
}

async function getCarById(id) {
  const { rows } = await pool.query('SELECT * FROM cars WHERE id = $1', [id]);
  return rows[0];
}

async function createCar(driverId, model, year, color, licensePlate) {
  const { rows } = await pool.query(
    'INSERT INTO cars (driver_id, model, year, color, license_plate) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [driverId, model, year, color, licensePlate]
  );
  return rows[0];
}

async function updateCar(id, model, year, color, licensePlate) {
  const { rows } = await pool.query(
    'UPDATE cars SET model = $1, year = $2, color = $3, license_plate = $4 WHERE id = $5 RETURNING *',
    [model, year, color, licensePlate, id]
  );
  return rows[0];
}

async function deleteCar(id) {
  const { rows } = await pool.query('DELETE FROM cars WHERE id = $1 RETURNING *', [id]);
  return rows[0];
}

module.exports = {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
};
