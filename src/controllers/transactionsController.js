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
    const validation = transactionSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
        const errors = validation.error.details.map(error => error.message);
        return res.status(422).send(errors);
        
    }
    
    const user = res.locals.user;

    try {
        const { type, date, description, value } = req.body;

        await db.collection('transactions').insertOne({
            userId: user._id,
            type,
            date,
            description,
            value,
        });

        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function catchUserTransactions (req, res) {
    const user = res.locals.user;
    try {
        const transactions = await db.collection('transactions').find({ userId: user._id }).toArray();
    
        return res.send(transactions);
    } catch (error) {
        return res.status(500).send(error.message);
    } 
}

export { createTransaction, catchUserTransactions };