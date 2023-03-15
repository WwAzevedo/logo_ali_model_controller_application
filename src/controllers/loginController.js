const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getUserByEmail } = require('../models/usersModel');

const router = express.Router();

const secretKey = 'mySecretKey';
const expiresIn = '1h';

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verifica se o email e a senha foram fornecidos
    if (!email || !password) {
      return res.status(400).json({ error: 'Credenciais inválidas' });
    }

    // Busca o usuário pelo email no banco de dados
    const user = await getUserByEmail(email);

    // Verifica se o usuário foi encontrado
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Verifica se a senha fornecida é igual à senha armazenada no banco de dados
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    // Gera o token de autenticação
    const token = jwt.sign({ user }, secretKey, { expiresIn });

    // Retorna o token e as informações do usuário logado
    return res.json({ token, user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao realizar login' });
  }
});

module.exports = router;