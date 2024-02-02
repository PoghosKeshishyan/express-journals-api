const express = require('express');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();

const corsOptions = {
    origin: ['93.185.35.72', 'http://barilur.org'],
    optionsSuccessStatus: 200, 
};

app.use(logger('dev'));
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/api/user', require('./routes/users'));
app.use('/api/years', require('./routes/years'));
app.use('/api/journals', require('./routes/journals'));

module.exports = app;
