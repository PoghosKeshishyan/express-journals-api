const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { auth } = require('../middleware/auth');
const { register, login, current } = require('../controllers/users');

const registerValid = [
    body('name').notEmpty(),
    body('login').notEmpty(),
    body('password').isLength({ min: 6 }),
];

const loginValid = [
    body('login').notEmpty(),
    body('password').notEmpty(),
];

router.post('/register', registerValid, register);
router.post('/login', loginValid, login);
router.get('/current', auth, current);

module.exports = router;
