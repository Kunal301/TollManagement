import express from 'express';
import TollTransaction from '../models/Transaction.js';

const router = express.Router();

// Create a new toll transaction
router.post('/transaction', async (req, res) => {
  try {
    const newTransaction = new TollTransaction(req.body);
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all toll transactions
router.get('/transactions', async (req, res) => {
  try {
    const transactions = await TollTransaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;