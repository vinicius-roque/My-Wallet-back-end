import db from '../data/db.js';
import joi from 'joi';

const transactionSchema = joi.object({
    _id: joi.string().length(24).hex(),
    userId: joi.string().length(24).hex(),
    type: joi.string().valid('spent', 'earn').required(),
    date: joi.date().required(),
    description: joi.string().min(1).required(),
    value: joi.number().min(0).required()
});

async function createTransaction (req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if(!token) {
        return res.sendStatus(401);
    }

    const validation = transactionSchema.validate(req.body, { abortEarly: false });

    if(validation.error) {
        const errors = validation.error.details.map(error => error.message);

        return res.status(422).send(errors);
    }

    try {
        const session = await db.collection('sessions').findOne({ token });

        if(!session) {
            return res.sendStatus(401);
        }

        const user = await db.colletion('users').findOne({ _id: session.userId});

        if(!user) {
            return res.sendStatus(401);
        }

        const { type, date, description, value } = req.body;

        await db.collection('transactions').insertOne({
            userId: user._id,
            type,
            date,
            description,
            value
        });

        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function catchUserTransactions (req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if(!token) {
        return res.sendStatus(401);
    }

    try {
        const session = await db.collection('sessions').findOne({ token });

        if(!session) {
            return res.sendStatus(401);
        }

        const transactions = await db.collection('transactions').find({ userId: session.userId }).toArray();

        return res.send(transactions);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export { createTransaction, catchUserTransactions };