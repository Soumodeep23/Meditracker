const express = require('express');
const jwt = require('jsonwebtoken');
const Medicine = require('../models/medicine');
const User = require('../models/user');
const router = express.Router();

// Middleware to verify JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Add a new medicine
router.post('/add', authenticateToken, async (req, res) => {
  try {
    const { name, time } = req.body;
    if (!name || !time) {
      return res.status(400).json({ message: 'Name and time are required.' });
    }
    const medicine = new Medicine({
      name,
      time,
      user: req.user.userId,
    });
    await medicine.save();
    res.status(201).json({ message: 'Medicine added successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// List medicines for the logged-in user
router.get('/list', authenticateToken, async (req, res) => {
  try {
    const medicines = await Medicine.find({ user: req.user.userId });
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Delete a medicine by ID
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const medicine = await Medicine.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found or not authorized.' });
    }
    res.json({ message: 'Medicine deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
