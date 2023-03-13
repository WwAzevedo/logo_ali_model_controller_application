const { Pool } = require('pg');

// Configurações da conexão com o banco de dados
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Fast_Travel_Database',
  password: '529822',
  port: 5432, // ou a porta que você configurou para o seu banco de dados
});

module.exports = pool;