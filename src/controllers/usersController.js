const bcrypt = require('bcrypt');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../models/usersModel');

const usersController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  
  getUserById: async (req, res) => {
    try {
      const user = await getUserById(req.params.id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json(user);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createUser: async (req, res) => {
    try {
      const { name, email, password, isDriver } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const newUser = await createUser(name, email, hash, isDriver);
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id, name, email, password } = req.body;
      const updatedUser = await updateUser(id, name, email, password);
      if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json(updatedUser);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const deletedUser = await deleteUser(req.params.id);
      if (!deletedUser) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json({ message: 'User deleted' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = usersController;