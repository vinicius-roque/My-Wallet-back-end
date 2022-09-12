import express from 'express';
import { createTransaction, catchUserTransactions } from '../controllers/transactionsController.js';
import userAuthentication from '../middlewares/authenticationMiddleware.js';

const router = express.Router();

router.use(userAuthentication);

router.post('/transactions', createTransaction);
router.get('/transactions', catchUserTransactions);

export default router;