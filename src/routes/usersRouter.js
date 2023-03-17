const express = require('express');
const router = express.Router();
const verifyToken = require('./verifyToken');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/usersController');

router.get('/users', verifyToken, getAllUsers);
router.get('/users/:id', verifyToken, getUserById);
router.post('/users', createUser);
router.patch('/users/:id', verifyToken, updateUser);
router.delete('/users/:id', verifyToken, deleteUser);

module.exports = router;