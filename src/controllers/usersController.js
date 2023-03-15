const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const UserModel = require('../models/usersModel');

// List all users
router.get('/', async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await UserModel.getUserById(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { name, email, password, isDriver } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = await UserModel.createUser(name, email, hash, isDriver);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user by ID
router.patch('/:id', async (req, res) => {
  try {
    const { id, name, email, password } = req.body;
    const updatedUser = await UserModel.updateUser(id, name, email, password);
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete user by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await UserModel.deleteUser(req.params.id);
    if (!deletedUser) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json({ message: 'User deleted' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;