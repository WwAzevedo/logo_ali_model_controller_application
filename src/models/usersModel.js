const pool = require('../database/connection');

// Função para buscar todos os usuários do banco de dados
async function getAllUsers() {
  const { rows } = await pool.query('SELECT * FROM users');
  return rows;
}

// Função para buscar um usuário pelo seu ID
async function getUserById(id) {
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return rows[0];
}

// Função para inserir um novo usuário no banco de dados
async function createUser(name, email, password, isDriver) {
  const { rows } = await pool.query(
    'INSERT INTO users (name, email, password, is_driver) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, password, isDriver]
  );
  return rows[0];
}

// Função para atualizar um usuário existente no banco de dados
async function updateUser(id, name, email, password) {
  const { rows } = await pool.query(
    'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
    [name, email, password, id]
  );
  return rows[0];
}

// Função para excluir um usuário do banco de dados
async function deleteUser(id) {
  const { rows } = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
  return rows[0];
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};