import express from 'express';
import { signIn, signUp } from '../controllers/authController.js';

const router = express.Router();

router.post('/auth/sign-in', signIn);
router.post('/auth/sign-up', signUp);

export default router;