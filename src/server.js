import express  from "express";
import cors from 'cors';
import authRouter from './routes/authRouter.js';
import transactionsRouter from './routes/transactionsRouter.js';
import dotenv from 'dotenv';

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

server.use(authRouter);
server.use(transactionsRouter);

server.listen(process.env.PORT, () => console.log("Server running on port " + process.env.PORT));