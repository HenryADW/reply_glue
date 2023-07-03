const express = require('express');
const app = express();

const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// Mock database
const users = []; 
const payments = [];

// JSON parser
app.use(express.json());

// GET Users with credit card
app.get('/users', (req, res) => {
    // Return all users with a credit card
    if (req.body.creditCard === 'yes') {
        res.json(users.filter(user => user.creditCardNumber !== '')); 
        return;
    }
    // Return all users
    else {
        res.json(users);
    }
    res.status(200);
});

// POST /users => create a new user
app.post('/users', [ // Validation middleware for POST /users
    check('username').notEmpty().isAlphanumeric(),
    check('password').notEmpty().matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/),
    check('email').notEmpty().isEmail(),
    check('dob').notEmpty().isDate().isISO8601(),
    check('creditCardNumber').isNumeric().isLength({min: 16, max: 16}).optional({ nullable: true, checkFalsy: true })
], async (req, res) => {
    const errors = validationResult(req);

    // Validation failed => return 400
    if (!errors.isEmpty()) {
        res.status(400);
        res.send('Validation failed');
        return;
    }

    // User under 18 => return 403
    const dateDiff = Date.now() - new Date(req.body.dob).getTime();
    if ((dateDiff/ 31557600000) < 18) {
        res.status(403);
        res.send('User under 18');
        return;
    }

    // Username already exists => return 409
    const user = users.find(users => users.username === req.body.username);
    if (user !== undefined) {
        res.status(409);
        res.send(req.body.username + ' already exists');
        return;
    }

    // Validation passed => return 201
    
    try {
        
        users.push({
            username: req.body.username,
            //password: await bcrypt.hash(req.body.password, 10), // Hashed password error for testing
            password: req.body.password,
            email: req.body.email,
            dob: req.body.dob,
            creditCardNumber: req.body.creditCardNumber});
            res.status(201);
            res.send('User created');
        } catch {console.log(`failed to create user`)}
});

// POST /Payments => create a new payment
app.post('/payments', [
    check('creditCardNumber').isNumeric().isLength({min: 16, max: 16}),
    check('amount').isNumeric().isLength({min: 3, max: 3})
],(req, res) => {

    // Validation failed => return 400
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400);
        res.send('Validation failed');
        return;
    }

    // Credit card not found => return 404
    const creditCard = users.find(users => users.creditCardNumber === req.body.creditCardNumber);
    if (creditCard === undefined) {
        res.status(404);
        res.send('Credit card not found');
        return;
    }

    // Succesfull payment => return 201
    payments.push({
        creditCardNumber: req.body.creditCardNumber,
        amount: req.body.amount
    });
    res.status(201);
    res.send('Payment succesfull');
});

module.exports = app;