import express from 'express';
import { createTransaction, catchUserTransactions } from '../controllers/transactionsController.js';

const router = express.Router();

router.post('/transactions', createTransaction);
router.get('/transactions', catchUserTransactions);

export default router;