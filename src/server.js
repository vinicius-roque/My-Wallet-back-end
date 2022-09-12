import express  from "express";
import cors from 'cors';
import authRouter from './routes/authRouter.js';
import transactionsRouter from './routes/transactionsRouter.js';

const server = express();
server.use(express.json());
server.use(cors());

server.use(authRouter);
server.use(transactionsRouter);

server.listen(5000, () => console.log("Listening on port 5000"));