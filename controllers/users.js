const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const register = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    const { login, password } = req.body;

    try {
        const existingUser = await User.findOne({ login });

        if (existingUser) {
            return res.status(400).json({
                message: 'User with this login already exists',
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            login,
            password: hashedPassword,
        });

        await newUser.save();
        
        res.status(201).json({
            message: 'User registered successfully',
        });
    } catch (error) {
        res.status(500).json({
            error,
            message: 'Internal Server Error',
        });
    }
};

const login = async (req, res) => {
    const { login, password } = req.body;

    try {
        const user = await User.findOne({ login });

        if (!user) {
            return res.status(401).json({
                message: 'Invalid login or password',
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid login or password',
            });
        }

        // Generate and send the JWT token
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign({ userId: user._id }, secret, /*{ expiresIn: '30d' }*/);

        res.status(200).json({
            id: user._id,
            login: user.login,
            token,
        });
    } catch (error) {
        res.status(500).json({
            error,
            message: 'Internal Server Error',
        });
    }
};

const current = async (req, res) => {
    return res.status(200).json({ user: req.user });
}

module.exports = { login, register, current };
