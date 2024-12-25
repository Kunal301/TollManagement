import express from 'express';
import { createTransaction, getAllTransactions, getBoothTransactions, deleteTransaction, getRevenue, getDashboardSummary } from '../controllers/transactionController.js';

const router = express.Router();

router.post('/', createTransaction);
router.get('/', getAllTransactions);
router.get('/booth', getBoothTransactions);
router.delete('/:id', deleteTransaction);
router.get('/revenue', getRevenue);
router.get('/dashboard-summary', getDashboardSummary);

export default router;